var connection = require("../db");
var app = require("../app");

// Get All Shop
app.get("/neerseva/shops", (req, res) => {
  let sql = "SELECT * FROM shops";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get shop By shopId

app.get("/neerseva/shops/:shop_id", (req, res) => {
  let shop_id = req.params.shop_id;
  let sql = "SELECT * FROM shops WHERE shop_id = " + shop_id;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.json("shops not found");
    } else {
      res.json(result);
    }
  });
});

//Save items
app.post("/neerseva/shops", (req, res) => {
  let shops = req.body;
  let sql = "INSERT INTO shops SET ?";
  let query = connection.query(sql, shops, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// update user_profile
app.put("/neerseva/shops/:shop_id", (req, res) => {
  connection.query(
    "UPDATE `shops` SET  `shop_name` = ?,  `shop_image_id` =?, `shop_type` =?, `shop_address_id` = ?, `shop_code` = ?, `shop_branch` = ?  where `shop_id` = ?",
    [
      req.body.shop_name,
      req.body.shop_image_id,
      req.body.shop_type,
      req.body.shop_address_id,
      req.body.shop_code,
      req.body.shop_branch,
      req.body.shop_id
    ],
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

// delete user profile
app.delete("/neerseva/shops/:shop_id", (req, res) => {
  let shop_id = req.params.shop_id;
  connection.query("DELETE FROM `shops` WHERE `shop_id`=?", [shop_id], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});
