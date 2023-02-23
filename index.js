"use strict";
const pickedActors = [];
const rootElement = document.getElementById("wrapper");
const cardContainer = createElement("div", {
  classNames: ["user__cards", "container"],
});
const pickList = createElement(
  "div",
  { classNames: ["your__pick"] },
  createElement("span", {}, "your pick"),
  createElement("ul", {})
);
rootElement.append(cardContainer);
rootElement.append(pickList);

const socialMap = new Map();
socialMap.set("www.instagram.com", "fa-brands fa-instagram");
socialMap.set("www.facebook.com", "fa-brands fa-facebook");
socialMap.set("twitter.com", "fa-brands fa-twitter");

const promise = fetch("./assets/js/data.json");

promise.then((response) => {
  const responsePromise = response.json();

  responsePromise
    .then((users) => {
      const userCard = users
        .filter((user) => user.firstName && user.lastName)
        .map((user) => createUserCard(user));
      cardContainer.append(...userCard);
    })
    .catch((err) => {
      console.log(err);
    });
});

function errorLoadImage({ target }) {
  target.parentElement.append(createElement("span", {}, "no photo"));
  target.remove();
}

function loadImage({ target }) {
  target.classList.add("user__image");
}

function createUserCard(user) {
  const arrLinks = user.contacts.map((path) => {
    const { hostname } = new URL(path);
    return createElement(
      "li",
      { classNames: ["user__card-socials-item"] },
      createElement("a", {
        classNames: [...socialMap.get(hostname).split(" "), "social__link"],
        attributes: { href: path, target: "_blank" },
      })
    );
  });
  return createElement(
    "div",
    { classNames: ["user__card-item"] },
    createElement(
      "div",
      { classNames: ["user__card-image"] },
      createElement("img", {
        listeners: { error: errorLoadImage, load: loadImage },
        attributes: { src: user.profilePicture },
      })
    ),
    createElement(
      "span",
      {
        classNames: ["user__card-name"],
        listeners: { click: addToPickList },
        attributes: { title: "pick" },
      },
      user.firstName,
      " ",
      user.lastName
    ),
    createElement("ul", { classNames: ["user__card-socials"] }, ...arrLinks)
  );
}

function addToPickList({ target }) {
  const list = document.querySelector(".your__pick ul");
  if (pickedActors.includes(target.textContent) === false) {
    pickedActors.push(target.textContent);
    list.append(createPickedList(target.textContent));
  }
}
function createPickedList(picked) {
  return createElement("li", {}, picked);
}

// rootElement.append(createUserCard(user));

// function loadImage(path) {
//   const newImage = new Image();
//   newImage.src = path;
//   return new Promise((resolve, reject) => {
//     newImage.addEventListener("load", () => {
//       resolve(newImage);
//     });
//     newImage.addEventListener("error", () => {
//       reject(new Error("path invalid"));
//     });
//   });
// }
