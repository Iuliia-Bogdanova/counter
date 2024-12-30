export function initBurgerMenu() {
    const burgerMenu = document.querySelector(".burger-menu");
    const menuList = document.querySelector(".menu__list");
    const logo = document.querySelector(".header-item__logo");
    const links = document.querySelectorAll(".menu__list .menu__link");

    if (!burgerMenu || !menuList || !logo || links.length === 0) {
        console.error("Burger menu elements are missing in the DOM.");
        return;
    }

    let scrollPosition = 0;

    // Открыть/закрыть меню по клику на бургер-меню
    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("active");
        menuList.classList.toggle("active");

        if (menuList.classList.contains("active")) {
            // Сохранить текущую позицию и зафиксировать body
            scrollPosition = window.scrollY;
            document.body.style.top = `-${scrollPosition}px`;
            document.body.classList.add("no-scroll");
        } else {
            // Восстановить прокрутку
            document.body.classList.remove("no-scroll");
            document.body.style.top = "";
            window.scrollTo(0, scrollPosition);
        }
    });

    // Закрыть меню по клику на ссылки (с задержкой)
    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Отменить стандартное действие ссылки

            burgerMenu.classList.remove("active");
            menuList.classList.remove("active");
            document.body.classList.remove("no-scroll");
            document.body.style.top = "";
            window.scrollTo(0, scrollPosition);

            setTimeout(() => {
                window.location.href = link.href;
            }, 400);
        });
    });

    // Закрыть меню по клику на логотип (с задержкой)
    logo.addEventListener("click", (event) => {
        event.preventDefault();

        burgerMenu.classList.remove("active");
        menuList.classList.remove("active");
        document.body.classList.remove("no-scroll");
        document.body.style.top = "";
        window.scrollTo(0, scrollPosition);

        setTimeout(() => {
            window.location.href = logo.href || "/";
        }, 400);
    });
}


