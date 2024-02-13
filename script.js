document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const allFilter = document.getElementById('all');
    const completedFilter = document.getElementById('completed');
    const incompleteFilter = document.getElementById('incomplete');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }


    function addTodo() {
        const text = todoInput.value.trim();
        if (text !== '') {
            todos.push({ text: text, completed: false });
            todoInput.value = '';
            renderTodos();
            saveTodos();
        }
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
        saveTodos();
    }

    function toggleTodoComplete(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
        saveTodos();
    }



    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(function (todo, index) {
            const li = document.createElement('li');


            const span = document.createElement('span');
            span.textContent = todo.text;
            span.style.overflow = 'hidden';
            span.style.whiteSpace = 'nowrap';
            span.style.textOverflow = 'ellipsis';


            const completeButton = document.createElement('button');
            completeButton.textContent = todo.completed ? 'Incomplete' : 'Complete';
            completeButton.addEventListener('click', function (event) {
                event.stopPropagation();
                toggleTodoComplete(index);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function (event) {
                event.stopPropagation();
                deleteTodo(index);
            });

            li.appendChild(span); 
            li.appendChild(completeButton);
            li.appendChild(deleteButton);

            if (todo.completed) {
                li.classList.add('completed');
            }

            

            todoList.appendChild(li);
        });
    }

    function filterTodos(filter) {
        const filteredTodos = todos.filter(function (todo) {
            if (filter === 'completed') {
                return todo.completed;
            } else if (filter === 'incomplete') {
                return !todo.completed;
            } else {
                return true;
            }
        });

        todoList.innerHTML = '';
        filteredTodos.forEach(function (todo, index) {
            const li = document.createElement('li');

            const span = document.createElement('span');
            span.textContent = todo.text;
            span.style.overflow = 'hidden';
            span.style.whiteSpace = 'nowrap';
            span.style.textOverflow = 'ellipsis';

            const completeButton = document.createElement('button');
            completeButton.textContent = todo.completed ? 'Incomplete' : 'Complete';
            completeButton.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent li click event from triggering
                toggleTodoComplete(index);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent li click event from triggering
                deleteTodo(index);
            });

            li.appendChild(span);
            li.appendChild(completeButton);
            li.appendChild(deleteButton);

            if (todo.completed) {
                li.classList.add('completed');
            }

            li.addEventListener('click', function () {
                toggleTodoComplete(index);
            });

            todoList.appendChild(li);
        });
    }



    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTodo();
    });

    allFilter.addEventListener('click', function () {
        filterTodos('all');
    });

    completedFilter.addEventListener('click', function () {
        filterTodos('completed');
    });

    incompleteFilter.addEventListener('click', function () {
        filterTodos('incomplete');
    });

    renderTodos();
});
