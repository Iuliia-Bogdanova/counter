import { isCurrentPage } from "./utils.js";
import { createCardElement } from "./utils.js";

export async function initCategory() {
  if (!isCurrentPage("gifts-page")) return;

  const container = document.querySelector(".gifts__cards");
  const tabs = document.querySelectorAll(".tabs .tab");

  if (!container || !tabs) {
    console.error("Cards container or tabs not found");
    return;
  }

  try {
    // Загрузить JSON
    const response = await fetch("./js/modules/gifts.json");
    if (!response.ok) throw new Error("Failed to load cards data");

    const cardsData = await response.json();

    // Фильтровать карточки по категории
    function filterCards(category) {
      if (category === "all") return cardsData;
      const normalizedCategory = `For ${capitalize(category)}`;
      return cardsData.filter((card) => card.category === normalizedCategory);
    }

    // Генерировать карточки в контейнер
    function renderCards(filteredCards) {
      container.innerHTML = ""; // Очистить контейнер
      filteredCards.forEach((card) => {
        const cardElement = createCardElement(card);
        container.appendChild(cardElement);
      });
    }

    // Переключить активный таб
    function switchTab(category) {
      tabs.forEach((tab) => {
        tab.setAttribute("aria-selected", "false");
        tab.classList.remove("active", "tab-active");
      });

      const activeTab = document.querySelector(
        `.tab[data-category="${category}"]`
      );
      if (activeTab) {
        activeTab.setAttribute("aria-selected", "true");
        activeTab.classList.add("active", "tab-active");
      }
    }

    // Обработать клики
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const selectedCategory = tab.dataset.category;

        // Переключить активный таб
        switchTab(selectedCategory);

        // Отфильтровать и отрендерить карточки
        const filteredCards = filterCards(selectedCategory);
        renderCards(shuffleArray(filteredCards)); // Перемешать карточки
      });
    });

    // Отображать "All" по умолчанию
    renderCards(shuffleArray(cardsData));
    switchTab("all");
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

// Утилита: Перемешать массив
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

// Утилита: Преобразование строки к формату "work" -> "Work"
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
