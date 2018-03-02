Template.Home.onCreated(function () {

  var template = Template.instance();

  template.searchQuery = new ReactiveVar();
  template.searching = new ReactiveVar(false);
  template.isDeleteEnable = new ReactiveVar(true);

  template.autorun(function () {
    if(Meteor.subscribe('contacts', template.searchQuery.get()).ready()) {
      Contacts.find().fetch();
    }
  });
});

Template.Home.helpers({
  isDeleteEnable: function () {
    return Template.instance().isDeleteEnable.get();
  },

  searching: function () {
    return Template.instance().searching.get();
  },

  query: function () {
    return Template.instance().searchQuery.get();
  },

  contacts: function () {
    var contacts = Contacts.find({ownerId: Meteor.userId()});

    if(contacts) {
      return contacts;
    }
  }
});


Template.Home.events({
  "click a.create": function (e, tpl) {

    Session.set('isCreateMode', true);

  },


  "click a.update": function (e, tpl) {

    Session.set('isUpdateMode', true);

  },


  "click a.delete": function (e, tpl) {

    var selected = tpl.findAll('input[name=contactId]:checked');
    var selectedContacts = _.map(selected, function (obj) {
      return obj.defaultValue;
    });

    selectedContacts.forEach(function (selectedContact) {
      Meteor.call('contacts.remove', selectedContact);
    });

    tpl.isDeleteEnable.set(true);
  },

  
  "click input[name=CheckAll]": function (e, tpl) {

    var isCheckAll = tpl.$(e.target).is(":checked");
    var allContacts = tpl.findAll('input[name=contactId]');

    _.map(allContacts, function (obj) {
      $(obj).prop('checked', isCheckAll);
    });

    isCheckAll ? tpl.isDeleteEnable.set(false) : tpl.isDeleteEnable.set(true);
  },


  "click input[name=contactId]": function (e, tpl) {

    var isItemSelected = false;
    var allContacts = tpl.findAll('input[name=contactId]');

    _.map(allContacts, function (obj) {
      if ($(obj).is(':checked')) {
        return isItemSelected = true;
      }
    });

    isItemSelected ? tpl.isDeleteEnable.set(false) : tpl.isDeleteEnable.set(true);
    if (!tpl.$(e.target).is(":checked")) {
      tpl.$('input[name=CheckAll]').prop('checked', false);
    }
  },


  "keyup [name='search']": function (e, tpl) {

    var value = tpl.$(e.target).val().trim();

    if (value !== '' && e.keyCode === 13) {
      tpl.searchQuery.set( value );
      tpl.searching.set( true );
    }

    if (value === '') {
      tpl.searchQuery.set( value );
    }
  }
});