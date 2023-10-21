import React, { useState } from 'react';
import './App.css';
import TripPlanner from './components/TripPlanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TripDisplay from './components/TripDisplay';
import { Button } from '@material-tailwind/react';
import icon from './feed.png';
import { QuestProvider, Feedback } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css'

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleFeedback = () => {
    setFeedback(!feedback);
  }

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      className={`main-container ${darkMode ? 'dark-mode' : 'light-mode'}`}
    >
      <ToastContainer />
      <div style={{ width: '30%' }}>
        <TripPlanner
          darkMode={darkMode}
          setData={setData}
          setLoading={setLoading}
        />
      </div>
      <div style={{ width: '70%' }}>
        <div
          style={{ width: '100%' }}
          className="flex space-x-4 justify-between pr-3 mt-2"
        >
          <Button
            varient="gradient"
            onClick={toggleMode}
            className="mt-4 ml-2 bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            {darkMode ? (
              <span>
                <FontAwesomeIcon icon={faSun} className="mr-2" />
                Light Mode
              </span>
            ) : (
              <span>
                <FontAwesomeIcon icon={faMoon} className="mr-2" />
                Dark Mode
              </span>
            )}
          </Button>
          <div onClick={toggleFeedback} className='flex justify-center item-center cursor-pointer'> 
            <span className='pt-5 mr-2' style={{fontFamily:'cursive'}}>Help Us Improve</span>
            <img src={icon} alt="icon" className="p-2" />
          </div>
        </div>
       {feedback &&  <QuestProvider
        apiKey="k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4"
        apiSecret="s-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42"
        entityId="e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5"
      >
         <Feedback
          userId="u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed"
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE"
          questId="q-2b37975b-30f7-4572-a5f4-c354439b3970" 
          heading='Interactive Feedback Hub'
          subHeading='Empowering Seamless Communication and Iteration'
        />
        </QuestProvider>}
        <TripDisplay data={data} loading={loading} />
      </div>
    </div>
  );
}

export default App;
