var connection = require("../db");
var app = require("../app");

// Get all profiles
app.get("/neerseva/userprofile", (req, res) => {
  let sql = "SELECT * FROM users_profile";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get profile by profileId
app.get("/neerseva/userprofile/:profile_id", (req, res) => {
  let profile_id = req.params.profile_id;
  let sql = "SELECT * FROM users_profile WHERE profile_id = " + profile_id;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.json("profile id not found");
    } else {
      res.json(result);
    }
  });
});

//Save user profile
app.post("/neerseva/userprofile", (req, res) => {
  let users_profile = req.body;
  let sql = "INSERT INTO users_profile SET ?";
  let query = connection.query(sql, users_profile, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// update user_profile
app.put("/neerseva/userprofile/:profile_id", (req, res) => {
  connection.query(
    "UPDATE `users_profile` SET  `profile_user_id` = ?,  `profile_user_full_name` =?, `profile_user_nick_name` =?, `profile_user_dob` = ?, `profile_user_image_id` = ?, `profile_user_type` = ?, `profile_user_is_deleted` = ?, `profile_user_shop_id` = ?  where `profile_id` = ?",
    [
      req.body.profile_user_id,
      req.body.profileuser__full_name,
      req.body.profile_user_nick_name,
      req.body.profile_user_dob,
      req.body.profile_user_image_id,
      req.body.profile_user_type,
      req.body.profile_user_is_deleted,
      req.body.profile_user_shop_id,
      req.body.profile_id
    ],
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

// delete user profile
app.delete("/neerseva/userprofile/:profile_id", (req, res) => {
  let profile_id = req.params.profile_id;
  connection.query(
    "DELETE FROM `users_profile` WHERE `profile_id`=?",
    [profile_id],
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});
