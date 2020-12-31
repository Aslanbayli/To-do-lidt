//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo)


//Functions
function addTodo(event){
    //prevent refreshing when clicking button
    event.preventDefault();

   //create todo div
   const todoDiv = document.createElement('div');
   todoDiv.classList.add('todo');

   //create li
   const newTodo = document.createElement('li');
   newTodo.innerText=todoInput.value;
   newTodo.classList.add('todo-item');
   todoDiv.appendChild(newTodo);
   
   //Add todo to localstorage
   saveLocalTodos(todoInput.value);

   //check mark button
   const completedButton = document.createElement('button');
   completedButton.innerHTML = '<i class = "fas fa-check"><i/>';
   completedButton.classList.add('complete-button');
   todoDiv.appendChild(completedButton);

   //trash   button
   const trashButton = document.createElement('button');
   trashButton.innerHTML = '<i class = "fas fa-trash"><i/>';
   trashButton.classList.add('trash-button');
   todoDiv.appendChild(trashButton);

   //append to list
   todoList.appendChild(todoDiv);

   //clear input
   todoInput.value = "";
    
}

function deleteCheck(event2){
    const item = event2.target;
    //delete todo
    if(item.classList[0] === 'trash-button'){
         const todo = item.parentElement;
         //animation
         todo.classList.add('fall');
         removeLocalTodos(todo);
         //wait for animation to end
         todo.addEventListener('transitionend', function(){
            todo.remove();
         });
    }
    //check mark
    if(item.classList[0] === 'complete-button'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterToDo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
                
        }
    });
}

function saveLocalTodos(todo){
    //check---do I already have something in there?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        
        //create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        

        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"><i/>';
        completedButton.classList.add('complete-button');
        todoDiv.appendChild(completedButton);

        //trash   button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"><i/>';
        trashButton.classList.add('trash-button');
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

