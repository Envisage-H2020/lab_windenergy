#Quickstart Google Tag Manager for your website tracking

* This page describe the goedle.io integration via the [Google Tag Manager](https://developers.google.com/tag-manager/quickstart)
* Create a <a href="https://tagmanager.google.com">GTM Account</a> 
* After creation add a new account. Fill in your account name and the container name. The container name should be your website URL
* Then go to the tab Admin -> choose your Account and the container you added the step before
* In the container list, the link "Install Google Tag Manager" takes you to the GTM Script for your Website
* Go to your website's source code and add the whole GTM script right after the `<body>` tag
* In the header define the `dataLayer = [];`
* Now you can push the datalayer to GTM
* To call a push, execute `dataLayer.push({datalayer})` in the '<body>' section at positions where you want to track events. (Where the DataLayer object is a JSON Object with values you want to transmit to the GTM) 


##goedle.io DataLayer Object

**IMPORTANT** `event` is a mandatory field.

Prepare your website with GTM. 

If you want to overwrite fields, you can simply create a `goedle` object in your DataLayer an replace the following fields

<a name="goedle_object"></a>
```json
'event': < 'event' > ,
'goedle': {
        'timezone': < utc offset > ,
        'locale': < language > ,
        'device_type': < DeviceTypeIdentifier e.g mobile, desktop > ,
        'user_id': < user_id > ,
        'timestamp': < UnixTimeStamp >
    }
```
`event` and `goedle` are on the first layer of the DataLayer object.

Afterwards a push should look like the following code snippet

```javascript
dataLayer.push({'event': 'start.tracking'});
```

#Google Tag Manager Integration for goedle.io
This guide describes the integration for [goedle.io](http://goedle.io) and [Google Tag Manager](https://www.google.com/tagmanager/) (GTM)

##Add Custom HTML TAG
Open your project in the Google Tag Manager frontend and go to `Container`. Then create a new Custom HTML Tag:

![Create a custom HTML tag](http://docs.goedle.io/images/goedle_tag.png "Create a custom HTML tag")

Name: goedle_tag

Afterwards add the following `User-Defined Variables`, the app key and the call of the track method to the Custom HTML Tag:

```javascript
<script type="text/javascript" src="http://d2i4n3axvau3kk.cloudfront.net/goedle.js"></script>

<script type="text/javascript">
var app_key = "<YOURAPPKEY>";
var event = {{Event}};
var goedle_object = {{goedle}};
track(app_key, event, goedle_object);
</script>
```

Insert the goedle.io app key in the field of 
`var app_key = <YOURAPPKEY>`

##Add User-Defined Variables

To identify the goedle.io data object, create a `Data Layer Variable` in the Google Tag Manager `Container` under `Variables`. 

* Goto `User-Defined Variables` -> `New`
* `Choose Type` -> `Data Layer Variable`
* `Configure Variable` -> with the name `goedle`

![Create a DataVariable goedle step 1](http://docs.goedle.io/images/goedle_datalayer_1.png "Create a DataVariable goedle step 1")
![Create a DataVariable goedle step 2](http://docs.goedle.io/images/goedle_datalayer_2.png "Create a DataVariable goedle step 2")


##Add Triggers for goedle.io Relevant Actions 
To trigger the events, add a Custom Event 

![Add Custom Event](http://docs.goedle.io/images/goedle_custom_event.png "Add Custom Event")

After creating the trigger, add it under: `Tags` -> `goedle_tag`  -> choose `Triggering`

![Add the Triggers to the goedle_tag](http://docs.goedle.io/images/goedle_fire_1.png "Add Trigger to the goedle_tag")
![Add the Triggers to the goedle_tag](http://docs.goedle.io/images/goedle_fire_2.png "Add Trigger to the goedle_tag")

**Congratulations:**
You are done. After this, the setup is ready to track the Events.