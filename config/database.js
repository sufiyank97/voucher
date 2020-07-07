const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const CONNECTION_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/voucher";
mongoose
    .connect(CONNECTION_URI, { useCreateIndex: true })
    .then(() => {
        console.log("successfully connected to db");
    })
    .catch(err => {
        console.log(err);
    });

module.exports = mongoose;