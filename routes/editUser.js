var jwt = require('jsonwebtoken');
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
let connection = MongoClient.connect("mongodb://localhost:27017/colon_db", {
    useUnifiedTopology: true
});

const editUser = async (req, res) => {
    try {
        let result = await updateUser(req.body, req.headers.authorization)
        if (result.success) {
            res.send({
                success: true,
                result: result.message
            })
        } else {
            res.send({
                success: true,
                message: "Invalid Token"
            })
        }
    } catch (err) {
        console.log(err);
    }
};

let updateUser = async (body, tokenValue) => {
    try {
        let con = await connection;
        let db = await con.db('colon_db');
        let result = await db.collection('registration').
            updateOne({ token: tokenValue }, { $set: body });
        if (result.matchedCount > 0) {
            return {
                message: "Updated",
                success: true
            };
        } else {
            return { success: false }
        }
    } catch (err) {
        console.log(err);
    }
};
module.exports = {
    editUser
}