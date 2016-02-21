function cerrar(process, keyword){
	var closeTabs = new Array();
	var allTabs = new Array();
	var openTabs = new Array();
	var keep;
	chrome.tabs.query(keyword, function(tabs){
		for(var i = 0; i < tabs.length; i++){
			closeTabs[i] = tabs[i].id;
			}
		});
	if(process == true){
		chrome.tabs.remove(closeTabs, function(){});
	}
	else{
		chrome.tabs.query({}, function(tabs){
		for(var i = 0; i < tabs.length; i++){
			allTabs[i] = tabs[i].id;
			}
		});
		for(var i = 0; i < allTabs.length; i++){
			keep = false;
			for(var j = 0; j < closeTabs.length; j++){
				if(allTabs[i] == closeTabs[j]){
					keep = true;
					break;
				}
			}
			if(!keep){
				chrome.tabs.remove(allTabs[i], function(){});
			}
		}
	}
}

function separar(keyword){

}

function guardar(keyword){

}