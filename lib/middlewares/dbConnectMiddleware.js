import Mongoose from 'mongoose'

export const dbConnectMiddleware = async (req, res, next) => {
  try {
    await Mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    next()
  } catch (error) {
    res.status(500).json({ status: 'fail with database connection', error })
  }
}
