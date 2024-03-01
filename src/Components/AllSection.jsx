import React, { useEffect, useState } from 'react';
import s from './TodaySection.module.scss';
import LinearProgress from '@mui/material/LinearProgress';
import * as HiIcons from 'react-icons/hi';
import { onSnapshot, collection, query, where, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useUserContext } from '../Contexts/UserContext';
import confetti from '../imgs/confetti.png';
import Fade from '@mui/material/Fade';
import ConfirmPopUp from './ConfirmPopUp';
import ColorTypeProvider, { useColorTypeContext } from '../Contexts/ColorTypeContext';


const AllSection = ({ onClose }) => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState({});
    const [noTasks, setNoTasks] = useState(null);
    const { user } = useUserContext();
    const [loading, setLoading] = useState(true);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const { selectedColorType } = useColorTypeContext();

    useEffect(() => {
        let unSub = null;
        setLoading(true);

        const fetchTasks = async () => {
            try {
                const q = query(
                    collection(db, `users/${user.uid}/tasks`),
                    where("done", "==", false)
                );

                unSub = onSnapshot(q, (snapshot) => {
                    const tasksData = [];
                    snapshot.forEach((doc) => {
                        tasksData.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });

                    setTasks(tasksData);
                    setLoading(false);

                    if (tasksData.length === 0) {
                        setNoTasks(true);
                    } else {
                        setNoTasks(false);
                    }

                });
            } catch (error) {
                console.error("Error fetching tasks: ", error);
            }
        };

        fetchTasks();

        return () => {
            if (unSub) {
                unSub();
            }
        };
    }, []);

    const filteredTasks = selectedColorType ? tasks.filter(task => task.taskColorType === selectedColorType) : tasks;

    const colorTypes = {
        1: '#C5C5C5', //grey
        2: '#DBACFF', //purple
        3: '#008f64', //green
        4: '#FFEC42', //yellow
    };

    const openDeletePopup = (taskId) => {
        setConfirmDeleteOpen(true);
        setSelectedTaskId(taskId);
    };

    const deleteTask = async (taskId) => {
        try {
            const taskRef = doc(db, `users/${user.uid}/tasks/${taskId}`);
            await deleteDoc(taskRef);

            console.log(taskId + "deleted");
        } catch (error) {
            console.error("error deleting task: ", error);
        }
    };

    const toggleDone = async (taskId, taskIndex) => {
        try {
            const taskRef = doc(db, `users/${user.uid}/tasks/${taskId}`);

            const taskDoc = await getDoc(taskRef);
            const tasksArray = taskDoc.data().tasks;

            tasksArray[taskIndex].taskDone = !tasksArray[taskIndex].taskDone;

            await updateDoc(taskRef, {
                tasks: tasksArray
            });
        } catch (error) {
            console.error("error toggling", error);
        }
    };

    const completeAll = async (taskId) => {
        try {
            const taskRef = doc(db, `users/${user.uid}/tasks/${taskId}`);

            const taskDoc = await getDoc(taskRef);
            const tasksArray = taskDoc.data().tasks;

            const updatedTasksArray = tasksArray.map(task => ({
                ...task,
                taskDone: true,
            }));

            await updateDoc(taskRef, {
                tasks: updatedTasksArray,
            });

            setCompletedTasks(prevState => ({
                ...prevState,
                [taskId]: true
            }));

            setTimeout(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
                updateDoc(taskRef, {
                    done: true,
                });
            }, 2000);

        } catch (error) {
            console.error("error completeAll", error);
        }
    };

    const calculateProgress = (task) => {
        const totalTasks = task.tasksAmount;
        const completedTasks = task.tasks.filter(task => task.taskDone).length;
        return (completedTasks / totalTasks) * 100;
    };

    return (
        <>
            {noTasks ? <div className={s.noTasksContainer}>
                            <h1>Looks like it's nothing in here!</h1>
                            <p>Get busy! Add new tasks!</p>
                        </div> : (
                <>
                    {confirmDeleteOpen && <ConfirmPopUp onClose={() => setConfirmDeleteOpen(false)} onDelete={deleteTask} taskId={selectedTaskId} />}
                    <div className={s.section}>
                        <div className={s.tasksContainer}>
                            {filteredTasks.map((task) => (
                                <Fade timeout={{ enter: 1000 }} in={!loading}>
                                    <div key={task.id} className={s.taskContainer}>
                                        <img className={task.done ? s.completedConfetti : s.confetti} src={confetti} alt="confetti" />
                                        <img className={completedTasks[task.id] ? s.completedConfetti : s.confetti} src={confetti} alt="confetti" />
                                        <div className={s.taskTopContainer}>
                                            <div
                                                style={{ backgroundColor: colorTypes[task.taskColorType] }}
                                                className={s.taskType}
                                            ></div>
                                            <p className={s.taskName}>{task.taskName}</p>
                                            <HiIcons.HiOutlineTrash onClick={() => openDeletePopup(task.id)} className={s.taskControl} />
                                        </div>
                                        <div className={s.taskProgressContainer}>
                                            <LinearProgress
                                                className={s.taskProgress}
                                                variant="determinate"
                                                value={calculateProgress(task)}
                                                sx={{
                                                    backgroundColor: 'var(--border-color)',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: colorTypes[task.taskColorType],
                                                    },
                                                }}
                                            />
                                            <span className={s.taskProgressLabel}>{calculateProgress(task).toFixed(0).substring(0, 3)}%</span>
                                        </div>
                                        <div className={s.tasks}>
                                            {task.tasks.map((taskItem, index) => (
                                                <p
                                                    key={index}
                                                    style={{
                                                        textDecoration: taskItem.taskDone ? "line-through" : "none",
                                                        color: taskItem.taskDone ? "var(--border-color)" : "var(--main-color)",
                                                    }}
                                                    onClick={() => toggleDone(task.id, index)}
                                                    className={s.tasksItem}
                                                >
                                                    {taskItem.name}
                                                </p>
                                            ))}
                                        </div>
                                        <button onClick={() => completeAll(task.id)} className={s.taskCompleteAllBtn}>Complete</button>
                                    </div>
                                </Fade>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default AllSection;
