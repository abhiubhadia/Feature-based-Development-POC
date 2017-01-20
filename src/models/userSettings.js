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
var UserSettingsSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String
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
    }
});

module.exports = mongoose.model('UserSettings', UserSettingsSchema);

