var managment_View = require('managment_View');
var managment_Data = require('managment_Data');
var remoteView = require('createRemoteImageView');
var args = arguments[0] || {};

show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){
	

	//Añado el container actual al objeto de navegación
	Alloy.Globals.ActualContainer = $.viewHechoenmijasDetail;
	
	//Título de la sección
	//$.textTitle.text = L('text_2');
	
	
	//Carga WebServie de Subcategorias
	Ti.App.addEventListener('loadHechoEnMijasDetail', loadHechoEnMijasDetail);
	managment_Data.LoadWebService_HechoEnMijas_Detail(args[0][0]);
	
}




function loadHechoEnMijasDetail()
{
	Ti.App.removeEventListener('loadHechoEnMijasDetail', loadHechoEnMijasDetail);
	
	if (datamodel_HechoEnMijas_Detail.code == 'ok')
	{
		 
		//Estilos
		var style_viewImage = $.createStyle({classes: ['style_viewImage']});
		var productImage = $.createStyle({classes: ['productImage']});
		var style_viewName = $.createStyle({classes: ['style_viewName']});
		var textName = $.createStyle({classes: ['textName']});
		var textDate = $.createStyle({classes: ['textDate']});
		var style_viewGps = $.createStyle({classes: ['style_viewGps']});
		var style_iconoGps = $.createStyle({classes: ['style_iconoGps']});
		var textGps = $.createStyle({classes: ['textGps']});
		var textDescription = $.createStyle({classes: ['textDescription']});
		
		//Imagen
		var viewImage = Ti.UI.createView({});
		viewImage.applyProperties(style_viewImage);
		
		if (Ti.Platform.osname == "iphone") //En iphone creo una caché con las imágenes remotas, en Android peta
		{
			    var imageRemote1 = remoteView.createRemoteImageView({
	   								image: Alloy.Globals.UrlImages + datamodel_HechoEnMijas_Detail.result[0].imagen2,
		   							defaultImage: '/images/download.png'
					});
				imageRemote1.applyProperties(productImage);
		}
		else
		{
			    var imageRemote1 = Titanium.UI.createImageView({
									image: Alloy.Globals.UrlImages + datamodel_HechoEnMijas_Detail.result[0].imagen2,
		   							defaultImage: '/images/download.png'
				});	
				imageRemote1.applyProperties(productImage);
		}
		
		//Nombre y dirección
		var viewName = Ti.UI.createView({});
		viewName.applyProperties(style_viewName);
		
		var iconoGps = Ti.UI.createImageView({
			image: '/images/iconoGps.png'
		});
		iconoGps.applyProperties(style_iconoGps);
		    
		var label1 = Ti.UI.createLabel({
		     			 text: datamodel_HechoEnMijas_Detail.result[0].nombre
		     });
		label1.applyProperties(textName);
		    
		var label2 = Ti.UI.createLabel({
		     			 text: datamodel_HechoEnMijas_Detail.result[0].fecha_noticia
		});
		label2.applyProperties(textDate);
		
		
		
		
		//Descripción
		var webviewDescription = Ti.UI.createWebView({
			enableZoomControls: 'false'
		});
		webviewDescription.applyProperties(textDescription);
		webviewDescription.html = '<meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>' + '<html style="font-size:13px">' + datamodel_HechoEnMijas_Detail.result[0].descripcion + '</html>';
		
		//Add los contenedores
		viewImage.add(imageRemote1);
		viewName.add(iconoGps);
		viewName.add(label1);
		viewName.add(label2);
		$.containerHechoenmijasDetail.add(viewImage);	
		$.containerHechoenmijasDetail.add(viewName);	
		$.containerHechoenmijasDetail.add(webviewDescription);
			
	}
	else
	{
		managment_View.OpenInfoWindow( L('text_6'));
		Ti.API.info('error desde el JS');
		
	}
	
	Ti.App.fireEvent('closeLoading');
	
}





/* ***********************************************************
 * Event Handlers
 * ***********************************************************/


