var managment_View = require("managment_View");

var url_WebService_HechoEnMijas = "http://hechoenmijas.solbyte.com.es/ws.php?c=Noticias&m=getAll";

var url_WebService_HechoEnMijas_Detail = "http://hechoenmijas.solbyte.com.es/ws.php?c=Noticias&m=getOne";

var url_WebService_Agenda = "http://hechoenmijas.solbyte.com.es/ws.php?c=Eventos&m=getAll";

var url_WebService_Agenda_Detail = "http://hechoenmijas.solbyte.com.es/ws.php?c=Eventos&m=getOne";

var url_WebService_Directorio_Sectores = "http://hechoenmijas.solbyte.com.es/ws.php?c=Sectores&m=getAll";

var url_WebService_Empresas_Sector = "http://hechoenmijas.solbyte.com.es/ws.php?c=Empresas&m=getAll";

var url_WebService_Empresa_Detail = "http://hechoenmijas.solbyte.com.es/ws.php?c=Empresas&m=getOne";

var url_WebService_Ofertas = "http://hechoenmijas.solbyte.com.es/ws.php?c=Ofertas&m=getAll";

var url_WebService_Ofertas_Detail = "http://hechoenmijas.solbyte.com.es/ws.php?c=Ofertas&m=getOne";

exports.LoadWebService_HechoEnMijas = function() {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                datamodel_HechoEnMijas = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadHechoEnMijas");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_6"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_6"));
        },
        timeout: 3e4
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url_WebService_HechoEnMijas);
    client.send();
};

exports.LoadWebService_HechoEnMijas_Detail = function(_id) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                datamodel_HechoEnMijas_Detail = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadHechoEnMijasDetail");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_6"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_6"));
        },
        timeout: 3e4
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url_WebService_HechoEnMijas_Detail);
    var data = {
        id: _id
    };
    client.send(data);
};

exports.LoadWebService_Agenda = function() {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                datamodel_Agenda = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadAgenda");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_6"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_6"));
        },
        timeout: 3e4
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url_WebService_Agenda);
    client.send();
};

exports.LoadWebService_Agenda_Detail = function(_id) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                datamodel_Agenda_Detail = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadAgendaDetail");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_6"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_6"));
        },
        timeout: 3e4
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url_WebService_Agenda_Detail);
    var data = {
        id: _id
    };
    client.send(data);
};

exports.LoadWebService_Directorio_Sectores = function() {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                datamodel_EmpresasSectores = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadDirectorioSectores");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_6"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_6"));
        },
        timeout: 3e4
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url_WebService_Directorio_Sectores);
    client.send();
};

exports.LoadWebService_Empresas_Sector = function(_sector) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                datamodel_EmpresasSector = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadEmpresasSector");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_6"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_6"));
        },
        timeout: 3e4
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url_WebService_Empresas_Sector);
    var data = {
        sector: _sector
    };
    client.send(data);
};

exports.LoadWebService_Empresa_Detail = function(_id) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                datamodel_Empresa_Detail = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadEmpresaDetail");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_6"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_6"));
        },
        timeout: 3e4
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url_WebService_Empresa_Detail);
    var data = {
        id: _id
    };
    client.send(data);
};

exports.LoadWebService_Ofertas = function() {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                datamodel_Ofertas = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadOfertas");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_6"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_6"));
        },
        timeout: 3e4
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url_WebService_Ofertas);
    client.send();
};

exports.LoadWebService_Ofertas_Detail = function(_id) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                datamodel_Ofertas_Detail = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadOfertasDetail");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_6"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_6"));
        },
        timeout: 3e4
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url_WebService_Ofertas_Detail);
    var data = {
        id: _id
    };
    client.send(data);
};