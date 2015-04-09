var MapModule = require('ti.map');
var managment_View = require('managment_View');
var managment_Data = require('managment_Data');
var args = arguments[0] || {};

var dataEmpresa;


show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){
	
	dataEmpresa = { 'nombre': args[0][0].nombre,
					'direccion': args[0][0].direccion,
					'latitud': args[0][0].latitud,
					'longitud': args[0][0].longitud };
						   
	if (Ti.Platform.osname == "iphone")
	{			
		createMapModule();
	}
	else
	{
		var rc = MapModule.isGooglePlayServicesAvailable();
		switch (rc) {
		    case MapModule.SUCCESS:
		        Ti.API.info('Google Play services is installed.');
		        createMapModule();
		        break;
		    case MapModule.SERVICE_MISSING:
		        managment_View.OpenInfoWindow( L('text_7'));
		        Ti.App.fireEvent('closeLoading');
		        break;
		    case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
		        managment_View.OpenInfoWindow( L('text_8'));
		        Ti.App.fireEvent('closeLoading');
		        break;
		    case MapModule.SERVICE_DISABLED:
		        managment_View.OpenInfoWindow( L('text_9'));
		        Ti.App.fireEvent('closeLoading');
		        break;
		    case MapModule.SERVICE_INVALID:
		        managment_View.OpenInfoWindow( L('text_10'));
		        Ti.App.fireEvent('closeLoading');
		        break;
		    default:
		        managment_View.OpenInfoWindow( L('text_6'));
		        Ti.App.fireEvent('closeLoading');
		        break;
		}
	}
		

	//Añado el container actual al objeto de navegación
	Alloy.Globals.ActualContainer = $.viewDirectorioDetailMap;
	
	//Título de la sección
	//$.textTitle.text = L('text_2');
	
	
}




function createMapModule()
{
	Ti.API.info('latitud: ' + dataEmpresa.latitud);
	Ti.API.info('longitud: ' + dataEmpresa.longitud);
	Ti.API.info('nombre: ' + dataEmpresa.nombre);
	Ti.API.info('direccion: ' + dataEmpresa.direccion);
	
	var empresa1 = MapModule.createAnnotation({
	   // latitude: 36.737341,
	    //longitude: -4.553920,
	    latitude: dataEmpresa.latitud,
	    longitude: dataEmpresa.longitud,
	    pincolor: MapModule.ANNOTATION_AZURE,
	    //leftView: Ti.UI.createButton({title: 'Detail'}),
	    //rightButton: '/images/imagen_remota3.jpeg',    
	    title: dataEmpresa.nombre,
	    subtitle: dataEmpresa.direccion,
	    myid:1
	});

	var map1 = MapModule.createView({
	    mapType: MapModule.NORMAL_TYPE,
	    region: {latitude: dataEmpresa.latitud, longitude: dataEmpresa.longitud, latitudeDelta: 0.1, longitudeDelta: 0.1 },
	    userLocation: true,
	    animate: true,
	    pitchEnabled: true,
        rotateEnabled: true,
        showsBuildings: true,
        showsPointsOfInterest: true,
	    annotations: [empresa1]
	});
	
	
	//
	// LISTENERS
	//
	map1.addEventListener('complete', function(e){
	   // Ti.API.info(e.type);
	    Ti.App.fireEvent('closeLoading');
	});
	
	map1.addEventListener('click', function(evt) {
	    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
	});
	
	$.containerDirectorioDetailMap.add(map1);
	
	

}

/* ***********************************************************
 * Event Handlers
 * ***********************************************************/

