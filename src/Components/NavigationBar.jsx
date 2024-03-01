import React, { useEffect, useState } from 'react';
import s from './NavigationBar.module.scss';
import * as HiIcons from 'react-icons/hi';
import AllSection from './AllSection';
import TodaySection from './TodaySection';
import { useUserContext } from '../Contexts/UserContext';
import SpecialSection from './SpecialSection';
import { useThemeContext } from '../Contexts/ThemeContext';
import { Fade } from '@mui/material';
import { useMenuOpenContext } from '../Contexts/MenuOpenContext';
import NewTask from './NewTask';

const NavigationBar = () => {
    const [selectedButton, setSelectedButton] = useState('All');
    const { toggleTheme } = useThemeContext()
    const { toggleMenu, isOpen, setIsOpen } = useMenuOpenContext()

    const handleSelect = (sectionName) => {
        setSelectedButton(sectionName);
        if (window.innerWidth < 450) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    };

    useEffect(() => {
        if (window.innerWidth > 450) {
            setIsOpen(true);
            console.log(innerWidth);
        } else {
            setIsOpen(false)
        }
    }, []);

    const { logOut } = useUserContext()

    return (
        <Fade timeout={{ enter: 2000 }} in={true}>
            <div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className={s.backdrop}>
                    <div className={s.section}>
                        <button className={s.menuBtn} >
                            <HiIcons.HiMenuAlt4 onClick={toggleMenu} />
                        </button>
                        <div className={s.sectionTopContainer}>
                            {selectedButton === 'All' ? (
                                <HiIcons.HiViewGrid
                                    className={`${s.sectionButton} ${s.selected}`}
                                    onClick={() => handleSelect('All')}
                                />
                            ) : (
                                <HiIcons.HiOutlineViewGrid
                                    className={`${s.sectionButton}`}
                                    onClick={() => handleSelect('All')}
                                />
                            )}
                            {selectedButton === 'Special' ? (
                                <HiIcons.HiStar
                                    className={`${s.sectionButton} ${s.selected}`}
                                    onClick={() => handleSelect('Special')}
                                />
                            ) : (
                                <HiIcons.HiOutlineStar
                                    className={`${s.sectionButton}`}
                                    onClick={() => handleSelect('Special')}
                                />
                            )}
                            {selectedButton === 'Today' ? (
                                <HiIcons.HiClock
                                    className={`${s.sectionButton} ${s.selected}`}
                                    onClick={() => handleSelect('Today')}
                                />
                            ) : (
                                <HiIcons.HiOutlineClock
                                    className={`${s.sectionButton}`}
                                    onClick={() => handleSelect('Today')}
                                />
                            )}
                            {selectedButton === 'Add' ? (
                                <HiIcons.HiPlus
                                    className={`${s.sectionButtonAdd} ${s.selected}`}
                                    onClick={() => handleSelect('Add')}
                                />
                            ) : (
                                <HiIcons.HiOutlinePlus
                                    className={`${s.sectionButtonAdd}`}
                                    onClick={() => handleSelect('Add')}
                                />
                            )}
                        </div>
                        <div className={s.sectionBottomContainer}>
                            <HiIcons.HiOutlineMoon onClick={toggleTheme} className={s.sectionButtonBottom} />
                            <HiIcons.HiLogin onClick={logOut} className={s.sectionButtonBottom} />
                        </div>

                    </div>
                </div>
                <div className={s.pagesContainer}>
                    {selectedButton === 'Today' ? <TodaySection /> : null}
                    {selectedButton === 'All' ? <AllSection /> : null}
                    {selectedButton === 'Special' ? <SpecialSection /> : null}
                    {selectedButton === 'Add' ? <NewTask /> : null}
                </div>
            </div>
        </Fade>

    );
};

export default NavigationBar;
