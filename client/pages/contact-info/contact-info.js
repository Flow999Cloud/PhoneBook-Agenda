Template.ContactInfo.onCreated(function () {

  Meteor.subscribe('contacts');

});

Template.ContactInfo.helpers({
  contact: function () {
    var controller = Iron.controller();
    var contactId = controller.state.get('contactId');

    return Contacts.findOne(contactId);
  },

  isCreateMode: function () {
    return Session.get('isCreateMode');
  },

  isUpdateMode: function () {
    return Session.get('isUpdateMode');
  }
});

Template.ContactInfo.events({
  "submit .contact-info": function (e, tpl) {

    var button = tpl.$('button[type=submit]');
    var _id, name, email, phone;

    if (button.hasClass('create')) {

      name = tpl.$('input[name=Name]').val();
      email = tpl.$('input[name=Email]').val();
      phone = tpl.$('input[name=Phone]').val();

      Meteor.call('contacts.create', name, email, phone);

      Session.set('isCreateMode', false);

    } else if (button.hasClass('update')) {

      _id = tpl.$('button[type=submit]').data('id');
      name = tpl.$('input[name=Name]').val();
      email = tpl.$('input[name=Email]').val();
      phone = tpl.$('input[name=Phone]').val();

      Meteor.call('contacts.update', _id, name, email, phone);

      Session.set('isUpdateMode', false);

    }
  },

  "click button.cancel": function (e, tpl) {

    Router.go('home');

    Session.set('isCreateMode', false);
    Session.set('isUpdateMode', false);

  }
});

Template.ContactInfo.onRendered(function () {
  $('.contact-info').validate();
});