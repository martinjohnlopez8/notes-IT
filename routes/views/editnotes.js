var keystone = require('keystone');
	async = require('async');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
	};
	locals.validationErrors = {};

	locals.formData = req.body || {};
	// Load the current post
	view.on('init', function (next) {
		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.post = result;
			next(err);
		});
	});




	// view.on('post', function(next) {
		
	// 	Post.data.title = req.body.title;
	// 	Post.data.content.brief = req.body.briefcontent;
	// 	Post.data.content.extended = req.body.extendedcontent;
	// 	Post.data.save(function(err) {
	// 		if (err) return next(err);
	// 		req.flash('success', 'Your changes have been saved.');
	// 		res.redirect('/blog');
	// 	});
	// });


	view.on('post', {action: 'notes.edit'}, function(next) {
		Post.model.findById(locals.data.post.id)
			locals.data.post.title = req.body.title;
			console.log(locals.data.post.content.brief)
			locals.data.post.content.brief = req.body.briefcontent;
			locals.data.post.content.extended = req.body.extendedcontent;
			locals.data.post.save();
			res.redirect('/blog')
			req.flash('Edited')
	});

	// view.on('post', function(next) {
	// 	// console.log("req.body")
	// 	// return next();
	// 	async.series([			
	// 		function(cb) {
	// 			var postData = {
	// 				title: req.body.title,
	// 				content: {
	// 					brief: req.body.briefcontent,
	// 					extended: req.body.extendedcontent
	// 				},
	// 				author: locals.user.id,
	// 			};
	// 			var Post = keystone.list('Post').model
	// 				newPost = new Post(postData);
				
	// 			postData.save(function(err) {
	// 				return cb(err);
	// 			});
	// 		console.log("Notes Edited")
	// 		req.flash('Notes Edited')
	// 		res.redirect('/blog');
	// 		}
	// 	]);	
	// });

	// console.log(locals.data.posts)
	// view.on('post', {action: 'notes.delete'}, function(next) {
	// 	console.log('haaaa')
	// 	console.log("deleted")
	// 	Post.model.remove(req.params.post);
	// 	res.redirect('/blog')
	// });

	// view.on('post', {action: 'notes.delete'}, function(next) {
	// 	var q = keystone.list('Post').model.findOne({
	// 		state: 'published',
	// 		slug: locals.filters.post,
	// 	});
	// 	q.remove(q.id)
	// 	console.log('deleted')
	// 	res.redirect('/blog')
	// });

	view.on('post', {action: 'notes.delete'}, function(next) {
		Post.model.findById(locals.data.post.id)
		    .remove(function(err) {
		        res.redirect('/blog')
		        req.flash('Notes Deleted')
		    });
	});

	// });



	
	// Render the view
	view.render('editnotes');
};
