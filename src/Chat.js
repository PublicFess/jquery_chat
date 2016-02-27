var MessageConstructor = require('./Message');
var FormConstructor = require('./Form');

module.exports = function Chat() {
  if (Chat.instance) {
    return Chat.instance;
  }

  var Instance = {
    form: new FormConstructor(),
    messages: JSON.parse(window.localStorage.getItem('messages')) || [
      {
        message: 'lorem ipsum',
        children: [
          {
            message: 'lorem ipsum',
            children: []
          }
        ]
      }
    ],
    addMessage: function(text, parent, target) {
      var messageObj = {
        message: text,
        children: []
      };
      parent.children.push(messageObj);
      var message = new MessageConstructor(messageObj);
      var messageDom = message.compileMessage();
      target.append(messageDom);
      window.localStorage.setItem('messages', JSON.stringify(this.messages));
      messageDom.animate({'opacity': 1}, 100);
      this.form.closeForm();
    },
    renderList: function (domNode, messages) {
      var self = this;
      messages = messages || self.messages;
      for (var i=0; i < messages.length; i++) {
        var m = messages[i];
        var message = new MessageConstructor(m);
        var messageDom = message.compileMessage();
        domNode.append(messageDom);
        messageDom.animate({opacity: 1}, 100);
        if (message.data.children && message.data.children.length) {
          self.renderList(messageDom, message.data.children);
        }
      }
    }
  };

  Chat.instance = Instance;
  return Instance;
};
