const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');
const Reaction = require('./models/Reaction');

mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB for seeding');

    // Clear the database before seeding
    return Promise.all([User.deleteMany(), Thought.deleteMany(), Reaction.deleteMany()]);
  })
  .then(() => {
    // Create Users with animal names
    const user1 = new User({
      username: 'lion',
      email: 'lion@zoo.com',
    });

    const user2 = new User({
      username: 'elephant',
      email: 'elephant@zoo.com',
    });

    const user3 = new User({
      username: 'penguin',
      email: 'penguin@zoo.com',
    });

    // Save Users
    return Promise.all([user1.save(), user2.save(), user3.save()]);
  })
  .then(([user1, user2, user3]) => {
    // Create Thoughts for the animal users
    const thought1 = new Thought({
      thoughtText: 'Everything the light touches is our kingdom ☀️',
      username: user1.username,
    });

    const thought2 = new Thought({
      thoughtText: 'I love the snow ❄️',
      username: user3.username,
    });

    const thought3 = new Thought({
      thoughtText: 'The great migration 🐘 🐘 🐘 🐘',
      username: user2.username,
    });

    // Save Thoughts
    return Promise.all([thought1.save(), thought2.save(), thought3.save()]);
  })
  .then(([thought1, thought2, thought3]) => {
    // Create Reactions for the thoughts
    const reaction1 = new Reaction({
      reactionBody: 'Not down here',
      username: 'penguin',
    });

    const reaction2 = new Reaction({
      reactionBody: 'I do not like the cold',
      username: 'lion',
    });

    const reaction3 = new Reaction({
      reactionBody: 'Lets go!',
      username: 'penguin',
    });

    // Add Reactions to Thoughts
    thought1.reactions.push(reaction1);
    thought2.reactions.push(reaction2);
    thought3.reactions.push(reaction3);

    // Save Reactions and Thoughts with updated reactions
    return Promise.all([reaction1.save(), reaction2.save(), reaction3.save(), thought1.save(), thought2.save(), thought3.save()]);
  })
  .then(() => {
    console.log('Database seeded!');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error seeding the database:', err);
    mongoose.disconnect();
  });