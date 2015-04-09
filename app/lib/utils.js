
var Alloy = require('alloy');

exports.createComboBox = function (data){
	
	
};


exports.strNormalize = function(str){
	
	
	var caracteres = new Array();
	
	var pares = new Object();
	pares.str1 = "&aacute;";
	pares.str2 = "á";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&Aacute;";
	pares.str2 = "Á";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&eacute;";
	pares.str2 = "é";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&Eacute;";
	pares.str2 = "É";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&iacute;";
	pares.str2 = "í";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&Iacute;";
	pares.str2 = "Í";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&oacute;";
	pares.str2 = "ó";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&Oacute;";
	pares.str2 = "Ó";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&uacute;";
	pares.str2 = "ú";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&Uacute;";
	pares.str2 = "Ú";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&ntilde;";
	pares.str2 = "ñ";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&Ntilde;";
	pares.str2 = "Ñ";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&nbsp;";
	pares.str2 = " ";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&iquest;";
	pares.str2 = "¿";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&ordm;";
	pares.str2 = "º";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&euro;";
	pares.str2 = "€";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&reg;";
	pares.str2 = "®";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&quot;";
	pares.str2 = "'";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&#x00a1;";
	pares.str2 = "¡";
	caracteres.push(pares);
	
	var pares = new Object();
	pares.str1 = "&iexcl;";
	pares.str2 = "¡";
	caracteres.push(pares);


	for (var i = 0; i<=caracteres.length-1; i++)
	{
		str = str.split(caracteres[i].str1).join(caracteres[i].str2);
	}
	
	return str;
};

exports.bytesToSize = function(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};


exports.removeAllChildren = function(viewObject) {
    var children = viewObject.children.slice(0);
 
    for (var i = 0; i < children.length; ++i) {
        viewObject.remove(children[i]);
        children[i] = null;
    }
};


exports.removeAllRows = function(table) {
	if (table.data.length > 0) {
	    for (var i = table.data[0].rows.length-1; i >= 0; i--) {
	        table.deleteRow(i);
	    }
	}	
};

exports.getRowChecked = function(table) {
	var rows = table.data[0].rows;
	for (var i in rows) {
		var row = rows[i];
		if (row.hasCheck) {
			return row;
		}
	}	
};

exports.dateToUnix = function(date) {
    return Math.round(date.getTime() / 1000);
};

exports.now = function() {
    return Math.round((new Date()).getTime() / 1000);
};

exports.reverseString = function(str) {
    var s = "";
	for (var i = str.length - 1; i >= 0; i--){
	    s += str[i];
	}
	return s;
};

exports.objToString = function(o) {
	if (!o) return "";
	var jsonObject = JSON.stringify(o);
	return jsonObject.replace(/\"/g,"'");;
};

exports.stringToObject = function(str) {
	if (!str) return null;
	//var stringObj = str.replace(/\((.*)\)/, "$1");
	var stringObj = str.replace(/'/g,"\"");
	var objAgain = JSON.parse(stringObj);
	return objAgain;
};

exports.httpRequest = function(method, url, payload, callback) {
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
        	if (callback) callback(this.responseText, null);
        },
        onerror: function(e) {
        	if (e.error == "404" || e.error == "Not Found") {
        		callback(JSON.stringify({list:[]}), null);	
        	} else if (callback) {
        		callback(this.responseText, e.error);
        	}
            
        },
        timeout : 5000
    });

    if (method == 'GET' && payload) {
        var values = [];        
        for (var key in payload) {
            values.push(key + '=' + payload[key]); 
        }            
        url = url + '?' + values.join('&');
        payload = null;
    }

	//alert(url);
    client.open(method, url);
    client.setRequestHeader("X-CSRF-Token", Alloy.CFG.SERVER_TOKEN);
    if(method == 'POST' || method == 'PUT') {
    	client.setRequestHeader('Content-Type', 'application/json');
    }

    if (payload != null) {
    	client.send(JSON.stringify(payload)); 
    } else {
    	client.send(payload); 
    }
};


