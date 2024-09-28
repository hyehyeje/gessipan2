import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달을 최상단에 표시 */
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1001; /* 모달 컨텐츠도 최상단에 있어야 함 */
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

const FormInput = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #5B51E2;
  }
`;

const FormSelect = styled.select`
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #5B51E2;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 500;
  color: #444;
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #5B51E2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #4a42b6;
  }
`;

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [hasDeadline, setHasDeadline] = useState(true);
    const [priority, setPriority] = useState('medium');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, deadline: hasDeadline ? deadline : null, priority });
        onClose();
    };

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalTitle>Add New Todo</ModalTitle>
                <form onSubmit={handleSubmit}>
                    <Label>
                        Todo Title:
                        <FormInput
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Enter your task"
                        />
                    </Label>
                    <CheckboxLabel>
                        <FormInput
                            type="checkbox"
                            checked={hasDeadline}
                            onChange={e => setHasDeadline(e.target.checked)}
                        />
                        Has Deadline
                    </CheckboxLabel>
                    {hasDeadline && (
                        <Label>
                            Deadline:
                            <FormInput
                                type="date"
                                value={deadline}
                                onChange={e => setDeadline(e.target.value)}
                            />
                        </Label>
                    )}
                    <Label>
                        Priority:
                        <FormSelect
                            value={priority}
                            onChange={e => setPriority(e.target.value)}
                        >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </FormSelect>
                    </Label>
                    <SubmitButton type="submit">Add Todo</SubmitButton>
                </form>
            </ModalContent>
        </ModalBackground>
    );
};

export default Modal;
