import mongoose from "mongoose"

const Schema = mongoose.Schema

const contentSchema = new Schema(
  {
    as: {
      type: String,
      required: true,
      enum: ["ListItem"],
    },
    content: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
)

const bodySchema = new Schema(
  {
    as: {
      type: String,
      required: true,
      enum: ["Text", "Title", "List"],
    },
    content: {
      type: String,
      required: function () {
        return ["Text", "Title"].includes(this.as)
      },
      default: "",
    },
    contentList: {
      type: [contentSchema],
      required: function () {
        return !!(this.as === "List")
      },
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
)

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    body: {
      type: [bodySchema],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: { type: String } }
)

export const Todo = mongoose.models["Todo"] ? mongoose.model("Todo") : mongoose.model("Todo", TodoSchema)
