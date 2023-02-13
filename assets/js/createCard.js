function createActorCard(actor) {
  return createElement(
    "li",
    {
      classNames: ["cardWrap"],
    },
    createElement(
      "article",
      { classNames: ["card"] },
      createElement(
        "div",
        { classNames: ["cardImageWrapper"] },
        createElement(
          "div",
          {
            classNames: ["initials"],
            styles: { backgroundColor: stringToColour(actor.name) },
          },
          getInitials(actor.name)
        ),
        createElement("img", {
          classNames: ["cardAvatar"],
          attributes: { src: actor.photo, alt: actor.name, hidden: true },
          listeners: { error: handleImageError, load: handleImageLoad },
        })
      ),
      createElement("h2", { classNames: ["cardName", "oneLine"] }, actor.name),
      createElement(
        "p",
        { classNames: ["cardDescription", "oneLine"] },
        actor.birthdate
      )
    )
  );
}

const cardsContainer = document.getElementById("cardsContainer");
const cardsHTML = actors
  .filter((actor) => actor.name && actor.birthdate && actor.photo)
  .map((actor) => createActorCard(actor));

cardsContainer.append(...cardsHTML);
