import mongoose from 'mongoose'

const ExperienceSchema = mongoose.Schema({
  designation: {
    type: String,
  },
  organisation: {
    type: String,
  },
  location: {
    city: String,
    country: String,
  },
  description: {
    type: [String],
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
})

export default mongoose.model('Experience', ExperienceSchema)
