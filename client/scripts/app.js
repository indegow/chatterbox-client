 
var apiURL = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages/';
var responses, rooms, username;
var username = window.location.search.slice(10);

var app = {
  init: function() {
    app.fetch();
    
  },
  message: function() {
    
  },
  send: function(data) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: apiURL,
      type: 'POST',
      data: JSON.stringify(data),
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
  fetch: function() {
    $.ajax({
      url: apiURL,
      type: 'GET',
      data: 'order=-createdAt',
      success: function(result) {
        console.log(result);
        responses = result.results;
        rooms = [];
        
        for (var i = 0; i < responses.length; i++) {
          if (responses[i].username) {
            responses[i].username = _.escape(responses[i].username);
          }
          if (responses[i].text) {
            var msg = _.escape(responses[i].text);
            app.renderMessage(responses[i]);
          }
          if (_.indexOf(rooms, responses[i].roomname ) === -1 && responses[i].roomname) {
            rooms.push(responses[i].roomname);
          }
        } 
        for (var i = 0; i < rooms.length; i++) {
          //var room = _.escape(rooms[i]);
          app.renderRoom(rooms[i]);
        }
      }
    });
  },
  
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
    var $newdiv1 = $("<div class='chat username'>" + message.username + ":<br>" + message.text + "</div>");
    $('#chats').prepend($newdiv1);
  },
  renderRoom: function(roomname) {
    var $newoption1 = $("<option>" + roomname + "</option>");
    $('#roomSelect').append($newoption1);
  },
  
};

//Server: http://parse.sfm8.hackreactor.com/
$(document).ready(function() {
  
  $('#submitmessage').click(function() {
    
    var messagetext = $("#newmessage").val(); 
    console.log($("#newmessage").val()); 
    
    $('#newmessage').val('');
    
    var obj = {
      username: username,
      text: messagetext
    };
    
    app.send(obj);
    app.renderMessage(obj);
   
  });
});

app.init();
