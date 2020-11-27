var mongoose = require("mongoose");

var MONGODB_URI = "mongodb://localhost:27017/someDatabase";

var _db, _dbError;

_db = mongoose.connection;

mongoose.connect(MONGODB_URI, (err, database) => {
    if (err) {
        _dbError = err.message;
        return console.log("\nConnection error \n\n" + err)
    };
    console.log("\n\nConnection Successful.");
    dbConnectCheck(mongoose.connection.readyState);
});

function dbConnectCheck(stateVal) {
    switch (stateVal) {
        case 0:
            console.log("\ndisconnected");
            break;
        case 1:
            console.log("\nConnected");
            break;
        case 2:
            console.log("\nconnecting");
            break;
        case 3:
            console.log("\ndisconnecting");
            break;

        default:
            console.log("\nSomething different state");
            break;
    }
}
module.exports = _db;