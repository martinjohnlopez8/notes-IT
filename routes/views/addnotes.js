var keystone = require('keystone');
	async = require('async');
var	Post = keystone.list('Post');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.data = {
		posts: [],
	};

	locals.formData = req.body || {};
	
	view.on('post', { action: 'notes.create' }, function(next) {
		
		async.series([			
			
			function(cb) {
				var postData = {
					title: req.body.title,
					content: {
						brief: req.body.briefcontent,
						extended: req.body.extendedcontent
					},
					author: locals.user.id,
				};
				
				var Post = keystone.list('Post').model
					newPost = new Post(postData);
				
				newPost.save(function(err) {
					return cb(err);
				});
			console.log('Added Notes')
			req.flash('Notes Added')
			res.redirect('/blog');
			
			}
			
		]);
		
	});
	
	// Render the view
	view.render('addnotes');
};