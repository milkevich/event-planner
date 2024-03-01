import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { MainLayout } from './Components/MainLayout.jsx';
import ErrorBoundary from './Pages/ErrorBoundary';
import LogIn from './Pages/LogIn.jsx';
import SignUp from './Pages/SignUp.jsx';
import Protected from './Protected.jsx';
import TasksWrapper from './Components/TasksWrapper.jsx';
import UserContextProvider from './Contexts/UserContext.jsx';
import './Shared/Styles/Variables.scss'
import ThemeContextProvider from './Contexts/ThemeContext.jsx';
import MenuOpenpRrovider from './Contexts/MenuOpenContext.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route element={<MainLayout />}>
        <Route path='/log-in' element={<LogIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<Protected />}>
          <Route path='/tasks' element={<TasksWrapper />} />
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <ThemeContextProvider>
    <MenuOpenpRrovider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
      </MenuOpenpRrovider>
      </ThemeContextProvider>
  </UserContextProvider>
);
