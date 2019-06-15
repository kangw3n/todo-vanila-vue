/* eslint-disable no-undef */
(function() {
  'use strict';

  var app = new Vue({
    el: '#app',
    data: {
      filterOptions: ['all', 'active', 'completed'],
      filtered: 'all',
      task: '',
      todos: [{
        id: 1,
        text: 'Todo 1',
        isDone: false,
        isEdit: false,

      }, {
        id: 2,
        text: 'Todo 2',
        isDone: true,
        isEdit: false,
      }]
    },
    computed: {
      countTaskIsDone() {
        return this.todos.filter(el => !el.isDone).length;
      },
      filteredTodo() {
        let filter = this.filtered;
        let todos = Object.assign([], this.todos);
        if (filter === 'completed') {
          todos = todos.filter(el => el.isDone);
        }
        if (filter === 'active') {
          todos = todos.filter(el => !el.isDone);
        }
        return todos; 
      }
    },
    methods: {
      toggleEdit(todo, index) {
        todo.isEdit = true;
        console.log(this.$refs['edit' + index][0]);
        this.$refs['edit' + index][0].focus();
      },
      clearCompleted() {
        this.todos = this.todos.filter(el => !el.isDone);
      },
      filterTodo(option, evt) {
        evt.preventDefault();
        this.filtered = option;
      },
      toggleAll(evt) {
        this.todos = this.todos.map(el => (el.isDone = evt.target.checked ,el));
      },
      deleteTodo(id) {
        this.todos = this.todos.filter(el => el.id !== id);
      },
      addTodo() {
        this.todos = [...this.todos, {
          id: this.todos.length + 1,
          text: this.task,
          isDone: false,
          isEdit: false,
        }];

        this.task = '';
      },
      editTodo(id, evnt) {
        this.todos = this.todos.map((el) => {
          if (el.id === id) {
            el.text = evnt.target.value;
            el.isEdit = false;
          }
           return el;
        });
      }
    }
  });

}());