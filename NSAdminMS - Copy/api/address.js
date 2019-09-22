var connection = require("../db");
var app = require("../app");

//// API for Address
// get all address
app.get("/neerseva/addresses", (req, res) => {
  let sql = "SELECT * FROM address";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//create a address
app.post("/neerseva/addresses", (req, res) => {
  let address = req.body;
  let sql = "INSERT INTO address SET ?";
  let query = connection.query(sql, address, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Get Address by addressId

app.get("/neerseva/addresses/:address_id", (req, res) => {
  let address_id = req.params.address_id;
  let sql = "SELECT * FROM address WHERE address_id = " + address_id;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.json("address id not found");
    } else {
      res.json(result);
    }
  });
});

// update user_profile
app.put("/neerseva/addresses/:address_id", (req, res) => {
  connection.query(
    "UPDATE `address` SET  `address_type` = ?, `addr_line1` = ?, `addr_line2` = ?, `addr_line3` = ?, `addr_line4` = ?,  `pin` = ?, `city` = ?, `state` = ?, `country` = ?, `location_long` = ?, `location_latt` = ?, `location_name` = ?  where `address_id` = ?",
    [
      req.body.address_type,
      req.body.addr_line1,
      req.body.addr_line2,
      req.body.addr_line3,
      req.body.addr_line4,
      req.body.pin,
      req.body.city,
      req.body.state,
      req.body.country,
      req.body.location_long,
      req.body.location_latt,
      req.body.location_name,
      req.body.address_id
    ],
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

// delete user profile
app.delete("/neerseva/addresses/:address_id", (req, res) => {
  let address_id = req.params.address_id;
  connection.query(
    "DELETE FROM `address` WHERE `address_id`=?",
    [address_id],
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});
