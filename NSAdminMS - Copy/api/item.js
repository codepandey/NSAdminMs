var connection = require("../db");
var app = require("../app");

// API ITEMS
// get all items
app.get("/neerseva/items", (req, res) => {
  let sql = "SELECT * FROM items";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// get item by id
app.get("/neerseva/items/:item_id", (req, res) => {
  let item_id = req.params.item_id;
  let sql = "SELECT * FROM items WHERE item_id = " + item_id;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.json("items not found");
    } else {
      res.json(result);
    }
  });
});

// Get Items By BrandId
app.get("/neerseva/items/by/:brand_id", (req, res) => {
  let brand_id = req.params.brand_id;
  let sql = "SELECT * FROM items WHERE brand_id = '" + brand_id + "'";
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//Save items
app.post("/neerseva/items", (req, res) => {
  let items = req.body;
  let sql = "INSERT INTO items SET ?";
  let query = connection.query(sql, items, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// update items
app.put("/neerseva/items/:item_id", (req, res) => {
  connection.query(
    "UPDATE `items` SET  `item_name` = ?,  `item_code` =?, `item_price` =?, `item_mrp` = ?, `item_disp_price` = ?, `item_discount` = ?, `item_type` = ?, `item_description` = ?,  `item_capacity` = ?, `brand_id` = ?, `item_image_id` = ?,  `item_date_created` = ?, `item_created_by_user` = ?, `item_is_deleted` = ?, `item_tax` = ? where `item_id` = ?",
    [
      req.body.item_name,
      req.body.item_code,
      req.body.item_price,
      req.body.item_mrp,
      req.body.item_disp_price,
      req.body.item_discount,
      req.body.item_type,
      req.body.item_description,
      req.body.item_capacity,
      req.body.brand_id,
      req.body.item_image_id,
      req.body.item_date_created,
      req.body.item_created_by_user,
      req.body.item_is_deleted,
      req.body.item_tax,
      req.body.item_id
    ],
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

// delete items
app.delete("/neerseva/items/:item_id", (req, res) => {
  let item_id = req.params.item_id;
  connection.query("DELETE FROM `items` WHERE `item_id`=?", [item_id], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});
