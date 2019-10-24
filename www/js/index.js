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
            /**
             * @param {Object} Todo object
             * @description create the div that contains the infomartion of the todo
             */
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
            /**
             * @param {Number} id - id of the todo
             * @description delete the todo from the ui by his id.
             */
            destroyTodoItem: (id) => {
                $(document).find(`.todo-item[data-key="${id}"]`).remove();
            }
        }
    },
    /**
     * 
     * @param {String} text 
     * @description Add the todo item to our db/localstorage depend on our flatrom 
     * with the help of our cordova plugin
     */
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
    /**
     * 
     * @param {Number} id 
     * @description remove todo item by his id from our db/localstorage
     * with the help of our cordova plugin
     */
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
        /**
     * 
     * @param {Number} id 
     * @description update todo item checked/not checked by his id from our db/localstorage
     * with the help of our cordova plugin
     */
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
    /**
     * @description clear the text input
     */
    clearTodoInput ()
    {
        $('.js-todo-input').val('');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        // Rendering all the existing todos (with the help of our cordova plugin)
        window.cordova.plugins.TodoManagement.get((todos) => {
            todos.forEach(todo => {
                app.todoDOM().renderTodoItem(todo); 
            });
        });

        // when you click on add todo btn - its adds the todo
        $(document).on('click', '.add-todo-btn', () => {
            const text = $('.js-todo-input').val();
            app.addTodoItem(text);
            app.clearTodoInput();
        })

        // When you click on the checkbox of the todo it toggles it's status.
        $(document).on('click', '.js-tick', function() {
            let id = $(this).parent('.todo-item').attr('data-key');
            id = Number(id);
            app.toggleTodoStatus(id);
        });

        // When you click on the remove - you remove the todo
        $(document).on('click', '.js-delete-todo', function() {
            let id = $(this).parent('.todo-item').attr('data-key');
            id = Number(id);
            app.removeTodoItem(id);
        })
    }
};
