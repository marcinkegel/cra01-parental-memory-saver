import React from 'react';
import './App.scss';
import Timeline from "./js/Timeline";
// import Signup from "./js/Signup";
// import {AuthProvider} from "./js/contexts/AuthContext";

function App() {
  return (
    <>
        <div>
            <h1 className="logo">MemoryLane</h1>

            {/*<Signup/>*/}

            <Timeline/>
        </div>



    </>
  );
}

export default App;
