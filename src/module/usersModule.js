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
  avatar: {
    type:String,
    required:false,
    default: "https://cdn-icons-png.flaticon.com/512/10307/10307911.png"
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

module.exports = mongoose.model("User1063", userSchema);
