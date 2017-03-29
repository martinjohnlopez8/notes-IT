var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.data = {
		posts: [],
	};

	locals.formData = req.body || {};

	view.on('post', { action: 'user.create' }, function(next) {
	        var newUser = new User.model({
	            name: {
	                first: locals.formData.first,
	                last: locals.formData.last
	            }
	        });

	        var updater = newUser.getUpdateHandler(req);

	        updater.process(req.body, {
	            fields: 'email, password',
	            flashErrors: true,
	            logErrors: true
	        }, function(err,result) {
	            if (err) {      
	                data.validationErrors = err.errors; 
	            } else {
	                req.flash('success', 'Account created. Please sign in.');               
	                return res.redirect('/');
	            }
	            next();
	        });

	    });


	// Render the view
	view.render('registration');
};