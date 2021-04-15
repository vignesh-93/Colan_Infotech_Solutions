var jwt = require('jsonwebtoken');
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
let connection = MongoClient.connect("mongodb://localhost:27017/colon_db", {
    useUnifiedTopology: true
});

const login =  async (req, res) => {
    try {
        if (req.query.name && req.query.password) {
            let result = await checkUser(req.query, 'registration');
            if (result && result.length > 0) {
                var token = jwt.sign(
                    { name: req.query.name, mobile: req.query.password }, "toGen");
                res.send({
                    "token": token,
                    success: true
                });
                if (token) {
                    result[0].token = token;
                    let tokenUpdate = updateToken(result[0], 'registration');
                }
            } else {
                res.send({
                    "result": "User does not exist"
                });
            }
        } else {
            res.send({
                "result": "Username and Password Required"
            });
        }
    } catch (err) {
        console.log(err);
    }
};

var checkUser = async (params, collection) => {
    try {
        let con = await connection;
        let db = await con.db('colon_db');
        let result = db.collection(collection)
            .aggregate([
                {
                    $match: {
                        $and: [
                            { name: params.name },
                            { password: params.password },
                            { mobile: params.mobile }
                        ]
                    }
                }
            ])
            .toArray();
        return result;
    } catch (err) {
        console.log(err)
    }
};

var updateToken = async (data, collection) => {
    try {
        var con = await connection;
        var db = await con.db("colon_db");
        var result = await db
            .collection(collection)
            .updateOne(
                { _id: ObjectID(data._id) }, { $set: data }
            );
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    login
}