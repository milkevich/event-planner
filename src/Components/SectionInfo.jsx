import React, { useEffect, useState } from 'react';
import s from './SectionInfo.module.scss';
import * as HiIcons from 'react-icons/hi';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useUserContext } from '../Contexts/UserContext';
import Typewriter from './Typewriter';
import { useColorTypeContext } from '../Contexts/ColorTypeContext';
import Fade from '@mui/material/Fade';
import { useMenuOpenContext } from '../Contexts/MenuOpenContext';

const SectionInfo = () => {
    const [tasks, setTasks] = useState(null);
    const { user } = useUserContext();
    const [loading, setLoading] = useState(true);
    const [doneTasks, setDoneTasks] = useState(0);
    const [todayTasks, setTodayTasks] = useState(0);
    const [colorTypesVisible, setColorTypesVisible] = useState(false);

    const { selectedColorType, setSelectedColorType } = useColorTypeContext();
    const { toggleMenu } = useMenuOpenContext()

    const colorTypes = {
        1: '#C5C5C5', //grey
        2: '#DBACFF', //purple
        3: '#008f64', //green
        4: '#FFEC42', //yellow
    };

    const handleTaskTypeSelection = (type) => {
        setSelectedColorType(type);
    };

    useEffect(() => {
        let unSub = null;
        setLoading(true);

        const fetchTasks = async () => {
            try {
                const q = query(
                    collection(db, `users/${user.uid}/tasks`),
                );

                unSub = onSnapshot(q, (snapshot) => {
                    const tasksData = [];
                    let doneCount = 0;
                    let todayCount = 0;

                    snapshot.forEach((doc) => {
                        const taskData = doc.data();
                        tasksData.push({
                            id: doc.id,
                            ...taskData
                        });

                        if (taskData.done) {
                            doneCount++;
                        }

                        if (taskData.taskType === 'todayTasks') {
                            todayCount++;
                        }
                    });

                    setTasks(tasksData);
                    setDoneTasks(doneCount);
                    setTodayTasks(todayCount);
                    setLoading(false);
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

    console.log(selectedColorType)

    if (!colorTypesVisible) {
        setSelectedColorType(null)
    }

    return (
        <div style={{ maxWidth: "1430px", margin: "auto" }}>
            <div className={s.section}>
            <Fade timeout={{enter: 800}} in={true}>
                <div style={{ display: "flex", gap: "15px" }}>
                    <div className={s.itemContainer}>
                        {!loading && (
                            <> 
                                <Fade in={true} timeout={{enter: 2000}}>
                                    <p className={s.itemValue}>{tasks.length}</p>
                                </Fade>
                                <p className={s.itemLabel}><Typewriter text="Tasks" delay={200} /></p>
                            </>
                        )}
                    </div>
                    <div className={s.itemContainer}>
                        {!loading && (
                            <>
                            <Fade in={true} timeout={{enter: 2000}}>
                                <p className={s.itemValue}>{todayTasks}</p>
                            </Fade>
                                <p className={s.itemLabel}><Typewriter text="Today" delay={200} /></p>
                            </>
                        )}
                    </div>
                    <div className={s.itemContainer}>
                        {!loading && (
                            <>
                            <Fade in={true} timeout={{enter: 2000}}>
                                <p className={s.itemValue}>{doneTasks}</p>
                            </Fade>
                                <p className={s.itemLabel}><Typewriter text="Done" delay={220} /></p>
                            </>
                        )}
                    </div>
                </div>
                </Fade>
                <div className={s.btnsWrapper}>
                <div className={s.btnsContainer}>
                        <button onClick={toggleMenu} className={s.menuBtn} >
                            <HiIcons.HiMenuAlt4/>
                        </button>
                    <Fade timeout={{enter: 800}} in={true}>
                        <button className={s.sortByBtn} onClick={() => setColorTypesVisible(!colorTypesVisible)}>
                            Sort by <HiIcons.HiChevronDown style={{ transform: colorTypesVisible ? "rotate(90deg)" : 'rotate(-90deg)' }} className={s.sortByBtnIcon} />
                        </button>
                    </Fade>
                    {colorTypesVisible && (
                        <div className={s.colorTypeContainer}>
                            <div className={s.colorTypeContainerContent}>
                                {Object.keys(colorTypes).map((key) => (
                                    <div
                                        key={key}
                                        style={{ backgroundColor: colorTypes[key] }}
                                        onClick={() => handleTaskTypeSelection(key)}
                                        className={`${s.colorType} ${selectedColorType === key ? s.selected : ''}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
}

export default SectionInfo;
