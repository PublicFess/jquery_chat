var Message = require('./Message');
var Chat = require('./Chat');
var Form = require('./Form');

$(document).ready(function() {

  var domMessages = $('.messages');
  var chat = new Chat();
  var form = new Form();

  chat.renderList(domMessages);

  $('#close_form').on('click', function() {
    form.closeForm();
  });

  var answerForm = $('#form form');
  answerForm.on('submit', function(ev) {
    ev.preventDefault();
    chat.addMessage(answerForm.find('textarea').val().replace(/\r?\n/g, '<br />'), form.context.data, form.context.target);
  });
});
