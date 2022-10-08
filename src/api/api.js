import axiosInstance from "../utils/axiosInstance"


export const signIn = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/signin', {
      email,
      password,
    })
    console.log(response)
    window.localStorage.setItem('token',  response.data.access_token)
  } catch (error) {
    console.log(error)
  }
}

export const signUp = async(email, password) =>{
  try{
    const response = await axiosInstance.post('/auth/signup',{
      email,
      password
    })
    console.log(response)
  }
  catch(error){
    console.log(error)
  }
}

export const createTodo = async(todo) => {
  try{
    const response = await axiosInstance.post('/todos',{
      todo
    })
    console.log(response)
  }
  catch(error){
    console.log(error)
  }
}

export const getTodos = async() => {
  try{
    const response = await axiosInstance.get('/todos')
    const todos = response.data
    return todos
  }
  catch(error){
    console.log(error)
    return []
  }
}