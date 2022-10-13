import axiosInstance from "../utils/axiosInstance"


export const signIn = async (email, password, hadleModal) => {
  try {
    const response = await axiosInstance.post('/auth/signin', {
      email,
      password,
    })
    console.log(response)
    window.localStorage.setItem('token',  response.data.access_token)
    window.location.reload()
  } catch (error) {
    hadleModal('회원정보를 확인해주세요')
  }
}

export const signUp = async(email, password, handleChangeMode,hadleModal) =>{
  try{
    const response = await axiosInstance.post('/auth/signup',{
      email,
      password
    })
    hadleModal('회원가입에 성공하셨습니다!')
    handleChangeMode()
  }
  catch(error){
    hadleModal(error.response.data.message)
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