var connection = require("../db");
var app = require("../app");

// Get all usertypes

app.get("/neerseva/usertypes", (req, res) => {
  let sql = "SELECT * FROM usertypes";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get usertype by usertypeId

app.get("/neerseva/usertypes/:user_type_id", (req, res) => {
  let user_type_id = req.params.user_type_id;
  let sql = "SELECT * FROM usertypes WHERE user_type_id = " + user_type_id;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.json("usertype id not found");
    } else {
      res.json(result);
    }
  });
});

// create user type

app.post("/neerseva/usertypes", (req, res) => {
  let usertype = req.body;
  let sql = "INSERT INTO usertypes SET ?";
  let query = connection.query(sql, usertype, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// update usertype

app.put("/neerseva/usertypes/:user_type_id", (req, res) => {
  connection.query(
    "UPDATE `usertypes` SET  `user_type_name` = ?, `user_type_role` = ?, `user_type_permission` = ? where `user_type_id` = ?",
    [
      req.body.user_type_name,
      req.body.user_type_role,
      req.body.user_type_permission,
      req.body.user_type_id
    ],
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

// delete user profile
app.delete("/neerseva/usertypes/:user_type_id", (req, res) => {
  let user_type_id = req.params.user_type_id;
  connection.query(
    "DELETE FROM `usertypes` WHERE `user_type_id`=?",
    [user_type_id],
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});
