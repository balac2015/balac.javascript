import Vue from 'vue';

// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~120 effective lines of JavaScript.

// localStorage persistence
var STORAGE_KEY = 'todos-vuejs-2.0';
var todoStorage = {
    fetch () {
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todos.forEach((todo, index) => {
            todo.id = index;
        });
        todoStorage.uid = todos.length

        return todos;
    },
    save (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};

// visibility filters
var filters = {
    all (todos) {
        return todos;
    },
    active (todos) {
        return todos.filter(todo => !todo.completed);
    },
    completed (todos) {
        return todos.filter(todo => todo.completed);
    }
};

// app Vue instance
var app = new Vue({
    // app initial state
    data () {
        return {
            todos: todoStorage.fetch(),
            newTodo: '',
            editedTodo: null,
            visibility: 'all'
        };
    },
    // watch todos change for localStorage persistence
    watch: {
        todos: {
            handler (todos) {
                todoStorage.save(todos);
            },
            deep: true
        }
    },
    // computed properties
    computed: {
        filteredTodos () {
            return filters[this.visibility](this.todos);
        },
        remaining () {
            return filters.active(this.todos).length;
        },
        allDone: {
            get () {
                return this.remaining === 0;
            },
            set (value) {
                this.todos.forEach((todo) => {
                    todo.completed = value;
                });
            }
        }
    },
    filters: {
        pluralize (n) {
            return n === 1 ? 'item' : 'items';
        }
    },
    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
        addTodo () {
            var value = this.newTodo && this.newTodo.trim();

            if (!value) {
                return;
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: value,
                completed: false
            });
            this.newTodo = '';
        },
        removeTodo (todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
        },
        editTodo (todo) {
            this.beforeEditCache = todo.title;
            this.editTodo = todo;
        },
        doneEdit (todo) {
            if (!this.editedTodo) {
                return;
            }
            this.editedTodo = null;
            todo.title = todo.title.trim();
            if (!todo.title) {
                this.removeTodo(todo);
            }
        },
        cancelEdit (todo) {
            this.editedTodo = null;
            todo.title = this.beforeEditCache;
        },
        removeCompleted () {
            this.todos = filters.active(this.todos);
        }
    },
    directives: {
        'todo-focus' (el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    }
});

// handle routing
function onHashChange () {
    var visibility = window.location.hash.replace(/#\/?/, '');

    if (filters[visibility]) {
        app.visibility = visibility;
    } else {
        window.location.hash = '';
        app.visibility = 'all';
    }
}
window.addEventListener('hashchange', onHashChange);
onHashChange();

// mount
app.$mount('.todoapp');