cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-todo-management.TodoManagement",
      "file": "plugins/cordova-plugin-todo-management/www/TodoManagement.js",
      "pluginId": "cordova-plugin-todo-management",
      "clobbers": [
        "cordova.plugins.TodoManagement"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-todo-management": "0.1.0"
  };
});