const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required."],
    unique: true,
  },
  NSFWPreference: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);

// echo EMAIL_ACCOUNT=${{ secrets.EMAIL_ACCOUNT }} >> .env
//         echo EMAILL_PASSWORD=${{ secrets.EMAILL_PASSWORD }} >> .env
//         echo DEV_PORT=${{ secrets.DEV_PORT }} >> .env
//         echo PROD_PORT=${{ secrets.PROD_PORT }} >> .env
