var managment_View = require('managment_View');
var managment_Data = require('managment_Data');
var remoteView = require('createRemoteImageView');
var utils = require('utils');


show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){
		

	//Añado el container actual al objeto de navegación
	Alloy.Globals.ActualContainer = $.viewDirectorio;
	
	//Título de la sección
	//$.textTitle.text = L('text_2');
	
	
	//Carga WebServie de Subcategorias
	Ti.App.addEventListener('loadDirectorioSectores', loadDirectorioSectores);
	managment_Data.LoadWebService_Directorio_Sectores();
	
	
}


function loadDirectorioSectores()
{
	Ti.App.removeEventListener('loadDirectorioSectores', loadDirectorioSectores);
		
	if (datamodel_EmpresasSectores.code == 'ok')
	{
		var picker_data = [];
		
		for (var i=0;i<=datamodel_EmpresasSectores.result.length-1;i++)
		{
			var itemPicker = Ti.UI.createPickerRow({
												title:datamodel_EmpresasSectores.result[i].nombre,
												id:datamodel_EmpresasSectores.result[i].id});
			picker_data.push(itemPicker);									
												
		}
		
		createComboCategories(picker_data);
		
		//Carga WebServie de Empresas de la primera categoría
		Ti.App.addEventListener('loadEmpresasSector', loadEmpresasSector);
		managment_Data.LoadWebService_Empresas_Sector(datamodel_EmpresasSectores.result[0].id);
	}
	else
	{
		managment_View.OpenInfoWindow( L('text_6'));
		Ti.App.fireEvent('closeLoading');
	}
	
}



function loadEmpresasSector()
{
	Ti.App.removeEventListener('loadEmpresasSector', loadEmpresasSector);
		
	if (datamodel_EmpresasSector.code == 'ok')
	{
		 //Estilos
		var rowList = $.createStyle({classes: ['rowList']});
		var viewImage = $.createStyle({classes: ['viewImage']});
		var ProductImage = $.createStyle({classes: ['ProductImage']});
		var textName = $.createStyle({classes: ['textName']});
		var textDate = $.createStyle({classes: ['textDate']});
		var textDescription = $.createStyle({classes: ['textDescription']});
		var viewDescription = $.createStyle({classes: ['viewDescription']});
		var rowLine = $.createStyle({classes: ['rowLine']});
		var iconView = $.createStyle({classes: ['iconView']});
		var icon = $.createStyle({classes: ['icon']});
		var iconArrow = $.createStyle({classes: ['iconArrow']});
		
		
		for (var i=0;i<=datamodel_EmpresasSector.result.length-1;i++)
		{
			//Contenedor principal 
			var row1 = Ti.UI.createView({
						id: datamodel_EmpresasSector.result[i].id
			});
		    row1.applyProperties(rowList);
		    row1.addEventListener('click', handlerEvent_directorioDetail);
		    
		    var row1Line = Ti.UI.createView({
		    				id: datamodel_EmpresasSector.result[i].id
		    });
		    row1Line.applyProperties(rowLine);
		    
		    var row1Arrow = Ti.UI.createImageView({
		    	            image: '/images/iconArrowBlue.png',
		    	            id: datamodel_EmpresasSector.result[i].id
		    });
		    row1Arrow.applyProperties(iconArrow);
		    
		    //Contenedor de la imagen
		    var view1 = Ti.UI.createView({
		    					id: datamodel_EmpresasSector.result[i].id
		    });
		    view1.applyProperties(viewImage);
		    
		    if (Ti.Platform.osname == "iphone") //En iphone creo una caché con las imágenes remotas, en Android peta
			{
			    var imageRemote1 = remoteView.createRemoteImageView({
	   								image: Alloy.Globals.UrlImages + datamodel_EmpresasSector.result[i].imagen1,
		   							defaultImage: '/images/download.png',
		   							id: datamodel_EmpresasSector.result[i].id
					});
				imageRemote1.applyProperties(ProductImage);
			}
			else
			{
			    var imageRemote1 = Titanium.UI.createImageView({
									image: Alloy.Globals.UrlImages + datamodel_EmpresasSector.result[i].imagen1,
		   							defaultImage: '/images/download.png',
		   							id: datamodel_EmpresasSector.result[i].id
				});	
				imageRemote1.applyProperties(ProductImage);
			}
			
			//Contenedor para el texto
			var view2 = Ti.UI.createView({
							id: datamodel_EmpresasSector.result[i].id
			});
		    view2.applyProperties(viewDescription);
		    
		    var label1 = Ti.UI.createLabel({
		     			 text: datamodel_EmpresasSector.result[i].nombre,
		     			 id: datamodel_EmpresasSector.result[i].id
		      });
		    label1.applyProperties(textName);
		    
		    //vista para la fecha y el icono
		    var view3 = Ti.UI.createView({
		    				id: datamodel_EmpresasSector.result[i].id
		    });
		    view3.applyProperties(iconView);
		    
		    var label2 = Ti.UI.createLabel({
		     			 text: datamodel_EmpresasSector.result[i].direccion,
		     			 id: datamodel_EmpresasSector.result[i].id
		      });
		    label2.applyProperties(textDate);
		    
		    
		    
		    //Add los contenedores
		    view1.add(imageRemote1);
		    view2.add(label1);
		    view2.add(label2);
		    view2.add(view3);
		    row1.add(view1);
		    row1.add(view2);
		    
		    row1.add(row1Line);
		    row1.add(row1Arrow);
		    $.scrollableDirectorySlider.add(row1);

			
		}	
	}
	else
	{
		managment_View.OpenInfoWindow( L('text_6'));
		
	}
	
	Ti.App.fireEvent('closeLoading');
	
}




function createComboCategories(picker_data)
{	
	
		if (Ti.Platform.osname == "iphone")
		{
			var picker_view = Titanium.UI.createView({
			height:251,
			bottom:-351
			});
	
			var cancel =  Titanium.UI.createButton({
				title:L('text_12'),
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
			
			var done =  Titanium.UI.createButton({
				title:L('text_13'),
				style:Titanium.UI.iPhone.SystemButtonStyle.DONE
			});
			
			var spacer =  Titanium.UI.createButton({
				systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
			});
			
			
			var toolbar =  Titanium.UI.iOS.createToolbar({
				top:0,
				items:[cancel,spacer,done]
			});
			
			var picker = Titanium.UI.createPicker({
					top:43
			});
			
			picker.selectionIndicator=true;
			
			picker.add(picker_data);
		
			picker_view.add(toolbar);
			picker_view.add(picker);
			
			var slide_in =  Titanium.UI.createAnimation({bottom:0});
			var slide_out =  Titanium.UI.createAnimation({bottom:-351});
			
			$.comboCategories.addEventListener('focus', function() {
				picker_view.animate(slide_in);
				$.comboCategories.blur();
			});
			
			
			cancel.addEventListener('click',function() {
				picker_view.animate(slide_out);
			});
			
			done.addEventListener('click',function() {
				$.comboCategories.value =  picker.getSelectedRow(0).title;
				picker_view.animate(slide_out);
				
				//Limpio antes todo el contenido
				Ti.App.fireEvent('openLoading');
				utils.removeAllChildren($.scrollableDirectorySlider);
			
				//Carga WebServie de Empresas de una Categoría
				Ti.App.addEventListener('loadEmpresasSector', loadEmpresasSector);
				managment_Data.LoadWebService_Empresas_Sector(picker.getSelectedRow(0).id);
			});
			
			//Imagen de flecha abajo
			var imagen1 = Ti.UI.createImageView({
						image: '/images/downArrow.png',
						right: 10
			});

			$.comboCategories.add(imagen1);
			
			//Selecciono el primero
			$.comboCategories.value =  picker_data[0].title;
			
			$.viewDirectorio.add(picker_view);
			
		}
		else //Android
		{
			//estilo
			var pickerStyle = $.createStyle({classes: ['pickerStyle']});
							
			var picker = Titanium.UI.createPicker({});
			picker.selectionIndicator='false';
			picker.applyProperties(pickerStyle);
							
			picker.add(picker_data);
									
			picker.addEventListener('change', function(){
						$.comboCategories.value = picker.getSelectedRow(0).title;
						
						//Limpio antes todo el contenido
						Ti.App.fireEvent('openLoading');
						utils.removeAllChildren($.scrollableDirectorySlider);
				
						//Carga WebServie de Empresas de una Categoría
						Ti.App.addEventListener('loadEmpresasSector', loadEmpresasSector);
						managment_Data.LoadWebService_Empresas_Sector(picker.getSelectedRow(0).id);
			});	
	
			$.comboCategories.add(picker);	
			
		}
		
}



/* ***********************************************************
 * Event Handlers
 * ***********************************************************/

function handlerEvent_directorioDetail(e)
{
	e.source.removeEventListener('click', handlerEvent_directorioDetail);
	managment_View.OpenSectionParam('directorioDetail',[e.source.id],'directorio', Alloy.Globals.ActualContainer);
}