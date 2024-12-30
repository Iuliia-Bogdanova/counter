import { initBurgerMenu } from "./modules/burger.js";
import { initModal } from "./modules/modal.js";
import { initSlider } from "./modules/slider.js";
import { initRandomCards } from "./modules/cards-random.js";
import { initTimer } from "./modules/timer.js";
import { initCategory } from "./modules/cards-category.js";
import { initArrowUp } from "./modules/arrow-up.js";



document.addEventListener("DOMContentLoaded", () => {
    initBurgerMenu();
    initModal();
    initSlider(".slider__wrap");
    initRandomCards();
    initTimer();
    initCategory();
    initArrowUp();
});
