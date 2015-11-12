var services = angular.module('ComstackPMApp.Services');

services.factory('Conversation', ['$resource', 'configurationService', '$filter',
  function ($resource, config, $filter) {
    var settings = config.get();
    var Conversation = $resource(settings.api_url + '/cs-pm/conversations/:id', {
      access_token: settings.access_token,
      page: '@page'
    }, {
      getMessages: {
        method: 'GET',
        url: settings.api_url + '/cs-pm/conversations/:id/messages/',
        params: {
          access_token: settings.access_token,
          before:'',
          after:'',
          range: 10
        },
        isArray: false
      },
      reply: {
        method: 'POST',
        url: settings.api_url + '/cs-pm/conversations/:id/reply',
        params: {
          access_token: settings.access_token
        },
        headers: {
          'X-CSRF-Token': settings.csrf_token
        },
        isArray: false
      },
      save: {
        method: "POST",
        headers: {
          'X-CSRF-Token': settings.csrf_token
        }
      },
      delete: {
        method: "DELETE",
        url: settings.api_url + '/cs-pm/conversations/:id',
        params: {
          access_token: settings.access_token
        },
        headers: {
          'X-CSRF-Token': settings.csrf_token
        }
      },
      report: {
        method: "POST",
        url: settings.api_url + '/cs-pm-report',
        params: {
          access_token: settings.access_token
        },
        headers: {
          'X-CSRF-Token': settings.csrf_token
        }
      },
      markAsRead: {
        method: 'PUT',
        url: settings.api_url + '/cs-pm/conversations/:id/mark-as-read',
        params: {
          access_token: settings.access_token
        },
        headers: {
          'X-CSRF-Token': settings.csrf_token
        },
        isArray: false
      }
    });

    /**
     * Gets an array of the participants in a conversation, excluding the given current user.
     * @param conversation
     *   See Comstack API Conversation model.
     * @param currentUser
     *   See Comstack API User model.
     *
     * @return Array
     *   Array of users involved in the conversation excluding the current user.
     */
    Conversation.getOtherParticipants = function(conversation, currentUser) {
      // use historical participants if participants array is empty
      var otherParticipants = conversation.participants;

      var filterOptions = {};

      // In the case where the current user wasn't successfully loaded,
      // don't filter, just give a list of all participants.
      if (currentUser && currentUser.hasOwnProperty('user') && currentUser.user.hasOwnProperty('id') ) {
        filterOptions.id = '!' + currentUser.user.id;
      }

      otherParticipants = $filter('filter')(otherParticipants, filterOptions);
      if (otherParticipants.length === 0) {
        otherParticipants = conversation.historical_participants;
      }
      otherParticipants = $filter('filter')(otherParticipants, filterOptions);

      return otherParticipants;
    };

    /**
     * Gets a string listing the participants in a conversations.
     *
     * Logic for which participants will be in the string is handled by Conversation.getOtherParticipants
     * @see Conversation.getOtherParticipants
     * @param conversation
     *   See Comstack API Conversation model.
     * @param currentUser
     *   See Comstack API User model.
     * @returns {string}
     *   A comma delimited list of participant names for the conversation.
     */
    Conversation.getOtherParticipantsNames = function(conversation, currentUser) {
      var otherParticipants = Conversation.getOtherParticipants(conversation, currentUser);
      var otherParticipantNames = '';

      angular.forEach(otherParticipants, function (participant, key) {
        var suffix = '';

        // if 2nd to last, add ' and '
        // if not last, add ', '
        if (key === otherParticipants.length - 2) {
          suffix = ' and ';
        } else if (key !== otherParticipants.length - 1) {
          suffix = ', ';
        }

        otherParticipantNames = otherParticipantNames + participant.name + suffix;
      });

      return otherParticipantNames;
    };

    return Conversation;
  }
]);

services.factory('pollMessages', ['Conversation', '$q', function(Conversation, $q) {
  var service = {};
  service.get = function(id, before, after, range) {
    var delay = $q.defer();
    Conversation.getMessages({
        id:id,
        before: before,
        after: after,
        range: range
      }, function (conversation) {
        delay.resolve(conversation);
      }, function() {
        delay.reject('Unable to fetch messages for conversation');
      }
    );
    return delay.promise;
  };
  return service;
}]);


