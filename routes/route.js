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

  app.route("/addCount").post(async (req, res) => {
    const data = req.body;

    const details = {
      user_id_start: data.user_id_start,
      present_user_id: data.present_user_id,
    };
    const added = new count_schema(details);
    await added.save();
    return res.status(200).json({
      success: true,
      data: added,
    });
  });
};
