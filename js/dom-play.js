(function () {
  "use strict";

  const DISPLAY_NAMES = {
    hamlet:   "Hamlet",
    ophelia:  "Ophelia",
    claudius: "Claudius",
    polonius: "Polonius",
    laertes: "Laertes",
  };

  function getActors() {
    const lines = document.querySelectorAll("#script .script-line[data-actor]");
    const seen  = new Set();
    lines.forEach(function (line) {
      seen.add(line.dataset.actor);
    });
    return Array.from(seen);
  }

  function buildButtons(actors) {
    var container = document.getElementById("actorButtons");
    if (!container) return;

    actors.forEach(function (actor) {
      var btn = document.createElement("button");
      btn.className       = "btn-actor";
      btn.dataset.actor   = actor;
      btn.textContent     = DISPLAY_NAMES[actor] || actor;
      btn.setAttribute("aria-pressed", "false");

      btn.addEventListener("click", function () {
        highlightActor(actor);
      });

      container.appendChild(btn);
    });
  }

  function highlightActor(selectedActor) {
    var lines   = document.querySelectorAll("#script .script-line");
    var buttons = document.querySelectorAll(".btn-actor");

    lines.forEach(function (line) {
      line.classList.remove("active", "dimmed");
      if (line.dataset.actor === selectedActor) {
        line.classList.add("active");
      } else {
        line.classList.add("dimmed");
      }
    });

    buttons.forEach(function (btn) {
      var isSelected = btn.dataset.actor === selectedActor;
      btn.classList.toggle("selected", isSelected);
      btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });

    if (navigator.vibrate) { navigator.vibrate(30); }
  }

  function clearHighlight() {
    var lines   = document.querySelectorAll("#script .script-line");
    var buttons = document.querySelectorAll(".btn-actor");

    lines.forEach(function (line) {
      line.classList.remove("active", "dimmed");
    });

    buttons.forEach(function (btn) {
      btn.classList.remove("selected");
      btn.setAttribute("aria-pressed", "false");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var actors = getActors();
    buildButtons(actors);

    window.clearHighlight = clearHighlight;
  });

})();
      
// Fixes HTML/CSS Checker links
document.addEventListener("DOMContentLoaded", function() {
    var currentUrl = window.location.href;
    document.getElementById("html-checker").href = "https://validator.w3.org/nu/?doc=" + encodeURIComponent(currentUrl);
    document.getElementById("css-checker").href = "https://jigsaw.w3.org/css-validator/validator?uri=" + encodeURIComponent(currentUrl);
});