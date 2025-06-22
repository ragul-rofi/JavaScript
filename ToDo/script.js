// dom elements

const input = document.getElementById("todo-input");
const addbtn = document.getElementById("add-btn");
const todolist = document.getElementById("todo-list");

// load from localstorage on page load
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

// add new todo
addbtn.addEventListener("click",() => {
    const task = input.value.trim();
    if(task === "") return;

    todos.push(task);
    input.value = "";
    updateStorage();
    renderTodos();
});

// delete todo
function deleteTodo(index){
    todos.splice(index, 1);
    updateStorage();
    renderTodos();
}

// update local storage i.e updateStorage()
function updateStorage(index) {
    localStorage.setItem("todos",JSON.stringify(todos));
}


// display todo in dom i.e renderTodos()

function renderTodos(){
    todolist.innerHTML = "";

    todos.forEach((task,index) => {
        const li = document.createElement("li");

        li.innerHTML = `
        <span>${task}</span>
        <button class = "delete-btn" onclick="deleteTodo(${index})">Delete</button>
        `;

        todolist.appendChild(li);
    });
}