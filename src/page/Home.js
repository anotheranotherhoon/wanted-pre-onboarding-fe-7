import {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import BorderLayout from '../components/BorderLayout'
import axiosInstance  from '../utils/axiosInstance'

const Home = () => {
  const navigate = useNavigate();
  const [isSignInMode, setIsSignInMode] = useState('로그인')
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    rePassword: '',
  })
  const {email, password, rePassword} = inputValue
  const handleInput = (event) => {
    const {id, value} = event.target
    setInputValue({
      ...inputValue,
      [id]: value,
    })
  }
  const handleChangeMode = () => {
    if (isSignInMode === '로그인') {
      setIsSignInMode('회원가입')
    } else {
      setIsSignInMode('로그인')
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(isSignInMode==='로그인'){
      try{
        const response = await axiosInstance.post('/auth/signin',{
          email,
          password
        })
        axiosInstance.defaults.headers.common['Authorization'] = response.data.access_token
        navigate('/todo')
        
      }
      catch(error){
        console.log(error)
      }
    }else{
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
  }
  return (
    <BorderLayout>
      <FormContainer>
        {isSignInMode === '로그인' ? (
          <>
            <InputWrapper>
              <label id="email">이메일</label>
              <input id="email" onChange={handleInput} required />
            </InputWrapper>
            <InputWrapper>
              <label id="password" >비밀번호</label>
              <input id="password"  type='password'  onChange={handleInput} autoComplete='off' required/>
            </InputWrapper>
            <ChangeMode onClick={(e) => handleChangeMode(e)}>회원가입하러가기</ChangeMode>
          </>
        ) : (
          <>
            <InputWrapper>
              <label id="email">이메일</label>
              <input id="email"  onChange={handleInput} required/>
            </InputWrapper>

            <InputWrapper>
              <label id="password">비밀번호</label>
              <input id="password" type='password' onChange={handleInput}  autoComplete='off'  required/>
            </InputWrapper>

            <InputWrapper>
              <label id="rePassword">비밀번호확인</label>
              <input id="rePassword" type='password' onChange={handleInput} autoComplete='off'  required />
            </InputWrapper>
            <ChangeMode onClick={() => handleChangeMode()}>로그인하러가기</ChangeMode>
          </>
        )}
        <SubmitBtn onClick={(e) => handleSubmit(e)}>{isSignInMode}</SubmitBtn>
      </FormContainer>
    </BorderLayout>
  )
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`

const InputWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  margin-left: auto;
  label {
    white-space: nowrap;
    margin-right: 5%;
  }
  input {
    width: 90%;
    display: inline;
  }
`

const ChangeMode = styled.div`
  cursor: pointer;
  background-color: red;
  width: 100%;
  color: white;
  text-align: center;
`
const SubmitBtn = styled.button``

export default Home
