/**
 * Created by fechit01 on 02/10/2015.
 */
/**
 * Created by fechit01 on 23/09/2015.
 */
var Comstack = (window.Comstack = window.Comstack || {});

Comstack.PMApp = {
  Settings: {
    "base_url": "https://cancerchat01dev.prod.acquia-sites.com",
    "api_url": "https://cancerchat01dev.prod.acquia-sites.com/api/v1",
    "local_host": "cancerchatdev.localweb",
    "environment": "local",
    "authorization_header": "Basic Q1JVSzAxOnl1RGFiOG5lIQ==",
    "access_token": "",
    "csrf_token": "DB7MkAmjCBowvfn5nKH1juJ6qz8YqB0ckII0_0UZiV8",
    "library_path": "http://cancerchatdev.localweb:8000",
    "max_participants": 2,
    "text__maxlength": 100000,
    "allow_separate_conversations": false,
    "share_data_storage": true,
    "poll_intervals": {
      "conversations": 30,
      "messages": 15,
      "available_users": 300,
      "user_is_available": 15
    },
    "strings": {
      "heading__messages": "Messages",
      "heading__conversation_with": "Conversation with @participants@",
      "text__last_message": "Last message",
      "text__no_available_users": "",
      "text__read_only": 'You\'re currently opted out of private messaging, <a href="@base_url@/user/@user_id@/account-settings">click here</a> to go the the account settings form.',
      "text__select_messages_to_delete": "Select the messages you'd like to delete",
      "text__select_messages_to_report": "Select the messages you'd like to report",
      "text__no_conversations": '<p>You\'ve not been part of any conversations yet!</p><p>Make sure that you\'ve <a href="@base_url@/friends/@user_id@">added your friends</a> then start a new conversation.</p>',
      "form__new_conversation__header": 'You must be friends with a person before you can send them messages. <a href="@base_url@/user/@user_id@/account-settings">Find and add friends</a>',
      "form__to__label": "To",
      "form__to__placeholder__singular": "Enter recipients username...",
      "form__to__placeholder__plural": "Enter recipients username...",
      "form__to__validation__limit_exceeded": "You cannot contact more than @number_label@ at once",
      "form__to__validation__empty": "Who would you like to talk to?",
      "form__text__placeholder": "Write a message...",
      "form__text__validation__empty": "You'll need to enter some text here...",
      "form__text__validation__maxlength": "You can only have @number@ characters per message",
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
      "modal__delete_conversation__heading": "Delete conversation",
      "modal__delete_conversation__text": "Are you sure you want to delete this conversation?",
      "modal__report__heading": "Report conversation",
      "modal__block__heading": "Block user",
      "modal__block__text": "Are you sure you want to block the user @name@?",
      "modal__block__text__multiple": "Who would you like to block?",
      "modal__block__text__not_allowed": "You cannot block this user.",
      "modal__unblock__heading": "Unblock user",
      "modal__unblock__text": "Are you sure you want to unblock the user @name@?",
      "modal__unblock__text__multiple": "Users I want to unblock:",
      "modal__unblock__text__not_allowed": "You cannot unblock this user.",
      "modal__error__heading": "Error",
      "error__no_connection": "We're having trouble contacting the server, are you connected to the internet?",
      "error__api_bad_response": "The API returned an error so something has gone wrong, here it is @@error@@."
    }
  }
};
