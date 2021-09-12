import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import { check, validationResult } from 'express-validator'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'
import auth from '../middleware/auth.js'

// @route     POST /api/v1/users/register
// @desc      Register a user
// @access    Public
router.post(
  '/register',
  [
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more length').isLength(
      {
        min: 6,
      }
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res
          .status(400)
          .json({ success: false, message: 'User already exists' })
      }

      user = new User({
        name,
        email,
        password,
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      res.status(200).json({ success: true, token: generateToken(user._id) })
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server Error' })
    }
  }
)

// @route     POST /api/v1/users/login
// @desc      Login user
// @access    Public
router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({
          success: false,
          message: `User with email '${email}' does not exists`,
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: 'Password do not match' })
      }

      res.status(200).json({ success: true, token: generateToken(user._id) })
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server Error' })
    }
  }
)

// @route     GET /api/v1/users/profile
// @desc      Get Logged In user
// @access    Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.status(200).json({ success: true, data: user })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

export default router
