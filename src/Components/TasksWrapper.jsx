import React from 'react'
import SectionInfo from './SectionInfo'
import NavigationBar from './NavigationBar'
import NewTask from './NewTask'
import ConfirmPopUp from './ConfirmPopUp'
import ColorTypeProvider from '../Contexts/ColorTypeContext'
import s from './TaskWrapper.module.scss'

const TasksWrapper = () => {
  return (
    <div>
      <ColorTypeProvider>
        <SectionInfo />
        <NavigationBar />
        <div className={s.newTaskContainer}>
        <NewTask />
        </div>
      </ColorTypeProvider>
    </div>
  )
}

export default TasksWrapper