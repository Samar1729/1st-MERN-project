import { useState, useEffect } from 'react'
import { FaTrash, FaRegCircle, FaCheckCircle, FaTasks } from 'react-icons/fa'
import { toast } from "react-toastify"
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  //Usestate hook

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("")
  const [color, setColor] = useState("gray")

  //API_url
  const API_URL = 'http://localhost:3000/api/tasks'

  //fetch the Tasks

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL)
      setTasks(res.data)
    } catch (error) {
      console.error("Error fetching tasks", error)
    }
  }

  //Useeffect hook
  useEffect(() => {
    fetchTasks()

  }, [])
  console.log(tasks)

  //colors
  const colorStyles = {
    red: {
      text: "text-red-400",
      border: "border-red-400"
    },
    blue: {
      text: "text-blue-500",
      border: "border-blue-500"
    },
    green: {
      text: "text-green-400",
      border: "border-green-400"
    },
    yellow: {
      text: "text-yellow-400",
      border: "border-yellow-400"
    },
    pink: {
      text: "text-pink-400",
      border: "border-pink-400"
    },
    gray: {
      text: "text-gray-300",
      border: "border-gray-300"
    }
  }

  //submission of new task : creating a new task on frontend
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (task == "") {
        toast.error("You must write a task")

        return
      }

      const res = await axios.post(API_URL, {
        task: task,
        color: color,
        taskDone: false,
      })

      console.log("task created ", res.data);
      setTask("")
      setColor("")
      fetchTasks()

    } catch (error) {
      console.error("Error in creation of task", error);
    }
  }

  //handle deletion work
  const handleDelete = async (i) => {
    try {
      if (window.confirm('Are You Sure?')) {
        await axios.delete(`${API_URL}/${i}`)
        fetchTasks()
      }

    } catch (error) {
      console.error("error in deleting the tasks", error);

    }

  }

  //handle task done 
  const markAsDone = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, {
        taskDone: !task.taskDone
      })
      fetchTasks()
    } catch (error) {
      console.error("error updating the tasks", error);

    }
  }

  //delete all the tasks
  const deleteAllTask = async () => {
    try {
      if (window.confirm("Are You Sure , You want to delete all the tasks ? ")) {
        await axios.delete(API_URL)
        fetchTasks()
      }
    } catch (error) {
      console.error("all task deletion failed", error);

    }
  }

  return (
    <div className='w-full min-h-screen bg-gray-900 flex items-center justify-center'>
      <div className='w-250'>
        <div className='bg-gray-800 w-full h-fit p-5 rounded-md flex justify-between items-center'>
          <div id='left'>
            <h1 className='text-3xl text-white'>Planner</h1>
            <p className='font-serif text-gray-600'>I have made this planner</p>
          </div>
          <div id='right' className='text-white text-2xl'>
            <FaTasks />
          </div>
        </div>
        <form onSubmit={handleSubmit} action="" className='bg-gray-800 w-full p-5 mt-3 rounded-md flex gap-5 items-center'>
          <input type="text" placeholder='Write your tasks here....' className='text-gray-300 px-3 py-2 bg-gray-900 w-full rounded-md outline-none' value={task} onChange={(e) => setTask(e.target.value)} />
          <div className='flex justify-between gap-4'>
            <label className='cursor-pointer'>
              <input className='hidden' type="radio" name='color' value="red" checked={color === "red"} onChange={(e) => setColor(e.target.value)} />
              <div className={`w-6 h-6 rounded-full bg-red-500 block ${color === "red" ? "border-2 border-white" : "border-2 border-transparent"}`}></div>
            </label>

            <label className='cursor-pointer'>
              <input className='hidden' type="radio" name='color' value="blue" checked={color === "blue"} onChange={(e) => setColor(e.target.value)} />
              <div className={`w-6 h-6 rounded-full bg-blue-500 block ${color === "blue" ? "border-2 border-white" : "border-2 border-transparent"}`}></div>
            </label>
            <label className='cursor-pointer'>
              <input className='hidden' type="radio" name='color' value="green" checked={color === "green"} onChange={(e) => setColor(e.target.value)} />
              <div className={`w-6 h-6 rounded-full bg-green-500 block ${color === "green" ? "border-2 border-white" : "border-2 border-transparent"}`}></div>
            </label>
            <label className='cursor-pointer'>
              <input className='hidden' type="radio" name='color' value="yellow" checked={color === "yellow"} onChange={(e) => setColor(e.target.value)} />
              <div className={`w-6 h-6 rounded-full bg-yellow-500 block ${color === "yellow" ? "border-2 border-white" : "border-2 border-transparent"}`}></div>
            </label>
            <label className='cursor-pointer'>
              <input className='hidden' type="radio" name='color' value="pink" checked={color === "pink"} onChange={(e) => setColor(e.target.value)} />
              <div className={`w-6 h-6 rounded-full bg-pink-500 block ${color === "pink" ? "border-2 border-white" : "border-2 border-transparent"}`}></div>
            </label>
            <label className='cursor-pointer'>
              <input className='hidden' type="radio" name='color' value="gray" checked={color === "gray"} onChange={(e) => setColor(e.target.value)} />
              <div className={`w-6 h-6 rounded-full bg-gray-500 block ${color === "gray" ? "border-2 border-white" : "border-2 border-transparent"}`}></div>
            </label>
          </div>

          <button className='bg-red-600 px-2 py-1 rounded-md text-white text-sm cursor-pointer'>Submit</button>
        </form>

        <ul className='w-full mt-3 flex flex-col gap-3'>
          {tasks
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((task) => (
              <li key={task._id} className='bg-gray-950 text-white px-5 py-4 rounded-xl w-full flex justify-between'>
                <div className={`border-l-5 ${colorStyles[task.color].border} pl-3 rounded-md`}>
                  <p className={`text-xl ${task.taskDone ? 'line-through text-zinc-500' : ''}`}>{task.task}</p>
                  <span className='text-zinc-400 text-sm'>Created on</span>
                  <span className={`text-sm p-1 ${colorStyles[task.color].text}`}>{new Date(task.createdAt).toLocaleDateString()}</span>, time :
                  <span className={`text-sm p-1 ${colorStyles[task.color].text}`}>{new Date(task.createdAt).toLocaleTimeString()}</span>
                </div>

                {/* buttoms */}
                <div className='flex items-center gap-3'>
                  <button onClick={() => handleDelete(task._id)} className='text-red-500 cursor-pointer'><FaTrash /></button>
                  <button onClick={() => markAsDone(task)} className='text-gray-400 text-lg cursor-pointer'>{!task.taskDone ? <FaRegCircle /> : <FaCheckCircle />}</button>
                </div>
              </li>
            ))}


        </ul>


        <button onClick={() => deleteAllTask()} className={`bg-gray-700 mt-3 rounded-xl p-3 font-bold text-pink-200 cursor-pointer w-full hover:bg-gray-800 ${tasks.length == 0 ? 'hidden' : ''}`}>Clear All Tasks</button>


      </div>

      <ToastContainer />
    </div>
  )
}

export default App
