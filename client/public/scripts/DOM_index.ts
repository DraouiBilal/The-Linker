const handleIndexPageDOM = (styles: { readonly [key: string]: string }) => {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
        `.${styles.inputField}`
    );
    const toggle_btn: NodeListOf<HTMLHeadingElement> =
        document.querySelectorAll(`.${styles.toggle}`);
    const main = document.querySelector(`main`)!;
    const bullets: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
        `.${styles.bullets} span`
    );
    const images = document.querySelectorAll(`.${styles.image}`);

    inputs.forEach((inp) => {
        inp.onfocus = () => {
            inp.classList.add(`${styles.active}`);
        };
        inp.onblur = () => {
            if (inp.value != "") return;
            inp.classList.remove(`${styles.active}`);
        };
    });
    toggle_btn.forEach((btn) => {
        btn.onclick = () => {
            main.classList.toggle(`${styles.signUpMode}`);
            if (btn.innerText == "Sign up") {
                document.title = "The-Linker | Sign Up";
            } else {
                document.title = "The-Linker | Sign In";
            }
        };
    });
    function moveSlider(this: any) {
        let index = this.dataset.value;
        let className: string;
        switch (index) {
            case "1":
                className = `${styles.img1}`;
                break;
            case "2":
                className = `${styles.img2}`;
                break;
            default:
                className = `${styles.img3}`;
        }
        let currentImage = document.querySelector(className)!;
        images.forEach((img) => img.classList.remove(`${styles.show}`));
        currentImage.classList.add(`${styles.show}`);

        const textSlider: HTMLDivElement = document.querySelector(
            `.${styles.textGroup}`
        )!;
        textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

        bullets.forEach((bull) => bull.classList.remove(`${styles.active}`));
        this.classList.add(`${styles.active}`);
    }

    bullets.forEach((bullet) => {
        bullet.onclick = moveSlider;
    });
};

export default handleIndexPageDOM;
