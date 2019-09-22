var connection = require("../db");
var app = require("../app");


// login API
app.post("/neerseva/login", (req, res) => {
  var postData = req.body;
  let user_contact = req.body.user_contact;
  let user_password = req.body.user_password;
  let sql =
    "SELECT * FROM users WHERE user_contact = '" +
    user_contact +
    "' and user_password = '" +
    user_password +
    "' ";
  let query = connection.query(sql, postData, (err, result) => {
    if (err) throw err;
    //if (result.length > 0) {
    if (result) {
      res.json(result);
    } else {
      res.json(err);
    }
    //}
  });
});
