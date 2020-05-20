const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host} DB: ${conn.connection.db.databaseName}`
        .cyan.underline.bold
    );

    // conn.connection.db.listCollections().toArray(function (err, names) {
    //   console.log(names);
    // });
  } catch (err) {
    console.log(`Failed to connect to Mongo DB. Error: ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
