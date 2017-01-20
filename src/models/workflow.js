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
var WorkflowSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    domSyntax: {
        type: String,
        required: true
    },
    template: {
        type: String
    },
    version: {
        type: String,
        required: true,
        trim: true
    },
    enabled: {
        type: Boolean,
        default: true,
        trim: true
    },
    mobileEnabled: {
        type: Boolean
    },
    path: {
        type: String
    },
    dependencies: {
        type: Array
    },
    updated: {
        type: Array
    },
    webSource: {
        type: String
    },
    mWebSource: {
        type: String
    },
    mobileAppSource: {
        type: String
    },
    mobileIOSAppSource: {
        type: String
    },
    apiUrl: {
        type: String
    },
    showInNavigation: {
        type: Boolean,
        default: false
    },
    groups: [{name: String, id: String}],
    orgs: [{name: String, id: String}],
    regions: [{name: String, id: String}]

});

module.exports = mongoose.model('Workflow', WorkflowSchema);

