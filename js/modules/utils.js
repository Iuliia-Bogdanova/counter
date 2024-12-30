// 1. Проверить текущую страницу
export function isCurrentPage(pageId) {
    // console.log("Current page:", document.body.id);
    return document.body.id === pageId;
}

// 2. Динамически генерировать карточки
// export function createCardElement(card) {
//     const cardItem = document.createElement("div");
//     cardItem.classList.add("card-item");

//     // Карта соответствия категории и класса фона
//     const categoryToClass = {
//         "For Work": "card__img-work",
//         "For Harmony": "card__img-harmony",
//         "For Health": "card__img-health",
//     };
//     const backgroundClass = categoryToClass[card.category] || "card__img-default";

//     // Карта соответствия категории и класса заголовка
//     const categoryToTitleClass = {
//         "For Work": "purple-work",
//         "For Harmony": "pink-harmony",
//         "For Health": "green-health",
//     };
//     const titleClass = categoryToTitleClass[card.category] || "default-title";

//     // Генерация HTML карточки
//     cardItem.innerHTML = `
//         <div class="card__img ${backgroundClass}"></div>
//         <div class="card__text">
//         <h4 class="${titleClass}">${card.category}</h4>
//         <h3>${card.name}</h3>
//         </div>
//     `;

//     return cardItem;
// }




export function createCardElement(card) {
  const cardItem = document.createElement("div");
  cardItem.classList.add("card-item");

  // Карта соответствия категории и класса фона
  const categoryToClass = {
    "For Work": "card__img-work",
    "For Harmony": "card__img-harmony",
    "For Health": "card__img-health",
  };
  const backgroundClass = categoryToClass[card.category] || "card__img-default";

  // Карта соответствия категории и класса заголовка
  const categoryToTitleClass = {
    "For Work": "purple-work",
    "For Harmony": "pink-harmony",
    "For Health": "green-health",
  };
  const titleClass = categoryToTitleClass[card.category] || "default-title";

  // Добавляем data-атрибут для связи с JSON
  cardItem.setAttribute("data-card-name", card.name);

  // Генерация HTML карточки
  cardItem.innerHTML = `
        <div class="card__img ${backgroundClass}"></div>
        <div class="card__text">
            <h4 class="${titleClass}">${card.category}</h4>
            <h3>${card.name}</h3>
        </div>
    `;

  return cardItem;
}
