const express = require("express");
const router = express.Router();
const addUser = require("../routes/addUser");
const login = require("../routes/login");
const edit = require("../routes/editUser");
const getUser = require("../routes/getUser");
const deleteUser = require("../routes/deleteUser");
const auth = require("./auth");

let routes = (app) => {
  router.post("/addUser",addUser.addUser);
  router.get("/login", login.login);
  router.post("/editUser",auth, edit.editUser);
  router.get("/getUser",auth,getUser.getUser);
  router.get("/deleteUser",auth, deleteUser.deleteUser);

  app.use("/api", router);
};

module.exports = routes;