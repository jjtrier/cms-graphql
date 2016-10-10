[
	{
		"id":"fieldid",
		"label":"Field Label",
		"type":"text",
//		"multiline" : true,
		"required": true
	},
	{
		"id":"imagefield",
		"label":"Image Field",
		"type":"image",
		"required": false,
		"resize": [
	        {
	          "width": 110,
	          "height": 128,
	          "method": "auto"
	        },
	    ]
	},
	{
		"id":"galleryfield",
		"label":"Gallery Field",
		"type":"imageGallery",
		"required": false
	},
	{
		"id": "selectlist",
		"type": "list",
		"required": true,
		"label": "Select List",
//		"multiple": true,
		"options": {
			"option1id":"Option 1 Label"
		}
	},
	{
		"id": "categorytopull",
		"type": "CategorySelect",
		"required": false,
		"label": "Category to Pull",
		"category_id": 46,
		"labelField": "label to use"
	},
	{
		"id":"datatypetocreate",
		"label": "Data Type to Create",
		"type":"dataType",
		"datatype_id": 40,
		"buttonLabel" : "Add Datatype",
		"required": false
	},
	{
		"id":"date",
		"type": "date",
		"required": false,
		"label": "Date"
	},
	{
	      "id":"geolocation",
	      "type":"GeoCoder",
	      "label":"Location",
	      "content": ["address", "city", "us_state", "zipcode"]
	},
	{
		"id":"startdate",
		"label":"Start Date",
		"type":"date",
		"required": false
	},
	{
		"id":"enddate",
		"label":"End Date",
		"type":"date",
		"required": false
	},
]
