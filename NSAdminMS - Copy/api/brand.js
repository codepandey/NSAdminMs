var connection = require("../db");
var app = require("../app");

//////////////////////////////////////////

//// All your Brand API here e.e GET POST PUT DELETE PATCH

///////////////////////////////////////////

app.get("/neerseva/brandsview", (req, res) => {
  let sql =
    "SELECT b.brand_name,b.brand_image_id,b.brand_id, i.pic, i.image_name FROM neerseva_db.brands b, neerseva_db.image i where b.brand_image_id = i.image_id;";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API FOR brand

app.get("/neerseva/brands", (req, res) => {
  let sql = "SELECT * FROM brands";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/neerseva/brands/:brand_id", (req, res) => {
  let brand_id = req.params.brand_id;
  let sql = "SELECT * FROM brands WHERE brand_id = " + brand_id;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.json("brand id not found");
    } else {
      res.json(result);
    }
  });
});

// create a brand
app.post("/neerseva/brands", (req, res) => {
  let brand = req.body;
  let sql = "INSERT INTO brands SET ?";
  let query = connection.query(sql, brand, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// update user_profile
app.put("/neerseva/brands/:brand_id", (req, res) => {
  connection.query(
    "UPDATE `brands` SET  `brand_name` = ?,  `brand_image_id` =?, `brand_image` =?, `brand_date_created` = ?  where `brand_id` = ?",
    [
      req.body.brand_name,
      req.body.brand_image_id,
      req.body.brand_image,
      req.body.brand_date_created,
      req.body.brand_id
    ],
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

// delete user profile
app.delete("/neerseva/brands/:brand_id", (req, res) => {
  let brand_id = req.params.brand_id;
  connection.query(
    "DELETE FROM `brands` WHERE `brand_id`=?",
    [brand_id],
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});
