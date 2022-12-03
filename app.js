/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createTodo } from './fetch-utils.js';

/* Get DOM Elements */

const todosForm = document.getElementById('todos-form');
const errorDisplay = document.getElementById('error-display');
/* State */
let error = null;
/* Events */

todosForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(todosForm);
    const description = formData.get('description');
    await createTodo(description);

    todosForm.reset();
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
