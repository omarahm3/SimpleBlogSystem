/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    // ----------------------------------------------------- GETTERS

    getAll_Articles: function(req, res) {
        Article.find({ sort: 'createdAt DESC' }).exec(function(err, data) {
            if (err) {
                console.log('-Article.All ERROR:', err);
                res.view('errors/error', {
                    message: err
                });
            } else {
                res.view('homepage', {
                    data: data
                });
            }
        });
    },

    getArticle_ByCategory: function(req, res) {
        if (req.param('category')) {
            Article.find({
                where: { category: req.param('category') },
                sort: 'createdAt DESC'
            }).exec(function(err, data) {
                if (err) {
                    console.log('-Article.ByCategory ERROR:', err);
                    res.view('errors/error', {
                        message: err,
                        url: 'articles/main'
                    });
                } else {
                    res.view('articles/byCat', {
                        data: data,
                        url: 'articles/main'
                    });
                }
            });
        } else {
            console.log('-Article.ByCategory ERROR: No paramaters were found');
            res.view('errors/error', {
                message: 'Missing paramaters, those were sent are:' + req.allParams(),
                url: 'articles/main'
            });
        }
    },

    getArticle_ByQuery: function(req, res) {

        if (req.param('query')) {
            Article.find({
                where: { content: req.param('query') },
                sort: 'createdAt DESC'
            }).exec(function(err, data) {
                if (err) {
                    console.log('-Article.ByQuery ERROR:', err);
                    res.view('errors/error', {
                        message: err,
                        url: 'articles/search'
                    });
                } else {
                    res.view('articles/searchResults', {
                        data: data,
                        url: 'articles/search'
                    });
                }
            });
        } else {
            console.log('-Article.ByQuery ERROR: No paramaters were found');
            res.view('errors/error', {
                message: 'Missing paramaters, those were sent are:' + req.allParams(),
                url: 'articles/search'
            });
        }

    },

    // ----------------------------------------------------- GETTERS


    // ----------------------------------------------------- SETTERS

    addArticle: function(req, res) {
        if (req.method === 'GET') {
            console.log('-GENERAL ERROR!!, You are not allowed here');
            res.view('homepage', {
                message: 'You requested wrong page',
                url: 'articles/addArticle'
            });
        }

        if (req.isAuthenticated()) {
            var title = req.param('title');
            var subtitle = req.param('subTitle');
            var content = req.param('content');
            var user = req.param('user');
            var category = req.param('category');

            if ((title && content && user && category) || (subtitle || req.file('image'))) {

                req.file('image').upload({
                    dirname: '../../assets/uploads/'
                }, function(err, uploadedFiles) {
                    if (err) console.log('ERROR: ', err);
                    if (_.isEmpty(uploadedFiles)) return res.json({ error: 'Error no image uploaded' });

                    var articleModel = {
                        title: title,
                        content: content,
                        user: user,
                        category: category,
                        subtitle: subtitle,
                        image: uploadedFiles[0].fd
                    }

                    Article.create(articleModel, function(err, data) {
                        if (err) {
                            console.log('-Article.Create ERROR', err);
                            res.view('errors/error', {
                                message: err,
                                url: 'articles/addArticle'
                            });
                        } else {
                            res.view('success/success', {
                                message: "Article added successfully",
                                url: 'articles/addArticle'
                            });
                        }
                    })


                });

            } else {
                console.log('-GENERAL ERROR!!, MISSING IMPORTANT CREDINTIALS');
                res.view('errors/error', {
                    message: 'Missing paramaters, those were sent are:' + req.allParams(),
                    url: 'articles/addArticle'
                });

            }

        } else {
            console.log('-GENERAL ERROR!!, USER IS NOT AUTHENTICATED');
            res.view('user/login', {
                message: 'Please login to add a new article',
                url: 'articles/addArticle'
            });
        }
    },

    editArticle: function(req, res) {
        if (req.method === 'GET') {
            console.log('-GENERAL ERROR!!, You are not allowed here');
            res.view('homepage', {
                message: 'You requested wrong page',
                url: 'articles/editArticle'
            });
        }

        if (req.isAuthenticated()) {
            if (req.param('title') && req.param('id')) {
                var title = req.param('title');

                Article.update({ id: req.param('id') }, { title: title }).exec(function(err, article) {
                    if (err) {
                        console.log('-Article.Edit ERROR', err);
                        res.view('errors/error', {
                            message: err,
                            id: req.param('id'),
                            url: 'articles/main'
                        });
                    } else {
                        res.view('articles/main', {
                            message: "title edited successfully",
                            id: req.param('id'),
                            title: article.title,
                            url: 'articles/edit'
                        });
                    }
                });

            } else if (req.param('subTitle') && req.param('id')) {
                var subTitle = req.param('subTitle');

                Article.update({ id: req.param('id') }, { subTitle: subTitle }).exec(function(err, article) {
                    if (err) {
                        console.log('-Article.Edit ERROR', err);
                        res.view('errors/error', {
                            message: err,
                            id: req.param('id'),
                            url: 'articles/main'
                        });
                    } else {
                        res.view('articles/main', {
                            message: "subTitle edited successfully",
                            id: req.param('id'),
                            subTitle: article.subTitle,
                            url: 'articles/edit'
                        });
                    }
                });

            } else if (req.param('content') && req.param('id')) {
                var content = req.param('content');

                Article.update({ id: req.param('id') }, { content: content }).exec(function(err, article) {
                    if (err) {
                        console.log('-Article.Edit ERROR', err);
                        res.view('errors/error', {
                            message: err,
                            id: req.param('id'),
                            url: 'articles/main'
                        });
                    } else {
                        res.view('articles/main', {
                            message: "content edited successfully",
                            id: req.param('id'),
                            content: article.content,
                            url: 'articles/edit'
                        });
                    }
                });
            } else if (req.param('category') && req.param('id')) {
                var category = req.param('category');

                Article.update({ id: req.param('id') }, { category: category }).exec(function(err, article) {
                    if (err) {
                        console.log('-Article.Edit ERROR', err);
                        res.view('errors/error', {
                            message: err,
                            id: req.param('id'),
                            url: 'articles/main'
                        });
                    } else {
                        res.view('articles/main', {
                            message: "content edited successfully",
                            id: req.param('id'),
                            category: article.category,
                            url: 'articles/edit'
                        });
                    }
                });
            } else if (req.file('image') && req.param('id')) {

                req.file('image').upload({
                    dirname: '../../assets/uploads/'
                }, function(err, uploadedFiles) {
                    if (err) console.log('ERROR: ', err);
                    if (_.isEmpty(uploadedFiles)) {
                        return res.view('errors/error', {
                            message: 'No image uploaded:' + req.allParams(),
                            url: 'articles/editArticle'
                        });
                    }
                    var fileName = uploadedFiles[0].fd.substring(uploadedFiles[0].fd.lastIndexOf('\\') + 1);
                    var path = require('util').format(URL + "/uploads/" + fileName);

                    Article.update({ id: req.param('id') }, { image: path }).exec(function(err, article) {
                        if (err) {
                            console.log('-Article.Edit ERROR', err);
                            res.view('errors/error', {
                                message: err,
                                id: req.param('id'),
                                url: 'articles/main'
                            });
                        } else {
                            res.view('articles/main', {
                                message: "image edited successfully",
                                id: req.param('id'),
                                image: article.image,
                                url: 'articles/edit'
                            });
                        }
                    });

                });

            } else {
                console.log('-Article.Edit ERROR: No paramaters were found');
                res.view('errors/error', {
                    message: 'Missing paramaters, those were sent are:' + req.allParams(),
                    url: 'articles/editArticle'
                });
            }

        } else {
            console.log('-GENERAL ERROR!!, USER IS NOT AUTHENTICATED');
            res.view('user/login', {
                message: 'Please login to edit any article',
                url: 'articles/editArticle'
            });
        }
    },

    removeArticle: function(req, res) {
        if (req.method === 'GET') {
            console.log('-GENERAL ERROR!!, You are not allowed here');
            res.view('homepage', {
                message: 'You requested wrong page',
                url: 'articles/editArticle'
            });
        }

        if (req.isAuthenticated()) {
            Article.destroy({ 'id': req.param('id') }).exec(function(err) {
                if (err) {
                    console.log('-Article.Delete ERROR', err);
                    res.view('errors/error', {
                        message: err,
                        url: 'articles/removeArticle'
                    });
                } else {
                    res.view('articles/main', {
                        message: err,
                        url: 'articles/removeArticle'
                    });
                }
            });

        } else {
            console.log('-GENERAL ERROR!!, USER IS NOT AUTHENTICATED');
            res.view('user/login', {
                message: 'Please login to remove any article',
                url: 'articles/removeArticle'
            });
        }
    },

    // ----------------------------------------------------- SETTERS


    // ----------------------------------------------------- API GETTERS

    JSON_getAllArticles: function(req, res) {
        Article.find({ sort: 'createdAt DESC' }).exec(function(err, data) {
            if (err) {
                console.log('-Article.JSON_All ERROR:', err);
                res.json({
                    error: 'true',
                    msg: 'Failed to get data from server'
                });
            } else {
                res.json({
                    error: 'false',
                    data: data
                });
            }
        });
    },

    JSON_getByCatArticles: function(req, res) {
        if (req.param('category')) {

            Article.find({
                where: { category: req.param('category') },
                sort: 'createdAt DESC'
            }).exec(function(err, data) {
                if (err) {
                    console.log('-Article.ByCategory ERROR:', err);
                    res.json({
                        error: 'true',
                        msg: 'Failed to get data from server'
                    });
                } else {
                    res.json({
                        error: 'false',
                        data: data
                    });
                }
            });

        } else {
            console.log('-Article.ByCategory ERROR: No paramaters were found');
            res.json({
                error: 'true',
                msg: 'No parameters sent to server'
            });
        }
    },

    JSON_getByQueryArticles: function(req, res) {

        if (req.param('query')) {
            Article.find({
                where: { content: req.param('query') },
                sort: 'createdAt DESC'
            }).exec(function(err, data) {
                if (err) {
                    console.log('-Article.ByQuery ERROR:', err);
                    res.json({
                        error: 'true',
                        msg: 'Failed to get data from server'
                    });
                } else {
                    res.json({
                        error: 'false',
                        data: data
                    });
                }
            });
        } else {
            console.log('-Article.ByQuery ERROR: No paramaters were found');
            res.json({
                error: 'true',
                msg: 'No parameters sent to server'
            });
        }

    },

    // ----------------------------------------------------- API GETTERS









};