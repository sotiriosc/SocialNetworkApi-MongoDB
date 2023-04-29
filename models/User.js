// Import required modules from Mongoose
const { Schema, model } = require('mongoose');

// Define the User schema
const UserSchema = new Schema(
  {
    // Define the 'username' field
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Define the 'email' field
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      // Validate the email format using a regex pattern
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    // Define the 'thoughts' field as an array of references to Thought documents
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // Define the 'friends' field as an array of references to other User documents
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Configure the schema to include virtual fields when converting to JSON
    toJSON: {
      virtuals: true,
    },
    id: true,
  }
);

// Define a virtual property 'friendCount' to compute the number of friends
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model using the defined schema
const User = model('User', UserSchema);

// Export the User model
module.exports = User;
