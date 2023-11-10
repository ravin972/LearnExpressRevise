var express = require("express");
var router = express.Router();
const userModel = require("./users");

router.get("/", function (req, res, next) {
  res.cookie("cookie", 10245);
  req.session.anyName = true;
  res.render("index");
});

router.get("/cookieRead", function (req, res, next) {
  console.log(req.cookies);
  res.send("check cookies");
});

router.get("/deleteCookie", function (req, res, next) {
  res.clearCookie("cookie");
  res.send("cleared cookies");
});

router.get("/checkSession", function (req, res, next) {
  console.log(req.session);
  res.send("Checked session,visit console.");
});

router.get("/checkBan", function (req, res, next) {
  if (req.session.anyName === true) {
    res.send("Banned!");
  } else {
    res.send("Not banned!");
  }
});

router.get("/removeBan", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.send("Unbanned!");
  });
});

router.get("/create", async function (req, res, next) {
  const createdUser = await userModel.create(
    {
      username: "Ravin",
      age: 23,
      name: "Ravinder",
    },
    {
      username: "Anton",
      age: 24,
      name: "Antonio",
    }
  );
  res.send(createdUser);
});

router.get("/allUsers", async function (req, res, next) {
  let allUsers = await userModel.find();
  res.send(allUsers);
});

router.get("/user", async function (req, res, next) {
  let oneUser = await userModel.findOne({ username: "Anton" });
  res.send(oneUser);
});

router.get("/delete", async function (req, res, next) {
  let userDelete = await userModel.findOneAndDelete({ username: "Anton" });
  res.send(userDelete);
});

module.exports = router;
