import axiosInstance from "../utils/axiosInstance"


export const signIn = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/signin', {
      email,
      password,
    })
    console.log(response)
    window.localStorage.setItem('token',  response.data.access_token)
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

export const signUp = async(email, password, handleChangeMode) =>{
  try{
    const response = await axiosInstance.post('/auth/signup',{
      email,
      password
    })
    alert('회원가입에 성공했습니다!')
    handleChangeMode()
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
    return response.data
  }
  catch(error){
    console.log(error)
  }
}

export const getTodos = async() => {
  try{
    const response = await axiosInstance.get('/todos')
    return response.data
  }
  catch(error){
    console.log(error)
    return []
  }
}

export const updateTodo = async(id,todo,isCompleted,userId) => {
  try{
    const response = await axiosInstance.put(`todos/${id}`,{
      id,
      todo,
      isCompleted,
      userId,
    })
    return response.data
  }
  catch(error){
    console.log(error)
  }
}

export const deleteTodo = async(id) => {
  try{
    const response = await axiosInstance.delete(`todos/${id}`)
  }
  catch(error){
    console.log(error)
  }
}