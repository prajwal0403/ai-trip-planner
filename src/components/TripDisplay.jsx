import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 16px;
`;
const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  margin: 0 4px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid transparent;

  &::before {
    content: '⬇️';
    margin-right: 4px;
    left: 8px;
    top: 8px;
  }

  &:hover {
    background-color: #dadada;
    border: 1px solid #ccc;
  }
`;
const info = `Welcome to QuestQuill! We're here to help you create the perfect journey based on your preferences. Please provide us with the following details:

1. **Starting Point**: Where does your adventure begin? Share the name of the city or place where your journey starts.

2. **Destination**: Where is your final destination? Let us know where you're headed.

3. **Budget**: What's your estimated budget for this trip? A rough estimate will help us suggest suitable options.

4. **Number of Travelers**: Tell us how many people are in your travel party. This will help us plan accommodations and activities accordingly.

5. **Duration**: How many days will your adventure last? Share the number of days you have available.

6. **Accommodation Preferences**: What type of accommodation do you prefer? You can choose from options like hotels, hostels, or vacation rentals.

7. **Travel Style**: Describe your travel style. Are you looking for a relaxing road trip, an adventurous expedition, or something else?

8. **Transportation Type**: Let us know your preferred mode of transportation, whether it's by car, train, or any other means.

9. **Activity Type**: What types of activities are you most interested in? Options include nature exploration, cultural experiences, or anything that excites you.

10. **Cuisine Type**: Are you a food enthusiast? Share your preference for trying traditional, exotic, or local cuisines.

11. **Language**: In which language would you like to receive recommendations and details for your itinerary?

Once you've provided all of this information, we'll create a personalized itinerary for you, including daily recommendations for destinations, activities, and dining suggestions. Our goal is to make your journey unforgettable and hassle-free.

Thank you for choosing QuestQuill, and we look forward to planning your dream adventure! 🌟
`;

function TripDisplay({ data, loading }) {
  return (
    <div>
      {data.length > 0 && <h1 className="text-center text-3xl">
        ⭐️ Your Customized Trip Details ⭐️
      </h1>}
      {loading ? (
        <div
          className="flex items-center justify-center"
          style={{ height: '100vh', width: '100%' }}
        >
          <div className="block">
            <div style={{ marginLeft: '30%' }}>
              <MagnifyingGlass
                visible={true}
                height="150"
                width="150"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </div>
            <div className="m-5">
              {' '}
              🚗 Hang in there, we're busy crafting the perfect trip for you! 📸
            </div>
          </div>
        </div>
      ) : data.length === 0 ? (
        <div
          className="flex items-center justify-center"
        >
          <div>
            <div className='text-center text-3xl p-4 m-3'> 🌍 Please fill the details to generate your trip 🏞️</div>
            <div className=''>
              <ReactMarkdown className="markdown p-4 ">{info}</ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <ReactMarkdown className="markdown p-3">{data}</ReactMarkdown>
      )}
      {data.length > 0 && (
        <ButtonContainer>
          <ActionButton
            onClick={() => {
              const blob = new Blob([data], {
                type: 'text/plain;charset=utf-8',
              });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.setAttribute('href', url);
              link.setAttribute('download', 'travel-plan.txt');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              return false;
            }}
          >
            Download
          </ActionButton>
        </ButtonContainer>
      )}
    </div>
  );
}

export default TripDisplay;
