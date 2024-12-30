export async function initModal() {
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modal");
  const modalCard = document.querySelector(".modal__card");
  const body = document.body;

  let scrollPosition = 0;

  try {
    const response = await fetch("./js/modules/gifts.json");
    if (!response.ok) throw new Error("Failed to load cards data");

    const cardsData = await response.json();

    document.addEventListener("click", (event) => {
      const cardItem = event.target.closest(".card-item");

      if (cardItem && !cardItem.classList.contains("modal__card")) {
        const cardName = cardItem.getAttribute("data-card-name");
        const cardData = cardsData.find((card) => card.name === cardName);

        if (cardData) {
          clearModalContent();
          updateModalContent(cardData);
          openModal();
        }
      }
    });
  } catch (error) {
    console.error("Error loading cards data:", error);
  }

  function clearModalContent() {
    const textElement = modalCard.querySelector(".card__text-modal");
    textElement.innerHTML = "";
  }

  function updateModalContent(cardData) {
    const imgElement = modalCard.querySelector(".card__img");
    const textElement = modalCard.querySelector(".card__text-modal");

    // Обновить изображение
    imgElement.className = `card__img card__img-work`;

    // Обновить текстовый контент
    textElement.innerHTML = `
        <h4 class="purple-work">${cardData.category}</h4>
        <h3>${cardData.name}</h3>
        <p class="description">${cardData.description}</p>
        <h4>Adds superpowers to:</h4>
        <div class="superpowers-item">
          <div class="superpowers-box">
            <p class="key key-live">Live</p>
            <p class="value value-live">${cardData.superpowers.live}</p>
            <div class="snow-box">
              <span class="snow snow-1"></span>
              <span class="snow snow-2"></span>
              <span class="snow snow-3"></span>
              <span class="snow snow-4"></span>
              <span class="snow snow-5"></span>
            </div>
          </div>
          <div class="superpowers-box">
            <p class="key key-create">Create</p>
            <p class="value value-create">${cardData.superpowers.create}</p>
            <div class="snow-box">
              <span class="snow snow-1"></span>
              <span class="snow snow-2"></span>
              <span class="snow snow-3"></span>
              <span class="snow snow-4"></span>
              <span class="snow snow-5"></span>
            </div>
          </div>
          <div class="superpowers-box">
            <p class="key key-love">Love</p>
            <p class="value value-love">${cardData.superpowers.love}</p>
            <div class="snow-box">
              <span class="snow snow-1"></span>
              <span class="snow snow-2"></span>
              <span class="snow snow-3"></span>
              <span class="snow snow-4"></span>
              <span class="snow snow-5"></span>
            </div>
          </div>
          <div class="superpowers-box">
            <p class="key key-dream">Dream</p>
            <p class="value value-dream">${cardData.superpowers.dream}</p>
            <div class="snow-box">
              <span class="snow snow-1"></span>
              <span class="snow snow-2"></span>
              <span class="snow snow-3"></span>
              <span class="snow snow-4"></span>
              <span class="snow snow-5"></span>
            </div>
          </div>
        </div>
    `;

    // Логика для изменения opacity снежинок
    updateSnowflakesOpacity(cardData.superpowers.live, "live");
    updateSnowflakesOpacity(cardData.superpowers.create, "create");
    updateSnowflakesOpacity(cardData.superpowers.love, "love");
    updateSnowflakesOpacity(cardData.superpowers.dream, "dream");
  }

  // Функция для изменения opacity снежинок в зависимости от значения
  function updateSnowflakesOpacity(value, type) {
    const valueNumber = parseInt(value.replace("+", "")); // Получить числовое значение (+500 -> 500)
    const snowflakes = document.querySelectorAll(
      `.value-${type} + .snow-box .snow`
    );

    // Определить видимое количество снежинок
    let visibleSnowflakes = 0;
    if (valueNumber >= 500) visibleSnowflakes = 5;
    else if (valueNumber >= 400) visibleSnowflakes = 4;
    else if (valueNumber >= 300) visibleSnowflakes = 3;
    else if (valueNumber >= 200) visibleSnowflakes = 2;
    else if (valueNumber >= 100) visibleSnowflakes = 1;

    // Обновить opacity снежинок
    snowflakes.forEach((snowflake, index) => {
      snowflake.style.opacity = index < visibleSnowflakes ? 1 : 0.1;
    });
  }

  function openModal() {
    // Сохранить текущую позицию скролла
    scrollPosition = window.scrollY;

    // Зафиксировать body
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.width = "100%";

    overlay.classList.add("open");
    modal.classList.add("open");
  }

  function closeModal() {
    overlay.classList.remove("open");
    modal.classList.remove("open");

    // Временно сохранить позицию скролла перед снятием фиксации
    const topOffset = Math.abs(parseInt(body.style.top, 10));

    // Убрать фиксированный стиль у body
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";

    // Восстановить скролл до сохранённой позиции
    window.scrollTo({
      top: topOffset,
      behavior: "instant",
    });
  }

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  modalCard.addEventListener("click", (event) => {
    if (event.target.classList.contains("close")) {
      closeModal();
    }
  });
}
