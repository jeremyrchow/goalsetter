import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals, reset as resetGoals} from '../features/goals/goalSlice'
import { reset as resetAuth } from '../features/auth/authSlice'
import GoalItem from '../components/GoalItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError){
      toast.error(message)
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }

    if(user){
      dispatch(getGoals())
    }
    return ()=> {
      dispatch(resetGoals())
      dispatch(resetAuth())
    }

  }, [user, navigate, isError ,message, dispatch])

  if (isLoading){
    return <Spinner />
  }


  return (
    <>
      <section className='heading'>
        <h1>Welcome, {user && user.name}</h1>
        <p>Goals Dashboard</p>
        

        <GoalForm />
        <section className='content'>
          {goals.length > 0 ? (
            <div className='goals'>
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </div>
          ) : (<h3> You have not set any goals </h3>)}
        </section>
      </section>
    </>
    
  )
}

export default Dashboard