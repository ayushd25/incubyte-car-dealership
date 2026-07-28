import { Schema, model } from "mongoose";

const vehicleSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    vin: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["available", "reserved", "sold"],
      default: "available",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
  type: String,
  required: true,
  enum: [
    "SUV",
    "Sedan",
    "Hatchback",
    "Truck",
    "Coupe",
    "Convertible",
  ],
},

quantity: {
  type: Number,
  required: true,
  min: 0,
  default: 0,
},
  },
  {
    timestamps: true,
  }
);

export const Vehicle = model("Vehicle", vehicleSchema);