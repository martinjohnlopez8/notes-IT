var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'gallery';

	// Load the galleries by sortOrder
	view.query('galleries', keystone.list('Gallery').model.
		find().where('author', locals.user.id)
		.sort('sortOrder'));
	console.log(locals.user.id)

	// Render the view
	view.render('gallery');

};
