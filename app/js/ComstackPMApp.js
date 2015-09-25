"use strict";var app=angular.module("ComstackPMApp",["ui.router","ComstackPMApp.Services"]);app.config(["$urlRouterProvider","$stateProvider",function(a,b){for(var c=document.getElementsByTagName("script"),d="",e="",f=0;f<c.length-1;f++)console.log(c[f]),-1!=c[f].src.indexOf("ComstackPMApp.js")&&(d=c[f].src);""!==d&&(e=d.substring(0,d.indexOf("/js/"))+"/"),console.log(e+"html/home.html"),a.otherwise("/home"),b.state("Home",{url:"/home",controller:"HomeCtrl",templateUrl:e+"html/home.html"}).state("inbox",{url:"/inbox/:page",controller:"InboxCtrl",templateUrl:e+"html/inbox.html"})}]);var configurationModule=angular.module("ComstackPMApp.Configuration",[]);configurationModule.factory("LocalSettings",function(){return{base_url:"https://cancerchat01dev.prod.acquia-sites.com",api_url:"https://cancerchat01dev.prod.acquia-sites.com/api/v1",local_host:"cancerchatdev.localweb",authorization_header:"Basic Q1JVSzAxOnl1RGFiOG5lIQ==",access_token:"",csrf_token:"",max_participants:2,allow_separate_conversations:!1,share_data_storage:!0,poll_intervals:{conversations:30,messages:15,available_users:300},strings:{heading__messages:"Messages",heading__conversation_with:"Conversation with @name",text__last_message:"Last message",text__no_available_users:"",text__read_only:"You're currently opted out of private @name@ messaging, <a href='https://blah.com/user/account/@user_id@'>click here</a> to go the the account settings form.",text__select_messages_to_delete:"Select the messages you'd like to delete",text__select_messages_to_report:"Select the messages you'd like to report",form__new_conversation__header:"You must be friends with a person before you can send them messages. <a href='https://blah.com/user/account/@user_id'>Find and add friends</a>",form__to__label:"To",form__to__placeholder__singular:"Enter recipients username...",form__to__placeholder__plural:"Enter recipients username...","form__text__placeholder [validation???]":"Write a message...",form__new_conversation__submit:"Send",form__reply__placeholder:"Enter your reply...",form__reply__submit:"Reply",form__report__label:"Reason for reporting",form__report__submit:"Report",link__delete:"Delete",link__report:"Report",link__block:"Block",link__no_available_users:"Find your friends",button__new_conversation:"New message",button__load_older_messages:"Load older messages",button__friends_list:"Friends list",button__ok:"OK",button__cancel:"Cancel",modal__delete_conversation__heading:"Delete conversation",modal__delete_conversation__text:"Are you sure you want to delete this conversation?",modal__report__heading:"Report conversation",modal__block__heading:"Block user",modal__block__text:"Are you sure you want to block this user?"}}}),app.filter("htmlsafe",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),app.filter("truncate",[function(){return function(a,b,c){var d=a;return angular.isUndefined(a)?"":(angular.isUndefined(c)&&(c="..."),d.length>b&&(d=d.substr(0,b)+c),d)}}]),app.controller("HomeCtrl",["$scope","Authentication","$timeout","$state","$location","ConfigurationService",function(a,b,c,d,e,f){a.isAuthenticated=!1,a.message="";var g=e.host(),h=f.get();g==h.local_host&&""==h.access_token?b.apiLogin().then(function(){console.log("Login done"),a.isAuthenticated=!0,a.message="Login done",d.go("inbox",{page:1})},function(a){console.error(a)}):d.go("inbox",{page:1})}]),app.controller("InboxCtrl",["$scope","$window","$state","$stateParams","getCurrentUser","getConversations","ConfigurationService",function(a,b,c,d,e,f,g){g.get();a.conversations=[],a.paging={},a.currentUser={},e.get().then(function(b){a.currentUser=b.data}),f.get(d.page).then(function(b){a.conversations=b.data,a.paging=b.paging}),a.paging.pagesCount=0,a.pages=[];var h=function(){a.paging.pagesCount=b.Math.ceil(a.paging.total/a.paging.range);for(var c=0;c<a.paging.pagesCount;c++)a.pages[c]={number:c+1}};a.goToPage=function(a){c.go("inbox",{page:a})},a.previous=function(){angular.isDefined(a.paging.previous)&&a.goToPage(a.paging.current_page-1)},a.next=function(){angular.isDefined(a.paging.next)&&a.goToPage(a.paging.current_page+1)},a.fromNow=function(a){return moment(a).fromNow()},a.formatDate=function(a){return moment(a).format("hh:mm MMMM Do, YYYY")},a.testString=g.getString("text__read_only",{user_id:"12345",name:"faustina"}),h()}]);var serviceModule=angular.module("ComstackPMApp.Services",["ngResource","ComstackPMApp.Configuration"]);serviceModule.config(["$httpProvider",function(a){delete a.defaults.headers.common["X-Requested-With"],a.defaults.useXDomain=!0,a.defaults.withCredentials=!0}]);var services=angular.module("ComstackPMApp.Services");services.factory("ConfigurationService",["$http","$q","LocalSettings",function(a,b,c){var d=c;"undefined"!=typeof Comstack&&"undefined"!=typeof Comstack.PMApp&&"undefined"!=typeof Comstack.PMApp.Settings&&(console.log("merge globals"),angular.merge(d,Comstack.PMApp.Settings));var e=function(a){d.access_token=a},f=function(){return d},g=function(a){d=a},h=function(a,b){var c=/@(\w*)@/gi;return d.strings[a].replace(c,function(a){return console.log(a),a=a.replace(/@/gi,""),b[a]})};return{appSettings:d,get:f,set:g,updateAccessToken:e,getString:h}}]),function(a){var b=a.module("ComstackPMApp.Services");b.factory("Authentication",["$http","$q","ConfigurationService",function(a,b,c){var d=c.get(),e=atob(d.authorization_header.replace("Basic ","")),f=d.base_url.replace("https://","https://"+e+"@"),g=function(){var c=b.defer();console.log("Starting form auth...");var d=f+"/home?destination=home",e="name=basic_user_1&login-do=yes&pass=password&form_id=user_login_block&op=Sign+in";return a.post(d,e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(a){console.log("Succeeded form auth..."),c.resolve(a)}).error(function(a,b){console.log("Failed form auth..."),c.reject(a)}),c.promise},h=function(){var c=b.defer();return console.log("Starting basic auth..."),a.get(f,{}).success(function(a){console.log("Succeeded basic auth..."),c.resolve(a)}).error(function(a,b){console.log("Failed basic auth..."),c.reject(a)}),c.promise},i=function(){var c=b.defer();return console.log("Starting get token..."),a.get(f+"/api/login-token",{}).success(function(a){console.log("Succeeded get token..."),c.resolve(a)}).error(function(a,b){console.log("Failed basic auth..."),c.reject(a)}),c.promise},j=function(){var a=b.defer();return h().then(function(b){console.log("Succeeded basic auth..."),g().then(function(b){console.log("Succeeded form auth..."),i().then(function(b){console.log("Succeeded get token..."),c.updateAccessToken(b.access_token),a.resolve(b)},function(b){console.log("Failed get token..."),console.log(b),a.reject(b)})},function(a){console.log("Failed form auth..."),console.log(a)})},function(a){console.log("Failed basic auth..."),console.log(a)}),a.promise};return{apiLogin:j}}])}(angular);var services=angular.module("ComstackPMApp.Services");services.factory("User",["$resource","ConfigurationService",function(a,b){var c=b.get();return a("",{},{getCurrentUser:{method:"GET",url:c.api_url+"/cs-pm/users/current-user?access_token="+c.access_token,isArray:!1}})}]),services.factory("getCurrentUser",["User","$q",function(a,b){var c={};return c.get=function(){var c=b.defer();return a.getCurrentUser(function(a){c.resolve(a)},function(){c.reject("Unable to fetch current user")}),c.promise},c}]);var services=angular.module("ComstackPMApp.Services");services.factory("Conversation",["$resource","ConfigurationService",function(a,b){var c=b.get();return a("/cs-pm/conversations",{},{get:{method:"GET",url:c.api_url+"/cs-pm/conversations?access_token="+c.access_token,params:{page:"@page"},isArray:!1}})}]),services.factory("getConversations",["Conversation","$q",function(a,b){var c={};return c.get=function(c){var d=b.defer();return a.get({page:c},function(a){d.resolve(a)},function(){d.reject("Unable to fetch the conversation")}),d.promise},c}]);