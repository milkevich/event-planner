import React from 'react'
import { CircularProgress } from '@mui/material';


const Loader = () => {
  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: "fixed", width: "100vw", backgroundColor: "rgb(0,0,0, 0.5)", zIndex: "10000"}}>
                <CircularProgress style={{ color: 'white' }} />
        </div>
    </div>
  )
}

export default Loader