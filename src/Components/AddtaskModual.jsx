import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTaskModal = ({ isOpen, onRequestClose, addTask, taskToEdit }) => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('Incomplete');

  useEffect(() => {
    if (taskToEdit) {
      setText(taskToEdit.text);
      setStatus(taskToEdit.completed ? 'Completed' : 'Incomplete');
    } else {
      setText('');
      setStatus('Incomplete');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ text, status });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="Modal" overlayClassName="Overlay">
      <h2>{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} required className='input'/>
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className='status'>
            <option value="Incomplete">Incomplete</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="modal-buttons">
          <button type="submit">{taskToEdit ? 'Update' : 'Add'} Task</button>
          <button type="button" onClick={() => { onRequestClose(); toast.info("Modal closed"); }}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
