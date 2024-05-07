const user_schema = require("../schemas/user_schema");
const {
  isValidString,
  isValid,
  isValidObject,
  isValidEmail,
  SALT,
} = require("../utils/validators");

exports.createUser = async (req, res) => {
  const data = req.body;

  const response = {
    success: false,
    code: 400,
    data: null,
    message: "error",
    error: "error",
    resource: req.originalUrl,
  };

  if (!isValid(data) || !isValidObject(data)) {
    response.message = "Invalid of sending data Provide required details";
    return res.status(400).json(response);
  }
  if (!isValid(data.name) || !isValidString(data.name)) {
    response.message = "Invalid provide the name";
    return res.status(400).json(response);
  }
  if (!isValid(data.email) || !isValidEmail(data.email)) {
    response.message = "Invalid provide the email";
    return res.status(400).json(response);
  }
  if (!isValid(data.password) || !isValidString(data.password)) {
    response.message = "Invalid provide the password";
    return res.status(400).json(response);
  }

  //checking for mail
  try {
    const emailExist = await user_schema.findOne({ email: data.email });
    if (emailExist) {
      response.message = "Email is exist provide new one";
      return res.status(400).json(response);
    }
  } catch (error) {
    console.log(error);
    response.code = 500;
    response.error = error;
    return res.status(500).json(response);
  }

  const user_details = {
    name: data.name.trim(),
    email: data.email.trim(),
    password: data.password,
    user_id: data.user_id,
  };
  try {
    const userCreated = new user_schema(user_details);
    await userCreated.save();
    return res.status(200).json({
      success: true,
      code: 200,
      data: userCreated,
      error: null,
      message: "User Created Succesfully",
      resource: req.originalUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      code: 500,
      data: null,
      error: error,
      message: error.message,
      resource: req.originalUrl,
    });
  }
};
