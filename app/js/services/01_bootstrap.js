/**
 * Created by fechit01 on 11/09/2015.
 */
'use strict';
var module = angular.module('ComstackPmApp.Services', ['ngResource'])
    .config(function($provide) {
        $provide.value('settings', {
            'api_url': 'https://cancerchat01dev.prod.acquia-sites.com/api/v1/',
            'authorization_header': 'Basic Q1JVSzAxOnl1RGFiOG5lIQ==',
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

        });
});
