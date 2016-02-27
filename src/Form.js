module.exports = function Form() {
  if (Form.instance) {
    return Form.instance;
  }

  var Instance = {
    context: {},
    form: $('#form'),
    setContext: function(context, target) {
      this.context.data = context;
      this.context.target = target;
    },
    openForm: function() {
      var self = this;
      self.form.show();
      $('#container').addClass('form_active');
    },
    closeForm: function() {
      var self = this;
      var form = self.form.find('form');
      self.form.hide();
      form.find('textarea').val('');
      self.setContext(null, null);
      $('#container').removeClass('form_active');
    }

  };

  Form.instance = Instance;
  return Instance;
};
