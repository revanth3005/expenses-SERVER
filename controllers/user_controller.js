const user_schema = require("../schemas/user_schema");
const count_schema = require("../schemas/countSchema");
const categories_schema = require("../schemas/categories_schema");
const userItem_schema = require("../schemas/userItems_schema");
const {
  isValidString,
  isValid,
  isValidObject,
  isValidEmail,
  SALT,
} = require("../utils/validators");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * creates new user
 */
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
  const getCount = await count_schema.find();
  const user_details = {
    name: data.name.trim(),
    email: data.email.trim(),
    password: data.password,
    user_id: getCount[0]?.present_user_id,
  };
  try {
    const userCreated = new user_schema(user_details);
    await userCreated.save();
    // updating the count in usercount collection
    const getCount = await count_schema.find();
    console.log(getCount[0]);
    getCount[0].present_user_id += 1;
    await getCount[0].save(); //updating user count
    return res.status(200).json({
      success: true,
      code: 200,
      data: userCreated,
      error: null,
      message: "User Created Successfully",
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

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 *
 * get user details
 */
exports.getUserDetails = async (req, res) => {
  const user_id = req.params.id;
  const user = await user_schema.findOne({ user_id });
  return res.status(200).json({
    message: "fetched",
    success: true,
    code: 200,
    data: user,
    error: null,
    resource: req.originalUrl,
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * adding new item
 */
exports.addUserItems = async (req, res) => {
  const data = req.body;
  const details = {
    user_id: data.user_id,
    category: data.category,
    title: data.title,
    date: data.date,
    amount: data.amount,
    month: data.month,
    year: data.year,
  };
  const instance = new userItem_schema(details);
  await instance.save();
  return res.status(200).json({
    data: details,
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * fetching user items
 */
exports.getUserItems = async (req, res) => {
  const user_id = req.params.id;
  const instance = await userItem_schema.find({ user_id });
  return res.status(200).json({
    message: "fetched",
    success: true,
    code: 200,
    data: instance,
    error: null,
    resource: req.originalUrl,
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * adding new category
 */
exports.newCategory = async (req, res) => {
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
  if (!isValid(data.category) || !isValidString(data.category)) {
    response.message = "Invalid provide the category";
    return res.status(400).json(response);
  }

  const newCategory = {
    category: data.category,
  };
  const instance = new categories_schema(newCategory);
  await instance.save();
  console.log(instance);
  return res.status(200).json({
    success: true,
    code: 200,
    data: instance,
    error: null,
    message: "Category Created Successfully",
    resource: req.originalUrl,
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * fetching categories
 */
exports.getCategories = async (req, res) => {
  const instance = await categories_schema.find();
  return res.status(200).json({
    message: "fetched",
    success: true,
    code: 200,
    data: instance,
    error: null,
    resource: req.originalUrl,
  });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * login api
 */
exports.login = async (req, res) => {
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
    if (!emailExist) {
      response.message = "please enter registered email";
      return res.status(400).json(response);
    }
  } catch (error) {
    console.log(error);
    response.code = 500;
    response.error = error;
    return res.status(500).json(response);
  }

  const user = await user_schema.findOne({ email: data.email });
  if (user) {
    return res.status(200).json({
      message: "Success login",
      success: true,
      code: 200,
      data: user,
      error: null,
      resource: req.originalUrl,
    });
  }
};
