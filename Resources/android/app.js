var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.viewContainerPrincipal;

Alloy.Globals.WinInitContainer;

Alloy.Globals.ViewActive = [];

Alloy.Globals.ActualContainer;

Alloy.Globals.ActualSection;

Alloy.Globals.IsLoading;

Alloy.Globals.UrlImages = "http://hechoenmijas.solbyte.com.es/res/uploads/";

Alloy.CFG.GREY = "#5a5a5a";

Alloy.CFG.GREY_LIGHT = "#CDCDCD";

Alloy.CFG.GREY_LIGHT2 = "#3A3A3A";

Alloy.CFG.GREY_DARK = "#7a7a7a";

Alloy.CFG.GREY_DARK2 = "#242423";

Alloy.CFG.WHITE = "#FFFFFF";

Alloy.CFG.BLACK = "#000000";

Alloy.CFG.BLUE1 = "#0189c6";

Alloy.CFG.BLUE2 = "#50b2e9";

Alloy.CFG.RED1 = "#a91d32";

Alloy.CFG.RED2 = "#c94b2c";

Alloy.CFG.GREEN1 = "#67a74d";

Alloy.CFG.GREEN2 = "#98c14d";

Alloy.CFG.ORANGE1 = "#dd882e";

Alloy.CFG.ORANGE2 = "#cc9b42";

Alloy.CFG.ORANGE3 = "#dc892f";

Alloy.CFG.BLUELIGHT1 = "#5ab4ac";

Alloy.CFG.BLUELIGHT2 = "#69bdb7";

Alloy.CFG.WidthDeviceIphone = Ti.Platform.displayCaps.platformWidth;

Alloy.CFG.WidthDeviceAndroid = Ti.Platform.displayCaps.platformWidth / (Titanium.Platform.displayCaps.dpi / 160);

Alloy.CFG.HeightDevice = Ti.Platform.displayCaps.platformHeight / (Titanium.Platform.displayCaps.dpi / 160);

Alloy.CFG.ARIAL_NORMAL = "Arial";

Alloy.CFG.FONT_HELVETICA_NEUE_LT_LIGHT = "HelveticaNeueLTStd-Lt";

Alloy.CFG.FONT_HELVETICA_NEUE_LT_MED = "HelveticaNeueLTStd-Md";

Alloy.CFG.GENEVA = "Geneva";

var datamodel_Agenda = [];

var datamodel_AgendaDetail = [];

var datamodel_HechoEnMijas = [];

var datamodel_HechoEnMijas_Detail = [];

var datamodel_EmpresasSectores = [];

var datamodel_EmpresasSector = [];

var datamodel_Empresa_Detail = [];

var datamodel_Ofertas = [];

var datamodel_Ofertas_Detail = [];

Alloy.createController("index");