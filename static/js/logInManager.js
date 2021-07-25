import {domManager} from "./domManager.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {dataHandler} from "./dataHandler.js";

const submitForm = async function (element) {
    element.preventDefault()
    let email = document.getElementById('login_email').value
    let password = document.getElementById('login_password').value

    const response = await dataHandler.login(email, password)
    console.log(response)
    if (response.message === 'Ok') {
        closeModal();
        window.location.replace(window.location)
    } else {
        document.getElementById('login_password').value = ''
        document.getElementById('login_message_div').innerText = response.message
    }
}

export const logInManager = {
    addEventListener: async function () {
        const logInModalBuilder = htmlFactory(htmlTemplates.logIn);
        domManager.addChild('#root', logInModalBuilder());
        domManager.addEventListener('#login', "click", showModal);
        domManager.addEventListener('#closeLogInModal', "click", closeModal);
        domManager.addEventListener('#login_login', "click", submitForm);
        domManager.addEventListener('#logout', "click", logout);
    }
}

const showModal = function () {
    const modal = document.getElementById("logInModal");
    modal.style.display = "block";
}

const closeModal = function () {
    const modal = document.getElementById("logInModal");
    modal.style.display = "none";
}

const logout = async function () {
    await dataHandler.logout()
    window.location.href= '/';
}
