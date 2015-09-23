//  at-config.js

// AccountsTemplates.configureRoute(route_code, options);

var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // Successfully logged in
      // ...
    }
    if (state === "signUp") {
      // Successfully registered
      // ...
    }
  }
};

/* NOTE: The above configs must load BEFORE your AccountsTemplates routes are defined.*/

AccountsTemplates.configure({
    //defaultTemplate: 'myCustomFullPageAtForm',
    defaultLayout: 'mainLayout',
    defaultLayoutRegions: {},
    defaultContentRegion: 'content'
});


AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
    // onLogoutHook: myLogoutFunc,
    onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Register Now!"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
});

var pwd = AccountsTemplates.removeField('password');
/* more fields can be added to the sign-up form using this template*/
var linkField = {
    _id: "linkField",
    type: "text",
    displayName: "Link Code",
    required: false,
    minLength: 2,
    placeholder: {
      signUp: "Enter your link code (if you have it)",
    }
  };

AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
	{
		_id: "username",
		type: "text",
		displayName: "username",
		required: true,
		minLength: 5,
		placeholder: {
			signUp: "At least five characters",
			signIn: "username (case sensitive)"
		},
		func: function(value){
			if (Meteor.isClient) {
				console.log("Validating username...");
				var self = this;
				Meteor.call("userExists", value, function(err, userExists){
				if (!userExists)
					self.setSuccess();
				else
					self.setError(userExists);
					self.setValidating(false);
				});
				return;
			}
			return Meteor.call("userExists", value);
		}
  },
    {
        _id: 'email',
        type: 'email',
        required: true,
        displayName: "email",
        re: /.+@(.+){2,}\.(.+){2,}/,
        errStr: 'Invalid email',
    },
    {
        _id: 'username_and_email',
        type: 'text',
        required: true,
        displayName: "Login",
        placeholder: {
          signIn: "Username (case sensitive) or email"
      },
    },
    pwd,
    linkField
]);

AccountsTemplates.configureRoute('signIn');
