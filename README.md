# ComstackPMApp

[![Build Status](https://travis-ci.org/lohi-io/ComstackPMApp.svg?branch=master)](https://travis-ci.org/lohi-io/ComstackPMApp)

This is an Angular Application which integrates with the [Comstack Private Messaging REST API Module](https://github.com/lohi-io/comstack_pm/tree/7.x-1.x/modules/comstack_pm_rest_api).

Documentation on the REST API can be found here:
https://rawgit.com/lohi-io/comstack_pm/7.x-1.x/modules/comstack_pm_rest_api/docs/rest-api.html

## Setting up

### Installation

You will need to have [node.js](http://www.nodejs.org/) and [npm](http://www.npmjs.com) installed.

Assuming these dependencies are installed:
- Install Bower globally: `npm install bower -g`
- Clone this repository and `cd` into it: `git clone https://github.com/lohi-io/ComstackPMApp.git && cd ComstackPMApp`
- Install project dependencies: `npm install`
- Copy example_index.html to index.html: `cp app/example_index.html app/index.html`
- Start the webserver: `npm start`

### Configuration
Well, you'll need an API setup and configured properly somewhere. When instantiating this App you'll need to pass in a series of settings which are as follows. If you're on a Drupal site you can use the [Comstack PM UI module](https://github.com/lohi-io/comstack_pm_ui) which will do all this for you.

| Setting | Type | Description |
| ------------- | ----------- | ----------- |
| api_url | `String` | The URL of the Comstack PM REST API. |
| authorization_header | `String` | String to add to the Authorization header. |
| access_token | `String` | The access token to use when querying the API. |
| csrf_token | `String` | The CSRF token to include as a header when making write operations against the API. |
| max_participants | `Integer` | The maximum number of participants allowed in one conversation, 0 = unlimited. |
| allow_separate_conversations | `Boolean` | Prevent users from starting multiple one on one conversations, instead continue the same conversation. |
| share_data_storage | `Boolean` | Whether or not to use local storage to reduce server requests when the app is open on multiple tabs &/ windows. |
| poll_intervals | `Object` | An object containing the number of seconds to wait before polling the server for new data. |
| - conversations | `Integer` | |
| - messages | `Integer` | |
| - available_users | `Integer` | |
| strings | `Object` | A series of strings in key/value format used within the interface, this is to facilitate easily changing text or translating things. |

```javascript
{
  'api_url': 'https://example.com/api',
  'authorization_header': null,
  'access_token': '',
  'csrf_token': '',
  'max_participants': 2,
  'allow_separate_conversations': false,
  'share_data_storage': true,
  'poll_intervals': {
    'conversations': 30,
    'messages': 15,
    'available_users': 300
  }
  'strings': {
    'heading__messages': 'Messages',
    'heading__conversation_with': 'Conversation with @name',
    'text__last_message': 'Last message',
    'text__no_available_users': '',
    'text__read_only': 'You\'re currently opted out of private messaging, <a href="@url">click here</a> to go the the account settings form.',
    'text__select_messages_to_delete': "Select the messages you'd like to delete",
    'text__select_messages_to_report': "Select the messages you'd like to report",
    'form__new_conversation__header': 'You must be friends with a person before you can send them messages. <a href="@url">Find and add friends</a>',
    'form__to__label': 'To',
    'form__to__placeholder__singular': 'Enter recipients username...',
    'form__to__placeholder__plural': 'Enter recipients username...',
    'form__text__placeholder [validation???]': 'Write a message...',
    'form__new_conversation__submit': 'Send',
    'form__reply__placeholder': 'Enter your reply...',
    'form__reply__submit': 'Reply',
    'form__report__label': 'Reason for reporting',
    'form__report__submit': 'Report',
    'link__delete': 'Delete',
    'link__report': 'Report',
    'link__block': 'Block',
    'link__no_available_users': 'Find your friends',
    'button__new_conversation': 'New message',
    'button__load_older_messages': 'Load older messages',
    'button__friends_list': 'Friends list',
    'button__ok': 'OK',
    'button__cancel': 'Cancel',
    'modal__delete_conversation__heading': 'Delete conversation',
    'modal__delete_conversation__text': 'Are you sure you want to delete this conversation?',
    'modal__report__heading': 'Report conversation',
    'modal__block__heading': 'Block user',
    'modal__block__text': 'Are you sure you want to block this user?'
  }
}
```
