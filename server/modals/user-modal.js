const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
      unique: true, // Ensures each userId is unique
    },
    uCredentials: {
      uEmail: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
      },
    },
    uProfile: {
      uName: {
        type: String,
        trim: true,
      },
      uPhone: {
        type: Number, 
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v); // Validate 10-digit phone numbers
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
      },
    },
    uAddress: {
      uZipCode: {
        type: Number,
        min: [10000, "Zip code must be at least 5 digits"],
        max: [999999, "Zip code must be at most 6 digits"],
      },
      uHouseNumber: {
        type: Number,
        trim: true,
      },
      uArea: {
        type: String,
        trim: true,
      },
      uCity: {
        type: String,
        trim: true,
      },
    },
  },
  { collection: "Users", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

