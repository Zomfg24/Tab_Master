$(document).on("ready", function(){
	$("#separar").on("click", function(){
		var closeTabsId = new Array();
		var closedTabsURL = {url: new Array()};
		var keep;
		var keyword = {title: document.getElementById('Separar').value};
		console.log("entra");
		chrome.tabs.query(keyword, function(tabs){
		console.log("Query");


		/*Gets the keyword including tabs*/
		for(var i = 0; i < tabs.length; i++){
			closeTabsId[i] = tabs[i].id;
			closedTabsURL.url[i] = tabs[i].url;
			console.log(closeTabsId[i]);
		}
		chrome.windows.create(closedTabsURL, function(){});

		chrome.tabs.remove(closeTabsId, function(){});
		});
	});

	$("#guardar").on("click", function(){
		
	});
});




/*
MEJORAS:
	# tabs found
	ignoreCase
	guardar
*/