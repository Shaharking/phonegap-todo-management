/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    todoDOM()
    {
        return {
            renderTodoItem: (todo) => {
                $(document).find('.js-todo-list').append(`
                    <li class="todo-item ${todo.checked ? "done" : ""}" data-key="${todo.id}">
                        <input id="${todo.id}" type="checkbox"/>
                        <label for="${todo.id}" class="tick js-tick"></label>
                        <span>${todo.label}</span>
                        <button class="delete-todo js-delete-todo">
                        <svg><use href="#delete-icon"></use></svg>
                        </button>
                    </li>
                `);
            },
            destroyTodoItem: (id) => {
                $(document).find(`.todo-item[data-key="${id}"]`).remove();
            }
        }
    },
    addTodoItem (text) {
        const todo = {
            label: text,
            id: Number(new Date()),
            checked: false
        }
        window.cordova.plugins.TodoManagement.post((success) => {
            app.todoDOM().renderTodoItem(todo);
        }, (err) => {
            console.error(err);
        }, [todo]);
    },
    removeTodoItem(id)
    {
        window.cordova.plugins.TodoManagement.delete((success) => {
            app.todoDOM().destroyTodoItem(id);
        }, (err) => {
            console.log(err);
        }, [{
            id
        }]);
    },
    toggleTodoStatus (id)
    {
        window.cordova.plugins.TodoManagement.getById(todoItem => {
            todoItem.checked = !todoItem.checked;
            window.cordova.plugins.TodoManagement.put((success) => {
                app.todoDOM().destroyTodoItem(id);
                app.todoDOM().renderTodoItem(todoItem);
            }, err => console.error(err), [todoItem]);
        }, (err) => {
            console.error(err);
        }, [{
            id
        }]);

    },
    clearTodoInput ()
    {
        $('.js-todo-input').val('');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        window.cordova.plugins.TodoManagement.get((todos) => {
            todos.forEach(todo => {
                app.todoDOM().renderTodoItem(todo); 
            });
        });

        $(document).on('click', '.add-todo-btn', () => {
            const text = $('.js-todo-input').val();
            app.addTodoItem(text);
            app.clearTodoInput();
        })

        $(document).on('click', '.js-tick', function() {
            let id = $(this).parent('.todo-item').attr('data-key');
            id = Number(id);
            app.toggleTodoStatus(id);
        });

        $(document).on('click', '.js-delete-todo', function() {
            let id = $(this).parent('.todo-item').attr('data-key');
            id = Number(id);
            app.removeTodoItem(id);
        })
    }
};
