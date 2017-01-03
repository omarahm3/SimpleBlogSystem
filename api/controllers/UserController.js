	/**
	 * UserController
	 *
	 * @description :: Server-side logic for managing users
	 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
	 */

	module.exports = {

	    // ----------------------------------------------------- GETTERS

	    getAll_Users: function(req, res) {
	        User.find({ sort: 'createdAt DESC' }).exec(function(err, data) {
	            if (err) {
	                console.log('-User.All ERROR:', err);
	                res.view('errors/error', {
	                    error: 'true',
	                    message: err
	                });
	            } else {
	                res.view('panel/users', {
	                    error: 'false',
	                    data: data
	                });
	            }
	        });
	    },

	    getUser_ByQuery: function(req, res) {

	        if (req.param('query') || req.param('type')) {

	            var query = req.param('query') ? req.param('query') : undefined;
	            var type = req.param('type');

	            if (type !== 'name' || type !== 'email') {
	                type = 'name'; //Search by user name by default
	            }

	            User.find({
	                where: { type: query },
	                sort: 'createdAt DESC'
	            }).exec(function(err, data) {
	                if (err) {
	                    console.log('-User.ByQuery ERROR:', err);
	                    res.view('errors/error', {
	                        error: 'true',
	                        message: err,
	                        url: 'panel/users'
	                    });
	                } else {
	                    res.view('panel/users', {
	                        error: 'false',
	                        data: data,
	                        url: 'panel/users'
	                    });
	                }
	            });

	        } else {
	            console.log('-User.ByQuery ERROR: No paramaters were found');
	            res.view('errors/error', {
	                error: 'true',
	                message: 'Missing paramaters, those were sent are:' + req.allParams(),
	                url: 'panel/users'
	            });
	        }

	    },

	    // ----------------------------------------------------- GETTERS




	};