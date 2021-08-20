var langMenu = {} ;

var en = {
	// this is default setting 
}

var tw = {
	"Run": "執行",
	"Save": "儲存",
	"Open": "開啟",
	"Undo": "復原",
	"Redo": "取消",
	"Remove All": "刪除全部積木",
	
	"Normal Motion": "移動方向",
}

langMenu["zh-hant"] = tw ;

var toggleLang = function( key ) {
	console.log("Call toggleLang=" + key) ;
	if ( Code.getLang() != undefined ) {
		if (langMenu[Code.getLang()] != undefined ) {
			var lang = langMenu[Code.getLang()] ;
			if ( lang[key] != undefined ) {
				return lang[key] ; 
			}
		}
	}
	console.log("toggleLang Error:" + key ) ;
	return key ;
}

var initMenuLang = function() {
	var lang = langMenu["zh-hant"] ;
	$("#runButton").html( $("#runButton").html().replace("Run", lang["Run"]))  ;
	$("#openButton").html( $("#openButton").html().replace("Open", lang["Open"]))  ;
	$("#saveButton").html( $("#saveButton").html().replace("Save", lang["Save"]))  ;
	$("#undoButton").html( $("#undoButton").html().replace("Undo", lang["Undo"]))  ;
	$("#redoButton").html( $("#redoButton").html().replace("Redo", lang["Redo"]))  ;
	$("#removeButton").html( $("#removeButton").html().replace("Remove All", lang["Remove All"]))  ;
//	$("#langButton").html( $("#langButton").html().replace("Change", lang["Change"]))  ;			
}