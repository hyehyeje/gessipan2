import styled from 'styled-components';
import { format } from 'date-fns';
import { enUS, ko } from 'date-fns/locale';
import React, { useState } from "react";
import Modal from './Modal'

const TodoDisplayPage = styled.div`
    background-color: white;
    margin: 5vh 5vw 5vh 10vw;
    width: 35vw;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    box-shadow: inset 0 5px 5px 3px rgba(0, 0, 0, .1);
`

const PrintYear = styled.div`
    margin: 5vh 5vw 0 5vw;
    font-size: 1.5rem;
`

const PrintDay = styled.div`
    margin: 0 5vw 5vh 5vw;
    font-size: 1rem;
`

const Todo = styled.div`
    margin: 3vh 5vw 0 5vw;
    display: flex;
    justify-content: space-between;
`

const TodoItem = styled.div`
    font-size: 1rem;
    display: flex;
    text-decoration: ${({ isChecked }) => (isChecked ? 'line-through' : 'none')}; /* 체크된 상태에서 줄 그음 */
    color: ${({ isChecked }) => (isChecked ? 'gray' : 'black')}; /* 체크되면 회색으로 변경 */
`

const TodoColorBar = styled.div`
    width: 1vw;
    margin-right: 1vw;
    background-color: ${({ priority }) => {
        switch (priority) {
            case 'high':
                return '#DC5E5E';      // 높은 중요도: 빨간색
            case 'medium':
                return '#DCD15E';       // 중간 중요도: 주황색
            case 'low':
                return '#6DDC5E';        // 낮은 중요도: 초록색
            default:
                return 'black';        // 기본: 검정색
        }
    }};
`

const TodoCheck = styled.input.attrs({ type: 'checkbox' })`
    appearance: none;  /* 기본 체크박스 제거 */
    width: 24px;
    height: 24px;
    border: 2px solid black;
    border-radius: 6px;  /* 둥근 모서리 */
    cursor: pointer;
    position: relative;
    background-color: white;

    &:checked {
        background-color: blue; /* 체크된 상태일 때 배경색: 연보라 */
        border-color: #5B51E2;
    }

    &:checked::after {
        content: '';  /* 체크 마크 대신 가상 요소로 표시 */
        position: absolute;
        top: 4px;
        left: 8px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);  /* 체크 모양 */
        transition: all 0.3s ease;  /* 체크 마크 애니메이션 */
    }

    &:hover {
        border-color: #4A42B6; /* 호버 시 테두리 색을 약간 어둡게 */
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 5px rgba(91, 81, 226, 0.5); /* 포커스 시 부드러운 그림자 */
    }
`

const AddTodoButton = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    align-self: center;
    position: fixed;
    bottom: 70px;
    border: none;
    background-color: #5B51E2;
    font-size: 30px;
    color: white;
`

const TodoDisplay = () => {
    const today = new Date();
    const YearMonth = format(today, 'yyyy MMMM', { locale: enUS });
    const DateWeek = format(today, 'd일 EEEE', { locale: ko });

    const initialTodos = [
        { id: 1, text: 'React 공부하기', priority: 'high', completed: false },
        { id: 2, text: '점심 준비하기', priority: 'medium', completed: false },
        { id: 3, text: '운동하기', priority: 'low', completed: false }
    ];

    const [todos, setTodos] = useState(initialTodos);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheck = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddTodo = (newTodo) => {
        // 새로운 할 일을 리스트에 추가
        setTodos([...todos, { id: todos.length + 1, ...newTodo, completed: false }]);
        setIsModalOpen(false);
    };

    return (
        <TodoDisplayPage>
            <PrintYear>{YearMonth}</PrintYear>
            <PrintDay>{DateWeek}</PrintDay>
            {todos.map((todo) => (
                <Todo key={todo.id}>
                    <TodoItem isChecked={todo.completed}>
                        <TodoColorBar priority={todo.priority}></TodoColorBar>
                        <div>{todo.text}</div>
                    </TodoItem>
                    <TodoCheck
                        checked={todo.completed}
                        onChange={() => handleCheck(todo.id)}
                    />
                </Todo>
            ))}
            <AddTodoButton onClick={handleOpenModal}>+</AddTodoButton>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddTodo} />
        </TodoDisplayPage>
    );
}

export default TodoDisplay;
