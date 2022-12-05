/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { checkOffTodo, createTodo, fetchTodos } from './fetch-utils.js';

/* Get DOM Elements */

const todosForm = document.getElementById('todos-form');
const errorDisplay = document.getElementById('error-display');
const todosList = document.getElementById('todos-list');

/* State */
let error = null;
let todos = [];
/* Events */

window.addEventListener('load', () => {
    displayTodos();
});

todosForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(todosForm);
    const description = formData.get('description');
    await createTodo(description);

    todosForm.reset();
    await displayTodos();
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

async function displayTodos() {
    const todos = await fetchTodos();
    todosList.innerHTML = '';
    for (let todo of todos) {
        const div = document.createElement('li');
        if (todo.completed) {
            div.classList.add('completed');
        }
        const p = document.createElement('p');
        p.textContent = todo.description;
        div.append(p);
        todosList.append(div);

        div.addEventListener('click', async () => {
            console.log('todo!', todo);
            await checkOffTodo(todo.id, todo.completed);
            await displayTodos();
        });
    }
}
