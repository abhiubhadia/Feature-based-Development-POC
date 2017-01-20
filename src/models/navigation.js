/**
 * Created by kishore on 12/13/15.
 */
/**
 * Created by kishore on 12/11/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var NavigationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    enabled: {
        type: Boolean,
        default: true,
        trim: true
    },
    updated: {
        type: Array
    },
    permittedRoles: [String],
    type: {
        type: String
    },
    menu :  [{name: String, id: String, contextPath: String,enabled: Boolean, mobileEnabled: Boolean, version: String, children:[{name: String, id: String, contextPath: String,mobileEnabled: Boolean,enabled: Boolean, version: String}]}]
});

module.exports = mongoose.model('Navigation', NavigationSchema);

