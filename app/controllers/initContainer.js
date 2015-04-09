var utils = require('utils');
var managment_View = require('managment_View');
var args = arguments[0] || {};


show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){
	
	Alloy.Globals.WinInitContainer = $.winInitContainer;
	

	if (Ti.Platform.osname == "iphone")
	{
		$.viewInitContainer.height = Ti.Platform.displayCaps.platformHeight - 70 - 80;
		$.viewInitContainer.top = 70;
		
	}
	else
	{
		
		$.viewInitContainer.height = Alloy.CFG.HeightDevice - 45 - 80 - 20;
		$.viewInitContainer.top = 45;

		//Listener para capturar el botón de Back del propio Dispositivo Android
		Alloy.Globals.WinInitContainer.addEventListener('android:back', function(e){
													Ti.API.info('Botón Back dispositivo Android');	
													managment_View.closeActualSection();
												});
		
	}
	
	
	Alloy.Globals.viewContainerPrincipal = $.viewInitContainer;
	
	$.winInitContainer.open();
	
	
	managment_View.OpenSectionParam('home',[],'home', $.viewInitContainer);
	
	//Inicio de las notificaciones Push
	//var managment_Push = require('managment_Push');

	
}