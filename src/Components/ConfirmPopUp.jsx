import React from 'react'
import s from './ConfirmPopUp.module.scss'

const ConfirmPopUp = ({ onClose, onDelete, taskId }) => {
    const handleCancel = () => {
        onClose(); // Close the pop-up when cancel button is clicked
    };

    const handleConfirm = () => {
        onDelete(taskId); // Delete the task when confirm button is clicked
        onClose(); // Close the pop-up
    };

    return (
        <div className={s.backdrop}>
            <div className={s.popUpContainer}>
                <h1>Are you sure you want to delete the task?</h1>
                <p>You won't be able to access it ever again.</p>
                <div className={s.buttonContainer}>
                    <button onClick={handleCancel}>Cancel</button>
                    <button className={s.deleteBtn} onClick={handleConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPopUp;
