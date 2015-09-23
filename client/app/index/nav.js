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
		var isViz = $('[id=search-form]').css("display")
		
		if (isViz && srchTerm) {
			sAlert.info("This would search for '" + srchTerm + "'.");
			}
	}
});

