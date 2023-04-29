// const mongoose = require('mongoose');
// const { connectionString } = require('../config/connection');
// const { User, Thought } = require('../models');
// const { users, thoughts } = require('./data');

// mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });



// const seedDatabase = async () => {
//   try {
//     await User.deleteMany({});
//     await Thought.deleteMany({});

//     const createdUsers = await User.insertMany(users);

//     for (let i = 0; i < thoughts.length; i++) {
//       const { _id, thoughtText, username } = thoughts[i];
//       const user = createdUsers.find((user) => user.username === username);

//       const thought = await Thought.create({ thoughtText, username: user.username });

//       await User.findByIdAndUpdate(user._id, { $push: { thoughts: thought._id } });
//     }

//     console.log('Database seeded!');
//     process.exit(0);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// seedDatabase();


const mongoose = require('mongoose');
const { connectionString } = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(users);

    for (let i = 0; i < thoughts.length; i++) {
      const { _id, thoughtText, username } = thoughts[i];
      const user = createdUsers.find((user) => user.username === username);

      const thought = await Thought.create({ thoughtText, username: user.username });

      await User.findByIdAndUpdate(user._id, { $push: { thoughts: thought._id } });
    }

    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
