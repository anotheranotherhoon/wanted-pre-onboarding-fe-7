import {useEffect, useId, useState} from 'react'
import styled from 'styled-components'
import {createTodo, getTodos} from '../api/api'
import BorderLayout from '../components/BorderLayout'
import Card from '../components/Card'
import AddBtn from '../components/svg/AddBtn'
import {deleteTodo} from '../api/api'

const ToDo = () => {
  const [value, setValue] = useState('')
  const [todos, setTodos] = useState([])
  const [originalTodos, setOriginalTodos] = useState([])
  const [filterState, setFilterState] = useState(1)
  const handleText = (event) => {
    setValue(event.target.value)
  }
  const handleCreateTodo = (todo) => {
    if(todo){
      if (window.confirm('할 일을 추가하시겠습니까?')) {
        createTodo(todo).then((res) => {
          const newArr = todos
          newArr.push(res)
          setTodos([...newArr])
          setOriginalTodos([...newArr])
          setValue('')
        })
      }
    }else{
      alert('할 일을 입력해주세요!')
    }
  }
  const handleDeleteTodo = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteTodo(id)
      const newArr = originalTodos.filter((el) => el.id !== id)
      setTodos(newArr)
      setOriginalTodos(newArr)
    }
    return
  }

  const handleLogOut = ()=> {
    if(window.confirm('로그아웃 하시겠습니까?')){
      window.localStorage.removeItem('token')
      window.location.reload()
      return 
    }
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
            <span onClick={()=>handleLogOut()}>로그아웃</span>
          </LogOut>
          </Title>
          <FormWrapper>
            <form>
              <InputWrapper>
                <label id="text" />
                <input id="text" value={value} onChange={handleText}   autoFocus="true" />
                <div onClick={() => handleCreateTodo(value)}>
                  <AddBtn />
                </div>
              </InputWrapper>
            </form>
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
  span {
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
