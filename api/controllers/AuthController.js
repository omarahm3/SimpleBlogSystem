/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);

                console.log('AUTH USER OBJECT', user);
                req.session.user = user;
                req.session.me = true;
                return res.view('panel/welcome', {
                    error: 'false',
                    message: "You logged in successfuly",
                    url: '/login',
                    user: user
                });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.session.user = null;
        req.session.me = false;
        req.logout();
        res.redirect('/');
    }

};