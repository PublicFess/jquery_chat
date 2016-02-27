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
    var parentNode = $(e.target).parent();
    var message = $('<div class="message">' +
    '<span>' + messageObj.message + '</span>' +
    '</div>');
    var button = $('<button>Ответить</button>');
    button.on('click', addMessage.bind(messageObj));
    message.append(button);
    parentNode.append(message);

  };

  function renderList(domNode, messages) {
    messages.forEach(function(m) {
      var message = $('<div class="message">' +
      '<span>' + m.message + '</span>' +
      '</div>');
      var button = $('<button>Ответить</button>');
      button.on('click', addMessage.bind(m));
      message.append(button);
      domNode.append(message);
      if (m.children && m.children.length) {
        renderList(message, m.children);
      }
    });
  };
  renderList(domMessages, messages);

});
