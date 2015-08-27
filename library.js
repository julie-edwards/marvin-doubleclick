function loadLibrary() {  //defines all functions bound to buttons with .click() during makeEle() in marvin.js.
	var count = 0;
	var funcs = {

		//when user clicks upload, display size of ad in marvin
		//since the upload window covers the one on the page >.<
		showAdSize: function() {
			var adSizeBox,
				myAdSizeBox,

			adSizeBox = $('#gwt-debug-dclk-creative-properties-size');
			myAdSizeBox = $('#marvin #adSize');
			myAdSizeBox.text(adSizeBox.text());
		},

		showSizeList: function(){
			var sizes,
				sizeArray,
				newSize;

			sizes = $('<form/>');
			sizeArray = ['160x600','180x150','200x200','250x250','300x50','300x50','300x250','300x600','320x50', '320x480',
						'450x375','468x60','480x80','480x320','640x100','728x90','768x90',
						'970x66','970x90','970x250','1024x90'];
			
			for (var i = 0; i < sizeArray.length; i++) {
				newSize = '<label><input type="radio" name="size" value="' + sizeArray[i] + '">' + sizeArray[i] + '</label><br>';
				sizes.append(newSize);					
			}
			return sizes;
		},

		showEmailInput: function(){
			var emailInput;

			emailInput = $('<textarea/>', {id: 'emailInput'});
			return ["Emails:<br>",emailInput];
		},

		goPreview: function() {
			var previewTab,
				previewFrame,
				previewButtonArray,
				myPreviewButton;

			previewTab = document.getElementById('gwt-debug-creativeworkflow-progressMapStep-link-4');
			previewFrame = document.getElementById('cps-preview-frame');

			if (previewFrame){ //check if we're on the preview page so we don't get error messages
				previewButtonArray = previewFrame.contentWindow.document.getElementsByClassName('kd-button');
				if (previewButtonArray != undefined){ //on the preview tab and frame loaded, restart the preview
					funcs.simulateClick(previewButtonArray[1]);
					funcs.simulateClick(previewButtonArray[0]);
				}
			}
			else{ //otherwise go to the preview tab
				funcs.simulateClick(previewTab);
			}
		},

		goNew: function() {
			var newCreativeButton,
				campaignTab;

			newCreativeButton = document.getElementById('gwt-debug-new-creative-dropdown-new-creative-button');
			campaignTab = document.getElementById('gwt-debug--breadcrumbs-link-2');

			if(newCreativeButton != null){ //on the campaign page, start new unit
				funcs.simulateClick(newCreativeButton,'mouseup');
				count=0; //for keep trying
			}
			else{ //if we're on an edit ad page, go to campaign page first, then try again
				funcs.keepTrying(funcs.goNew);
				funcs.simulateClick(campaignTab);
			}
		},

		goUpload: function(){
			var uploadButton,
				uploadTab;

			uploadButton = document.getElementById('gwt-debug-creativeworkflow-upload-button');
			uploadTab = document.getElementById('gwt-debug-creativeworkflow-progressMapStep-link-2');
			if(uploadButton != null){ //hit upload if we're on that tab or
				funcs.showAdSize();
				funcs.simulateClick(uploadTab);//make sure the content is focused so next click will register
				funcs.simulateClick(uploadButton);
			}
			else{ //go to the tab 
				funcs.simulateClick(uploadTab);
			}		
		},

		fillFormNew: function(){ //fill in name and size and submit new unit form.
			var mySize,
				campaignName,
				campaignNameArray,
				unitName,
				unitNameBox,
				wBox,
				hBox,
				sizeArray,
				customSizeButton,
				nextButton;

			mySize = $('input[type=radio]:checked','#sizeList').val();
			if (mySize != null){ //if the user selected a size

				campaignName = $('#gwt-debug-creativeDetail-campaignText').val();
				unitNameBox = $('#gwt-debug-creativeDetail-nameText');
				customSizeButton = document.getElementById('gwt-debug-creativeDetail-sizeText-CUSTOM');
				nextButton = document.getElementById('gwt-debug-creativeworkflow-next-button');
				wBox = $('#gwt-debug-creativeDetail-widthText');
				hBox = $('#gwt-debug-creativeDetail-heightText');

				campaignNameArray = campaignName.split("_");
				sizeArray = mySize.split("x"); //[w,h]

				if (campaignNameArray.length > 3 && campaignNameArray[1] === "TMO") {
					unitName = campaignNameArray[0] + "_" + campaignNameArray[1] + "_" + campaignNameArray[2] + "_" + mySize;
					for (i=3; i<campaignNameArray.length; i++) {
						unitName += "_" + campaignNameArray[i];
					}
				}
				else {
					unitName = campaignName + "_" + mySize;
				}
				unitName += "_HTML5";
			
				unitNameBox.val(unitName);
				funcs.simulateClick(customSizeButton,'mouseup');
				wBox.val(sizeArray[0]);
				hBox.val(sizeArray[1]);
				//funcs.simulateClick(nextButton); //ship it
			}
		},

		//regex a dc  friendly list of emails from outlook format
		//populate 'to' field and default message
		fillFormPublish: function(){ 
			var emailString,
				defaultEmailString,
				emailBox,
				commentBox;

			commentBox = $('#gwt-debug-creative-publish-email-message-input');
			emailBox = $('#gwt-debug-creative-publish-email-to-input');
			emailString = $('#emailInput').val();

			if (emailString.length > 0) {
				emailString = emailString.replace(/(.*?\<)/, "").replace(/\>[^>]*</g,", ").replace(/>/,"");
				emailString += ',';
			}
			defaultEmailString = "tmobile-drm-us@google.com,trafficteam@publicis-usa.com";
			
			emailBox.val(emailString + defaultEmailString);

			if (commentBox.val() == "") {commentBox.val('For QA only.')}; //allow a custom comment
		},

		//many dc elements can't be triggered with jq click event, or need mouseup rather than click
		simulateClick: function(elem, eventType) {
			if (eventType == null) eventType = 'click';
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent(eventType, true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
			elem.dispatchEvent(evt);
		},

		keepTrying: function(func){ //try try again has its limits
			if (count < 8){ 
				setTimeout(func, 300);
				count++;
			}
			else{
				count = 0;
			}
		},

		scrollTop: function() {
			$(window).scrollTop(0);
		},

		scrollBottom: function() {
			$(window).scrollTop($(document).height());
		},

		toggleMarvin: function() {
			$(marvin).toggle();
		}
	}

	return funcs;
}
