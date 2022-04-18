var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    nameOfOrg: {
      type: String,
      length: 32,
      required: true,
      trim: true,
    },
    founder: {
      type: String,
      length: 32,
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      length: 32,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      lenght: 32,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      length: 10,
      required: true,
      trim: true,
    },
    aboutUs: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: Number, // 0 for employer, 1 for master admin.
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  console.log("inside pre I am");
  console.log(user);
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
