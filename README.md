# ComstackPMApp

[![Build Status](https://travis-ci.org/lohi-io/ComstackPMApp.svg?branch=master)](https://travis-ci.org/lohi-io/ComstackPMApp)

This is an Angular Application which integrates with the [Comstack Private Messaging REST API Module](https://github.com/lohi-io/comstack_pm/tree/7.x-1.x/modules/comstack_pm_rest_api).

Documentation on the REST API can be found here:
https://rawgit.com/lohi-io/comstack_pm/7.x-1.x/modules/comstack_pm_rest_api/docs/rest-api.html

## Setting up

### Installation

You will need to have [node.js](http://www.nodejs.org/) and [npm](http://www.npmjs.com) installed.

Assuming these dependencies are installed:
- Clone this repository and `cd` into it: `git clone https://github.com/lohi-io/ComstackPMApp.git && cd ComstackPMApp`
- Install project dependencies: `npm install`
- Copy example_index.html to index.html: `cp app/example_index.html app/index.html`
- Start the webserver and code away!: `grunt`

Depending on your network conditions, bower may not be able to clone dependencies. If this happens, run `git config url."https://".insteadOf git://` and `npm install` again.

#### Dependencies

ComstackPMApp assumes nothing of its working environment. Hence, it will work without jQuery, however, if you are using jQuery you will need to be on at least 1.9 and jQuery should be loaded before Angular.js.

### Configuration
Well, you'll need an API setup and configured properly somewhere. When instantiating this App you can pass in a series of settings which are as follows. If you're on a Drupal site you can use the [Comstack PM UI module](https://github.com/lohi-io/comstack_pm_ui) which will do all this for you.

The App will look for settings in the global variable `Comstack.PMApp.Settings`.

| Setting | Type | Description |
| ------------- | ----------- | ----------- |
| api_url | `String` | The URL of the Comstack PM REST API. |
| authorization_header | `String` | String to add to the Authorization header. |
| access_token | `String` | The access token to use when querying the API. |
| csrf_token | `String` | The CSRF token to include as a header when making write operations against the API. |
| max_participants | `Integer` | The maximum number of participants allowed in one conversation, 0 = unlimited. |
| allow_separate_conversations | `Boolean` | Prevent users from starting multiple one on one conversations, instead continue the same conversation. |
| share_data_storage | `Boolean` | Whether or not to use local storage to reduce server requests when the app is open on multiple tabs &/ windows. |
| library_path | `String` | The path/location of the library. |
| poll_intervals | `Object` | An object containing the number of seconds to wait before polling the server for new data. |
| - conversations | `Integer` | How often to check for new conversations, defaults to 20 seconds. |
| - messages | `Integer` | How often to check for new messages when within a conversation, defaults to 10 seconds. |
| - user_is_available | `Integer` | How often to check when in a conversation that the other user(s) still available, defaults to 10 seconds. |
| - read_only | `Integer` | How often to check to see if the current user has opted out of Private Messaging, defaults to 60 seconds. |
| allow_emoji | `Boolean` | Defaults to `false`, this setting means that the app will treat strings which only contain Emoji (or other non utf8 characters) to be empty, failing validation. |
| strings | `Object` | A series of strings in key/value format used within the interface, this is to facilitate easily changing text or translating things. If "@user_id@" is present in a string it will be replaced with the current users id. |

```javascript
{
  "api_url": "https://example.com/api",
  "authorization_header": null,
  "access_token": "",
  "csrf_token": "",
  "max_participants": 2,
  "allow_separate_conversations": false,
  "share_data_storage": true,
  "library_path": "https://example.com/sites/all/libraries/ComstackPMApp",
  "friends_url": "https://example.com/friends/1"
  "poll_intervals": {
    "conversations": 30,
    "messages": 15,
    "available_users": 300
  },
  "allow_emoji": false,
  "strings": {
    "heading__messages": "Messages",
    "heading__conversation_with": "Conversation with @participants@",
    "text__last_message": "Last message",
    "text__no_available_users": "",
    "text__read_only": 'You\'re currently opted out of private messaging, <a href="https://.com/user/@user_id@/account-settings">click here</a> to go the the account settings form.',
    "text__select_messages_to_delete": "Select the messages you'd like to delete",
    "text__select_messages_to_report": "Select the messages you'd like to report",
    "text__no_conversations": '<p>You\'ve not been part of any conversations yet!</p><p>Make sure that you\'ve <a href="https://.com/friends/@user_id@">added your friends</a> then start a new conversation.</p>',
    "text__no_conversations_no_friends": "You need to add contacts before you start a conversation.",
    "form__new_conversation__header": 'You must be friends with a person before you can send them messages. <a href="https://.com/user/@user_id@/account-settings">Find and add friends</a>',
    "form__to__label": "To",
    "form__to__placeholder__singular": "Enter recipients username...",
    "form__to__placeholder__plural": "Enter recipients username...",
    # @@number_label@@ should be something like "1 person" or "2 people" accounting for singular/plural max recipients (max participants - 1).
    "form__to__validation__limit_exceeded": "You cannot contact more than @@number_label@@ at once",
    "form__text__placeholder [validation???]": "Write a message...",
    "form__text__maxlength": 100000,
    "form__text__validation__empty": "You'll need to enter some text here...",
    "form__text__validation__maxlength": "You can only have @@number@@ characters per message",
    "form__text__warning__emoji": "Sorry, no Emoji please",
    "form__new_conversation__submit": "Send",
    "form__reply__placeholder": "Enter your reply...",
    "form__reply__submit": "Reply",
    "form__report__label": "Reason for reporting",
    "form__report__submit": "Report",
    "link__delete": "Delete",
    "link__report": "Report",
    "link__block": "Block",
    "link__unblock": "Unblock",
    "link__no_available_users": "Find your friends",
    "button__new_conversation": "New message",
    "button__load_older_messages": "Load older messages",
    "button__friends_list": "Friends list",
    "button__ok": "OK",
    "button__cancel": "Cancel",
    "modal__error__heading": "Something's gone wrong",
    "modal__delete_conversation__heading": "Delete conversation",
    "modal__delete_conversation__text": "Are you sure you want to delete this conversation?",
    "modal__report__heading": "Report conversation",
    "modal__block__heading": "Block user",
    "modal__block__text": "Are you sure you want to block this user?",
    "modal__block__text__multiple": "Who would you like to block?",
    "error__no_connection": "We're having trouble contacting the server, are you connected to the internet?",
    "error__api_bad_response": "The API returned an error so something has gone wrong, here it is @@error@@."
  }
}
```
