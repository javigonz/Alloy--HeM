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
	Alloy.Globals.ActualContainer = $.viewDirectorioDetail;
	
	//Título de la sección
	//$.textTitle.text = L('text_2');
	
	
	//Carga WebServie de Subcategorias
	Ti.App.addEventListener('loadEmpresaDetail', loadEmpresaDetail);
	managment_Data.LoadWebService_Empresa_Detail(args[0][0]);
	
}




function loadEmpresaDetail()
{
	Ti.App.removeEventListener('loadEmpresaDetail', loadEmpresaDetail);
		
	if (datamodel_Empresa_Detail.code == 'ok')
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
	   								image: Alloy.Globals.UrlImages + datamodel_Empresa_Detail.result.imagen2,
		   							defaultImage: '/images/download.png'
					});
				imageRemote1.applyProperties(productImage);
		}
		else
		{
			    var imageRemote1 = Titanium.UI.createImageView({
									image: Alloy.Globals.UrlImages + datamodel_Empresa_Detail.result.imagen2,
		   							defaultImage: '/images/download.png'
				});	
				imageRemote1.applyProperties(productImage);
		}
		
		//Nombre y dirección
		var viewName = Ti.UI.createView({});
		viewName.applyProperties(style_viewName);
		    
		var label1 = Ti.UI.createLabel({
		     			 text: datamodel_Empresa_Detail.result.nombre
		     });
		label1.applyProperties(textName);
		    
		var label2 = Ti.UI.createLabel({
		     			 text: datamodel_Empresa_Detail.result.direccion
		});
		label2.applyProperties(textDate);
		
		var viewGps = Ti.UI.createView({
							latitud: datamodel_Empresa_Detail.result.latitud,
							longitud: datamodel_Empresa_Detail.result.longitud,
							nombre: datamodel_Empresa_Detail.result.nombre,
							direccion: datamodel_Empresa_Detail.result.direccion
		});
		viewGps.applyProperties(style_viewGps);
		viewGps.addEventListener('click', handler_detailMap);
		
		var iconoGps = Ti.UI.createImageView({
							image: '/images/iconoGps.png',
							latitud: datamodel_Empresa_Detail.result.latitud,
							longitud: datamodel_Empresa_Detail.result.longitud,
							nombre: datamodel_Empresa_Detail.result.nombre,
							direccion: datamodel_Empresa_Detail.result.direccion
		});
		iconoGps.applyProperties(style_iconoGps);
		
		var label3 = Ti.UI.createLabel({
		     			    text: L('text_14'),
		     			    latitud: datamodel_Empresa_Detail.result.latitud,
							longitud: datamodel_Empresa_Detail.result.longitud,
							nombre: datamodel_Empresa_Detail.result.nombre,
							direccion: datamodel_Empresa_Detail.result.direccion
		});
		label3.applyProperties(textGps);
		
		
		//Descripción
		var webviewDescription = Ti.UI.createWebView({
			enableZoomControls: 'false'
		});
		webviewDescription.applyProperties(textDescription);
		webviewDescription.html = '<meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>' + '<html style="font-size:13px">' + datamodel_Empresa_Detail.result.descripcion + '</html>';
		
		
		//Add los contenedores
		viewImage.add(imageRemote1);
		viewName.add(label1);
		viewName.add(label2);
		viewGps.add(iconoGps);
		viewGps.add(label3);
		viewName.add(viewGps);
		$.containerDirectorioDetail.add(viewImage);	
		$.containerDirectorioDetail.add(viewName);	
		$.containerDirectorioDetail.add(webviewDescription);
			
	}
	else
	{
		managment_View.OpenInfoWindow( L('text_6'));
		
	}
	
	Ti.App.fireEvent('closeLoading');
	
}





/* ***********************************************************
 * Event Handlers
 * ***********************************************************/

function handler_detailMap(e)
{
	e.source.removeEventListener('click', handler_detailMap);
	managment_View.OpenSectionParam('directorioDetailMap',[e.source],'', Alloy.Globals.ActualContainer);
}
