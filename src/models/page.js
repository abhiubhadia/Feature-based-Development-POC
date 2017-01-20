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
var PageSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String
    },
    path: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true,
        trim: true
    },
    updated: {
        type: Array
    },
    source: {
        type: String
    },
    editorModel: {
        type: String
    },
    designMode: {
        type: String
    },
    groups: [{name: String, id: String}],
    orgs: [{name: String, id: String}],
    regions: [{name: String, id: String}]
});

module.exports = mongoose.model('Page', PageSchema);

