var connection = require("../db");
var app = require("../app");


// Get all stocks
app.get("/neerseva/stocks", (req, res) => {
  let sql = "SELECT * FROM stocks";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// get stock by stockid
app.get("/neerseva/stocks/:stock_id", (req, res) => {
  let stock_id = req.params.stock_id;
  let sql = "SELECT * FROM stocks WHERE stock_id = " + stock_id;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.json("stocks not found");
    } else {
      res.json(result);
    }
  });
});

//Save stocks
app.post("/neerseva/stocks", (req, res) => {
  let stocks = req.body;
  let sql = "INSERT INTO stocks SET ?";
  let query = connection.query(sql, stocks, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// update stocks
app.put("/neerseva/stocks/:stock_id", (req, res) => {
  let stock_id = req.params.stock_id;
  connection.query(
    "UPDATE `stocks` SET  `stock_quantity` = ?,  `item_id` =?, `stock_date_created` =?, `stock_is_available` = ?, `stock_is_deleted` = ?, `stock_created_by_user` =? where `stock_id` = ?",
    [
      req.body.stock_quantity,
      req.body.item_id,
      req.body.stock_date_created,
      req.body.stock_is_available,
      req.body.stock_is_deleted,
      req.body.stock_created_by_user,
      stock_id
    ],
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

// delete stocks
app.delete("/neerseva/stocks/:stock_id", (req, res) => {
  let stock_id = req.params.stock_id;
  connection.query(
    "DELETE FROM `stocks` WHERE `stock_id`=?",
    [stock_id],
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});
