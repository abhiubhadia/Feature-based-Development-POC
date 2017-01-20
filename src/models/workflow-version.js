/**
 * Created by kishore on 12/14/15.
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
var WorkflowVersionSchema = new Schema({
    workflowId: Schema.Types.ObjectId,
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
    mWebSource : {
        type: String
    },
    mobileAppSource: {
        type: String
    },
    apiUrl: {
        type: String
    }
});

module.exports = mongoose.model('WorkflowVersion', WorkflowVersionSchema);

