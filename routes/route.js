const user_controller = require("../controllers/user_controller");
const count_schema = require("../schemas/countSchema");

module.exports = (app) => {
  //test route
  app.route("/api/v1/test").get(async (req, res) => {
    const getCount = await count_schema.find();
    console.log(getCount);
    return res.status(200).json({
      message: "tested",
      countData: getCount[0],
    });
  });

  app.route("/api/v1/create_user").post(user_controller.createUser);
  app.route('/api/v1/get_details/:id').get(user_controller.getUserDetails)
  app.route('/api/v1/new_category').post(user_controller.newCategory)
  app.route('/api/v1/add_item').post(user_controller.addUserItems)
  app.route('/api/v1/get_items/:id').get(user_controller.getUserItems)
  app.route('/api/v1/get_categories').get(user_controller.getCategories)
  app.route('/api/v1/login').post(user_controller.login)

};
