import {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import BorderLayout from '../components/BorderLayout'
import {signIn, signUp} from '../api/api'
import ModalAlert from '../components/ModalAlert'

const Home = () => {
  const emailInputRef = useRef()
  const pwdInputRef = useRef()
  const rePwdInputRef = useRef()
  const [isSignInMode, setIsSignInMode] = useState('로그인')
  const [btnCondition, setBtnCondition] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [rePasswordValid, setRePasswordValid] = useState(false)
  const [emailDesc, setEmailDesc] = useState('이메일은 @를 포함하셔야합니다.')
  const [pwdDesc, setPwdDesc] = useState('비밀번호는 8글자 이상이어야 합니다.')
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [modalMessage, setModalMessage] = useState('반갑습니다.')

  const handleChangeMode = () => {
    if (isSignInMode === '로그인') {
      emailInputRef.current.value=''
      pwdInputRef.current.value=''
      setIsSignInMode('회원가입')
    } else {
      emailInputRef.current.value=''
      pwdInputRef.current.value=''
      rePwdInputRef.current.value=''
      setIsSignInMode('로그인')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const email = emailInputRef.current.value;
    const password = pwdInputRef.current.value
    if (isSignInMode === '로그인') {
      signIn(email, password)
    } else {
      signUp(email, password,handleChangeMode)
      // handleChangeMode()
    }
  }

  // 유효성검사
  // const regEmail =
  //   /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

  const regEmail = /@/
  const emailValidation = () => {
    if (regEmail.test(emailInputRef.current.value)) {
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
  const rePasswordValidation = () => {
    const password = pwdInputRef.current.value
    const rePassword =  rePwdInputRef.current.value
    if (rePassword=== password) {
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
      <FormContainer onSubmit={handleSubmit}>
        {isSignInMode === '로그인' ? (
          <>
            <h1>{isSignInMode}</h1>
            <InputWrapper key='1'>
              <label id="email">이메일</label>
              <input id="email" ref={emailInputRef} required />
            </InputWrapper>
            <InputWrapper key='2'>
              <label id="password">비밀번호</label>
              <input
                id="password"
                type="password"
                ref={pwdInputRef}
                onKeyDown={handleEnterPress}
                autoComplete="off"
                required
              />
            </InputWrapper>
            <ChangeMode onClick={(e) => handleChangeMode(e)}>회원가입하러가기</ChangeMode>
            <SubmitBtn >{isSignInMode}</SubmitBtn>
          </>
        ) : (
          <>
            <InputWrapper key='1'>
              <label id="email">이메일</label>
              <input id="email" ref={emailInputRef} onKeyUp={emailValidation} required />
              <span>{emailDesc}</span>
            </InputWrapper>

            <InputWrapper key='2'>
              <label id="password">비밀번호</label>
              <input
                id="password"
                type="password"
                ref={pwdInputRef}
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
                ref={rePwdInputRef}
                onKeyUp={rePasswordValidation}
                autoComplete="off"
                required
              />
            </InputWrapper>
            <ChangeMode onClick={() => handleChangeMode()}>로그인하러가기</ChangeMode>
            <SubmitBtn  disabled={!btnCondition}>
              {isSignInMode}
            </SubmitBtn>
          </>
        )}
      </FormContainer>
      {isModalOpen ? <ModalAlert setIsModalOpen={setIsModalOpen}>{modalMessage}</ModalAlert> : <></>}
    </BorderLayout>
  )
}

const FormContainer = styled.form`
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

const SubmitBtn = styled.button`
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
