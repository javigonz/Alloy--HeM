var managment_View = require('managment_View');
var managment_Data = require('managment_Data');
var remoteView = require('createRemoteImageView');


show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){

	
	//Añado el container actual al objeto de navegación
	Alloy.Globals.ActualContainer = $.viewAgenda;
	
	//Título de la sección
	//$.textTitle.text = L('text_4');
	
	//Carga WebServie de Subcategorias
	Ti.App.addEventListener('loadAgenda', loadAgenda);
	managment_Data.LoadWebService_Agenda();

}


function loadAgenda()
{
	Ti.App.removeEventListener('loadAgenda', loadAgenda);
		
	if (datamodel_Agenda.code == 'ok')
	{
		 //Estilos
		var rowList = $.createStyle({classes: ['rowList']});
		var viewImage = $.createStyle({classes: ['viewImage']});
		var productImage = $.createStyle({classes: ['productImage']});
		var textName = $.createStyle({classes: ['textName']});
		var textDate = $.createStyle({classes: ['textDate']});
		var textDescription = $.createStyle({classes: ['textDescription']});
		var viewDescription = $.createStyle({classes: ['viewDescription']});
		var rowLine = $.createStyle({classes: ['rowLine']});
		var iconView = $.createStyle({classes: ['iconView']});
		var icon = $.createStyle({classes: ['icon']});
		var iconArrow = $.createStyle({classes: ['iconArrow']});
		
		
		for (var i=0;i<=datamodel_Agenda.result.length-1;i++)
		{
			//Contenedor principal 
			var row1 = Ti.UI.createView({
					   id: datamodel_Agenda.result[i].id
			});
		    row1.applyProperties(rowList);
		    row1.addEventListener('click', handlerEvent_agendaDetail);
		    
		    var row1Line = Ti.UI.createView({
		    				id: datamodel_Agenda.result[i].id
		    });
		    row1Line.applyProperties(rowLine);
		    
		    var row1Arrow = Ti.UI.createImageView({
		    	            image: '/images/iconArrow.png'
		    });
		    row1Arrow.applyProperties(iconArrow);
		    
		    //Contenedor de la imagen
		    var view1 = Ti.UI.createView({
		    			id: datamodel_Agenda.result[i].id
		    });
		    view1.applyProperties(viewImage);
		    
		    if (Ti.Platform.osname == "iphone") //En iphone creo una caché con las imágenes remotas, en Android peta
			{
			    var imageRemote1 = remoteView.createRemoteImageView({
	   								image: Alloy.Globals.UrlImages + datamodel_Agenda.result[i].imagen1,
		   							defaultImage: '/images/download.png',
		   							id: datamodel_Agenda.result[i].id
					});
				imageRemote1.applyProperties(productImage);
			}
			else
			{
			    var imageRemote1 = Titanium.UI.createImageView({
									image: Alloy.Globals.UrlImages + datamodel_Agenda.result[i].imagen1,
		   							defaultImage: '/images/download.png',
		   							id: datamodel_Agenda.result[i].id
				});	
				imageRemote1.applyProperties(productImage);
			}
			
			//Contenedor para el texto
			var view2 = Ti.UI.createView({
						id: datamodel_Agenda.result[i].id
			});
		    view2.applyProperties(viewDescription);
		    
		    var label1 = Ti.UI.createLabel({
		     			 text: datamodel_Agenda.result[i].nombre,
		     			 id: datamodel_Agenda.result[i].id
		      });
		    label1.applyProperties(textName);
		    
		    //vista para la fecha y el icono
		    var view3 = Ti.UI.createView({
		    				id: datamodel_Agenda.result[i].id
		    });
		    view3.applyProperties(iconView);
		    
		    var icon1 = Titanium.UI.createImageView({
									image: '/images/iconDate.png',
									id: datamodel_Agenda.result[i].id
				});	
			icon1.applyProperties(icon);
			
		    var label2 = Ti.UI.createLabel({
		     			 text: datamodel_Agenda.result[i].fecha_evento,
		     			 id: datamodel_Agenda.result[i].id
		      });
		    label2.applyProperties(textDate);
		    
		    var label3 = Ti.UI.createLabel({
		     			 text: datamodel_Agenda.result[i].descripcion_corta,
		     			 id: datamodel_Agenda.result[i].id
		      });
		    label3.applyProperties(textDescription);
		    
		    
		    
		    
		    //Add los contenedores
		    view1.add(imageRemote1);
		    view2.add(label1);
		    view3.add(icon1);
		    view3.add(label2);
		    view2.add(view3);
		    view2.add(label3);
		    row1.add(view1);
		    row1.add(view2);
		    
		    row1.add(row1Line);
		    row1.add(row1Arrow);
		    $.scrollableAgendaSlider.add(row1);

			
		}	
	}
	else
	{
		managment_View.OpenInfoWindow( L('text_6'));
		
	}
	
	Ti.App.fireEvent('closeLoading');
	
}




/* ***********************************************************
 * Event handlers
 * ***********************************************************/

function handlerEvent_agendaDetail(e)
{
	e.source.removeEventListener('click', handlerEvent_agendaDetail);
	managment_View.OpenSectionParam('agendaDetail',[e.source.id],'', Alloy.Globals.ActualContainer);
}
