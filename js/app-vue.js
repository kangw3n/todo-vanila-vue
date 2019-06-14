/* eslint-disable no-undef */
(function() {
  'use strict';

  var app = new Vue({
    el: '#app',
    data: {
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
      }
    },
    methods: {
      toggleAll() {


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