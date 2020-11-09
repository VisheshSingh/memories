const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Mongo DB successfully connected on ${conn.connection.host}...`
    );
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
