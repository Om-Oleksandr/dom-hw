"use strict";

const logins = [];

const form = document.getElementById("form");

const login = form.login;
login.focus();

const list = document.getElementById("list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const {
    target,
    target: { login },
  } = e;

  const newLogin = login.value.trim();
  if (logins.includes(newLogin) === false && newLogin) {
    logins.push(newLogin);
    // list.append(...[listItem[listItem.length - 1]]);
    list.append(createLogin(newLogin));
    console.log(logins);
  }

  login.select();
  target.reset();
});

function createLogin(arg) {
  return createElement(
    "li",
    {},
    arg,
    createElement("button", { listeners: { click: deleteElem } }, "delete")
  );
}

function deleteElem({ target: { parentElement, previousElementSibling } }) {
  parentElement.remove();
  logins.splice(logins.indexOf(previousElementSibling), 1);
}
