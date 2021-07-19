import {domManager} from "./domManager.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {dataHandler} from "./dataHandler.js";

const submitForm = async function(element){
    element.preventDefault()

    const formData = new FormData(element.target);

        for (let value of formData.values()) {
        console.log(value);
        }

    const response = await dataHandler.signIn(formData)
    if (response.status == 200) {
        console.log('tu bedzie redirect')}
    else {
        document.querySelector('.msg').innerText = response.message
        element.target.reset()
    }
}

export const signInManager = {
    addEventListener: async function() {
        const signInModalBuilder = htmlFactory(htmlTemplates.signIn);
        domManager.addChild('#root',signInModalBuilder());
        domManager.addEventListener('#sign_in', "click", showModal);
        domManager.addEventListener('.close', "click", closeModal);
        domManager.addEventListener('#signInForm', "submit", submitForm);
    }
}

const showModal = function() {
    const modal = document.getElementById("signInModal");
    modal.style.display = "block";
}

const closeModal = function() {
    const modal = document.getElementById("signInModal");
    modal.style.display = "none";
}