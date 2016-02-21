$(document).on("ready", function(){
    $("#invisibleTxtBox").hide();
	$("#Separar").focus();
	$("#separar").on("click", function(){
		var allTabsId = new Array();
		var allTabsURL = {url: new Array() };
		var allTabsTitle = new Array();
		var closedTabsURL = {url: new Array()};
		var closedTabsId = new Array();
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
		var allTabsId = new Array();
		var allTabsURL = {url: new Array() };
		var allTabsTitle = new Array();
		var cont = 0;
		var keyword = {parentId: document.getElementById('Separar').value, title: document.getElementById('Separar').value};
		function obj_bookmark(){
			this.parentId = null,
			this.title = "",
			this.url = ""
		}
		var bookmark = [];
		var theBookmarkGod = {parentId: null, url: null, title: null};
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
				bookmark[cont] = new obj_bookmark();
				bookmark[cont].url = allTabsURL.url[i];
				bookmark[cont].title = allTabsTitle[i];
				cont++;
			}
		}

		var btnArray = {id: "null", title: keyword.title};

		chrome.bookmarks.create({
			'title': keyword.title
		},function(btnArray){
			for(var i = 0; i < cont; i++)
			{
				theBookmarkGod.parentId = btnArray.id;
				theBookmarkGod.url = bookmark[i].url;
				theBookmarkGod.title = bookmark[i].title;
				chrome.bookmarks.create(theBookmarkGod);
			}
		});

		var parametro = "Bookmarks guardadas en el folder: \"" + keyword.title + '\"';
		document.getElementById('invTxtBox').innerHTML = parametro;
		$("#invisibleTxtBox").show();

		});
	});
});




/*
MEJORAS:
	# tabs found
	evaluar todo el cuerpo oh yeah
	ignoreCase
	guardar
*/