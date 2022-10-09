import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import BorderLayout from '../components/BorderLayout'
import {signIn, signUp} from '../api/api'

const Home = () => {
  const [isSignInMode, setIsSignInMode] = useState('로그인')
  const [btnCondition, setBtnCondition] = useState(false)
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    rePassword: '',
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] =useState('')
  const [rePassword, setRePassword] = useState('')

  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [rePasswordValid, setRePasswordValid] = useState(false)

  const [emailDesc, setEmailDesc] = useState('이메일은 @를 포함하셔야합니다.')
  const [pwdDesc, setPwdDesc] = useState('비밀번호는 8글자 이상이어야 합니다.')

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleRePassword = (e) => {
    setRePassword(e.target.value)
  }

  const handleChangeMode = () => {
    if (isSignInMode === '로그인') {
      setEmail('')
      setPassword('')
      setIsSignInMode('회원가입')
    } else {
      setEmail('')
      setPassword('')
      setRePassword('')
      setIsSignInMode('로그인')
    }
  }

  const handleSubmit = async (e) => {
    if (isSignInMode === '로그인') {
      signIn(email, password,  handleChangeMode)
    } else {
      signUp(email, password)
      handleChangeMode()
    }
  }

  // 유효성검사
  // const regEmail =
  //   /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

  const regEmail = /@/
  const emailValidation = () => {
    if (regEmail.test(email)) {
      setEmailValid(true)
      setEmailDesc('ㅤ')
    } else {
      setEmailValid(false)
      setEmailDesc('이메일은 @를 포함하셔야합니다.')
    }
  }

  const passwordValidation = (e) => {
    if (e.target.value.length >= 8) {
      setPasswordValid(true)
      setPwdDesc('ㅤ')
      return
    }
    setPasswordValid(false)
    setPwdDesc('비밀번호는 8글자 이상이어야 합니다.')
    return
  }
  const rePasswordValidation = (e) => {
    if (e.target.value === password) {
      return setRePasswordValid(true)
    }
    return setRePasswordValid(false)
  }
  const handleEnterPress = (e) =>{
    if(e.key === 'Enter'){
      handleSubmit()
    }else{
      return
    }
  }
  useEffect(() => {
    if (emailValid && passwordValid && rePasswordValid) {
      setBtnCondition(true)
    } else {
      setBtnCondition(false)
    }
  }, [emailValid, passwordValid, rePasswordValid])

  return (
    <BorderLayout>
      <FormContainer>
        {isSignInMode === '로그인' ? (
          <>
            <h1>{isSignInMode}</h1>
            <InputWrapper key='1'>
              <label id="email">이메일</label>
              <input id="email" value={email} onChange={handleEmail} required />
            </InputWrapper>
            <InputWrapper key='2'>
              <label id="password">비밀번호</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePassword}
                onKeyDown={handleEnterPress}
                autoComplete="off"
                required
              />
            </InputWrapper>
            <ChangeMode onClick={(e) => handleChangeMode(e)}>회원가입하러가기</ChangeMode>
            <SubmitBtn onClick={(e) => handleSubmit(e)}>{isSignInMode}</SubmitBtn>
          </>
        ) : (
          <>
            <InputWrapper key='1'>
              <label id="email">이메일</label>
              <input id="email" value={email} onChange={handleEmail} onKeyUp={emailValidation} required />
              <span>{emailDesc}</span>
            </InputWrapper>

            <InputWrapper key='2'>
              <label id="password">비밀번호</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePassword}
                onKeyUp={passwordValidation}
                autoComplete="off"
                required
              />
              <span>{pwdDesc}</span>
            </InputWrapper>

            <InputWrapper key='3'>
              <label id="rePassword">비밀번호확인</label>
              <input
                id="rePassword"
                type="password"
                value={rePassword}
                onChange={handleRePassword}
                onKeyUp={rePasswordValidation}
                autoComplete="off"
                required
              />
            </InputWrapper>
            <ChangeMode onClick={() => handleChangeMode()}>로그인하러가기</ChangeMode>
            <SubmitBtn onClick={(e) => handleSubmit(e)} disabled={!btnCondition}>
              {isSignInMode}
            </SubmitBtn>
          </>
        )}
      </FormContainer>
    </BorderLayout>
  )
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 30rem;
  h1 {
    font-size: 200%;
    font-weight: bold;
    margin-bottom: 1rem;
  }
`

const InputWrapper = styled.div`
  display: flex;
  margin-right: auto;
  flex-direction: column;
  width: 100%;
  label {
    font-weight: bold;
    font-size: 1.5rem;
    white-space: nowrap;
    margin-bottom: 5%;
  }
  input {
    width: 100%;
    margin-bottom: 5%;
  }
  span {
    font-size: 1.3rem;
    margin-bottom: 5%;
  }
`

const ChangeMode = styled.div`
  cursor: pointer;
  background-color: var(--color-mauve);
  width: 100%;
  color: var(--color-black);
  text-align: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 150%;
  font-weight: bold;
  border:none;
`

const SubmitBtn = styled.div`
  background-color: ${(props)=>props.disabled ? '#dedede' : '#0651f5'};
  cursor : ${(props)=>props.disabled ? 'default' : 'pointer'};
  width: 100%;
  color: var(--color-white);
  border:none;
  text-align: center;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 150%;
  font-weight: bold;
`

export default Home
