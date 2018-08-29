// 1. Include required modules
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcryptjs');

// 2. Define the MongoDB schema for the people collection
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: 'UsernameInvalid'
  },
  password: {
    type: String,
    required: 'PasswordInvalid'
  }
});

// 4. Encypt and store the user's password
userSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

// 5. Confirm a user's password against the stored password
userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

// 6. Export the user model
module.exports = mongoose.model('User', userSchema);
