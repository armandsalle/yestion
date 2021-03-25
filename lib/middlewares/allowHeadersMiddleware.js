export const allowHeadersMiddleware = (req, res, allowMethods = []) => {
  const { method } = req

  res.setHeader('Allow', allowMethods)
  res.status(405).json({
    status: 405,
    message: `Method ${method} Not Allowed`,
  })
}
