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
    rtvPCS: Number,
    endingPCS: Number,
    offtake: Number,
    inventoryDays: Number,
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

const groupedInventorySchema = new mongoose.Schema({
  email: String,
  date: String,
  merchandiser: String,
  outlet: String,
  locked: {
    type: Boolean,
    default: false,
  },
  versions: {
    DAIRY: versionSchema,
    ICECREAM: versionSchema,
    MVP: versionSchema,
  },
});

const Inventory = mongoose.model("inventoryProcess", groupedInventorySchema);
module.exports = Inventory;
