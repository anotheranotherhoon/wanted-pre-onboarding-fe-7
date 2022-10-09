import {useState} from 'react'
import styled from 'styled-components'
import {updateTodo} from '../api/api'
import Check from './svg/Check'
import Circle from './svg/Circle'
import Modal from './Modal'

const Card = ({el, handleDeleteTodo}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState(el.id)
  const [todo, setTodo] = useState(el.todo)
  const [originalTodo, setOriginalTodo] = useState(el.todo)
  const [isCompleted, setIsCompleted] = useState(el.isCompleted)
  const [originalIsCompleted, setIsOriginalIsCompleted] = useState(el.isCompleted)
  const [userId, setuserId] = useState(el.userId)

  const editTodo = (e) => {
    setTodo(e.target.value)
  }
  const handleCancelEditMode = () => {
    setIsEditMode(false)
    setIsModalOpen(false)
    setTodo(originalTodo)
    setIsCompleted(originalIsCompleted)
  }
  const handleEditBtn = () => {
    setIsEditMode(true)
    setIsModalOpen(true)
  }
  const modalClose = () => {
    setIsModalOpen(false)
  }
  const handleUpdateTodo = () => {
    if (window.confirm('수정하겠습니까')) {
      updateTodo(id, todo, isCompleted, userId).then((res) => {
        window.location.reload()
      })
      setIsEditMode(false)
    }
  }
  const handleComplete = () => {
    console.log('hello')
    console.log(isCompleted)
    setIsCompleted(!isCompleted)
  }
  return (
    <Layout isCompleted={isCompleted} isEditMode={isEditMode}>
      <Mark>{isCompleted ? <Check /> : <Circle />}</Mark>
      <div className="content">{todo}</div>
      <EventWrapper>
        {isEditMode ? (
          <>
            <Edit className="leftOne" onClick={() => handleUpdateTodo()}>
              제출
            </Edit>
            <Edit onClick={() => handleCancelEditMode()}>취소</Edit>
          </>
        ) : (
          <>
            <Edit className="leftOne" onClick={() => handleEditBtn()}>
              수정
            </Edit>
            <Edit onClick={() => handleDeleteTodo(id)}>삭제</Edit>
          </>
        )}
        {isModalOpen && (
          <Modal
            modalClose={modalClose}
            todo={todo}
            editTodo={editTodo}
            handleCancelEditMode={handleCancelEditMode}
            isCompleted={isCompleted}
            handleComplete={handleComplete}
          />
        )}
      </EventWrapper>
    </Layout>
  )
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  line-height: normal;
  width: 100%;
  margin: 2% 0;
  padding: 2%;
  background-color: ${(props) =>
    props.isCompleted
      ? props.isEditMode
        ? 'var(--color-yellow)'
        : 'var(--color-mauve)'
      : props.isEditMode
      ? 'var(--color-yellow)'
      : 'white'};
  border-radius: 2rem;
  transition: all ease 0.5s 0.5s;
  border: ${(props) => (props.isEditMode ? '3px solid var(--color-orange)' : 'none')};
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 400%;
    padding-left: 4%;
    white-space: nowrap;
  }
  @media screen and (max-width: 413px) {
    max-width: 38rem;
    font-size: 50%;
  }
`

const EventWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  font-size: 250%;
  white-space: nowrap;
`
const Edit = styled.div`
  min-width: 4.4rem;
  cursor: pointer;
  &.leftOne {
    margin-right: 10%;
  }
`
const Mark = styled.div`
  min-height: 5rem;
  min-width: 5rem;
`

export default Card
