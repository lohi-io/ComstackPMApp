# ComstackPMApp

This is an Angular Application which integrates with the [Comstack Private Messaging REST API Module](https://github.com/lohi-io/comstack_pm/tree/7.x-1.x/modules/comstack_pm_rest_api).

Documentation on the REST API can be found here:
https://rawgit.com/lohi-io/comstack_pm/7.x-1.x/modules/comstack_pm_rest_api/docs/rest-api.html

## Setting up

Well, you'll need an API setup and configured properly somewhere. When instantiating this App you'll need to pass in a series of settings which are as follows. If you're on a Drupal site you can use the [Comstack PM UI module](https://github.com/lohi-io/comstack_pm_ui) which will do all this for you.

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
}
```
