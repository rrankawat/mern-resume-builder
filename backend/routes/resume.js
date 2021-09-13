import express from 'express'
const router = express.Router()
import Resume from '../models/Resume.js'

// @route     POST /api/v1/users/:userId/resume
// @desc      Register a user
// @access    Private
router.post('/', auth, async (req, res) => {
  try {
    const resume = new Resume(req.body)

    resume.save()

    res.status(200).json({ success: true, message: 'Resume Saved' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})
