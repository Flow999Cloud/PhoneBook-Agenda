Meteor.startup(function () {
  var testUserEmail = 'test@test.com';
  var ownerId;

  if (Meteor.users.find({'emails.address': testUserEmail}).count() === 0) {
    // Create a test user
    ownerId = Accounts.createUser({
      email: testUserEmail,
      password: '123456'
    });
  }

  if (Contacts.find().count() === 0) {
    // Create initial contacts
    var contactData = [
      {
        createdAt: new Date(),
        name: "Tom",
        email: "tom@codemyworld.com",
        phone: "1 234 5678901",
        ownerId: ownerId
      },
      {
        createdAt: new Date(),
        name: "Jerry",
        email: "jerry@codemyworld.com",
        phone: "1 234 5678902",
        ownerId: ownerId
      },
      {
        createdAt: new Date(),
        name: "Spike",
        email: "spike@codemyworld.com",
        phone: "1 234 5678903",
        ownerId: ownerId
      }
    ];

    contactData.forEach(function (contact) {
      Contacts.insert(contact);
    });
  }
});

Meteor.methods({
  'contacts.create': function (name, email, phone) {

    check(name, String);
    check(email, String);
    check(phone, String);

    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Contacts.insert({
      createAt: new Date(),
      name: name,
      email: email,
      phone: phone,
      ownerId: Meteor.userId(),
      username: Meteor.user().username
    })
  },

  'contacts.update': function (contactId, name, email, phone) {

    check(name, String);
    check(email, String);
    check(phone, String);

    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Contacts.update(
        contactId,
        {
          $set: {
            name: name,
            email: email,
            phone: phone
          }
        });
  },

  'contacts.remove': function (contactId) {
    check(contactId, String);

    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Contacts.remove(contactId);
  }
});