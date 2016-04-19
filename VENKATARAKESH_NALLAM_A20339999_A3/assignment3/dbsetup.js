var DataStore = require("nedb");
var dbFile = new DataStore({filename:"user.db",autoload:"true"});
dbFile.ensureIndex({fieldName: 'name', unique: true});
module.exports = dbFile;