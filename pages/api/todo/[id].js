// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose"
import { Todo } from "../../../lib/schemas/TodoSchema"

const handleGet = async (req, res) => {
  try {
    const { id } = req.query
    const result = await Todo.findById(id)
    res.status(200).json({ todo: result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: "fail fetching a todo" })
  }
}

export default async (req, res) => {
  const { method } = req

  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

    switch (method) {
      case "GET":
        await handleGet(req, res)
        break

      default:
        res.setHeader("Allow", ["GET"])
        res.status(405).json({
          status: 405,
          message: `Method ${method} Not Allowed`,
        })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: "fail" })
  }
}
