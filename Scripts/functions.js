$(document).on("ready", function(){
    $("#invisibleTxtBox").hide();
	$("#Separar").focus();
	$("#separar").on("click", function(){
		var allTabsId = new Array();
		var allTabsTitle = new Array();
		var moveTabsId = new Array();
		var windowObject = {id:""};
		var moveProp = {windowId: "", index: -1};
		var cont = 0;
		var keyword = {title: document.getElementById('Separar').value};
		if (keyword.title != "")
		{
			chrome.tabs.query({}, function(tabs){
			keyword.title = keyword.title.toLowerCase();
			/*Gets the keyword including tabs*/
			for(var i = 0; i < tabs.length; i++){
				allTabsId[i] = tabs[i].id;
				allTabsTitle[i] = tabs[i].title;
				allTabsTitle[i] = allTabsTitle[i].toLowerCase();
			}

			var moveTabsFirstID;
			for(var i = 0; i < tabs.length; i++)
			{
				if(allTabsTitle[i].indexOf(keyword.title) > -1)
				{
					if(cont == 0)
					{
						moveTabsFirstID = allTabsId[i];
						cont++;
					}
					else
					{
						moveTabsId[cont-1] = allTabsId[i];
						cont++;
					}
				}
			}

			var windowsCreateData = {tabId: moveTabsFirstID};
			chrome.windows.create(windowsCreateData, function(windowObject){
				moveProp.windowId = windowObject.id;
				chrome.tabs.move(moveTabsId, moveProp, function(){});
				});
			});
		}
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

		var parametro = "Saved in Bookmark folder: \"" + keyword.title + '\"';
		document.getElementById('invTxtBox').innerHTML = parametro;
		$("#invisibleTxtBox").show();

		});
	});

	$("#merge").on("click", function(){
		var allTabsId = new Array();
		var allTabsTitle = new Array();
		var moveTabsId = new Array();
		var windowObject = {id:""};
		var moveProp = {windowId: "", index: -1};
		var cont = 0;
		chrome.tabs.query({}, function(tabs){

		for(var i=1; i<tabs.length; i++)
		{
			moveTabsId[i-1] = tabs[i].id;
		}

		var windowsCreateData = {tabId: tabs[0].id};
		chrome.windows.create(windowsCreateData, function(windowObject){
			moveProp.windowId = windowObject.id;
			chrome.tabs.move(moveTabsId, moveProp, function(){});
			});
		});

	});

});




/*
MEJORAS:
	# tabs found
	evaluar todo el cuerpo oh yeah
*/