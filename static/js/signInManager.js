import {domManager} from "./domManager.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {dataHandler} from "./dataHandler.js";

const submitForm = async function (element) {
    element.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const response = await dataHandler.register(email, password);
    console.log(response);
    if (response.message === 'Ok') {
        closeModal();
        await dataHandler.login(email, password);
        window.location.replace(window.location);

    } else {
        document.querySelector('.msg').innerText = response.message;
        element.target.reset();
    }
}

export const signInManager = {
    addEventListener: async function () {
        const signInModalBuilder = htmlFactory(htmlTemplates.signIn);
        domManager.addChild('#root', signInModalBuilder());
        domManager.addEventListener('#signIn', "click", showModal);
        domManager.addEventListener('#closeSignInModal', "click", closeModal);
        domManager.addEventListener('#signInForm', "submit", submitForm);
    }
}

const showModal = function () {
    const modal = document.getElementById("signInModal");
    modal.style.display = "block";
}

const closeModal = function () {
    const modal = document.getElementById("signInModal");
    modal.style.display = "none";
}
