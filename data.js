function loadData() { 
	var data = {
		
		showAdSize: { //create a div for showAdSize to populate
			id: 'adSize',
			type: 'info',
			pageType: 'uploadPage'
		},

		newAd: { //show available sizes, fill form when one is selected
			html: 'showSizeList',
			func: 'fillFormNew', //when a size is clicked
			id: 'sizeList',
			type: 'info',
			pageType: 'newAdPage'
		},

		showEmailInput: {
			html: 'showEmailInput',
			id: 'showEmailInput',
			type: 'info',
			pageType: 'publishAdPage'
		},

		goPreview: {
			func: 'goPreview',
			text: 'Preview',
			type: 'button',
			pageType:{
				'uploadPage':true,
				'previewPage':true,
				'eventsPage':true
			}
		},

		goNew: {
			func: 'goNew',
			text: 'New Creative',
			type: 'button',
			pageType:{
				'uploadPage':true,
				'previewPage':true,
				'eventsPage':true,
				'campaignPage':true
			}
		},

		goUpload:{
			func: 'goUpload',
			text: 'Upload',
			type: 'button',
			pageType:{
				'uploadPage':true,
				'previewPage':true,
				'eventsPage':true
			}
		},

		fillFormPublish: {
			func: 'fillFormPublish',
			text: 'Update',
			type: 'button',
			pageType: 'publishAdPage'
		},


		hideMarvin: {			
			func: 'toggleMarvin',
			id: 'hideMarvin',
			type: 'button',
			text: 'X'
		},

		scrollTop: {
			func: 'scrollTop',
			id: 'scrollTop',
			type: 'button'
		},

		scrollBottom: {
			func: 'scrollBottom',
			id: 'scrollBottom',
			type: 'button'
		}

	};
	
	return data;
}