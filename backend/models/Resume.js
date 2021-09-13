import mongoose from 'mongoose'

const ResumeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  headline: {
    type: String,
  },
  email: {
    type: String,
  },
  url: {
    type: String,
  },
  summery: {
    type: [String],
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: Date.now,
  },
})

export default mongoose.model('Resume', ResumeSchema)
