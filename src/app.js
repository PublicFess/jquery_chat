$(document).ready(function() {

  var messages = window.localStorage.getItem('messages') || [
    {
      message: 'lorem ipsum',
      children: [
        {
          message: 'lorem ipsum',
          children: []
        }
      ]
    }
  ];

  var domMessages = $('.messages');

  var addMessage = function(e) {
    var self = this;
    var messageObj = {
      message: 'child',
      children: []
    };
    self.children.push(messageObj);
    var parentNode = $(e.target).parent().parent().parent().parent();
    var message = renderMessage(messageObj);
    parentNode.append(message);
    message.animate({'opacity': 1}, 100);
  };

  function renderMessage(m) {
    var message = $('<div class="message"></div>');
    var message_content = $('<div class="message-content"></div');
    var icon = $('<i class="material-icons">account_box</i>');
    var message_text = $('<div class="message-text">' + m.message + '</div>');
    var button = $('<button>Ответить</button>');
    button.on('click', addMessage.bind(m));
    var centered = $('<div class="centered gap"></div>');
    centered.append(button);
    message_text.append(centered);
    message_content.append(icon);
    message_content.append(message_text);
    message.append(message_content);
    return message;
  };

  function renderList(domNode, messages) {
    messages.forEach(function(m) {
      var message = renderMessage(m);
      domNode.append(message);
      message.animate({opacity: 1}, 100);
      if (m.children && m.children.length) {
        renderList(message, m.children);
      }
    });
  };
  renderList(domMessages, messages);

});
