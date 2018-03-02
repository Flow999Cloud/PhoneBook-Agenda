Router.route('/', {
  name: 'home',
  controller: 'HomeController'
});

Router.route('/contacts/:_id', {
  name: 'contact',
  controller: 'ContactController',
  action: 'info'
});

if (Meteor.isClient) {
  ApplicationController = RouteController.extend({
    layoutTemplate: 'AppBody'
  });

  HomeController = ApplicationController.extend({
    action: function () {
      this.render('Home');
    }
  });

  ContactController = ApplicationController.extend({
    info: function () {
      this.state.set('contactId', this.params._id);
      this.render('ContactInfo');
    }
  });
}