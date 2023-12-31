import React, { useEffect, useState } from 'react';
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
import '@questlabs/react-sdk/dist/style.css';
import { useMediaQuery } from 'react-responsive';

// Define the media query for screens less than 800px
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 800 });

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleFeedback = () => {
    setFeedback(!feedback);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#333"
    } else {
      document.body.style.backgroundColor = "white"
    }
  }, [darkMode]);

  return (
    <div
      style={{ width: '100%', height: '100%', display: `${isMobile ? 'block' : 'flex'}` }}
      className={`${darkMode ? 'dark-mode' : 'light-mode'}`}
    >
      <ToastContainer />
      <div style={{ width: `${isMobile ? '100%' : '30%'}` }}>
        <TripPlanner
          darkMode={darkMode}
          setData={setData}
          setLoading={setLoading}
        />
      </div>
      <div style={{ width: `${isMobile ? '100%' : '70%'}` }}>
        <div
          style={{ width: '100%' }}
          className="flex space-x-4 justify-between pr-3 mt-2 p-4"
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
          <div
            onClick={toggleFeedback}
            className="flex justify-center item-center cursor-pointer"
          >
            <span className="pt-5 mr-2 text-amber-300 text-bold" style={{ fontFamily: 'cursive' }}>
              Help Us Improve
            </span>
            <img src={icon} alt="icon" className="p-2" />
          </div>
        </div>
        <div style={{ display: feedback ? 'block' : 'none' }}>
          <QuestProvider
            apiKey="k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4"
            apiSecret="s-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42"
            entityId="e-cb806923-6890-4cf3-90da-b72e66658508"
          >
            <Feedback
              onSubmit={() => setFeedback(false)}
              userId="u-0000000000"
              token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE"
              questId="q-00a79f3c-1132-4d70-8689-cf652b8cf4e1"
              heading="Help Us Improve"
              btnColor="#f59e0b"
              textColor="#f59e0b"
              subHeading="Let Us Know How We Did"
            />
          </QuestProvider>
        </div>
        {!feedback && <TripDisplay data={data} loading={loading} />}
      </div>
    </div>
  );
}

export default App;
