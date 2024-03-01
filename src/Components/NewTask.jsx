import React, { useState } from 'react';
import s from './NewTaskPopUp.module.scss';
import * as HiIcons from 'react-icons/hi';
import { useUserContext } from '../Contexts/UserContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { v4 as uuid } from 'uuid';
import { Fade } from '@mui/material';


const NewTask = () => {
    const [selectedColorType, setSelectedColorType] = useState(1);
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [taskType, setTaskType] = useState('noDue');
    const [special, setSpecial] = useState(false)

    const { user } = useUserContext()

    const colorTypes = {
        1: '#C5C5C5', //grey
        2: '#DBACFF', //purple
        3: '#008f64', //green
        4: '#FFEC42', //yellow
    };

    const handleTaskTypeSelection = (type) => {
        setSelectedColorType(type);
        if (setSelectedColorType === null) {
            selectedColorType(1)
        }
    };

    const handleTaskInputChange = (event) => {
        setTask(event.target.value);
    };

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleTaskTypeChange = (event) => {
        setTaskType(event.target.value);
    };

    const createNewTask = async () => {
        try {
            await addDoc(collection(db, `users/${user.uid}/tasks`), {
                taskId: uuid(),
                taskName: taskName,
                taskColorType: selectedColorType,
                tasks: [...tasks],
                tasksAmount: [...tasks].length,
                taskType: taskType,
                done: false,
                inProgress: false,
                special: special
            });
            setSelectedColorType(1);
            setTask('');
            setTaskName('');
            setTaskType(null);
            setTasks([]);
            setSpecial(false);
            console.log('added');
            if (window.innerWidth < 450) {
                location.reload();
            }
        } catch (error) {
            console.error("error adding task: ", error);
        }
    };

    const handleTaskAddition = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { name: task, taskDone: false }]);
            setTask('')
        }
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    return (
        <div className={s.popUpContainer}>
            <input value={taskName} onChange={handleTaskNameChange} className={s.titleInput} placeholder='Enter Task Title' type="text" />
            <div>
                <div className={s.tasksContainer}>
                    {tasks.length === 0 ? (
                        <p className={s.noTasksMessage}>You have to have at least one task</p>
                    ) : (
                        tasks.slice().reverse().map((task, index) => (
                            <div key={index} className={s.taskContainer}>
                                <p className={s.task}>{task.name}</p>
                                <HiIcons.HiOutlineTrash
                                    className={s.tasksIcon}
                                    onClick={() => handleDeleteTask(tasks.length - 1 - index)}
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className={s.bottomContainer}>
                    <div className={s.tasksInputContainer}>
                        <input required
                            className={s.tasksInput}
                            placeholder='Enter Tasks'
                            type="text"
                            value={task}
                            onChange={handleTaskInputChange}
                        />
                        <HiIcons.HiOutlinePlus className={s.tasksInputIcon} onClick={handleTaskAddition} />
                    </div>
                    <div className={s.btmOptionsContainer}>
                        <div style={{ display: "flex" }}>
                            <button onClick={() => { setSpecial(!special) }} className={s.bottomButton}>{special ? <HiIcons.HiStar /> : <HiIcons.HiOutlineStar />}</button>
                            <div className={s.selector}>
                                <HiIcons.HiOutlineCalendar />
                                <select value={taskType} onChange={handleTaskTypeChange}>
                                    <option value="noDue">No due </option>
                                    <option value="todayTasks">Today</option>
                                </select>
                            </div>
                        </div>
                        <div className={s.taskTypeContainer}>
                            {Object.keys(colorTypes).map((key) => (
                                <div
                                    key={key}
                                    className={`${s.taskType} ${selectedColorType === key ? s.selected : ''}`}
                                    style={{ backgroundColor: colorTypes[key] }}
                                    onClick={() => handleTaskTypeSelection(key)}
                                    onLoad={handleTaskTypeSelection}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <button
                        disabled={!taskName.trim() || tasks.length === 0}
                        onClick={createNewTask}
                        className={s.addBtn}
                    >
                        Add task
                    </button>
                    <button onClick={() => {
                        location.reload()
                    }} className={s.cancelBtn}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NewTask;
