var jwt = require('jsonwebtoken');
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
let connection = MongoClient.connect("mongodb://localhost:27017/colon_db", {
    useUnifiedTopology: true
});

let deleteUser =  async (req, res) => {
    try {
        let result = await deleteUserDtl(req.headers.authorization, 'registration');
        if (result) {
            res.send({
                success: true,
                message: "User Deleted Succesfully"
            })
        } else {
            res.send({
                success: false,
                message: "Invalid Token"
            })
        }
    } catch (err) {
        console.log(err);
    }
};

var deleteUserDtl = async (tokenValue, collection) => {
    try {
        let con = await connection;
        let db = await con.db('colon_db');
        let result = await db.collection(collection)
            .updateOne({ token: tokenValue }, { $set: { isDeleted: true } });
        if (result.matchedCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    deleteUser
}