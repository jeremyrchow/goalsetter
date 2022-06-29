
const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req,res) => {
  const goals = await Goal.find({ user: req.user.id})
  res.status(200).json(goals)
})

// @desc    Set goals
// @route   SET /api/goals
//@access  Private
const setGoals = asyncHandler(async (req,res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text
  })
  res.status(200).json(goal)
})

// @desc    Update goals
// @route   PUT /api/goals
// @access  Private
const updateGoals = asyncHandler(async (req,res) => {
  // if(!req.params.id || mongoose.Types.ObjectId.isValid(req.params.id)){
  //   res.status(400)
  //   throw new Error('Goal with specified ID not found')
  // }
  const goal = await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw new Error('Goal with specified ID not found')
  }
  // find user id registered to goal

  if(!req.user){
    res.status(401)
    throw new Error('Usernot found')
  }

  // verify logged in user matches goal's user
  if(goal.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Unauthorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
     {new: true})

  res.status(200).json(updatedGoal)
})

// @desc    Delete goals
// @route   DELETE /api/goals
// @access  Private

const deleteGoals = asyncHandler(async (req,res) => {
  const goal = await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw new Error('Goal with specified ID not found')
  }
    // find user id registered to goal
  if(!req.user){
    res.status(401)
    throw new Error('Usernot found')
  }

  // verify logged in user matches goal's user
  if(goal.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Unauthorized')
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
  res.status(200).json(deletedGoal)
})

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals
}