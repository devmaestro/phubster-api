var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String
    },
    emailAddress: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    password: {
        type: String
    },
    pushyId: {
        type: String
    },
    source: {
        type: String
    },
    facebook_ak: {
        id: {
            type: String
        },
        emailAddress: {
            type: String
        },
        mobileNumber: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        },
        emailAddress: {
            type: String
        },
        name: {
            type: String
        }
    },
    gPlus: {
        id: {
            type: String
        },
        emailAddress: {
            type: String
        },
        name: {
            type: String
        }
    },
    friends: [{
        _friend: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        source: {
            type: String
        }
    }],
    sentInvites: [{
        _recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        source: {
            type: String
        }
    }],
    verification: {
        status: {
            type: String
        },
        code: {
            type: String
        }
    },
    receivedInvites: [{
        _sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        source: {
            type: String
        }
    }]
});

userSchema.pre('save', function(callback) {
    var user = this;

    if (!user.isModified('password')) {
        callback(null);
    } else {
        bcrypt.genSalt(5, function(err, salt) {
            if (err) {
                callback(err);
            } else {
                bcrypt.hash(user.password, salt, null, function(err, hash) {
                    if (err) return callback(err);
                    user.password = hash;
                    callback();
                });
            }
        });
    }
});

userSchema.methods.verifyPassword = function(password, cb) {
    var user = this;

    bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) {
            cb(err);
        } else {
            cb(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', userSchema);
