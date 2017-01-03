/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        title: {
            type: 'string',
            required: true
        },

        subTitle: {
            type: 'string'
        },

        content: {
            type: 'string',
            required: true
        },

        image: {
            type: 'string'
        },

        user: {
            type: 'string',
            required: true
        },

        category: {
            type: 'string',
            required: true
        }

    }
};