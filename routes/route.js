const user_controller = require("../controllers/user_controller");

module.exports = (app) => {
  //test route
  app.route("/api/v1/test").get((req, res) => {
    return res.status(200).json({
      message: "tested",
    });
  });

  app.route("/api/v1/create_user").post(user_controller.createUser);
};
