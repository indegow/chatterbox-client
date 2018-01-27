//Server: http://parse.sfm8.hackreactor.com/
var apiURL = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages/';
var tweets;
$.ajax({
  url: apiURL,
  type: 'GET',
  success: function (result) {
    responses = result.results;
    rooms = [];
    for (var i = 0; i < responses.length; i++) {
      if (_.indexOf(rooms, responses[i].roomname ) === -1 && responses[i].roomname) {
        rooms.push(responses[i].roomname);
        app.renderMessage(responses[i]);
      }
    } 
    username = window.location.search.slice(10);
    
    for (var i = 0; i < rooms.length; i++) {
      app.renderRoom(rooms[i]);
    }
  },
});

var responses, rooms, username;

var app = {
  init: function(tweets) {
    responses = tweets.responseJSON.results;
    rooms = [];
    for (var i = 0; i < responses.length; i++) {
      if (_.indexOf(rooms, responses[i].roomname ) === -1 && responses[i].roomname) {
        rooms.push(responses[i].roomname);
      }
    } 
    username = window.location.search.slice(10);
    
    for (var i = 0; i < rooms.length; i++) {
      app.renderRoom(rooms[i]);
    }
    
  }, 
  message: function() {
    
  },
  send: function(message) {
    
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(message) {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: message,
    });
  },
  
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
    var $newdiv1 = $("<div class='chat username'>" + message.username + "</div>");
    $('#chats').prepend($newdiv1);
  },
  renderRoom: function(roomname) {
    var $newoption1 = $("<option>" + roomname + "</option>");
    $('#roomSelect').append($newoption1);
  },
  
};

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};
