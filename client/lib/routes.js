/*  routes.js  
	flowRouter:  https://atmospherejs.com/kadira/flow-router
	You can define routes anywhere in the client directory. 
	But, we recommend to add them in the lib directory. 
	Then fast-render can detect subscriptions and send them for you.
*/

/* Set the DOM element Blaze renders into... */
BlazeLayout.setRoot('body');



FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {
    },
    action: function(params, queryParams) {
        console.log("Not Found Params & query:", params, queryParams);
        BlazeLayout.render("mainLayout", {content: "notFound"});

    },
    name: "404notFound" // optional
};



FlowRouter.route('/', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Not Found Params & query:", params, queryParams);
        if (Meteor.userId()) {
            BlazeLayout.render("mainLayout", {content: "main"});
        } else {
            BlazeLayout.render("mainLayout", {content: "splash"});
        }
    },

    name: "main" // optional
});

FlowRouter.route('/about', {
    action: function(params, queryParams) {
         BlazeLayout.render("mainLayout", {content: "about"});
    },
    name: "about" // optional
});

FlowRouter.route('/contact', {
    action: function(params, queryParams) {
         BlazeLayout.render("mainLayout", {content: "contact"});
    },
    name: "contact"
});

FlowRouter.route('/help', {
    action: function(params, queryParams) {
         BlazeLayout.render("mainLayout", {content: "help"});
    },
    name: "help"
});

/* ====================  */

FlowRouter.route('/private', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function() {
    BlazeLayout.render("mainLayout", {content: "private"});
  }
});

