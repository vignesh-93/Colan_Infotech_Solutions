var jwt = require('jsonwebtoken');
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
let connection = MongoClient.connect("mongodb://localhost:27017/colon_db", {
    useUnifiedTopology: true
});

let getUser =  async (req, res) => {
        try {
            let result = await getUserDetails(req.headers.authorization, 'registration');
            if (result && result.length > 0) {
                res.send({
                    success: true,
                    result: result
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
    
    var getUserDetails = async (tokenValue, collection) => {
        try {
            let con = await connection;
            let db = await con.db('colon_db');
            let result = db.collection(collection).find({
                token: tokenValue
            }).toArray()
            return result;
        } catch (err) {
            console.log(err);
        }
    };

module.exports = {
    getUser
}