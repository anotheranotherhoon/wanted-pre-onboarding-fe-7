import {useRef} from 'react'
import styled from 'styled-components'


const Modal = ({modalClose, todo, editTodo,handleCancelEditMode,isCompleted, handleComplete}) => {
  const modalRef = useRef(null)
  const cllickBackground = (e) => {
    if(modalRef.current === e.target){
      modalClose()
    }
  }


  return (
    <Container>
      <Background ref={modalRef} onClick={cllickBackground} />
      <ModalBlock>
        <Contents>
          <label>수정 하기</label>
          <input value={todo} onChange={editTodo} />
        </Contents>
        {isCompleted ? <ModalEvent className='done' onClick={()=>handleComplete()}>Not yet</ModalEvent> :<ModalEvent className='done' onClick={()=>handleComplete()}>Done!</ModalEvent>}
        <ModalEvent className='cancel' onClick={()=>handleCancelEditMode()}>취소</ModalEvent>
        <ModalEvent className='ok' onClick={()=>modalClose()}>확인</ModalEvent>
      </ModalBlock>
    </Container>
  )
}
const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    animation: modal-bg-show 0.3s;
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ModalBlock = styled.div`
    position: absolute;
    top: 6.5rem;
    border-radius: 10px;
    padding: 1.5rem;
    background-color: var(--color-yellow);
    width: 60rem;
    @media (max-width: 1120px) {
        width: 50rem;
    }
    @media (max-width: 50rem) {
        width: 80%;
    }
    min-height: 18rem;
    animation: modal-show 1s;
    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
`;


const ModalEvent = styled.div`
    position: absolute;
    bottom: 2rem;
    padding:1rem ;
    color: white;
    transition : all ease 0.2s 0.2s;
    cursor: pointer;
    :hover{
        scale:1.1;
      }
    &.done{
      cursor: pointer;
      right:18rem;
      background-color:var(--color-blue );
      border-radius: 2rem;

    }
    &.cancel{
      cursor: pointer;
      right:10rem;
      background-color:var(--color-orange);
      border-radius: 2rem;
    }
    &.ok{
      cursor: pointer;
      right: 2rem;
      background-color:var(--color-orange);
      border-radius: 2rem;
    }
`


const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    input{
      margin: 2%;
      width:100%;
      height:5rem;
    }
`;






export default Modal
