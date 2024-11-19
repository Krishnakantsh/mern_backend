import mongoose,  { Schema } from "mongoose";
import { User } from "./user.model"


const subscriptionSchema = new Schema({
  subscriber:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  chennel:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
},{
  timestamps:true
})




export const Subscription = mongoose.model("Subscription", subscriptionSchema)