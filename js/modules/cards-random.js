import { isCurrentPage } from "./utils.js";
import { createCardElement } from "./utils.js";

export async function initRandomCards() {
  if (!isCurrentPage("home-page")) return;

  const container = document.querySelector(".best__cards");
  if (!container) {
    console.error("Cards container not found");
    return;
  }

  try {
    // Загрузить JSON
    const response = await fetch("./js/modules/gifts.json");
    if (!response.ok) throw new Error("Failed to load cards data");

    const cardsData = await response.json();

    // Получить 4 случайных карточки
    const randomCards = getRandomItems(cardsData, 4);

    // Очистить контейнер
    container.innerHTML = "";

    // Сгенерировать и добавить карточки
    randomCards.forEach((card) => {
      const cardElement = createCardElement(card);
      container.appendChild(cardElement);
    });
  } catch (error) {
    console.error("Error loading random cards:", error);
  }
}

// Выбрать случайные элементы из массива
function getRandomItems(array, count) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Перемешать массив
  }
  return array.slice(0, count); // Вернуть первые count элементов
}
