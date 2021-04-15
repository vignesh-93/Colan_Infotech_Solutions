const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
let connection = MongoClient.connect("mongodb://localhost:27017/colon_db", {
    useUnifiedTopology: true
});

const addUser = async (req, res) => {
    try {
        var check = await checkMobile(req.body, 'registration');
        if (check && check.length > 0) {
            res.send({
                result: "User already exist"
            });
        } else {
            if (req.body.mobile && req.body.name) {
                req.body.date = new Date();
                req.body.isDeleted = false;
                var data = await insertUser(req.body, 'registration')
                res.send({
                    success: true,
                    Result: "User Added Successfully"
                });
            } else {
                res.send({
                    Result: "Details Missing"
                });
            }
        }
    } catch (err) {
        console.log(err, "err")
    }
};

var checkMobile = async (params, collection) => {
    var con = await connection;
    var db = await con.db("colon_db");
    var result = await db
        .collection(collection)
        .find({ mobile: params.mobile })
        .toArray();
    return result;
};

var insertUser = async (data, collection) => {
    var con = await connection;
    try {
        var db = await con.db("colon_db");
        var result = await db.collection(collection).insertOne(data);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addUser
};