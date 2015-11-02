var userStore = require('../stores/user.js');

module.exports.LinkApp = function(app) {
	app.get('/api/users', function(req, res) {
		userStore.getAll(function(users) {
			res.json(users);
		});
	});

	app.get('/api/users/:id', function(req, res) {
		var id = req.params.id;
		userStore.get(id, function(user, error) {
			if ( error ) return res.sendStatus(400);
			res.json(user);
		});
	});

	app.put('/api/users/:id', function(req, res) {
		var id = req.params.id;
		var update = req.body;
		if ( !update ) return res.sendStatus(400);
		userStore.get(id, function(user, error) {
			if ( error ) return res.sendStatus(400);
			userUpdate.id = user.id;
			userStore.save(update, function(user, error) {
				if (error) return res.sendStatus(400);
				res.json(user);
			});
		});
	});

	app.delete('/api/users/:id', function(req, res) {
		var id = req.params.id;
		userStore.get(id,function(user,error) {
			if( error ) return res.sendStatus(400);
			userStore.delete(user, function(user_deleted, error) {
			if ( error ) return res.sendStatus(400);
			res.json(user_deleted);
			});
		}); 		
	});

	app.post('/api/users', function(req, res) {
		var user = req.body;
		if ( !user ) return res.sendStatus(400);
		userStore.save(user, function(user, error) {
			if ( error ) return res.sendStatus(400);
			res.json(user);
		});
	});
};