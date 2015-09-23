/*  nav.js  
	all the js for the nav templates goes here
*/

Template.navSearch.events({
	'click #search-btn': function (event, tpl) {
		 event.preventDefault();
		$('[id=search-form]').toggle();
		console.log("Click on search button"); 

	},
	'submit': function (event, tpl) {
		event.preventDefault();

		var srchTerm = $('[name=searchTerm]').val();
		if (srchTerm) {
			sAlert.info("This would search for '" + srchTerm + "'.");
			$('[name=searchTerm]').val("");
		} else {
			sAlert.error("Enter something to serarch for first.");
		}
	}
});

