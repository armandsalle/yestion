import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const bodySchema = new Schema(
  {
    as: {
      type: String,
      required: true,
      enum: ['Text', 'Title', 'List'],
    },
    content: {
      type: String,
      required: true,
      default: '',
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { _id: { type: String } }
)

const TodoSchema = new Schema(
  {
    title: {
      type: String,
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

export const Todo = mongoose.models.Todo
  ? mongoose.model('Todo')
  : mongoose.model('Todo', TodoSchema)
