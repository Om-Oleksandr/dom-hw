"use strict";
const body = document.body;
const resetTimeout = document.getElementById("subscribe");

const idTimeout = setTimeout(() => {
  body.append(createPopUp());
  body.style.overflow = "hidden";
}, 3000);
resetTimeout.addEventListener("click", () => {
  clearTimeout(idTimeout);
});

function createPopUp() {
  return createElement(
    "div",
    {
      classNames: ["popup__container"],
      listeners: { click: areaClosePopUp },
    },
    createElement(
      "div",
      { classNames: ["popup__content"] },
      createElement("input", { attributes: { type: "text" } }),
      createElement(
        "button",
        { classNames: ["subscribe"], listeners: { click: buttonClosePopUp } },
        "subscribe"
      )
    )
  );
}

function areaClosePopUp({ target }) {
  if (target === target.closest(".popup__container")) {
    target.remove();
    body.style.overflow = "auto";
  }
}

function buttonClosePopUp({
  target: {
    parentElement: { parentElement: grandParent },
  },
}) {
  grandParent.remove();
  body.style.overflow = "auto";
}

function closePopUp(e) {
  const popUp = document.querySelector(".popup__container");
  if (e.key === "Escape" && popUp) {
    popUp.remove();
    body.style.overflow = "auto";
  }
}

window.addEventListener("keydown", closePopUp);

/*
. any 1 symbol
[] any 1 from range
[^] any 1 except from range

{from, to?} 

\d any 1 number
\w any 1 symbol (letters, numbers, _)
  \s any 1 space symboll

* => {0, infinity}
+ => {1, infinity}
? => {0, 1}
*/