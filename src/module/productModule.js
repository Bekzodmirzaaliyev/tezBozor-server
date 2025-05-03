const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      costPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      discount: {
        type: Number,
        default: 0, // в процентах, типа 20 значит 20%
        min: 0,
        max: 100,
      },
      sellingPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      credit: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String], // массив ссылок на изображения
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Перед сохранением — автокалькуляция sellingPrice и credit
productSchema.pre("validate", function (next) {
  if (this.price.discount > 0) {
    this.price.sellingPrice = this.price.costPrice * (1 - this.price.discount / 100);
  } else {
    this.price.sellingPrice = this.price.costPrice;
  }

  this.price.credit =
    this.price.sellingPrice * 0.3 + this.price.sellingPrice / 12;

  next();
});

module.exports = mongoose.model("Product", productSchema);
