const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://megaadmin:azeqaPnC41Uamh4b@cluster0.b9g4b.mongodb.net/davbotbotwatcher?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "animelist",
    }
  );
  console.log("Connected to MongoDB");
};

module.exports = { connect };
