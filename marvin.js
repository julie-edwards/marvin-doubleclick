function makeEle(thisEle, classes, library, marvin) { //create generic elements for buttons and info, and apply library functions
	var ele;

	ele = $('<div/>', {class: classes, id: thisEle.id, text: thisEle.text});

	if (thisEle.html && typeof library[thisEle.html] === 'function') {  //set html to the result of any matching html generation functions in the library object.
		ele.html(library[thisEle.html](thisEle));
	}

	if (thisEle.func && typeof library[thisEle.func] === 'function') {  //bind .func to .click() if defined in both data object and library object.
		ele.click(function() {
			library[thisEle.func](thisEle);
		});
	}

	marvin.append(ele);
}


function makeMarvin(data, library, marvin, pageType) {
	var thisData, obj, thisType, thisPageType, myClass;

	for (obj in data) {
		thisData = data[obj];
		thisType = thisData.type;
		thisPageType = thisData.pageType;
		
		if (typeof thisPageType == 'string'){ //cast all page types as associative arrays
			var obj = {};
			obj[thisPageType]=true;
			thisPageType=obj;
		}
		if (!thisPageType || thisPageType[pageType]) { //put objects on correct pages; not specified goes on all pages
			if (thisType == 'button') { myClass = 'marvinButton'; }

			makeEle(thisData, myClass, library, marvin);
		}
	}

	marvin.appendTo($('body'));  // "wretched, isn't it?"
}

$(document).ready(function() {
	var marvin = $('<div/>', {id: 'marvin'}), //"code base the size of a planet and they have me fetching ad sizes."
		data = loadData(),
		library = loadLibrary();

	console.log('marvin present');
	window.setTimeout(startUp, 1000);//give the page a moment to load

	//refresh marvin every time the url changes, because ajax
	$(window).bind('hashchange', function() {
		$('#marvin').empty().remove();
		console.log('urlchange');
		startUp();
	});

	function startUp(){ 
		var pageType = null; //find out what sort of page we're on
		var currUrl = document.URL;
		if (currUrl.indexOf("creative:step=MANAGE_FILES") > -1){
			pageType = 'uploadPage';
		}
		else if (currUrl.indexOf("creative:step=PREVIEW") > -1){
			pageType = 'previewPage';
		}
		else if (currUrl.indexOf("creative:step=EDIT_EVENTS") > -1){
			pageType = 'eventsPage';
		}
		else if (currUrl.indexOf("#creative/new") > -1){
			pageType = 'newAdPage';
		}
		else if (currUrl.indexOf("step=PUBLISH") > -1){
			pageType = 'publishAdPage';
		}
		else if (currUrl.indexOf("#campaign:advertiserId") > -1){
			pageType = 'campaignPage';
		}
		if (pageType != null){ //make marvin on marvin pages only plz
			makeMarvin(data, library, marvin, pageType);
			console.log(pageType);
		}	
	};
	
	//toggle marvin when user clicks icon
	chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {  //marvin doesn't care what you have to say, but he'll listen anyway.
	    if (request.greeting == 'toggle marvin') {
			library.toggleMarvin();
	    }
	});
});