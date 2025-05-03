const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    enum: [true, false]
  },
  addresses: [
    {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String
    }
  ],
  phone: {
    type: String
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
