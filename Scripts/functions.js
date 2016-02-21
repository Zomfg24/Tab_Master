$(document).on("ready", function(){
	$("#Separar").focus();
	$("#separar").on("click", function(){
		var allTabsId = new Array();
		var allTabsURL = {url: new Array() };
		var allTabsTitle = new Array();
		var closedTabsURL = {url: new Array()};
		var closedTabsId = new Array();
		var keep;
		var cont = 0;
		var keyword = {title: document.getElementById('Separar').value};
		console.log("entra");
		chrome.tabs.query({}, function(tabs){
		console.log("Query");

		keyword.title = keyword.title.toLowerCase();
		/*Gets the keyword including tabs*/
		for(var i = 0; i < tabs.length; i++){
			allTabsId[i] = tabs[i].id;
			allTabsURL.url[i] = tabs[i].url;
			allTabsTitle[i] = tabs[i].title;
			allTabsTitle[i] = allTabsTitle[i].toLowerCase();
		}

		for(var i = 0; i < tabs.length; i++)
		{
			if(allTabsTitle[i].indexOf(keyword.title) > -1)
			{
				closedTabsURL.url[cont] = allTabsURL.url[i];
				closedTabsId[cont] = allTabsId[i];
				cont++;
			}
		}

		chrome.windows.create(closedTabsURL, function(){});

		chrome.tabs.remove(closedTabsId, function(){});
		});
	});

	$("#guardar").on("click", function(){

	});
});




/*
MEJORAS:
	# tabs found
	evaluar todo el cuerpo oh yeah
	ignoreCase
	guardar
*/