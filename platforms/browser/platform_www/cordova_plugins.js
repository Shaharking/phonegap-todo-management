cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-todo-management/www/TodoManagement.js",
        "id": "cordova-plugin-todo-management.TodoManagement",
        "pluginId": "cordova-plugin-todo-management",
        "clobbers": [
            "cordova.plugins.TodoManagement"
        ]
    },
    {
        "file": "plugins/cordova-plugin-todo-management/src/browser/TodoManagementProxy.js",
        "id": "cordova-plugin-todo-management.TodoManagementProxy",
        "pluginId": "cordova-plugin-todo-management",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-todo-management": "0.1.0"
}
// BOTTOM OF METADATA
});