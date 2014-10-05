var q = require('q');
var Parse = require('parse').Parse;

Parse.initialize("n27hpGo5rFEzX4EBI4OODoThfhTKfi5PDj66ZAks", "4H7u9stH4UfbKzChQpYFQYdS0z84qnSVgef52R3S");

module.exports = {

  getNewBTTask: function() {
    var getNewBTTaskPromise = q.defer();

    var Task = Parse.Object.extend('Task');
    var taskQuery = new Parse.Query(Task);

    taskQuery.equalTo('status', 0);
    taskQuery.ascending('createdAt');
    taskQuery.include('for_item');

    taskQuery.first().then(
      function(object){
        if (object) { 
          getNewBTTaskPromise.resolve(object); 
        } else { 
          getNewBTTaskPromise.reject('No BTTask found.'); 
        }
      },
      function(error){
        getNewBTTaskPromise.reject(error);
      }
    );

    return getNewBTTaskPromise.promise;
  },

  completeBTTask: function(task_id) {
    var completeBTTaskPromise = q.defer();

    var Task = Parse.Object.extend('Task');
    var taskQuery = new Parse.Query(Task);

    taskQuery.get(task_id, {
      success: function(object) {
        if (object) {
          object.set('status', 2);
          object.save().then(
            function(task_object) {
              sendSuccessPushNotification().then(
                function(response) {
                  completeBTTaskPromise.resolve(task_object);
                },
                function(error) {
                  completeBTTaskPromise.reject(error);
                }
              );
            },
            function(error) {
              completeBTTaskPromise.reject(error);
            }
          );
        } else {
          completeBTTaskPromise.reject('BTTask could not be found.');
        }
      },
      error: function(error) {
        completeBTTaskPromise.reject(error);
      }
    });

    return completeBTTaskPromise.promise;
  }
}

var sendSuccessPushNotification = function() {
  var sendPushNotificationPromise = q.defer();

  Parse.Push.send({
    where: new Parse.Query(Parse.Installation),
    data: {
      alert: "Your drink is ready for pickup!",
      badge: "Increment",
      sound: "Default"
    }
  }, {
    success: function(response) {
      sendPushNotificationPromise.resolve(response);
    },
    error: function(error) {
      sendPushNotificationPromise.reject(error);
    }
  });

  return sendPushNotificationPromise.promise;
}