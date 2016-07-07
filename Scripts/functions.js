$(document).on("ready", function(){
	$('#guardarAllInvisible').hide();
    $("#invisibleTxtBox").hide();
	$("#inputKeyword").focus();
	$('#inputKeyword').on("change paste keyup", function(){
		var value = document.getElementById('inputKeyword').value;
		document.getElementById('separar').disabled = (value == "") ? true : false;
		document.getElementById('guardar').disabled = (value == "") ? true : false;
	});

	$('#inputKeyword').on("click", function(){
		$("#guardarAllInvisible").hide();
	});

	$("#separar").on("click", function(){
		$("#guardarAllInvisible").hide();
		var keyword = document.getElementById('inputKeyword').value;
		keyword = keyword.toLowerCase();
		filter(keyword);
	});

	$("#merge").on("click", function(){
		$("#guardarAllInvisible").hide();
		filter("");
	});

	$("#guardar").on("click", function(){
		$("#guardarAllInvisible").hide();
		var keyword = document.getElementById('inputKeyword').value;
		keyword = keyword.toLowerCase();
		save(keyword, keyword);
	});

	$("#guardarAll").on("click", function(){
		$('#guardarAllInvisible').show();
		$('#inputName').select();
	});

	$("#Confirm").on("click", function(){
		var folderName = document.getElementById('inputName').value;
		save("", folderName);
		$("#guardarAllInvisible").hide();
	});

});

var filter = function(keyword){
	var moveTabsId = [];
	var moveProp = {windowId: "", index: -1};
	var currentWindow = {};

	chrome.windows.getCurrent({}, function(cwindow){
		currentWindow = cwindow;
	});

	chrome.tabs.query({}, function(tabs){
		for(var i=0; i<tabs.length; i++)
		{
			var title = (tabs[i].title).toLowerCase();
			if(title.indexOf(keyword) > -1 || keyword == "")
			{
				moveTabsId.push(tabs[i].id);
			}
		}

		var windowsCreateData = {
			tabId: moveTabsId[0],
			type: "normal"
		};

		if(keyword == "")
		{
			if(currentWindow.state != "maximized")
			{
				windowsCreateData.width = currentWindow.width;
				windowsCreateData.height = currentWindow.height;
			}
			else
			{
				windowsCreateData.state = "maximized";
			}
		}

		chrome.windows.create(windowsCreateData, function(windowObject){
			moveProp.windowId = windowObject.id;
			moveTabsId.splice(0,1);
			chrome.tabs.move(moveTabsId, moveProp, function(){});
		});
	});
};

var save = function(keyword, folderName){
	chrome.tabs.query({}, function(tabs){
		var folderProp = { title: folderName }
		chrome.bookmarks.create(folderProp, function(folderNode){
			for(var i=0; i<tabs.length; i++)
			{
				var title = (tabs[i].title).toLowerCase();
				if(title.indexOf(keyword) > -1 || keyword == "")
				{
					var bookmark = {
						parentId: folderNode.id,
						url: tabs[i].url,
						title: tabs[i].title
					};
					chrome.bookmarks.create(bookmark, function(){});
				}
			}
		});
		var parametro = "Saved in Bookmark folder: \"" + folderName + '\"';
		document.getElementById('invTxtBox').innerHTML = parametro;
		$("#invisibleTxtBox").show();
	});
};


/*
MEJORAS:
	# tabs found
	evaluar todo el cuerpo oh yeah
*/