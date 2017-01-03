	/**
	 * UserController
	 *
	 * @description :: Server-side logic for managing users
	 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
	 */

	module.exports = {

	    // ----------------------------------------------------- GETTERS

	    /*
	    // Parameters ()
	    // returns Json object that carry:
	    // 	- error: 			true 		=> 	(There is an error occurred)
	    // 							false		=>		(No error occurred)
		 // 	- message:			Error message or Success message to be shown to the end user
		 // 	- users object: 	carry all the info of all users in DB
	    */
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

	    /*
	    // Parameters (query/type)
	    // returns Json object that carry:
	    // 	- error: 			true 		=> 	(There is an error occurred)
	    // 							false		=>		(No error occurred)
		 // 	- message:			Error message or Success message to be shown to the end user
		 // 	- url: 				URL user should go back to
		 // 	- users object: 	carry all the info of all query matched users in DB
	    */
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


	    // ----------------------------------------------------- SETTERS

	    /*
	    // Parameters ({name,email,password})
	    // returns Json object that carry:
	    // 	- error: 			true 		=> 	(There is an error occurred)
	    // 							false		=>		(No error occurred)
		 // 	- message:			Error message or Success message to be shown to the end user
		 // 	- url: 				URL user should go back to
		 // 	- user object: 	carry all the info of user in action
	    */
	    addUser: function(req, res) {

	        if (req.method === 'GET') {
	            console.log('-GENERAL ERROR!!, You are not allowed here');
	            res.view('homepage', {
	                message: 'You requested wrong page',
	                url: 'panel/users/addUser'
	            });
	        }

	        // if (req.isAuthenticated()) {

	        if (req.param('name') && req.param('email') && req.param('password')) {

	            var name = req.param('name');
	            var email = req.param('email');
	            var password = req.param('password');

	            var userModel = {
	                name: name,
	                email: email,
	                password: password
	            }

	            User.create(userModel, function(err, data) {
	                if (err) {
	                    console.log('-User.Create ERROR', err);
	                    res.view('errors/error', {
	                        error: 'true',
	                        message: err,
	                        url: 'panel/users/addUser'
	                    });
	                } else {
	                    res.view('success/success', {
	                        error: 'false',
	                        message: "User added successfully",
	                        url: 'panel/users/addUser',
	                        user: data
	                    });
	                }
	            })

	        } else {
	            console.log('-GENERAL ERROR!!, MISSING IMPORTANT CREDINTIALS');
	            res.view('errors/error', {
	                error: 'true',
	                message: 'Missing paramaters, those were sent are:' + req.allParams(),
	                url: 'panel/users/addUser'
	            });

	        }

	        // } else {
	        //     console.log('-GENERAL ERROR!!, USER IS NOT AUTHENTICATED');
	        //     res.view('user/login', {
	        //         error: 'true',
	        //         message: 'Please login to add a new article',
	        //         url: 'panel/users/addUser'
	        //     });
	        // }
	    },

	    /*
	    // Parameters (name/email/password, id)
	    // returns Json object that carry:
	    // 	- error: 			true 		=> 	(There is an error occurred)
	    // 							false		=>		(No error occurred)
		 // 	- message:			Error message or Success message to be shown to the end user
		 // 	- id:					User Id ONLY IF there is an error for developing issues
		 // 	- url: 				URL user should go back to
		 // 	- user object: 	carry all the info of user in action
	    */
	    editUser: function(req, res) {

	        if (req.method === 'GET') {
	            console.log('-GENERAL ERROR!!, You are not allowed here');
	            res.view('homepage', {
	                error: 'true',
	                message: 'You requested wrong page',
	                url: 'panel/users/editUser'
	            });
	        }

	        if (req.isAuthenticated()) {
	            if (req.param('name') && req.param('id')) {
	                var name = req.param('name');

	                User.update({ id: req.param('id') }, { name: name }).exec(function(err, user) {
	                    if (err) {
	                        console.log('-User.Edit ERROR', err);
	                        res.view('errors/error', {
	                            error: 'true',
	                            message: err,
	                            id: req.param('id'),
	                            url: 'panel/user/editUser'
	                        });
	                    } else {
	                        res.view('panel/user/editUser', {
	                            error: 'false',
	                            message: "name edited successfully",
	                            user: user,
	                            url: 'panel/user/editUser'
	                        });
	                    }
	                });

	            } else if (req.param('email') && req.param('id')) {
	                var email = req.param('email');

	                User.update({ id: req.param('id') }, { email: email }).exec(function(err, user) {
	                    if (err) {
	                        console.log('-User.Edit ERROR', err);
	                        res.view('errors/error', {
	                            error: 'true',
	                            message: err,
	                            id: req.param('id'),
	                            url: 'panel/user/editUser'
	                        });
	                    } else {
	                        res.view('panel/user/editUser', {
	                            error: 'false',
	                            message: "email edited successfully",
	                            user: user,
	                            url: 'panel/user/editUser'
	                        });
	                    }
	                });

	            } else if (req.param('password') && req.param('id')) {
	                var password = req.param('password');

	                User.update({ id: req.param('id') }, { password: password }).exec(function(err, user) {
	                    if (err) {
	                        console.log('-User.Edit ERROR', err);
	                        res.view('errors/error', {
	                            error: 'true',
	                            message: err,
	                            id: req.param('id'),
	                            url: 'panel/user/editUser'
	                        });
	                    } else {
	                        res.view('panel/user/editUser', {
	                            error: 'false',
	                            message: "password edited successfully",
	                            user: user,
	                            url: 'panel/user/editUser'
	                        });
	                    }
	                });

	            } else {
	                console.log('-User.Edit ERROR: No paramaters were found');
	                res.view('errors/error', {
	                    error: 'true',
	                    message: 'Missing paramaters, those were sent are:' + req.allParams(),
	                    url: 'panel/user/editUser'
	                });
	            }

	        } else {
	            console.log('-GENERAL ERROR!!, USER IS NOT AUTHENTICATED');
	            res.view('user/login', {
	                error: 'true',
	                message: 'Please login to edit any user',
	                url: 'panel/user/editUser'
	            });
	        }
	    },

	    /*
	    // Parameters (id)
	    // returns Json object that carry:
	    // 	- error: 			true 		=> 	(There is an error occurred)
	    // 							false		=>		(No error occurred)
	    // 	- message:			Error message or Success message to be shown to the end user
	    // 	- url: 				URL user should go back to
	    */
	    removeUser: function(req, res) {
	        if (req.method === 'GET') {
	            console.log('-GENERAL ERROR!!, You are not allowed here');
	            res.view('homepage', {
	                error: 'true',
	                message: 'You requested wrong page',
	                url: 'panel/users'
	            });
	        }

	        if (req.isAuthenticated()) {
	            User.destroy({ 'id': req.param('id') }).exec(function(err) {
	                if (err) {
	                    console.log('-User.Delete ERROR', err);
	                    res.view('errors/error', {
	                        error: 'true',
	                        message: err,
	                        url: 'panel/users'
	                    });
	                } else {
	                    res.view('panel/users', {
	                        error: 'false',
	                        message: 'User deleted successfully',
	                        url: 'panel/users'
	                    });
	                }
	            });

	        } else {
	            console.log('-GENERAL ERROR!!, USER IS NOT AUTHENTICATED');
	            res.view('user/login', {
	                error: 'true',
	                message: 'Please login to remove any article',
	                url: 'panel/users'
	            });
	        }
	    },

	    // ----------------------------------------------------- SETTERS



	};