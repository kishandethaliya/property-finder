const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const expUpload = require("express-fileupload");
app.use(cors());

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// File Uploading Method
app.use(expUpload());
app.use(express.static(__dirname + "/"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/");
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_property_search",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  app.post("/api/add-property", (req, res) => {
    const {
      name,
      description,
      price,
      sale_rent,
      address,
      country,
      pincode,
      latitude,
      longitude,
    } = req.body;
    let mainImageFile = req.files.fileName;
    const fileExtension = mainImageFile.name.split(".").pop();
    const newImgName = "image_" + Date.now();
    const updatedImgName = newImgName + "." + fileExtension;
    mainImageFile.mv(__dirname + "/upload/" + updatedImgName);

    const sql =
      "INSERT INTO property (name,description,price,main_image,sale_rent,address,country,pincode,latitude,longitude) VALUES ('" +
      name +
      "','" +
      description +
      "','" +
      price +
      "','" +
      updatedImgName +
      "','" +
      sale_rent +
      "','" +
      address +
      "','" +
      country +
      "','" +
      pincode +
      "','" +
      latitude +
      "','" +
      longitude +
      "')";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send("1 Record Inserted");
    });
  });

  app.get("/api/get-properties", (req, res) => {
    var sql = "select * from property order by id desc";
    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/api/get-list-by-search", (req, res) => {
    const searchStr = req.body.searchStr;
    var sql =
      "select * from property where pincode Like'%" +
      searchStr +
      "%' or country Like'%" +
      searchStr +
      "%'";
    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.listen(4000);
