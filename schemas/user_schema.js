const mongoose=require('mongoose')

const newSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) =>
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value),
        message: "please enter a valid email address-----------------",
      },
    },
    password: { type: String, required: true },
    // emailStatus:{type:String,default:'PENDING'},
    // verified:{type:Boolean,default:false},
    // isVerifiedAt:{type:Date,default:null},
    // isDeletedAt:{type:Boolean,default:false},
    user_id: { type: Number, required: true, unique:true },
    userData: [
      {
        month: { type: String },
        month_data: [
          {
            date: { type: Date },
            day_data: [
              {
                date: { type: Date },
                category: { type: String },
                cost: { type: Number },
                title: { type: String },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports= mongoose.model('userSchema',newSchema)

/**
 * name
 * email
 * password
 * unique-id
 */