const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    date: String, // e.g., "2025-07-14"
    quantity: Number,
  },
  { _id: false }
);

const skuSchema = new mongoose.Schema(
  {
    sku: String,
    skuCode: String,
    code: String,
    beginningPCS: Number,
    deliveryPCS: Number,
    rtvNo: {
      type: String,
      default: "",
    },
    rtvPCS: Number,
    rtvReason: {
      type: String,
      default: "",
    },
    endingPCS: Number,
    offtake: Number,
    inventoryDays: Number,

    // 🔹 SO fields
    avgOfftake: {
      type: Number,
      default: 0,
    },
    totalOfftake: {
      type: Number,
      default: 0,
    },
    soQty: {
      type: Number,
      default: 0,
    },
    suggestedOrder: {
      type: Number,
      default: 0,
    },

    harvest: [entrySchema],
    expiry: [entrySchema],
    oos: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const simpleSkuSchema = new mongoose.Schema(
  {
    sku: String,
    skuCode: String,
  },
  { _id: false }
);

const versionSchema = new mongoose.Schema(
  {
    Carried: [skuSchema],
    "Not Carried": [simpleSkuSchema],
    Delisted: [simpleSkuSchema],
  },
  { _id: false }
);

const groupedInventorySchema = new mongoose.Schema(
  {
    email: String,
    date: String,
    merchandiser: String,
    outlet: String,
    locked: {
      type: Boolean,
      default: false,
    },
    usageCount: {
      // 🔥 track how many times this doc has been used
      type: Number,
      default: 0,
    },
    versions: {
      DAIRY: versionSchema,
      ICECREAM: versionSchema,
      MVP: versionSchema,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("inventoryProcess", groupedInventorySchema);
module.exports = Inventory;
