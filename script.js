function updateLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('completedList', JSON.stringify(completedList));
}

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
const completedList = JSON.parse(localStorage.getItem('completedList')) || [];

function loadFromLocalStorage() {
    if (todoList) {
        todoList.forEach(item => addItemToDOM(item, 'todoList'));
    }
    if (completedList) {
        completedList.forEach(item => addItemToDOM(item, 'completedList'));
    }
}
loadFromLocalStorage();

function addItemToDOM(item, listId) {
    const list = document.getElementById(listId);
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${item.name}:</strong> ${item.description} 
    <button onclick="completeItem(this)"><i class="fa-solid fa-check"></i></button>
    <button onclick="removeItem(this)"><i class="fa-solid fa-x"></i></button>`;
    list.appendChild(listItem);
}

function addItem() {
    const todoName = document.getElementById("todoName").value;
    const todoDescription = document.getElementById("todoDescription").value;

    if (todoName !== "" && todoDescription !== "") {
        const newItem = { name: todoName, description: todoDescription };
        todoList.push(newItem);
        updateLocalStorage();
        addItemToDOM(newItem, 'todoList');
        document.getElementById("todoName").value = "";
        document.getElementById("todoDescription").value = "";
    }
}

function completeItem(button) {
    const listItem = button.parentElement;
    const itemIndex = Array.from(listItem.parentElement.children).indexOf(listItem);
    const completedItem = todoList.splice(itemIndex, 1)[0];
    updateLocalStorage();
    listItem.removeChild(button); 
    listItem.removeChild(listItem.querySelector('button'));
    completedList.push(completedItem);
    updateLocalStorage();
    document.getElementById("completedList").appendChild(listItem);
}

function removeItem(button) {
    const listItem = button.parentElement;
    const itemIndex = Array.from(listItem.parentElement.children).indexOf(listItem);
    if (listItem.parentElement.id === "todoList") {
        todoList.splice(itemIndex, 1);
    } else {
        completedList.splice(itemIndex, 1);
    }
    updateLocalStorage();
    listItem.remove();
}