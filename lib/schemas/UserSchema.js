import mongoose from 'mongoose'

const Schema = mongoose.Schema

const sessionSchema = new Schema({})

export const Session = mongoose.models.Session
  ? mongoose.model('Session')
  : mongoose.model('Session', sessionSchema, 'sessions')
