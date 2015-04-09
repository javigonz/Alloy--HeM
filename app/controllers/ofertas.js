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
	Alloy.Globals.ActualContainer = $.viewOfertas;
	
	//Título de la sección
	//$.textTitle.text = L('text_4');
	
	//Carga WebServie de Subcategorias
	Ti.App.addEventListener('loadOfertas', loadOfertas);
	managment_Data.LoadWebService_Ofertas();

}


function loadOfertas()
{
	Ti.App.removeEventListener('loadOfertas', loadOfertas);
		
	if (datamodel_Ofertas.code == 'ok')
	{
		 //Estilos
		var rowList = $.createStyle({classes: ['rowList']});
		var rowListTitle = $.createStyle({classes: ['rowListTitle']});
		var viewImage = $.createStyle({classes: ['viewImage']});
		var productImage = $.createStyle({classes: ['productImage']});
		var textName = $.createStyle({classes: ['textName']});
		var textNameTitle = $.createStyle({classes: ['textNameTitle']});
		var textDate = $.createStyle({classes: ['textDate']});
		var textDescription = $.createStyle({classes: ['textDescription']});
		var viewDescription = $.createStyle({classes: ['viewDescription']});
		var rowLine = $.createStyle({classes: ['rowLine']});
		var iconView = $.createStyle({classes: ['iconView']});
		var icon = $.createStyle({classes: ['icon']});
		var iconArrow = $.createStyle({classes: ['iconArrow']});
		
		
		for (var i=0;i<=datamodel_Ofertas.result.length-1;i++)
		{
			/*if (i == 0 || i == 4) //Los títulos
			{
				//Contenedor principal de título
				var row1 = Ti.UI.createView({});
			    row1.applyProperties(rowListTitle);
			    
			    var label1 = Ti.UI.createLabel({
			     			 text: 'Título 1'
			      });
			    label1.applyProperties(textNameTitle);
			    
			    row1.add(label1);
			    $.scrollableOfertasSlider.add(row1);
			}
			else
			{*/
				//Contenedor principal 
				var row1 = Ti.UI.createView({
								id: datamodel_Ofertas.result[i].id
				});
			    row1.applyProperties(rowList);
			    row1.addEventListener('click', handlerEvent_ofertasDetail);
			    
			    var row1Line = Ti.UI.createView({
			    				id: datamodel_Ofertas.result[i].id
			    });
			    row1Line.applyProperties(rowLine);
			    
			    var row1Arrow = Ti.UI.createImageView({
			    	            image: '/images/iconArrowGreen.png',
			    	            id: datamodel_Ofertas.result[i].id
			    });
			    row1Arrow.applyProperties(iconArrow);
			    
			   
				
				//Contenedor para el texto
				var view2 = Ti.UI.createView({
								id: datamodel_Ofertas.result[i].id
				});
			    view2.applyProperties(viewDescription);
			    
			    var label1 = Ti.UI.createLabel({
			     			 text: datamodel_Ofertas.result[i].nombre,
			     			 id: datamodel_Ofertas.result[i].id
			      });
			    label1.applyProperties(textName);
			    
			   
	
			    //Add los contenedores
			   
			    view2.add(label1);
			    row1.add(view2);
			    
			    row1.add(row1Line);
			    row1.add(row1Arrow);
			    $.scrollableOfertasSlider.add(row1);
		   //}

			
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

function handlerEvent_ofertasDetail(e)
{
	e.source.removeEventListener('click', handlerEvent_ofertasDetail);
	managment_View.OpenSectionParam('ofertasDetail',[e.source.id],'', Alloy.Globals.ActualContainer);
}
