(function (window) {
	'use strict';

  // Your starting point. Enjoy the ride!
  const insertRoot = document.querySelector('.todo-list');
  const todoInput = document.querySelector('.new-todo');
  const toggleAll = document.querySelector('.toggle-all');
  const filters = document.querySelectorAll('.filter');
  const clearCompleted = document.querySelector('.clear-completed');

  let todos = [{
    id: 1,
    text: 'Todo 1',
    isDone: false
  }, {
    id: 2,
    text: 'Todo 2',
    isDone: true
  }];

  // `	<li class="completed">
  //     <div class="view">
  //       <input class="toggle" type="checkbox" checked />
  //       <label>Taste JavaScript</label>
  //       <button class="destroy"></button>
  //     </div>
  //     <input class="edit" value="Create a TodoMVC template" />
  //   </li>`;

  function todoTemplate({id, text, isDone}) {

    const li = document.createElement('li');
    li.className = isDone ? 'completed' : '';
    const view = document.createElement('div');
    view.className = 'view';
    const input = document.createElement('input');
    input.className = 'toggle';
    input.type = 'checkbox';
    input.checked = isDone;

    input.addEventListener('change', (evt) => {
      li.classList.toggle('completed');
      todos = todos.map(el => {
        if (el.id === id) el.isDone = evt.target.checked;
        return el;
      });
      renderTodo();
    });


    const button = document.createElement('button');
    button.className = 'destroy';
    button.addEventListener('click', () => {
      todos = todos.filter(e => e.id !== id);
      renderTodo();
    });

    const editInput = document.createElement('input');
    editInput.className = 'edit';
    editInput.value = text;
    editInput.addEventListener('keyup', (evt) => {
      if (evt.key !== 'Enter') return;
      todos = todos.map(el => {
        if (el.id === id) el.text = evt.target.value;
        return el;
      });
      renderTodo();
    });
    editInput.addEventListener('blur', () => {
      li.classList.remove('editing');
    });

    const label = document.createElement('label');
    label.innerText = text;
    label.addEventListener('click', (evt) => {
      li.classList.toggle('editing');
      editInput.focus();
      // evt.target.parentNode.nextSibling.focus();
    });

    li.appendChild(view);
    view.appendChild(input);
    view.appendChild(label);
    view.appendChild(button);
    li.appendChild(editInput);

    return li;

  }


  // render todo to view
  function renderTodo() {

    renderView(todos);
    let todoLength = todos.reduce((accu, value) => {
      return ((!value.isDone) ? accu += 1 : accu, accu);
    }, 0);
    document.querySelector('.todo-count strong').textContent = todoLength;
    clearCompleted.style.display = (todos.length) ? 'block' : 'none';

  }

  function renderView(todos) {
    while (insertRoot.firstChild) {
      insertRoot.firstChild.remove();
    }
    todos.forEach(el => {
      insertRoot.appendChild(todoTemplate(el));
    });
  }
  

  renderTodo(); // init render

  // event listener
  todoInput.addEventListener('keyup', (evt) => {
    if (evt.key !== 'Enter') return;
    if (evt.target.value.trim() === '') return;

    //create a new object of todo;
    let todo = {
      id: todos.length + 1,
      text: evt.target.value,
      isDone: false,
    };

    todos.push(todo);
    renderTodo();

    evt.target.value = '';

  });

  // document.addEventListener('click', (evt) => {
  //   if (evt.target.className === 'edit' || evt.target.tagName == 'LABEL') return;
  //   document.querySelectorAll('.editing').forEach( el => el.classList.remove('editing'));
  // });

  toggleAll.addEventListener('click', (evt) => {
    todos = todos.map(el => {
      el.isDone = evt.target.checked;
      return el;
    });
    renderTodo();
  });

  clearCompleted.addEventListener('click', () => {
    todos = todos.filter(el => !el.isDone);
    renderTodo();
  });



  filters.forEach(el => {
    el.addEventListener('click', (evt) => {
      evt.preventDefault();
      filters.forEach(el => el.classList.remove('selected'));
      evt.target.classList.add('selected');
      let id = evt.target.dataset.id;

      // renderView 
      if (id === 'all') {
        renderView(todos);
        return;
      }

      let filteredTodo = todos.filter(el => {
        return (id === 'active') ? !el.isDone : el.isDone;
      });

      renderView(filteredTodo);

    });
  });
  

})(window);
