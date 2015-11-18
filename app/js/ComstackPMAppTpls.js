angular.module('ComstackPMApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('html/blockUser.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "  <button ng-click=\"cancel()\" type=\"button\" class=\"bootbox-close-button close\" aria-hidden=\"true\">×</button>\r" +
    "\n" +
    "  <h4 class=\"modal-title\" ng-bind-html=\"modal_block_heading | htmlsafe\"></h4>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "  <div class=\"bootbox-body\" ng-bind-html=\"modal_block_text | htmlsafe\"></div>\r" +
    "\n" +
    "  <div class=\"checkbox\" ng-repeat=\"user in users\" ng-show=\"users.length > 1\">\r" +
    "\n" +
    "    <label><input type=\"checkbox\" ng-model=\"user.isSelected\">{{user.name}}</label>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "  <button ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\" ng-bind=\"button_cancel\"></button>\r" +
    "\n" +
    "  <button ng-click=\"confirm()\" type=\"button\" class=\"btn btn-primary\" ng-bind=\"button_ok\" ng-show=\"currentUser.permissions.users.block\"></button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('html/conversation.html',
    "<div id=\"message\" class=\"page-wrapper cs-pm-page-wrapper\" style=\"display: block\">\n" +
    "\n" +
    "  <div class=\"messages-header cs-pm__header clearfix\" ng-cloak>\n" +
    "    <h2 class=\"pull-left cs-pm-left\"><a ui-sref=\"inbox({page: 1})\" ui-sref-opts=\"{reload: true}\"\n" +
    "                                        class=\"messages-trigger\"><span\n" +
    "      class=\"icomoon icomoon-back cs-pm-icon--back\"></span>{{ heading__messages }}</a></h2>\n" +
    "\n" +
    "    <div class=\"pull-right cs-pm-right\"><a ui-sref=\"message\" class=\"btn btn-default cs-pm__new-message\" ng-show=\"!currentUser.preferences.read_only_mode\"><span\n" +
    "      class=\"icomoon icomoon-speech-bubble cs-pm-icon--new-message\"></span> {{ button__new_conversation }}</a></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"alert alert-warning\" ng-show=\"currentUser.preferences.read_only_mode\"\n" +
    "       ng-bind-html=\"text_read_only | htmlsafe\"></div>\n" +
    "\n" +
    "  <div class=\"messages-header cs-pm__header conversation-header clearfix\">\n" +
    "    <h2 class=\"pull-left cs-pm-left\" ng-cloak>{{ conversationHeading }}</h2>\n" +
    "\n" +
    "    <div class=\"conversation-actions\">\n" +
    "      <a href=\"\" ui-sref=\"conversation.delete\" class=\"btn btn-link btn-small delete-conversation\"\n" +
    "         ng-show=\"currentUser.permissions.conversations.leave\"\n" +
    "         ng-bind=\"link__delete\"></a>\n" +
    "      <a href=\"\" ui-sref=\"conversation.report\" class=\"btn btn-link btn-small report-conversation\"\n" +
    "         ng-show=\"currentUser.permissions.conversations.report\"\n" +
    "         ng-bind-html=\"link__report | htmlsafe\"></a>\n" +
    "      <a ng-hide=\"isContactBlocked || !currentUser.permissions.users.block\" href=\"\" ui-sref=\"conversation.block\" class=\"btn btn-link btn-small\"\n" +
    "         ng-bind=\"link__block\"></a>\n" +
    "      <a ng-show=\"isContactBlocked && currentUser.permissions.users.block\" ui-sref=\"conversation.unblock\" class=\"btn btn-link btn-small\"\n" +
    "         ng-bind=\"link__unblock\"></a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div id=\"conversation-wrapper\"\n" +
    "       class=\"conversation-wrapper\"\n" +
    "       style=\"max-height: 600px; overflow: auto\"\n" +
    "       scroll-glue=\"!!glued\"\n" +
    "       dynamic-scroll\n" +
    "       on-scroll-up=\"onScrollUp()\"\n" +
    "       on-scroll-down=\"onScrollDown()\"\n" +
    "       is-loading=\"isLoading\"\n" +
    "       eof-down=\"eofDown\"\n" +
    "       eof-up=\"eofUp\"\n" +
    "       is-mobile=\"isMobile\">\n" +
    "\n" +
    "    <div class=\"delete-message-msg collapse\">\n" +
    "      <div class=\"alert alert-info\" role=\"alert\" ng-cloak>{{ text__select_messages_to_delete }}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"clearfix text-center\">\n" +
    "      <a class=\"btn btn-primary btn-load-more\" id=\"loading\" disabled=\"disabled\" ng-show=\"isLoading\">\n" +
    "        <div class=\"sk-circle\">\n" +
    "          <div class=\"sk-circle1 sk-child\"></div>\n" +
    "          <div class=\"sk-circle2 sk-child\"></div>\n" +
    "          <div class=\"sk-circle3 sk-child\"></div>\n" +
    "          <div class=\"sk-circle4 sk-child\"></div>\n" +
    "          <div class=\"sk-circle5 sk-child\"></div>\n" +
    "          <div class=\"sk-circle6 sk-child\"></div>\n" +
    "          <div class=\"sk-circle7 sk-child\"></div>\n" +
    "          <div class=\"sk-circle8 sk-child\"></div>\n" +
    "          <div class=\"sk-circle9 sk-child\"></div>\n" +
    "          <div class=\"sk-circle10 sk-child\"></div>\n" +
    "          <div class=\"sk-circle11 sk-child\"></div>\n" +
    "          <div class=\"sk-circle12 sk-child\"></div>\n" +
    "        </div>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"clearfix text-center\">\n" +
    "      <a class=\"btn btn-primary btn-load-more\" id=\"load-more\" ng-cloak ng-click=\"loadMessages('', paging.cursors.after)\"\n" +
    "         ng-show=\"isMobile && moreMessages && !isLoading\">\n" +
    "        {{button__load_older_messages }}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"media-list\">\n" +
    "      <li ng-repeat=\"message in messages track by message.id\" buffer-size=\"10\" padding=\"0.3\"\n" +
    "          ng-class=\"{'message-own': message.sender.id === $parent.currentUser.user.id}\"\n" +
    "          class=\"media\" id=\"{{message.id}}\">\n" +
    "        <div ng-hide=\"'Hiding this until we implement message deletion'\"\n" +
    "             class=\"media-left checkbox-wrap\">\n" +
    "          <div class=\"checkbox\"><label><input type=\"checkbox\" value=\"message.id\"\n" +
    "                                              aria-label=\"Delete this message\"></label></div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"message.sender.id !== $parent.currentUser.user.id\" class=\"media-left cs-pm__avatar\">\n" +
    "          <img class=\"media-object\" ng-src=\"{{ message.sender.avatars['100-100'] }}\" alt=\"\"\n" +
    "               style=\"width:50px;height:50px;\">\n" +
    "        </div>\n" +
    "        <div class=\"cs-pm-body media-body\">\n" +
    "          <div class=\"cs-pm-message-meta message-meta small\"><a\n" +
    "            ng-hide=\"message.sender.id === $parent.currentUser.user.id\" ng-href=\"{{ message.sender.profile }}\"\n" +
    "            ng-bind=\"message.sender.name\"></a> <abbr class=\"timeago\"\n" +
    "                                                     ng-attr-title=\"{{message.sent | formatDate}}\"\n" +
    "                                                     ng-bind=\"message.fromNow\"></abbr></div>\n" +
    "          <div class=\"cs-pm-message message\" ng-class=\"{'arrow_box': message.sender.id != $parent.currentUser.user.id}\">\n" +
    "            <p ng-bind-html=\"message.text | htmlsafe\"></p></div>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"cs-pm-reply-wrapper reply-wrapper\">\n" +
    "    <div data-ng-form=\"newMessageForm\" novalidate role=\"form\">\n" +
    "      <div class=\"form-group\"\n" +
    "           ng-class=\"{'has-error': newMessageForm.replyText.$invalid && newMessageForm.replyText.$dirty && (newMessageForm.replyText.$error.maxlength || newMessageForm.replyText.$error.required || (newMessageForm.replyText.$error.emoji && !allow_emoji))}\">\n" +
    "\n" +
    "         <textarea emoji\n" +
    "                   ctrl-enter=\"submitReply()\"\n" +
    "                   class=\"form-control\"\n" +
    "                   id=\"replyText\"\n" +
    "                   name=\"replyText\"\n" +
    "                   class=\"form-control\"\n" +
    "                   ng-change=\"unglue()\"\n" +
    "                   ng-maxlength=\"textMaxLength\"\n" +
    "                   ng-disabled=\"currentUser.preferences.read_only_mode || !isContactAvailable\"\n" +
    "                   rows=\"3\"\n" +
    "                   placeholder=\"{{form_reply_placeholder}}\"\n" +
    "                   ng-model=\"reply.text\"\n" +
    "                   required></textarea>\n" +
    "\n" +
    "      <span class=\"help-block\"\n" +
    "            ng-show=\"newMessageForm.replyText.$dirty && (newMessageForm.replyText.$error.required || (newMessageForm.replyText.$error.emoji && !allow_emoji))\"\n" +
    "            ng-bind-html=\"form_text_validation_empty | htmlsafe\"></span>\n" +
    "      <span class=\"help-block\"\n" +
    "            ng-show=\"newMessageForm.replyText.$dirty && newMessageForm.replyText.$error.maxlength\"\n" +
    "            ng-bind-html=\"form_text_validation_maxlength | htmlsafe\"></span>\n" +
    "      <span class=\"help-block\"\n" +
    "            ng-show=\"newMessageForm.replyText.$dirty && (newMessageForm.replyText.$error.emojiWarning && !allow_emoji)\"\n" +
    "            ng-bind-html=\"form_text_warning_emoji | htmlsafe\"></span>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"clearfix\">\n" +
    "        <button id=\"reply-submit\" ng-click=\"submitReply()\" type=\"submit\"\n" +
    "                class=\"btn btn-default pull-right cs-pm-right message-trigger\"\n" +
    "                ng-disabled=\"(newMessageForm.replyText.$invalid && newMessageForm.replyText.$dirty && (newMessageForm.replyText.$error.maxlength || newMessageForm.replyText.$error.required || (newMessageForm.replyText.$error.emoji && !allow_emoji))) || currentUser.preferences.read_only_mode || !isContactAvailable || reply.text.length === 0\"\n" +
    "                ng-bind-html=\"form_reply_submit | htmlsafe\"></button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('html/deleteConversation.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "  <button ng-click=\"cancel()\" type=\"button\" class=\"bootbox-close-button close\" aria-hidden=\"true\">×</button>\r" +
    "\n" +
    "  <h4 class=\"modal-title\" ng-bind-html=\"modal_delete_conversation__heading | htmlsafe\"></h4>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "  <div class=\"bootbox-body\" ng-bind-html=\"modal_delete_conversation_text | htmlsafe\"></div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "  <button ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\">Cancel</button>\r" +
    "\n" +
    "  <button ng-click=\"confirm()\" type=\"button\" class=\"btn btn-primary\">OK</button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('html/error.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "  <button ng-click=\"cancel()\" type=\"button\" class=\"bootbox-close-button close\" aria-hidden=\"true\">×</button>\r" +
    "\n" +
    "  <h4 class=\"modal-title\" ng-bind-html=\"modal_error_heading | htmlsafe\"></h4>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "  <div class=\"bootbox-body\" ng-bind-html=\"errorMessage | htmlsafe\"></div>\r" +
    "\n" +
    "  </br>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div ng-click=\"showInner = !showInner\"\r" +
    "\n" +
    "    ng-bind-html=\"!showInner ? error_show_text : error_hide_text  | htmlsafe\" style=\"cursor: pointer;\">\r" +
    "\n" +
    "    <span class=\"glyphicon glyphicon-chevron-down\"></span>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"panel panel-danger\" ng-show=\"showInner\">\r" +
    "\n" +
    "    <div class=\"panel-body\" ng-bind-html=\"errorDetails | htmlsafe\"></div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "  <button ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\" ng-bind-html=\"button_ok | htmlsafe\"></button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('html/home.html',
    "<div id=\"loginWait\" ng-hide=\"isAuthenticated\">Login please wait...</div>\r" +
    "\n" +
    "<div id=\"loginDone\" ng-show=\"isAuthenticated\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"col-sm-4\"></div>\r" +
    "\n" +
    "<div class=\"col-sm-4\">\r" +
    "\n" +
    "<form name=\"loginForm\" role=\"form\" class=\"form-horizontal\">\r" +
    "\n" +
    "  <div class=\"form-group\">\r" +
    "\n" +
    "    <label class=\"control-label\">Username :</label>\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "      <input class=\"form-control\" type=\"text\" placeholder=\"Username\" id=\"username\" data-ng-model=\"loginData.username\" required autofocus>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"form-group\">\r" +
    "\n" +
    "    <label class=\"control-label\">Password :</label>\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "      <input id=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\" data-ng-model=\"loginData.password\" required>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"form-group\">\r" +
    "\n" +
    "    <div >\r" +
    "\n" +
    "      <button class=\"btn btn-lg btn-login btn-block\" type=\"submit\" id=\"login\" data-ng-disabled=\"loginForm.$invalid\" data-ng-click=\"login()\">Log In</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</form>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "<div class=\"col-sm-4\"></div>\r" +
    "\n"
  );


  $templateCache.put('html/inbox.html',
    "<div id=\"messages-wrapper\"\r" +
    "\n" +
    "     class=\"clearfix cs-pm__wrapper\"\r" +
    "\n" +
    "     style=\"margin-top: 10px;\" ng-cloak>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"cs-pm-new-wrapper new-wrapper\" style=\"height: 300px;\" ng-show=\"isLoading\">\r" +
    "\n" +
    "  <div class=\"clearfix text-center\" style=\"position: relative; top: 50%;\">\r" +
    "\n" +
    "    <a class=\"btn btn-primary btn-load-more\" id=\"loading\" disabled=\"disabled\">\r" +
    "\n" +
    "      <div class=\"sk-circle\">\r" +
    "\n" +
    "        <div class=\"sk-circle1 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle2 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle3 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle4 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle5 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle6 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle7 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle8 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle9 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle10 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle11 sk-child\"></div>\r" +
    "\n" +
    "        <div class=\"sk-circle12 sk-child\"></div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div id=\"messages\" class=\"page-wrapper cs-pm-page-wrapper\" ng-show=\"conversations.length\">\r" +
    "\n" +
    "    <div class=\"messages-header cs-pm__header clearfix\">\r" +
    "\n" +
    "      <h2 class=\"pull-left cs-pm-left\" style=\"\" ng-bind-html=\"text_heading_messages | htmlsafe\"></h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"pull-right cs-pm-right\">\r" +
    "\n" +
    "        <a href=\"{{friends_link}}\" class=\"btn btn-link btn-link-outline\">{{button_friends_list}}</a>\r" +
    "\n" +
    "        <a class=\"btn btn-default cs-pm__new-message\" ui-sref=\"message\" ng-hide=\"currentUser.preferences.read_only_mode\">\r" +
    "\n" +
    "          <span class=\"icomoon icomoon-speech-bubble cs-pm-icon--new-message\"></span> {{button_new_conversation}}\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"alert alert-warning\" ng-show=\"currentUser.preferences.read_only_mode\"\r" +
    "\n" +
    "         ng-bind-html=\"text_read_only | htmlsafe\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <ul class=\"media-list conversations-list\">\r" +
    "\n" +
    "      <li class=\"media cs-pm-conversation\" ng-class=\"{'conversation--unread': conversation.unread_count != 0}\"\r" +
    "\n" +
    "          ng-repeat=\"conversation in conversations\">\r" +
    "\n" +
    "        <div class=\"media-left cs-pm__avatar pull-left\">\r" +
    "\n" +
    "          <img class=\"media-object\"\r" +
    "\n" +
    "               ng-src=\"{{computeAvatar(conversation, '200-200')}}\"\r" +
    "\n" +
    "               alt=\"\"\r" +
    "\n" +
    "               style=\"width:50px;height:50px;\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"cs-pm-body media-body\">\r" +
    "\n" +
    "          <a ui-sref=\"conversation({id: conversation.id})\" class=\"message-trigger\">\r" +
    "\n" +
    "            <h4 class=\"media-heading\">{{computeHeading(conversation)}}\r" +
    "\n" +
    "              <span ng-show=\"conversation.unread_count != 0\"\r" +
    "\n" +
    "                    class=\"notifications-count\"\r" +
    "\n" +
    "                    ng-bind=\"conversation.unread_count\"></span>\r" +
    "\n" +
    "            </h4>\r" +
    "\n" +
    "            <span ng-switch=\"conversation.unread_count\">\r" +
    "\n" +
    "              <strong ng-switch-default\r" +
    "\n" +
    "                      ng-bind-html=\"conversation.last_message.text | squish | truncate:70 | htmlsafe \"></strong>\r" +
    "\n" +
    "              <p ng-switch-when=\"0\" ng-bind-html=\"conversation.last_message.text | squish | truncate:70 | htmlsafe \"></p>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <div class=\"date\">\r" +
    "\n" +
    "            <span class=\"hidden-xs\">{{text_last_message}}</span> <abbr class=\"timeago\"\r" +
    "\n" +
    "                                                                       ng-attr-title=\"{{formatDate(conversation.updated)}}\">{{fromNow(conversation.updated)}}</abbr>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <div class=\"controls\">\r" +
    "\n" +
    "            <small>\r" +
    "\n" +
    "              <a ui-sref=\"inbox.delete({id: conversation.id})\" class=\"delete-conversation\" ng-show=\"currentUser.permissions.conversations.leave\"\r" +
    "\n" +
    "                 ng-bind-html=\"text_link_delete | htmlsafe\"></a>\r" +
    "\n" +
    "              <span\r" +
    "\n" +
    "                ng-show=\"currentUser.permissions.conversations.leave && currentUser.permissions.conversations.report\"> | </span>\r" +
    "\n" +
    "              <a ui-sref=\"inbox.report({id: conversation.id})\" href=\"\" ng-click=\"report(conversation)\" class=\"report-conversation\" ng-show=\"currentUser.permissions.conversations.report\"\r" +
    "\n" +
    "                 ng-bind-html=\"text_link_report | htmlsafe\"></a>\r" +
    "\n" +
    "            </small>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"text-center\">\r" +
    "\n" +
    "      <div class=\"pagination-wrapper text-center\">\r" +
    "\n" +
    "        <ul class=\"pagination\" ng-show=\"pages.length > 1\">\r" +
    "\n" +
    "          <li ng-hide=\"paging.current_page === 1\" class=\"prev first\"><a ng-attr-href=\"#inbox/{{paging.current_page - 1}}\" title=\"Go to previous page\" ng-click=\"$event.preventDefault(); previous()\"></a></li>\r" +
    "\n" +
    "          <li ng-repeat=\"page in pages\"\r" +
    "\n" +
    "              ng-class=\"{'active': paging.current_page === page.number, 'first': page.number === 1}\">\r" +
    "\n" +
    "            <a ng-attr-href=\"{{page.url}}\" ng-click=\" $event.preventDefault(); goToPage(page.number)\" ng-attr-title=\"Go to page {{page.number}}\" ng-bind=\"page.number\"></a>\r" +
    "\n" +
    "          </li>\r" +
    "\n" +
    "          <li ng-hide=\"paging.current_page === pages.length\" class=\"next last\"><a ng-attr-href=\"#inbox/{{paging.current_page + 1}}\" title=\"Go to next page\" ng-click=\"$event.preventDefault(); next()\"></a></li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div id=\"messages-empty\" class=\"page-wrapper cs-pm-page-wrapper\" ng-hide=\"conversations.length || isLoading\" ng-cloak>\r" +
    "\n" +
    "    <div class=\"messages-header cs-pm__header clearfix\">\r" +
    "\n" +
    "      <h2 class=\"pull-left cs-pm-left\" style=\"\" ng-bind-html=\"text_heading_messages | htmlsafe\"></h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"pull-right cs-pm-right\">\r" +
    "\n" +
    "        <a href=\"{{friends_link}}\" class=\"btn btn-link btn-link-outline\">{{button_friends_list}}</a>\r" +
    "\n" +
    "        <a class=\"btn btn-default cs-pm__new-message\" ui-sref=\"message\" ng-hide=\"currentUser.preferences.read_only_mode\">\r" +
    "\n" +
    "          <span class=\"icomoon icomoon-speech-bubble cs-pm-icon--new-message\"></span> {{button_new_conversation}}\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"alert alert-warning\" ng-show=\"currentUser.preferences.read_only_mode\"\r" +
    "\n" +
    "         ng-bind-html=\"text_read_only | htmlsafe\"></div>\r" +
    "\n" +
    "    <div class=\"cs-pm-boxing messaging-boxing text-center\" ng-bind-html=\"text_no_conversations | htmlsafe\"></div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('html/message.html',
    "<div id=\"new-message\" class=\"page-wrapper cs-pm-page-wrapper\" style=\"display: block;\">\r" +
    "\n" +
    "  <div class=\"messages-header cs-pm__header clearfix\">\r" +
    "\n" +
    "    <h2 class=\"pull-left cs-pm-left\"><a ui-sref=\"inbox({page:1})\" class=\"messages-trigger\"><span\r" +
    "\n" +
    "      class=\"icomoon icomoon-back cs-pm-icon--back\"></span> Messages</a></h2>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"pull-right cs-pm-right\"><a ui-sref=\"inbox({page:1})\" class=\"btn btn-default messages-trigger\" ng-cloak><span\r" +
    "\n" +
    "      class=\"glyphicon glyphicon-remove cs-pm-icon--remove\"></span> {{ cancelString }}</a></div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div ng-show=\"isContactsAvailable\" data-ng-form=\"newMessageForm\" novalidate class=\"cs-pm-new-wrapper new-wrapper\" role=\"form\">\r" +
    "\n" +
    "    <div class=\"form-group\">\r" +
    "\n" +
    "      <p ng-bind-html=\"new_conversation_header | htmlsafe\"></a></p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"form-group\" ng-class=\"{'has-error': newMessageForm.recipients.$invalid && newMessageForm.recipients.$dirty}\">\r" +
    "\n" +
    "      <div class=\"input-group\" >\r" +
    "\n" +
    "        <div class=\"input-group-addon\" ng-bind=\"form_to_label\"></div>\r" +
    "\n" +
    "          <tags-input\r" +
    "\n" +
    "          class=\"form-control custom-tags\"\r" +
    "\n" +
    "          name=\"recipients\"\r" +
    "\n" +
    "          id=\"recipients\"\r" +
    "\n" +
    "          allow-leftover-text=\"false\"\r" +
    "\n" +
    "          ng-model=\"users\"\r" +
    "\n" +
    "          placeholder=\"{{users.length >= maxTags ? '': form_to_placeholder}}\"\r" +
    "\n" +
    "          display-property=\"name\"\r" +
    "\n" +
    "          key-property=\"id\"\r" +
    "\n" +
    "          add-from-autocomplete-only=\"true\"\r" +
    "\n" +
    "          max-tags=\"{{maxTags}}\"\r" +
    "\n" +
    "          on-tag-adding=\"$tag.id != 0\"\r" +
    "\n" +
    "          required>\r" +
    "\n" +
    "          <auto-complete\r" +
    "\n" +
    "            source=\"getAvailableUsers($query)\"\r" +
    "\n" +
    "            display-property=\"name\"\r" +
    "\n" +
    "            template=\"user-template\"\r" +
    "\n" +
    "          </auto-complete>\r" +
    "\n" +
    "        </tags-input>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <span class=\"help-block\"\r" +
    "\n" +
    "        ng-show=\"newMessageForm.recipients.$dirty && newMessageForm.recipients.$error.required\"\r" +
    "\n" +
    "        ng-bind-html=\"form_to_validation_empty | htmlsafe\">\r" +
    "\n" +
    "      </span>\r" +
    "\n" +
    "      <span class=\"help-block\"\r" +
    "\n" +
    "        ng-show=\"(newMessageForm.recipients.$dirty && !newMessageForm.recipients.$error.required && newMessageForm.recipients.$invalid && users.length > maxTags) || users.length > maxTags\"\r" +
    "\n" +
    "        ng-bind-html=\"form_to_validation_limit_exceeded | htmlsafe\">\r" +
    "\n" +
    "      </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"form-group\" ng-class=\"{'has-error': newMessageForm.message.$invalid && newMessageForm.message.$dirty && (newMessageForm.message.$error.maxlength || newMessageForm.message.$error.required || (newMessageForm.message.$error.emoji && !allow_emoji))}\">\r" +
    "\n" +
    "      <textarea class=\"form-control\"\r" +
    "\n" +
    "                ctrl-enter=\"save()\"\r" +
    "\n" +
    "        emoji\r" +
    "\n" +
    "        id=\"message\"\r" +
    "\n" +
    "        name=\"message\"\r" +
    "\n" +
    "        ng-maxlength=\"textMaxLength\"\r" +
    "\n" +
    "        rows=\"3\"\r" +
    "\n" +
    "        placeholder=\"{{form_text_placeholder}}\"\r" +
    "\n" +
    "        ng-model=\"message.text\"\r" +
    "\n" +
    "        required></textarea>\r" +
    "\n" +
    "      <span class=\"help-block\"\r" +
    "\n" +
    "        ng-show=\"newMessageForm.message.$dirty && (newMessageForm.message.$error.required || (newMessageForm.message.$error.emoji && !allow_emoji))\"\r" +
    "\n" +
    "        ng-bind-html=\"form_text_validation_empty | htmlsafe\"></span>\r" +
    "\n" +
    "      <span class=\"help-block\"\r" +
    "\n" +
    "        ng-show=\"newMessageForm.message.$dirty && newMessageForm.message.$error.maxlength\"\r" +
    "\n" +
    "        ng-bind-html=\"form_text_validation_maxlength | htmlsafe\"></span>\r" +
    "\n" +
    "      <span class=\"help-block\"\r" +
    "\n" +
    "        ng-show=\"newMessageForm.message.$dirty && (newMessageForm.message.$error.emojiWarning && !allow_emoji)\"\r" +
    "\n" +
    "        ng-bind-html=\"form_text_warning_emoji | htmlsafe\"></span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"clearfix\">\r" +
    "\n" +
    "      <button type=\"submit\"\r" +
    "\n" +
    "              ng-disabled=\"(newMessageForm.recipients.$invalid || (newMessageForm.message.$invalid && (newMessageForm.message.$error.maxlength || newMessageForm.message.$error.required || (newMessageForm.message.$error.emoji && !allow_emoji)))) || currentUser.preferences.read_only_mode\"\r" +
    "\n" +
    "              class=\"btn btn-default pull-right cs-pm-right message-trigger\"\r" +
    "\n" +
    "              ng-click=\"save()\" ng-bind=\"form_new_conversation_submit\">\r" +
    "\n" +
    "      </button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"user-template\">\r" +
    "\n" +
    "      <div>\r" +
    "\n" +
    "        <div style=\"float: left\">\r" +
    "\n" +
    "          <img class=\"media-object\" ng-show=\"data.avatars['200-200'] !=''\"\r" +
    "\n" +
    "               ng-src=\"{{data.avatars['200-200']}}\"\r" +
    "\n" +
    "               alt=\"\"\r" +
    "\n" +
    "               style=\"width:50px;height:50px;\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div style=\"float:left; margin-left: 5px\">\r" +
    "\n" +
    "          <div><span ng-bind-html=\"$highlight(data.name)\"></span></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </script>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div ng-hide=\"isContactsAvailable\" class=\"cs-pm-boxing messaging-boxing\">\r" +
    "\n" +
    "    <div class=\"form-group text-center\" ng-cloak>\r" +
    "\n" +
    "      <h1 class=\"text-muted\" style=\"font-size: 60px;\">!</h1>\r" +
    "\n" +
    "      <p>{{ text_no_friends }}</p>\r" +
    "\n" +
    "      <p><a ng-href=\"{{ friends_link }}\" class=\"btn btn-primary\">{{ text_friends_link }}</a></p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('html/reportConversation.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "  <button type=\"button\" ng-click=\"cancel()\" class=\"bootbox-close-button close\" aria-hidden=\"true\">×</button>\r" +
    "\n" +
    "  <h4 class=\"modal-title\" ng-bind-html=\"modal_report_heading | htmlsafe\"></h4>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "  <div class=\"bootbox-body\">Reason for reporting:</div>\r" +
    "\n" +
    "  <form name=\"reportForm\" ng-submit=\"save()\" class=\"form-horizontal\">\r" +
    "\n" +
    "    <div class=\"checkbox\">\r" +
    "\n" +
    "      <label><input type=\"checkbox\" ng-model=\"data.isSpam\">Spam or unsolicited advertising</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"checkbox\">\r" +
    "\n" +
    "      <label><input type=\"checkbox\" ng-model=\"data.isAbuse\">Abusive, impersonation or harassment</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"checkbox\">\r" +
    "\n" +
    "      <label><input type=\"checkbox\" ng-model=\"data.isObscene\">Obscene, violent or profane content</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"checkbox\">\r" +
    "\n" +
    "      <label><input type=\"checkbox\" ng-model=\"data.isBreach\">In breach of site terms and conditions</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"checkbox\"><label><input type=\"checkbox\" ng-model=\"data.isOther\">Other - please give details</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <textarea class=\"form-control\"\r" +
    "\n" +
    "              ng-show=\"data.isOther\"\r" +
    "\n" +
    "              id=\"otherDetails\"\r" +
    "\n" +
    "              name=\"otherDetails\"\r" +
    "\n" +
    "              ng-maxlength=\"{{ other_reason_maxlength }}\"\r" +
    "\n" +
    "              rows=\"3\"\r" +
    "\n" +
    "              placeholder=\"Write details\"\r" +
    "\n" +
    "              ng-model=\"data.otherDetails\"\r" +
    "\n" +
    "              ng-required=\"data.isOther\"></textarea>\r" +
    "\n" +
    "  </form>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "  <button ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\">Cancel</button>\r" +
    "\n" +
    "  <button ng-click=\"confirm()\"\r" +
    "\n" +
    "          type=\"button\"\r" +
    "\n" +
    "          class=\"btn btn-default report-close-trigger\"\r" +
    "\n" +
    "          ng-disabled=\"reportForm.$invalid || (!data.isSpam && !data.isAbuse && !data.isBreach && !data.isObscene && !data.isOther)\">Report</button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('html/unblockUser.html',
    "<div class=\"modal-header\">\r" +
    "\n" +
    "  <button ng-click=\"cancel()\" type=\"button\" class=\"bootbox-close-button close\" aria-hidden=\"true\">×</button>\r" +
    "\n" +
    "  <h4 class=\"modal-title\" ng-bind-html=\"modal_unblock_heading | htmlsafe\"></h4>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body\">\r" +
    "\n" +
    "  <div class=\"bootbox-body\" ng-bind-html=\"modal_unblock_text | htmlsafe\"></div>\r" +
    "\n" +
    "  <div class=\"checkbox\" ng-repeat=\"user in blockedUsers\" ng-show=\"blockedUsers.length > 1\">\r" +
    "\n" +
    "    <label><input type=\"checkbox\" ng-model=\"user.isSelected\">{{user.name}}</label>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-footer\">\r" +
    "\n" +
    "  <button ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\" ng-bind=\"button_cancel\"></button>\r" +
    "\n" +
    "  <button ng-click=\"confirm()\" type=\"button\" class=\"btn btn-primary\" ng-bind=\"button_ok\" ng-show=\"currentUser.permissions.users.block\"></button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

}]);
