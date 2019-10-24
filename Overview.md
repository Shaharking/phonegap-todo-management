# Code overview

## HTML
```HTML
<div class="app">
        <div class="container">
            <h1 class="app-title">Todos</h1>
            <ul class="todo-list js-todo-list"></ul>
        
            <div class="js-form">
                <div class="todo-input-container">
                  <input autofocus type="text" aria-label="Enter a new todo item" placeholder="E.g. Open a startup" class="js-todo-input">
                </div>
                <div class="todo-btn-container">
                  <button class="add-todo-btn" data-theme="d" data-textonly="false" data-textvisible="false" data-msgtext="" data-inline="true"> Add Todo </button>
                </div>              
            </form>
          </div>
    </div>
    <svg>
      <defs>
          <symbol id="delete-icon" viewBox="0 0 612 612">
                <g id="cross">
                        <g>
                            <polygon points="612,36.004 576.521,0.603 306,270.608 35.478,0.603 0,36.004 270.522,306.011 0,575.997 35.478,611.397 
                                306,341.411 576.521,611.397 612,575.997 341.459,306.011 			"/>
                        </g>
                    </g>
          </symbol>
      </defs>
    </svg>
```

## Css
```css
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

 html {
    box-sizing: border-box;
  }
  
  *, *::before, *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  
  body {
   font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
   line-height: 1.4;
  }
  
  .container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding-left: 10px;
    padding-right: 10px;
    color: #e3e3e3;
    height: 90vh;
    margin-top: 5vh;
    margin-bottom: 5vh;
    overflow-y: auto;
  }
  
  .app-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 80px;
    opacity: 0.5;
  }
  
  svg {
    width: 64px;
    height: 64px;
  }
  
  .todo-list {
    list-style: none;
    margin-bottom: 20px;
  }
  
  .todo-item {
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .todo-item span {
    flex-grow: 1;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 22px;
  }
  
  .done span {
    text-decoration: line-through;
  }
  
  input[type="checkbox"] {
    display: none;
  }
  
  .tick {
    width: 30px;
    height: 30px;
    border: 3px solid #333;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 !important;
  }
  
  .todo-item.done .tick {
    background: green;
  }
  .todo-item.done span {
    text-decoration: line-through;
  }
  
  .delete-todo {
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }
  
  .delete-todo svg {
    width: 30px;
    height: 30px;
    pointer-events: none;
  }
  
  .js-form {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  
  .todo-input-container
  {
    flex: 2;
  }

  .todo-btn-container
  {
    flex: 1;
    padding-left: 8px;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 3px solid #333;
  }

  .add-todo-btn
  {
      width: 30px;
  }
```

## Javascript

```javascript
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


```

## Cordova plugin

## Java - Android

### DatabaseHelper.java
```JAVA
package org.apache.cordova.todo;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import org.apache.cordova.todo.models.Todo;

import java.util.ArrayList;
import java.util.List;

/**
* DatabaseHelper is the main entity we'll be using to work with our database
*
* @author Shahar Shalev
* 
*/
public class DatabaseHelper extends SQLiteOpenHelper {

    /**
     * The instance of class , we use singleton pattern here
     */
    private static DatabaseHelper sInstance;

    /**
     * The name of our class file, for logging
     */
    private final String TAG_DATABASEHELPER = "DatabaseHelper";
    // Database Info
    /** Database name */
    private static final String DATABASE_NAME = "todosDatabase";
    /** Database version */
    private static final int DATABASE_VERSION = 1;

    // Table Names
    /** Single table - todos which we will save everyting in it. */
    private static final String TABLE_TODOS = "todos";

    // Todos Table Columns
    /** The id of the todo */
    private static final String KEY_TODO_ID = "id";
    /** The text of the todo */
    private static final String KEY_TODO_LABEL = "label";
    /** Is checked or not */
    private static final String KEY_TODO_CHECKED = "checked";
    /**
     * 
     * Create or get the DatabaseHelper instance 
     * @param context  application context
     * @return DatabaseHelper instance
     */
    public static synchronized DatabaseHelper getInstance(Context context) {
        // Use the application context, which will ensure that you
        // don't accidentally leak an Activity's context.
        // See this article for more information: http://bit.ly/6LRzfx
        if (sInstance == null) {
            sInstance = new DatabaseHelper(context.getApplicationContext());
        }
        return sInstance;
    }

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    /** 
     * Called when the database connection is being configured.
     * Configure database settings for things like foreign key support, write-ahead logging, etc.
     */ 
    @Override
    public void onConfigure(SQLiteDatabase db) {
        super.onConfigure(db);
        db.setForeignKeyConstraintsEnabled(true);
    }

    /**
     * Called when the database is created for the FIRST time.
     * If a database already exists on disk with the same DATABASE_NAME, this method will NOT be called.
     * @param db
     */
    @Override
    public void onCreate(SQLiteDatabase db) {
        String CREATE_TODO_TABLE = "CREATE TABLE " + TABLE_TODOS +
                "(" +
                    KEY_TODO_ID + " INTEGER PRIMARY KEY," + // Define a primary key
                    KEY_TODO_LABEL + " TEXT," + // Define a foreign key
                    KEY_TODO_CHECKED + " INTEGER" +
                ")";

        db.execSQL(CREATE_TODO_TABLE);
    }

    /**
     * Called when the database needs to be upgraded.
     * This method will only be called if a database already exists on disk with the same DATABASE_NAME,
     * but the DATABASE_VERSION is different than the version of the database that exists on disk.
     * @param db
     * @param oldVersion
     * @param newVersion
     */
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        if (oldVersion != newVersion) {
            // Simplest implementation is to drop all old tables and recreate them
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_TODOS);
            onCreate(db);
        }
    }
    /**
     * 
     * @param todo The todo which we be added/updated to our db.
     * @return id of the the todo
     */
    public long addOrUpdateTodo(Todo todo)
    {
        SQLiteDatabase db = getWritableDatabase();
        long todoId = -1;

        db.beginTransaction();
        try {
            // Saving key, value infomation for the todo create/update query
            ContentValues values = new ContentValues();
            values.put(KEY_TODO_ID, todo.id);
            values.put(KEY_TODO_LABEL, todo.label);
            values.put(KEY_TODO_CHECKED, todo.checked);

            // First try to update the todo in case the todo already exists in the database
            // This assumes todo's id are unique
            int rows = db.update(TABLE_TODOS, values, KEY_TODO_ID + "= ?", new String[]{todo.id.toString()});

            // Check if update succeeded
            if (rows == 1) {
                // Get the primary key of the todo we just updated
                String todosSelectQuery = String.format("SELECT %s FROM %s WHERE %s = ?",
                        KEY_TODO_ID, TABLE_TODOS, KEY_TODO_ID);
                Cursor cursor = db.rawQuery(todosSelectQuery, new String[]{String.valueOf(todo.id)});
                try {
                    if (cursor.moveToFirst()) {
                        todoId = cursor.getLong(0);
                        db.setTransactionSuccessful();
                    }
                } finally {
                    if (cursor != null && !cursor.isClosed()) {
                        cursor.close();
                    }
                }
            } else {
                // todo with this that id did not already exist, so insert new todo
                todoId = db.insertOrThrow(TABLE_TODOS, null, values);
                db.setTransactionSuccessful();
            }
        } catch (Exception e) {
            Log.d(TAG_DATABASEHELPER, "Error while trying to add or update todo");
        } finally {
            db.endTransaction();
        }
        return todoId;
    }

    /**
     *  Get a single Todo object by his id.
     * @param id the id of the todo
     * @return the todo by his id.
     */
    public Todo getById(long id)
    {
        Todo newTodo = null;
        // The query to get the todo from db.
        String TODO_SELECT_QUERY =
                String.format("SELECT * FROM %s where %s = ?",
                        TABLE_TODOS,
                        KEY_TODO_ID);


        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.rawQuery(TODO_SELECT_QUERY, new String[] {String.valueOf(id)});
        
        // Extracting the the todo from the result of the query.
        try {
            if (cursor.moveToFirst()) {
                newTodo = new Todo();
                newTodo.id = cursor.getLong(cursor.getColumnIndex(KEY_TODO_ID));
                newTodo.label = cursor.getString(cursor.getColumnIndex(KEY_TODO_LABEL));
                newTodo.checked = cursor.getInt(cursor.getColumnIndex(KEY_TODO_CHECKED)) == 1;
            }
        } catch (Exception e) {
            Log.d(TAG_DATABASEHELPER, "Error while trying to get single todo from database");
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
        }
        return newTodo;
    }

    /**
     * 
     * @return All the todos from our db
     */
    public List<Todo> getAllTodos() {
        List<Todo> todos = new ArrayList<>();

        String TODOS_SELECT_QUERY =
                String.format("SELECT * FROM %s",
                        TABLE_TODOS);

        // "getReadableDatabase()" and "getWriteableDatabase()" return the same object (except under low
        // disk space scenarios)
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.rawQuery(TODOS_SELECT_QUERY, null);

        // Going over the results and add them to the list of todos
        try {
            if (cursor.moveToFirst()) {
                do {
                    Todo newTodo = new Todo();
                    newTodo.id = cursor.getLong(cursor.getColumnIndex(KEY_TODO_ID));
                    newTodo.label = cursor.getString(cursor.getColumnIndex(KEY_TODO_LABEL));
                    newTodo.checked = cursor.getInt(cursor.getColumnIndex(KEY_TODO_CHECKED)) == 1;

                    todos.add(newTodo);
                } while(cursor.moveToNext());
            }
        } catch (Exception e) {
            Log.d(TAG_DATABASEHELPER, "Error while trying to get all todo from database");
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
        }
        return todos;
    }

    /**
     * Delete a todo from our db by his id
     * @param id of the todo
     */
    public void deleteTodo(long id) {
        SQLiteDatabase db = getWritableDatabase();
        db.beginTransaction();
        try {
            // Order of deletions is important when foreign key relationships exist.
            db.delete(TABLE_TODOS, KEY_TODO_ID+"=?", new String[]{String.valueOf(id)});
            db.setTransactionSuccessful();
        } catch (Exception e) {
            Log.d(TAG_DATABASEHELPER, "Error while trying to delete todo");
        } finally {
            db.endTransaction();
        }
    }
}


```
### Todo.java
```JAVA
package org.apache.cordova.todo.models;

import com.google.gson.Gson;

/**
* Todo is the main entity we'll be using to presnet our todos
*
* @author Shahar Shalev
* 
*/
public class Todo {
    /**The id of the todo */
    public Long id;
    /** The text of the todo */
    public String label;
    /** Wheter it's done or not */
    public Boolean checked;

    static private Gson gson = new Gson();

    /**
     * 
     * @return json string of the object
     */
    public String toJson() {
        return gson.toJson(this);
    }

    /**
     * 
     * @param json
     * @return Todo item from the json string of the todo.
     */
    public static Todo fromJson(String json) {
        if (json == null) return null;
        return gson.fromJson(json, Todo.class);
    }
}
```

### TodoManagment.java
```JAVA
package org.apache.cordova.todo;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteStatement;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Log;
import android.content.ContentValues;

import com.google.gson.Gson;

import org.apache.cordova.todo.models.Todo;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

/**
* TodoManagement is the main entity we'll be using to interface the commands outside and inside of our app
*
* @author Shahar Shalev
* 
*/
public class TodoManagement extends CordovaPlugin {

    private DatabaseHelper databaseHelper = null;

    private Gson gson = new Gson();

    public TodoManagement()
    {

    }

    /**
     * 
     * @param action string repsenting the action to take
     * @param args the arguments we got
     * @param callbackContext calllback to sent the result back to web app
     * @return
     * @throws JSONException
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (databaseHelper == null) {
            databaseHelper = DatabaseHelper.getInstance(this.cordova.getContext());
        }
        /** In case of a get - return all the todos */
        if (action.equals("get")) {
            this.cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        List<Todo> todoList = databaseHelper.getAllTodos();
                        String jsonString = gson.toJson(todoList);
                        JSONArray r = new JSONArray(jsonString);
                        callbackContext.success(r);
                    }
                    catch (Exception e) {
                        callbackContext.error(e.getMessage());
                    }
                }
            });
            return true;
        }
        /** In case of getBy id - get a single todo by his id */
        if (action.equals("getById"))
        {
            JSONObject todo = args.getJSONObject(0);
            this.cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try{
                        long id = todo.getLong("id");
                        Todo todoItem = databaseHelper.getById(id);
                        String jsonString = todoItem.toJson();
                        JSONObject r = new JSONObject(jsonString);
                        callbackContext.success(r);
                    } catch (Exception e) {
                        callbackContext.error(e.getMessage());
                    }
                }
            });
            return true;
        }
        /** In case of post/put create/update the db with our todo */
        if (action.equals("post") || action.equals("put"))
        {
            JSONObject todo = args.getJSONObject(0);
            this.cordova.getThreadPool().execute(new Runnable(){
                public void run() {
                    try {
                        Todo todoItem = Todo.fromJson(todo.toString());
                        long result = databaseHelper.addOrUpdateTodo(todoItem);
                        callbackContext.success();
                    } catch (Exception e) {
                        callbackContext.error(e.getMessage());
                    }
                }
            });
            return true;
        }
        /** In case of delete remove the todo from our db */
        if(action.equals("delete"))
        {
            JSONObject todo = args.getJSONObject(0);
            this.cordova.getThreadPool().execute(new Runnable(){
                public void run() {
                    try {
                        long id = todo.getLong("id");
                        databaseHelper.deleteTodo(id);
                        callbackContext.success();
                    } catch (JSONException e) {
                        callbackContext.error(e.getMessage());
                    }

                }
            });
            return true;
        }
        return false;
    }
}
```

## Browser - Javascript 

It wasn't required - so there is less commments here.
```javascript
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
var browser = require('cordova/platform');
var winCallBack;

/**
 * Get all the todos from the local storage
 */
function _get()
{
    let todos = window.localStorage.getItem('todo');
    if (todos) {
        todos = JSON.parse(todos);
    } else {
        todos = [];
    }
    return todos;
}

/**
 * Save list of todos into the 
 */
function _save(todos)
{
    window.localStorage.setItem('todo', JSON.stringify(todos));
}

/**
 * Returns all the todos
 * @param {*} win on success callback
 * @param {*} fail on failure callback
 * @param {*} args 
 * @param {*} env 
 */
function get(win, fail, args, env)
{
    const todos = _get();
    win(todos);
}

function getById(win, fail, args, env)
{
    const todo = args[0];
    const id = todo.id;

    const todos = _get();
    const mytodo = todos.find(todo => todo.id === id);
    win(mytodo);
}

function post(win, fail, args, env)
{
    const todo = args[0];
    let todos = _get();
    todos.push(todo);
    _save(todos);
    win();
}

function deleteTodo(win, fail, args, env)
{
    const todo = args[0];
    const id = todo.id;
    let todos =  _get();
    let index = todos.findIndex(x => x.id === id);
    todos.splice(index, 1);
    _save(todos);
    win();
}

function put(win, fail, args, env)
{
    const todo = args[0];
    const id = todo.id;
    let todos =  _get();
    const todoItem = todos.find(x => x.id === id);
    Object.assign(todoItem, args);
    _save(todos);
    win();
}

module.exports = {
    get,
    getById,
    post,
    delete: deleteTodo,
    put
};

require('cordova/exec/proxy').add('TodoManagement', module.exports);

```

##  www/TodoManagment.js
```javascript

var cordova = require('cordova'),
    exec = require('cordova/exec');

/**
 * Get all the todos
 * @param {*} success callback on success
 * @param {*} error callback on failuiree
 */
var get = function (success, error) {
    exec(success, error, 'TodoManagement', 'get');
}

/**
 * Get todo by his id
 * @param {*} success callback on success
 * @param {*} error callback on failuiree
 */
var getById = function(success, error, args) {
    exec(success, error, 'TodoManagement', 'getById', args);
}

/**
 * Create todo
 * @param {*} success callback on success
 * @param {*} error callback on failuiree
 */
var post = function (success, error, args) {
    console.log(arguments);
    exec(success, error, 'TodoManagement', 'post', args);
}

/**
 * Update a todo
 * @param {*} success callback on success
 * @param {*} error callback on failuiree
 */
var put = function (success, error, args) {
    console.log(arguments);
    exec(success, error, 'TodoManagement', 'put', args);
}

/**
 * Remove a todo
 * @param {*} success callback on success
 * @param {*} error callback on failuiree
 */
var remove = function (success, error, args) {
    console.log(arguments);
    exec(success, error, 'TodoManagement', 'delete', args);
}

module.exports = { delete: remove, put, get, post, getById }
```