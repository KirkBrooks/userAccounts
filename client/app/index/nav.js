/*  nav.js  
	all the js for the nav templates goes here
*/

Template.navSearch.events({
	'click #btn-search': function (event, tpl) {
		 event.preventDefault();
		$('[id=search-form]').toggle();
	},
	'blur #searchTerm': function (event) {
		var srchTerm = $('[name=searchTerm]').val();
		var lastTerm = Session.get('srchTerm');
		var isViz = $('[id=search-form]').css("display")
		
		if (isViz && srchTerm) {
			var doSrch = true;
			// is it the same term as before?
			if (lastTerm == srchTerm) { doSrch = confirm ("Do that search again?");} 
			if( doSrch == true ) {
				sAlert.info("This would search for '" + srchTerm + "'.");
				Session.set('srchTerm', srchTerm);
			}
		} else {
			$('[id=search-form]').toggle();				
		}
	}
});

