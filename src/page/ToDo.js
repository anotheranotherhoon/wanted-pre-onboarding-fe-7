import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {createTodo, getTodos} from '../api/api'
import BorderLayout from '../components/BorderLayout'
import Card from '../components/Card'
import AddBtn from '../components/svg/AddBtn'
import {deleteTodo} from '../api/api'
import ModalAlert from '../components/ModalAlert'

const ToDo = () => {
  const [value, setValue] = useState('')
  const [todos, setTodos] = useState([])
  const [originalTodos, setOriginalTodos] = useState([])
  const [filterState, setFilterState] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(0)
  const [modalMessage, setModalMessage] = useState('')
  const handleText = (event) => {
    setValue(event.target.value)
  }

const handleCreate = (todo) => {
  createTodo(todo).then((res) => {
    const newArr = todos
    newArr.push(res)
    setTodos([...newArr])
    setOriginalTodos([...newArr])
    setValue('')
    handleModalClose()
  })
}

  const handleCreateModalOpen = (todo) => {
    if(todo){
      handleModalOpen(3, '할일을 추가하시겠습니까?')
    }else{
      handleModalOpen(2, '할일을 입력해주세요!')
    }
  }
  const handleDeleteTodo = (id) => {
    deleteTodo(id)
    const newArr = originalTodos.filter((el) => el.id !== id)
    setTodos(newArr)
    setOriginalTodos(newArr)
  }

  const handleLogOut = ()=> {
    window.localStorage.removeItem('token')
    window.location.reload()
  }
  const handleModalOpen = (option, message) => {
    setModalMessage(message)
    setIsModalOpen(option)
  }
  const handleModalClose = () => {
    setIsModalOpen(0)
  }
  const handleFilter = (e) => {
    if(e===1){
      setFilterState(e)
      setTodos(originalTodos)
    }
    if(e===2){
      const newArr = originalTodos.filter((el)=>el.isCompleted===true)
      setFilterState(e)
      setTodos(newArr)
    }
    if(e===3){
      const newArr = originalTodos.filter((el)=>el.isCompleted===false)
      setFilterState(e)
      setTodos(newArr)
    }
  }
  const handleEnterPress = (e) => {
    if(e.key === 'Enter'){
      handleCreateModalOpen(value)
      return
    }else{
      return
    }
  }
  useEffect(() => {
    getTodos().then((res) => {
      setTodos(res)
      setOriginalTodos(res) 
    })
  }, [])
  return (
    <BorderLayout>
      <Container>
        <InputContainer>
          <Title>
            <h1>To Do List</h1>
            <LogOut>
            <span className='btnName' onClick={()=>handleModalOpen(1,'로그아웃 하시겠습니까?')}>로그아웃</span>
            {/* 0은 모달 끌때, 1 === 로그아웃, 2 === 할 일 을 입력안하고 + 버튼을 눌렀을 때*/}
            {isModalOpen === 1 ? <ModalAlert leftBtnClick={handleLogOut} leftBtnMessage='네' rightBtnClick={handleModalClose} rightBtnMessage='아니오' >{modalMessage}</ModalAlert> :<></>}
            {isModalOpen === 2  ? <ModalAlert rightBtnClick={handleModalClose} rightBtnMessage='확인' >{modalMessage}</ModalAlert> : <></>}
            {isModalOpen === 3 ? <ModalAlert leftBtnClick={()=>handleCreate(value)} leftBtnMessage='네'  rightBtnClick={handleModalClose} rightBtnMessage='아니오' >{modalMessage}</ModalAlert> : <></>}
          </LogOut>
          </Title>
          <FormWrapper>
              <InputWrapper>
                <label id="text" />
                <input id="text" value={value} onKeyDown={handleEnterPress} onChange={handleText}/>
                <div onClick={() => handleCreateModalOpen(value)}>
                  <AddBtn />
                </div>
              </InputWrapper>
          </FormWrapper>
        </InputContainer>
        <FilterWrapper>
          <FilterDiv className='all' filterId={1} current={filterState} onClick={()=>handleFilter(1)}>All</FilterDiv>
          <FilterDiv className='doneFIlter' filterId={2} current={filterState} onClick={()=>handleFilter(2)}>Done!</FilterDiv>
          <FilterDiv className='notYetFilter' filterId={3} current={filterState} onClick={()=>handleFilter(3)}>Not yet</FilterDiv>
        </FilterWrapper>
        <CardLayout>
          {todos.map((el) => (
            <Card key={el.id} el={el} handleDeleteTodo={handleDeleteTodo} />
          ))}
        </CardLayout>
      </Container>
    </BorderLayout>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  @media screen and (max-width: 413px) {
    width: 80%;
  }
`
const FormWrapper = styled.div`
  caret-color: var(--color-blue );
`
const InputWrapper = styled.div`
  display: flex;
  input {
    width: 90%;
  }
  div {
    margin-left: auto;
    cursor: pointer;
  }
  @media screen and (max-width: 413px) {
    input {
    width: 80%;
  }
  }
`

const Title = styled.div`
  display:flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 500%;
  padding-top: 1rem;
  text-align: center;
  margin: 4% 0;
`
const InputContainer = styled.div``

const CardLayout = styled.div`
  width: 100%;
`
const LogOut = styled.div`
  text-align: end;
  .btnName {
    cursor: pointer;
    font-size: 25%;
    background-color: var(--color-blue );
    border-radius: 1rem;
    margin-left: auto;
    padding:1rem ;
    color: var(--color-white);
  }
`

const FilterWrapper = styled.div`
  display: flex;
  justify-content:end;
  margin: 2.5% 0;
  font-weight: bold;
  font-size: 150%;
  transition : all ease 0.3s 0.3s;
`
const FilterDiv = styled.div`
    cursor: pointer;
    padding:1rem;
    background-color : ${(props)=>props.filterId === props.current ? 'var(--color-mauve)' : 'var(--color-blue )' };
    color: ${(props)=>props.filterId === props.current ? 'var(--color-black)' : 'var(--color-white)' };
    border-radius: 1rem;
    margin-right: 1%;
    :hover{
        scale:1.1;
      }
`



export default ToDo
