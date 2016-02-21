$(document).on("ready", function(){
	$("#cerrar").on("click", function(){
		var closeTabs = new Array();
		var allTabs = new Array();
		var openTabs = new Array();
		var keep;
		var process = true;
		var keyword = document.getElementById('Cerrar').value;
		console.log("entra");
		chrome.tabs.query("keyword", function(tabs){
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
	});
});

function cerrar(){
	
}

function separar(keyword){

}

function guardar(keyword){

}