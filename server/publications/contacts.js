if (Meteor.isServer) {
  Meteor.publish( 'contacts', function( search ) {
    check( search, Match.OneOf( String, null, undefined ) );

    var query      = {},
        projection = { limit: 10, sort: { name: 1 } };

    if ( search ) {
      var regex = new RegExp( search, 'i' );

      query = {
        $or: [
          { name: regex },
          { email: regex },
          { phone: regex }
        ]
      };

      projection.limit = 100;
    }

    return Contacts.find( query, projection );
  });
}