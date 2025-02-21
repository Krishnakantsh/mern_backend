import mongoose, { Schema } from "mongoose";

import mongooseaggregatepaginate from " mongoose-aggregate-paginate-v2"

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // cloudinary service will use
      required: true,
    },
    thubmnail: {
      type: String, // cloudinary service will use
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String, // cloudinary service will use
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseaggregatepaginate)
 
export const Video = mongoose.model("Video", videoSchema);
