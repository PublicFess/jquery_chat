$(document).ready(function() {

  global.messages = JSON.parse(window.localStorage.getItem('messages')) || [
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

  var Message = require('./Message');

  function renderList(domNode, messages) {
    messages.forEach(function(m) {
      var message = new Message(m);
      var messageDom = message.compileMessage();
      domNode.append(messageDom);
      messageDom.animate({opacity: 1}, 100);
      if (message.data.children && message.data.children.length) {
        renderList(messageDom, message.data.children);
      }
    });
  };
  renderList(domMessages, global.messages);

  $('#close_form').on('click', function() {
    $('#form').hide();
  });
});
