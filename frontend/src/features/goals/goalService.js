// Makes http requests and returns data from request

import axios from 'axios'

const API_URL = '/api/goals/'

const genConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

// Get goals
const getGoals =  async (token) => {
  const config = genConfig(token)
  const response = await axios.get(API_URL, config)
  return response.data
} 


// Set Goal
const createGoal =  async (goalData, token) => {
  const config = genConfig(token)
  const response = await axios.post(API_URL, goalData, config)
  return response.data
} 

// Update Goal
const updateGoals =  async (goalData, token) => {
  const config = genConfig(token)
  const response = await axios.put(API_URL + goalData.id, goalData, config)
  return response.data
} 

// Delete Goals
const deleteGoals =  async (goalData, token) => {
  const config = genConfig(token)
  const response = await axios.delete(API_URL + goalData.id, goalData, config)
  return response.data
} 
const goalService = {
  getGoals,
  createGoal,
  updateGoals,
}

export default goalService