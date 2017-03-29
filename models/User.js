var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	photo: { type: Types.CloudinaryImage, collapse: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	isEditor: {type: Boolean, label: 'Can Edit', index: true}
},	'Posts', {
	title: {type: Types.Relationship, ref: 'Post'},
	image: {type: Types.Relationship, ref: 'Post'},
	content: {
		brief: { type: Types.Relationship, ref: 'Post'},
		extended: { type: Types.Relationship, ref: 'Post'},
	},
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

User.schema.virtual('canEdit').get(function () {
	return this.isEditor;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
