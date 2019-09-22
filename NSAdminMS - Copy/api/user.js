var connection = require("../db");
var app = require("../app");

// get all USER
app.get("/neerseva/userstypes", (req, res) => {
  let sql =
    "select u.user_name, typ.user_type_name FROM users u, usertypes typ where u.user_type_id = typ.user_type_id;";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/neerseva/users", (req, res) => {
  let sql = "SELECT * FROM users";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/neerseva/userscount", (req, res) => {
  let sql =
    'select count(*) AS NumberOfUsersAsVendor FROM users u, usertypes typ where u.user_type_id = typ.user_type_id and typ.USER_TYPE_NAME = "VENDOR"';
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/neerseva/customerscount", (req, res) => {
  let sql =
    'select count(*) AS NumberOfUsersAsCustomer FROM users u, usertypes typ where u.user_type_id = typ.user_type_id and typ.USER_TYPE_NAME = "CUSTOMER"';
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/neerseva/user", (req, res) => {
  let sql =
    'SELECT COUNT (*) AS NumberOfUsersAsCustomer  FROM users WHERE USER_TYPE_NAME REGEXP "Customer" ';
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/neerseva/usercounts", (req, res) => {
  let sql = "SELECT COUNT (*) AS NumberOfUsers  FROM users";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get USER by id
app.get("/neerseva/users/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  let sql = "SELECT * FROM users WHERE user_id = " + user_id;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.json("users not found");
    } else {
      res.json(result);
    }
  });
});

//Save user
app.post("/neerseva/users", (req, res) => {
  let user = req.body;
  let sql = "INSERT INTO users SET ?";
  let query = connection.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// update USER
app.put("/neerseva/users/:user_id", (req, res) => {
  connection.query(
    "UPDATE `users` SET  `user_name` = ?, `user_contact` =?, `user_email` =?, `user_address_id` =?, `user_type_id` =?, `user_is_deleted` =?, `user_is_active` =?,  `user_date_created` =?, `user_type_name` =?, `user_password` =? where `user_id` = ?",
    [
      req.body.user_name,
      req.body.user_contact,
      req.body.user_email,
      req.body.user_address_id,
      req.body.user_type_id,
      req.body.user_is_deleted,
      req.body.user_is_active,
      req.body.user_date_created,
      req.body.user_type_name,
      req.body.user_password,
      req.body.user_id
    ],
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

// delete USER
app.delete("/neerseva/users/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  connection.query("DELETE FROM `users` WHERE `user_id`=?", [user_id], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/neerseva/userview", (req, res) => {
  let sql =
    "SELECT u.user_id, u.user_name, u.user_contact, u.user_email, t.user_type_name, t.user_type_id FROM users u JOIN usertypes t ON U.user_type_id = t.user_type_id";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
