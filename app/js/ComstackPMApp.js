"use strict";function deleteConversationState(a,b){this.activate=function(c,d,e){b.open({templateUrl:c,controller:"DeleteConversationCtrl",backdrop:"static",size:"sm"}).result.then(function(b){b===!0&&a.go(d.state,d.params,{reload:d.state,inherit:!1,notify:!0})},function(){a.go(e.state,e.params)})}}function reportConversationState(a,b){this.activate=function(c,d,e){b.open({templateUrl:c,controller:"ReportConversationCtrl",backdrop:"static",size:"md"}).result.then(function(b){b===!0&&a.go(d.state,d.params,{reload:d.state,inherit:!1,notify:!0})},function(){a.go(e.state,e.params)})}}function blockUserState(a,b){this.activate=function(c,d,e){b.open({templateUrl:c,controller:"BlockUserCtrl",backdrop:"static",size:"sm"}).result.then(function(b){b===!0&&a.go(d.state,d.params,{reload:d.state,inherit:!1,notify:!0})},function(){a.go(e.state,e.params)})}}var app=angular.module("ComstackPMApp",["ui.router","ui.bootstrap","ComstackPMApp.Services","ngTagsInput","luegg.directives","emguo.poller","ui.scroll","ui.scroll.jqlite","ComstackPMApp.Directives"]);app.config(["$urlRouterProvider","$stateProvider","configurationServiceProvider","$httpProvider",function(a,b,c,d){d.interceptors.push("requestInterceptor");var e=c.get(),f=e.library_path,g=e.environment;switch(g){case"local":a.otherwise("/home");break;default:a.otherwise("/inbox/1")}b.state("Home",{url:"/home",controller:"HomeCtrl",templateUrl:f+"/app/html/home.html"}).state("inbox",{url:"/inbox/:page",controller:"InboxCtrl",templateUrl:f+"/app/html/inbox.html"}).state("message",{url:"/message",controller:"MessageCtrl",templateUrl:f+"/app/html/message.html"}).state("conversation",{url:"/conversation/:id",controller:"ConversationCtrl",templateUrl:f+"/app/html/conversation.html"}).state("inbox.delete",{url:"/delete/:id",onEnter:["deleteConversationState","$stateParams",function(a,b){a.activate(f+"/app/html/deleteConversation.html",{state:"inbox",params:b},{state:"inbox",params:b})}]}).state("conversation.delete",{url:"/delete",onEnter:["deleteConversationState","$stateParams",function(a,b){a.activate(f+"/app/html/deleteConversation.html",{state:"inbox",params:{page:1}},{state:"conversation",params:b})}]}).state("inbox.report",{url:"/report/:id",onEnter:["reportConversationState","$stateParams",function(a,b){a.activate(f+"/app/html/reportConversation.html",{state:"inbox",params:b},{state:"inbox",params:b})}]}).state("conversation.report",{url:"/report",onEnter:["reportConversationState","$stateParams",function(a,b){a.activate(f+"/app/html/reportConversation.html",{state:"inbox",params:{page:1}},{state:"conversation",params:b})}]}).state("conversation.block",{url:"/block",onEnter:["blockUserState","$stateParams",function(a,b){a.activate(f+"/app/html/blockUser.html",{state:"conversation",params:b},{state:"conversation",params:b})}]})}]);var app=angular.module("ComstackPMApp");app.provider("configurationService",function(){var a={base_url:"https://cancerchat01dev.prod.acquia-sites.com",api_url:"https://cancerchat01dev.prod.acquia-sites.com/api/v1",local_host:"cancerchatdev.localweb",environment:"",authorization_header:"Basic Q1JVSzAxOnl1RGFiOG5lIQ==",access_token:"",csrf_token:"",lastMessageId:9999,library_path:"http://cancerchatdev.localweb:8000",max_participants:4,message_maxlength:1e5,allow_emoji:!1,allow_separate_conversations:!1,share_data_storage:!0,poll_intervals:{conversations:30,messages:15,available_users:300},strings:{heading__messages:"Messages",heading__conversation_with:"Conversation with @participants@",text__last_message:"Last message",text__no_available_users:"",text__read_only:'You\'re currently opted out of private messaging, <a href="https://.com/user/@user_id@/account-settings">click here</a> to go the the account settings form.',text__select_messages_to_delete:"Select the messages you'd like to delete",text__select_messages_to_report:"Select the messages you'd like to report",text__no_conversations:"<p>You've not been part of any conversations yet!</p><p>Make sure that you've <a href=\"https://.com/friends/@user_id@\">added your friends</a> then start a new conversation.</p>",form__new_conversation__header:'You must be friends with a person before you can send them messages. <a href="https://.com/user/@user_id@/account-settings">Find and add friends</a>',form__to__label:"To",form__to__placeholder__singular:"Enter recipients username...",form__to__placeholder__plural:"Enter recipients username...",form__to__validation__limit_exceeded:"You cannot contact more than @number_label@ at once",form__to__validation__empty:"Who would you like to talk to?",form__text__placeholder:"Write a message...",form__text__validation__empty:"You'll need to enter some text here...",form__text__validation__maxlength:"You can only have @@number@@ characters per message",form__text__warning__emoji:"Emoji will be replaced with space",form__new_conversation__submit:"Send",form__reply__placeholder:"Enter your reply...",form__reply__submit:"Reply",form__report__label:"Reason for reporting",form__report__submit:"Report",link__delete:"Delete",link__report:"Report",link__block:"Block",link__unblock:"Unblock",link__no_available_users:"Find your friends",button__new_conversation:"New message",button__load_older_messages:"Load older messages",button__friends_list:"Friends list",button__ok:"OK",button__cancel:"Cancel",modal__delete_conversation__heading:"Delete conversation",modal__delete_conversation__text:"Are you sure you want to delete this conversation?",modal__report__heading:"Report conversation",modal__block__heading:"Block user",modal__block__text:"Are you sure you want to block the user @name@?",modal__block__not__allowed__text:"You cannot block this user",modal__block__text__multiple:"Users I want to block:",error__no_connection:"We're having trouble contacting the server, are you connected to the internet?",error__api_bad_response:"The API returned an error so something has gone wrong, here it is @@error@@."}};"undefined"!=typeof Comstack&&"undefined"!=typeof Comstack.PMApp&&"undefined"!=typeof Comstack.PMApp.Settings&&angular.merge(a,Comstack.PMApp.Settings),this.setSettingValue=function(b,c){a[b]=c},this.get=function(){return a},this.getSetting=function(b){var c=a;return angular.isString(b)&&(b=[b]),angular.isArray(b)?(angular.forEach(b,function(a){c=c[a]}),c):""},this.set=function(b){a=b},this.getString=function(b,c){c=c||{};var d=/@(\w*)@/gi;return a.strings[b].replace(d,function(a){return a=a.replace(/@/gi,""),c[a]})},this.appSettings=a;var b=this;this.$get=function(){return{appSettings:b.appSettings,get:b.get,set:b.set,getSetting:b.getSetting,setSettingValue:b.setSettingValue,getString:b.getString}}}),angular.module("ComstackPMApp.Directives",[]).directive("emoji",function(){return{restrict:"EA",require:"ngModel",link:function(a,b,c,d){d.$validators.emoji=function(a,b){var c=/(\ud83d[\ude01-\ude4f]|[\u2702-\u27b0]|\ud83d[\ude80-\udec0]|\ud83c[\udd70-\ude51]|[\u00A9-\u00AE]| [\u203C-\u2049]|[\u0030-\u0039]|[\u2122-\u21aa]|[\u231A-\u23F3]|[\u25AA-\u25FE]|[\u2600-\u26FD]|[\u2934-\u2935]|[\u2B05-\u2B55]|[\u3030-\u303D]|[\u3297-\u3299]|\ud83c[\udc04-\udff0]|\ud83d[\udc0c-\uddff]|\ud83d[\ude00-\ude36]|\ud83d[\ude81-\udec5]|\ud83c[\udf0d-\udfe4]|\ud83d[\udc00-\udd67])/g;if(d.$isEmpty(a))return!0;if(c.test(b)){var e=b.replace(c,"");return/\S/.test(e)?!0:!1}return!0},d.$validators.emojiWarning=function(a,b){var c=/(\ud83d[\ude01-\ude4f]|[\u2702-\u27b0]|\ud83d[\ude80-\udec0]|\ud83c[\udd70-\ude51]|[\u00A9-\u00AE]| [\u203C-\u2049]|[\u0030-\u0039]|[\u2122-\u21aa]|[\u231A-\u23F3]|[\u25AA-\u25FE]|[\u2600-\u26FD]|[\u2934-\u2935]|[\u2B05-\u2B55]|[\u3030-\u303D]|[\u3297-\u3299]|\ud83c[\udc04-\udff0]|\ud83d[\udc0c-\uddff]|\ud83d[\ude00-\ude36]|\ud83d[\ude81-\udec5]|\ud83c[\udf0d-\udfe4]|\ud83d[\udc00-\udd67])/g;if(d.$isEmpty(a))return!0;if(c.test(b)){var e=b.replace(c,"");return/\S/.test(e)?!1:!0}return!0}}}}),app.filter("htmlsafe",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),app.filter("truncate",[function(){return function(a,b,c){var d=a;return angular.isUndefined(a)?"":(angular.isUndefined(c)&&(c="..."),d.length>b&&(d=d.substr(0,b)+c),d)}}]),app.filter("dateFromNow",["$window",function(a){return function(b){return a.moment(b).fromNow()}}]),app.filter("formatDate",["$window",function(a){return function(b,c){return"string"!=typeof c&&(c="hh:mm MMMM Do, YYYY"),a.moment(b).format(c)}}]),app.controller("HomeCtrl",["$scope","Authentication","$timeout","$state","$location","configurationService",function(a,b,c,d,e,f){a.isAuthenticated=!1,a.message="",a.loginData={username:"basic_user_1",password:"password"},a.login=function(){var c=e.host(),g=f.get();c==g.local_host&&""==g.access_token?b.apiLogin(a.loginData.username,a.loginData.password).then(function(){console.log("Login done"),a.isAuthenticated=!0,a.message="Login done",d.go("inbox",{page:1})},function(a){console.error(a)}):d.go("inbox",{page:1})}}]),app.controller("InboxCtrl",["$scope","$window","$state","$stateParams","getCurrentUser","Conversation","configurationService","$filter","poller",function(a,b,c,d,e,f,g,h,i){var j=function(){a.paging.pagesCount=b.Math.ceil(a.paging.total/a.paging.range);for(var c=0;c<a.paging.pagesCount;c++)a.pages[c]={number:c+1,url:"#/inbox/"+(c+1)}},k=function(){a.text_heading_messages=g.getString("heading__messages"),a.text_last_message=g.getString("text__last_message"),a.text_read_only=g.getString("text__read_only",{name:a.currentUser.user.name,user_id:a.currentUser.user.id}),a.text_link_delete=g.getString("link__delete"),a.text_link_report=g.getString("link__report"),a.button_new_conversation=g.getString("button__new_conversation"),a.text_no_conversations=g.getString("text__no_conversations",{user_id:a.currentUser.user.id}),a.button_friends_list=g.getString("button__friends_list"),a.friends_link=g.getSetting("base_url")+"/friends/"+a.currentUser.user.id};a.goToPage=function(a){c.go("inbox",{page:a})},a.previous=function(){angular.isDefined(a.paging.previous)&&a.goToPage(a.paging.current_page-1)},a.next=function(){angular.isDefined(a.paging.next)&&a.goToPage(a.paging.current_page+1)},a.fromNow=function(a){return moment(a).fromNow()},a.formatDate=function(a){return moment(a).format("hh:mm MMMM Do, YYYY")},a.computeHeading=function(b){if(angular.isUndefined(a.currentUser.user))return"";var c=b.participants,d="";return 0===c.length&&(c=b.historical_participants),c=h("filter")(c,{id:"!"+a.currentUser.user.id}),angular.forEach(c,function(a,b){var e="";b===c.length-2?e=" and ":b!==c.length-1&&(e=", "),d=d+a.name+e}),d},a.conversations=[],a.paging={},a.currentUser={},a.conversationsPollDelay=1e3*g.getSetting(["poll_intervals","conversations"]),e.get().then(function(b){a.currentUser=b.data,k()});var l=i.get(f,{action:"get",argumentsArray:[{page:d.page}],delay:a.conversationsPollDelay});l.promise.then(null,null,function(b){angular.equals(a.conversations,b.data)||(a.conversations=b.data),a.paging=b.paging,j(),a.currentUser.preferences.read_only_mode&&l.stop()}),a.paging.pagesCount=0,a.pages=[]}]),app.controller("ConversationCtrl",["$scope","$window","$state","$stateParams","$filter","$sce","getCurrentUser","User","Conversation","configurationService","$timeout","poller",function(a,b,c,d,e,f,g,h,i,j,k,l){var m=j.get(),n=function(){i.markAsRead({id:d.id},{}).$promise.then(function(a){})},o=function(b,c,d){var f=[];return a.glued=c,b.data.length>0&&(b.data[0].id>a.lastMessageId?a.lastMessageId=b.data[0].id:a.lastMessageId,j.setSettingValue("lastMessageId",a.lastMessageId),a.paging=b.paging,f.push.apply(f,b.data),f=e("orderBy")(f,"id"),f.length<10?a.moreMessages=!1:a.moreMessages=!0),f},p=function(b){var c=b.participants,d="";0===c.length&&(c=b.historical_participants),c=e("filter")(c,{id:"!"+a.currentUser.user.id}),angular.forEach(c,function(a,b){var e="";b===c.length-2?e=" and ":b!==c.length-1&&(e=", "),d=d+a.name+e}),a.conversationHeading=j.getString("heading__conversation_with",{participants:d})},q=function(){a.text_read_only=j.getString("text__read_only",{name:a.currentUser.user.name,user_id:a.currentUser.user.id}),a.textMaxLength=m.message_maxlength,a.allow_emoji=m.allow_emoji,a.form_reply_submit=j.getString("form__reply__submit"),a.link__delete=j.getString("link__delete"),a.link__report=j.getString("link__report"),a.link__block=j.getString("link__block"),a.heading__messages=j.getString("heading__messages"),a.button__new_conversation=j.getString("button__new_conversation"),a.button__load_older_messages=j.getString("button__load_older_messages"),a.text__select_messages_to_delete=j.getString("text__select_messages_to_delete"),a.form_reply_placeholder=j.getString("form__reply__placeholder"),a.form_text_validation_maxlength=j.getString("form__text__validation__maxlength",{number:a.textMaxLength}),a.form_text_validation_empty=j.getString("form__text__validation__empty"),a.form_text_warning_emoji=j.getString("form__text__warning__emoji")},r=function(b){if(angular.isUndefined(a.currentUser.user))return a.isContactAvailable=!1,void(a.isContactBlocked=!1);var c=e("filter")(b.participants,{id:"!"+a.currentUser.user.id}),d=c[0].id;h.getBlockedUsers({"filter[user]":d}).$promise.then(function(b){return a.isContactBlocked=b.hasOwnProperty("data")&&1===e("filter")(b.data,{user:{id:d}}).length,a.isContactBlocked?void(a.isContactAvailable=!1):void h.getAvailableUsers({"filter[id]":d}).$promise.then(function(b){a.isContactAvailable=b.hasOwnProperty("data")&&1===e("filter")(b.data,{id:d}).length})})},s=function(a,b){return function(c){return c[a]>b}};a.paging={},a.glued=!0,a.messages=[],a.lastIndex=0,a.scrollCalls=0,a.paging={},a.currentUser={},a.reply={text:""},a.conversationHeading="Conversation",a.isContactAvailable=!1,a.isContactBlocked=!1,a.scrollAdapter={},a.moreMessages=!1,a.messagesPollDelay=1e3*j.getSetting(["poll_intervals","messages"]),a.lastMessageId=0,a.scrollPosition="bottom",a.messagesDatasource={get:function(b,c,e){var f="",g="",h="",j="";a.scrollCalls<3?(1==b&&(a.scrollCalls++,k(function(){i.getMessages({id:d.id,before:"",after:""}).$promise.then(function(a){e(o(a,!0,b)),n()})})),b==1-c&&(a.scrollCalls++,i.getMessages({id:d.id,after:a.paging.cursors.after,before:""}).$promise.then(function(c){e(o(c,!1,b)),a.scrollPosition="between"})),b==c+1&&(a.scrollCalls++,k(function(){e([])}))):null!==a.paging.next||null!==a.paging.previous?(a.scrollCalls++,angular.isUndefined(a.paging.next)||(f=a.paging.cursors.after),angular.isUndefined(a.paging.previous)||(g=a.paging.cursors.before),j=g,h=f,b>a.lastIndex?h="":j="",a.lastIndex=b,k(function(){i.getMessages({id:d.id,before:j,after:h}).$promise.then(function(c){c.data.length<10?(n(),b>=a.lastIndex?a.scrollPosition="bottom":a.scrollPosition="top"):a.scrollPosition="between",e(o(c,!1,b))})})):e([])}},a.unglue=function(){a.glued=!1},a.loadMore=function(){null!==a.paging.next&&i.getMessages({id:d.id,before:a.paging.cursors.before,after:""}).$promise.then(function(b){a.glued=!1,a.messages.push.apply(a.messages,b.data),a.paging=b.paging})},a.goToInbox=function(){c.go("inbox",{page:1},{reload:"inbox"})},a.submitReply=function(){""!==a.reply.text&&i.reply({id:d.id},a.reply).$promise.then(function(b){a.glued=!0,a.scrollAdapter.append([b.data[0]]),a.reply.text="",k(function(){a.glued=!1})})},g.get().then(function(b){a.currentUser=b.data,q(),i.get({id:d.id,access_token:m.access_token}).$promise.then(function(a){p(a.data),r(a.data),n()})});var t=l.get(i,{action:"getMessages",argumentsArray:[{id:d.id,range:50,poll:!0}],delay:a.messagesPollDelay,smart:!0});t.promise.then(null,null,function(b){var c=[];console.log("messages poll try"),a.scrollCalls>=3&&b.data.length>0&&(c.push.apply(c,b.data),c=e("filter")(c,s("id",a.lastMessageId),!0),c=e("orderBy")(c,"id"),c.length>0&&(a.scrollAdapter.append(c),"bottom"==a.scrollPosition&&(a.glued=!0),console.log(a.scrollPosition),k(function(){a.glued=!1})),b.data[0].id>a.lastMessageId?a.lastMessageId=b.data[0].id:a.lastMessageId,j.setSettingValue("lastMessageId",a.lastMessageId),console.log("messages poll done"),console.log(c)),angular.isUndefined(a.currentUser.user)&&a.currentUser.preferences.read_only_mode&&t.stop()})}]),app.controller("MessageCtrl",["$scope","$state","getAvailableUsers","configurationService","Conversation","getCurrentUser",function(a,b,c,d,e,f){var g=d.get();a.currentUser={},f.get().then(function(b){a.currentUser=b.data,a.new_conversation_header=d.getString("form__new_conversation__header",{user_id:a.currentUser.user.id})}),a.allow_emoji=g.allow_emoji,a.maxTags=g.max_participants-1;var h="";a.textMaxLength=g.message_maxlength,a.form_to_label=d.getString("form__to__label"),1==a.maxTags?(a.form_to_placeholder=d.getString("form__to__placeholder__singular"),h="1 person"):(a.form_to_placeholder=d.getString("form__to__placeholder__plural"),h="2 people"),a.form_to_validation_empty=d.getString("form__to__validation__empty"),a.form_to_validation_limit_exceeded=d.getString("form__to__validation__limit_exceeded",{number_label:h}),a.form_text_placeholder=d.getString("form__text__placeholder"),a.form_text_validation_empty=d.getString("form__text__validation__empty"),a.form_text_validation_maxlength=d.getString("form__text__validation__maxlength",{number:a.textMaxLength}),a.form_new_conversation_submit=d.getString("form__new_conversation__submit"),a.form_text_warning_emoji=d.getString("form__text__warning__emoji"),a.message=new e({recipients:[],text:""}),a.newMessageForm={},a.users=[],a.checkEmptyTag=function(a){return 0!=a.id},a.getAvailableUsers=function(b){return a.noResults="",c.get(b).then(function(b){return 0==b.data.length?(a.noResults="No users found",[{id:0,name:"not found",avatars:{"200-200":""}}]):b.data.map(function(a){return a})})},a.save=function(){a.message.recipients=a.users.map(function(a){return a.id}),a.message.$save(function(a){b.go("conversation",{id:a.data.id},{reload:"conversation",inherit:!1,notify:!0})},function(a){console.log(a)})}}]),app.controller("DeleteConversationCtrl",["$scope","$modalInstance","Conversation","$stateParams","configurationService",function(a,b,c,d,e){a.modal_delete_conversation__heading=e.getString("modal__delete_conversation__heading"),a.modal_delete_conversation_text=e.getString("modal__delete_conversation__text"),a.cancel=function(){b.dismiss("cancel")},a.confirm=function(){c.get({id:d.id,access_token:e.getSetting("access_token")}).$promise.then(function(a){a.$delete({id:a.data.id},function(){b.close(!0)},function(a){console.log(a)})})}}]),app.controller("ReportConversationCtrl",["$scope","$modalInstance","Conversation","$stateParams","configurationService",function(a,b,c,d,e){var f={isSpam:"spam",isAbuse:"abuse",isBreach:"breach",isUnknown:"unknown",isOther:"other"};a.modal_report_heading=e.getString("modal__report__heading"),a.data={isSpam:!1,isAbuse:!1,isBreach:!1,isUnknown:!1,isOther:!1,otherDetails:""},a.cancel=function(){b.dismiss("cancel")},a.confirm=function(){var e={conversation_id:d.id,reasons:[],other_reason:a.data.otherDetails,posts:[]};a.data.isSpam?e.reasons.push(f.isSpam):"",a.data.isAbuse?e.reasons.push(f.isAbuse):"",a.data.isBreach?e.reasons.push(f.isBreach):"",a.data.isUnknown?e.reasons.push(f.isUnknown):"",a.data.isOther?e.reasons.push(f.isOther):"",c.report({id:d.id},a.report,function(){b.close(!0)},function(a){console.log(a)})}}]),app.controller("BlockUserCtrl",["$scope","$modalInstance","$stateParams","configurationService","Conversation","getCurrentUser","$filter","User",function(a,b,c,d,e,f,g,h){var i=function(b){return angular.isUndefined(a.currentUser.user)?[]:(b.participants.forEach(function(b){a.users.push(b)}),0===a.users.length&&b.historical_participants.forEach(function(b){a.users.push(b)}),a.users=g("filter")(a.users,{id:"!"+a.currentUser.user.id}),void a.users.forEach(function(a){a.isSelected=!1}))};a.currentUser={},a.users=[],a.modal_block_heading=d.getString("modal__block__heading"),a.button_ok=d.getString("button__ok"),a.button_cancel=d.getString("button__cancel"),f.get().then(function(b){a.currentUser=b.data,e.get({id:c.id,access_token:d.getSetting("access_token")}).$promise.then(function(b){i(b.data),a.currentUser.permissions.users.block?1==a.users.length?(a.modal_block_text=d.getString("modal__block__text",{name:a.users[0].name}),a.users[0].isSelected=!0):a.modal_block_text=d.getString("modal__block__text__multiple"):a.modal_block_text=d.getString("modal__block__not__allowed__text")})}),a.cancel=function(){b.dismiss("cancel")},a.confirm=function(){a.users.forEach(function(a){a.isSelected&&h.block({user:a.id},function(){a.isBlocked=!0},function(a){console.log(a)})});var c=g("filter")(a.users,{isBlocked:!0}),d=g("filter")(a.users,{isSelected:!0});c.length==d.length&&b.close(!0)}}]);var serviceModule=angular.module("ComstackPMApp.Services",["ngResource"]);serviceModule.config(["$httpProvider",function(a){delete a.defaults.headers.common["X-Requested-With"],a.defaults.useXDomain=!0,a.defaults.withCredentials=!0}]),function(a){var b=a.module("ComstackPMApp.Services");b.factory("Authentication",["$http","$q","configurationService",function(a,b,c){var d=c.get(),e=atob(d.authorization_header.replace("Basic ","")),f=d.base_url.replace("https://","https://"+e+"@"),g=function(c,d){var e=b.defer();console.log("Starting form auth...");var g=f+"/home?destination=home",h="name="+c+"&login-do=yes&pass="+d+"&form_id=user_login_block&op=Sign+in";return a.post(g,h,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(a){console.log("Succeeded form auth..."),e.resolve(a)}).error(function(a,b){console.log("Failed form auth..."),e.reject(a)}),e.promise},h=function(){var c=b.defer();return console.log("Starting basic auth..."),a.get(f,{}).success(function(a){console.log("Succeeded basic auth..."),c.resolve(a)}).error(function(a,b){console.log("Failed basic auth..."),c.reject(a)}),c.promise},i=function(){var c=b.defer();return console.log("Starting get token..."),a.get(f+"/api/login-token",{}).success(function(a){console.log("Succeeded get token..."),c.resolve(a)}).error(function(a,b){console.log("Failed basic auth..."),c.reject(a)}),c.promise},j=function(){var c=b.defer();return console.log("Starting get token..."),a.get(f+"/api/session/token",{}).success(function(a){console.log("Succeeded get CSRFToken..."),c.resolve(a)}).error(function(a,b){console.log("Failed get CSRFToken..."),c.reject(a)}),c.promise},k=function(a,d){var e=b.defer();return h().then(function(b){console.log("Succeeded basic auth..."),g(a,d).then(function(a){console.log("Succeeded form auth..."),i().then(function(a){console.log("Succeeded get token..."),Comstack.PMApp.Settings.access_token=a.access_token,c.setSettingValue("access_token",a.access_token),j().then(function(a){console.log("Succeeded get CSRFToken..."),Comstack.PMApp.Settings.csrf_token=a["X-CSRF-Token"],c.setSettingValue("csrf_token",a["X-CSRF-Token"]),e.resolve(a)},function(a){console.log("Failed CSRFToken token..."),console.log(a),e.reject(a)})},function(a){console.log("Failed get token..."),console.log(a),e.reject(a)})},function(a){console.log("Failed form auth..."),console.log(a)})},function(a){console.log("Failed basic auth..."),console.log(a)}),e.promise};return{apiLogin:k}}])}(angular);var services=angular.module("ComstackPMApp.Services");services.factory("User",["$resource","configurationService",function(a,b){var c=b.get();return a("",{},{getCurrentUser:{method:"GET",url:c.api_url+"/cs-pm/users/current-user?access_token="+c.access_token,isArray:!1},getAvailableUsers:{method:"GET",url:c.api_url+"/cs-pm/users/available-users",params:{access_token:c.access_token,"autocomplete[string]":"@search"},isArray:!1},getBlockedUsers:{method:"GET",url:c.api_url+"/cs-fr/blocked",params:{access_token:c.access_token}},block:{method:"POST",url:c.api_url+"/cs-fr/blocked",params:{access_token:c.access_token},headers:{"X-CSRF-Token":c.csrf_token}}})}]),services.factory("getCurrentUser",["User","$q",function(a,b){var c={};return c.get=function(){var c=b.defer();return a.getCurrentUser(function(a){c.resolve(a)},function(){c.reject("Unable to fetch current user")}),c.promise},c}]),services.factory("getAvailableUsers",["User","$q",function(a,b){var c={};return c.get=function(c){var d=b.defer();return a.getAvailableUsers({"autocomplete[string]":c},function(a){d.resolve(a)},function(){d.reject("Unable to fetch current user")}),d.promise},c}]);var services=angular.module("ComstackPMApp.Services");services.factory("Conversation",["$resource","configurationService",function(a,b){var c=b.get();return a(c.api_url+"/cs-pm/conversations/:id",{access_token:c.access_token,page:"@page"},{getMessages:{method:"GET",url:c.api_url+"/cs-pm/conversations/:id/messages/",params:{access_token:c.access_token,before:"",after:"",range:10},isArray:!1},reply:{method:"POST",url:c.api_url+"/cs-pm/conversations/:id/reply",params:{access_token:c.access_token},headers:{"X-CSRF-Token":c.csrf_token},isArray:!1},save:{method:"POST",headers:{"X-CSRF-Token":c.csrf_token}},"delete":{method:"DELETE",url:c.api_url+"/cs-pm/conversations/:id",params:{access_token:c.access_token},headers:{"X-CSRF-Token":c.csrf_token}},report:{method:"POST",url:c.api_url+"/cs-pm/conversations/:id/report",params:{access_token:c.access_token},headers:{"X-CSRF-Token":c.csrf_token}},markAsRead:{method:"PUT",url:c.api_url+"/cs-pm/conversations/:id/mark-as-read",params:{access_token:c.access_token},headers:{"X-CSRF-Token":c.csrf_token},isArray:!1}})}]),services.factory("pollMessages",["Conversation","$q",function(a,b){var c={};return c.get=function(c,d,e,f){var g=b.defer();return a.getMessages({id:c,before:d,after:e,range:f},function(a){g.resolve(a)},function(){g.reject("Unable to fetch messages for conversation")}),g.promise},c}]);var services=angular.module("ComstackPMApp.Services");services.service("deleteConversationState",["$state","$modal",deleteConversationState]);var services=angular.module("ComstackPMApp.Services");services.service("reportConversationState",["$state","$modal",reportConversationState]);var services=angular.module("ComstackPMApp.Services");services.service("blockUserState",["$state","$modal",blockUserState]);var services=angular.module("ComstackPMApp.Services");services.factory("requestInterceptor",["configurationService",function(a){return{request:function(b){return-1!=b.url.indexOf(a.getSetting("api_url"))&&(angular.isUndefined(b.params)||angular.isUndefined(b.params.poll)||(b.params=b.params||{},b.params.before=a.getSetting("lastMessageId"))),b}}}]);