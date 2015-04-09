var managment_View = require('managment_View');



show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){


	//Añado el container actual al objeto de navegación
	Alloy.Globals.ActualContainer = $.viewHome;
	
	//Inicio de las notificaciones Push
	var managment_Push = require('managment_Push');
	
	Ti.App.fireEvent('closeLoading');
	
	//var callbackPush = {"type":"callback","source":{"pushType":"gcm"},"payload":"{\"android\"}:{\"icon\":}"};
	//var callbackPush = {"aps":{"alert":{"action-loc-key":"open","body":"Hallo","loc-args":{"url":"thisIsTheURL"}},"sound":"soundeffects\/push.aiff","badge":0}};
	//managment_View.OpenInfoWindow( 'OnReceive: ' + JSON.stringify(callbackPush));
	//managment_View.OpenInfoWindow( 'OnReceive: ' + JSON.parse(callbackPush));
	
	
	


}


