var FormConstructor = require('./Form');

var MessageConstructor = function(m) {
  var Message = {
    data: m,

    getMessage: function() {
      return $('<div class="message"></div>');
    },

    getWrap: function() {
      return $('<div class="message-content"></div');
    },

    getImage: function() {
      return $('<img src="img/account.png"></img>');
    },

    getText: function(m) {
      return $('<div class="message-text">' + m.message + '</div>');
    },

    getReplyBtn: function() {
      return $('<button>Ответить</button>');
    },

    getReplyBtnWrap: function() {
      return $('<div class="gap"></div>');
    },

    compileMessage: function() {
      var self = this;
      var Form = new FormConstructor();
      var message = this.getMessage();
      var message_content = this.getWrap();
      var icon = this.getImage();
      var message_text = this.getText(this.data);
      var buttonWrap = this.getReplyBtnWrap();
      var button = this.getReplyBtn();

      button.on('click', function(e) {
        Form.setContext(self.data, $(e.target).parent().parent().parent().parent());
        Form.openForm();
      });
      buttonWrap.append(button);
      message_text.append(buttonWrap);
      message_content.append(icon);
      message_content.append(message_text);
      message.append(message_content);
      return message;
    }
  };
  return Message;
};
module.exports = MessageConstructor;
