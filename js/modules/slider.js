import { isCurrentPage } from "./utils.js";

export const initSlider = (sliderSelector) => {
    if (!isCurrentPage("home-page")) return;

    const slider = document.querySelector(sliderSelector);
    const sliderItem = slider.querySelector(".slider-item");

    const leftBtn = slider.querySelector(".slide__btn-left");
    const rightBtn = slider.querySelector(".slide__btn-right");

    let currentIndex = 0;
    let stepsCount = 0;
    let stepDistance = 0;

    // Рассчитать шаги и смещение
    const calculateSteps = () => {
        const totalWidth = sliderItem.scrollWidth;
        const visibleWidth = slider.offsetWidth;

        const screenWidth = window.innerWidth;

        if (screenWidth > 768) {
            stepsCount = 4; // 3 (+1)
        } else {
            stepsCount = 7; // 6 (+1)
        }

        // Рассчитать расстояние за шаг
        stepDistance = (totalWidth - visibleWidth) / (stepsCount - 1);

        // Сбросить при изменении ширины
        resetSlider();
    };

    // Сбросить слайдер
    const resetSlider = () => {
        currentIndex = 0;
        sliderItem.style.transform = `translateX(0px)`;
        sliderItem.style.transition = "none";
        updateButtons();
    };

    // Обновить состояние кнопок
    const updateButtons = () => {
        leftBtn.classList.toggle("slide__btn-inactive", currentIndex === 0);
        leftBtn.classList.toggle("slide__btn-active", currentIndex > 0);

        rightBtn.classList.toggle(
            "slide__btn-inactive",
            currentIndex === stepsCount - 1
        );
        rightBtn.classList.toggle(
            "slide__btn-active",
            currentIndex < stepsCount - 1
        );
    };

    // Перемещение слайдера
    const moveSlider = (direction) => {
        currentIndex += direction;
        currentIndex = Math.max(0, Math.min(currentIndex, stepsCount - 1)); // Ограничить шаги в диапазоне [0, stepsCount-1]

        const offset = -(currentIndex * stepDistance); // Смещение в рх
        sliderItem.style.transform = `translateX(${offset}px)`;
        sliderItem.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)"; 

        updateButtons();
    };

    // Навесить обработчики событий
    leftBtn.addEventListener("click", () => moveSlider(-1));
    rightBtn.addEventListener("click", () => moveSlider(1));

    window.addEventListener("resize", calculateSteps);

    calculateSteps();
};
