import { MongoClient } from "mongodb";
import { mongoConfig } from "./settings.js";

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
    try {
        console.log("Trying to connect to MongoDB");
        if (!_connection) {
            _connection = await MongoClient.connect(mongoConfig.serverUrl);
            _db = _connection.db(mongoConfig.database);
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
    return _db;
};

const closeConnection = async () => {
    await _connection.close();
};

export { dbConnection, closeConnection };
