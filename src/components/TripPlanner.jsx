import React, { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

const options = {
  travelStyles: [
    'Cultural',
    'Adventure',
    'Relaxation',
    'Beach',
    'City Break',
    'Road Trip',
    'Wildlife Safari',
    'Ski',
  ],
  transportationTypes: [
    'Car',
    'Train',
    'Bus',
    'Flight',
    'Boat',
    'Bicycle',
    'Walking',
    'Motorcycle',
    'Public Transit',
  ],
  interests: [
    'History',
    'Art',
    'Food',
    'Music',
    'Nature',
    'Sports',
    'Photography',
    'Architecture',
    'Literature',
  ],
  accommodationTypes: [
    'Hotel',
    'Boutique Hotel',
    'Hostel',
    'Resort',
    'Vacation Rental',
    'Camping',
    'Homestay',
    'Bed and Breakfast',
  ],
  activityTypes: [
    'Outdoor',
    'Sightseeing',
    'Shopping',
    'Nightlife',
    'Museums',
    'Theme Parks',
    'Water Sports',
    'Yoga and Wellness',
  ],
  cuisineTypes: [
    { name: 'Traditional', emoji: '😋' },
    { name: 'Japanese', emoji: '🍱' },
    { name: 'Italian', emoji: '🍝' },
    { name: 'American', emoji: '🍔' },
    { name: 'Korean', emoji: '🍜' },
    { name: 'Mexican', emoji: '🌮' },
    { name: 'Thai', emoji: '🍲' },
    { name: 'Turkish', emoji: '🥙' },
    { name: 'Indian', emoji: '🍛' },
    { name: 'French', emoji: '🥐' },
    { name: 'Spanish', emoji: '🥘' },
    { name: 'Greek', emoji: '🍗' },
    { name: 'Chinese', emoji: '🥡' },
  ],
  languages: [
    { value: 'hindi', label: 'Hindi', icon: 'Hindi' },
    { value: 'en', label: 'English', icon: '🇺🇸' },
    { value: 'tr', label: 'Türkçe', icon: '🇹🇷' },
    { value: 'fr', label: 'Français', icon: '🇫🇷' },
    { value: 'es', label: 'Español', icon: '🇪🇸' },
    { value: 'de', label: 'Deutsch', icon: '🇩🇪' },
    { value: 'it', label: 'Italiano', icon: '🇮🇹' },
    { value: 'pt', label: 'Português', icon: '🇵🇹' },
    { value: 'ru', label: 'Русский', icon: '🇷🇺' },
    { value: 'ja', label: '日本語', icon: '🇯🇵' },
  ],
};

function TripPlanner({ darkMode, setData, setLoading }) {
  const [formData, setFormData] = useState({
    startingPoint: '',
    destination: '',
    budget: '',
    numberOfPeople: '',
    duration: '',
    accommodation: 'Hotel',
    travelStyle: 'Road-trip',
    transportationType: 'Car',
    activityType: 'Nature',
    cuisineType: 'Traditional',
    language: 'English',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  const handleSubmit = (e) => {
    if (
      formData.startingPoint.trim() === '' ||
      formData.destination.trim() === '' ||
      formData.budget.trim() === '' ||
      formData.numberOfPeople.trim() === '' ||
      formData.duration.trim() === ''
    ) {
      toast.error('Please fill in all required fields.');
    } else {
      e.preventDefault();
      setLoading(true);
      let prompt = `Create a personalized travel itinerary for a journey from ${formData.startingPoint} to ${formData.destination}. The travel party consists of ${formData.numberOfPeople} people with a budget of ${formData.budget}. The traveler's ideal trip is a ${formData.travelStyle} adventure, and they seek ${formData.duration} days of exciting experiences. Accommodation preferences include ${formData.accommodation}, and they prefer ${formData.transportationType} as the primary mode of transportation.
      The trip should encompass a variety of activities, with an emphasis on ${formData.activityType}. The traveler is keen on exploring local cuisines, especially ${formData.cuisineType}, and would like recommendations for dining options. Additionally, the traveler prefers to communicate in ${formData.language}.
      Please provide a comprehensive itinerary with daily recommendations, including destinations, activities, and dining suggestions, to make this journey unforgettable. Please provide all details in ${formData.language} language.`;

      fetch(`https://c5-na.altogic.com/e:65334e3724594faeeef6dd3b/travel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data.choices[0].message.content);
          toast.success("Congratulations!" + "\n" +  "trip has been generated");
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.message);
        });
    }
  };

  return (
    <div
      className={`${
        darkMode ? 'dark-mode' : 'light-mode'
      } bg-gray-100 min-h-screen flex items-center justify-center p-4`}
    >
      <div
        style={{ border: '1px solid yellow' }}
        className={`bg-white p-6 rounded-lg shadow-md w-96 ${
          darkMode ? 'dark-mode' : 'light-mode'
        }`}
      >
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Plan Your trip
        </h2>

        {/* Starting Point */}
        <div className="inp-container mb-4">
          <label className="mb-1 flex items-center space-x-4">
            <span className="required">Starting Point</span>
            <span role="img" aria-label="Start Icon">
              🚀
            </span>
          </label>
          <input
            onChange={handleInputChange}
            name="startingPoint"
            type="text"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              darkMode ? 'dark-input' : ''
            }`}
            placeholder="Enter starting point, eg: Mumbai"
          />
        </div>

        {/* Destination */}
        <div className="mb-4">
          <label className="mb-1 flex items-center space-x-2">
            <span className="required">Destination</span>
            <span role="img" aria-label="Destination Icon">
              🏞️
            </span>
          </label>
          <input
            onChange={handleInputChange}
            name="destination"
            type="text"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              darkMode ? 'dark-input' : ''
            }`}
            placeholder="Enter destination, eg: Goa"
          />
        </div>

        {/* Budget */}
        <div className="mb-4">
          <label className="mb-1 flex items-center space-x-2">
            <span className="required">Budget</span>
            <span role="img" aria-label="Budget Icon">
              💰
            </span>
          </label>
          <input
            onChange={handleInputChange}
            name="budget"
            type="text"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              darkMode ? 'dark-input' : ''
            }`}
            placeholder="Enter your budget, eg: 5000 RS or 250 USD"
          />
        </div>

        {/* Number of People */}
        <div className="mb-4">
          <label className="mb-1 flex items-center space-x-2">
            <span className="required">Number of People</span>
            <span role="img" aria-label="People Icon">
              👥
            </span>
          </label>
          <input
            onChange={handleInputChange}
            name="numberOfPeople"
            type="number"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              darkMode ? 'dark-input' : ''
            }`}
            placeholder="Enter the number of people, eg: 5"
          />
        </div>

        {/* Duration of the Trip */}
        <div className="mb-4">
          <label className="mb-1 flex items-center space-x-2">
            <span className="required">Duration of the Trip</span>
            <span role="img" aria-label="Clock Icon">
              ⏱️
            </span>
          </label>
          <input
            onChange={handleInputChange}
            name="duration"
            type="text"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              darkMode ? 'dark-input' : ''
            }`}
            placeholder="Enter the duration, eg: 5 Days"
          />
        </div>

        {/* Accommodation Type */}
        <div className={`mb-4 ${darkMode ? 'dark-select' : ''}`}>
          <label className="mb-1 flex items-center space-x-2">
            <span>Accommodation</span>
            <span role="img" aria-label="Accommodation Icon">
              🏨
            </span>
          </label>
          <Select
            options={options.accommodationTypes.map((type) => ({
              value: type,
              label: type,
            }))}
            theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: darkMode ? '#333' : '#fcd53f',
                },
              })}
              
            onChange={(selectedOption) =>
              handleSelectChange('accommodation', selectedOption.value)
            }
            className={`${darkMode ? 'dark-select' : ''}`}
          />
        </div>

        {/* Travel Style */}
        <div className={`mb-4 ${darkMode ? 'dark-select' : ''}`}>
          <label className="mb-1 flex items-center space-x-2">
            <span>Travel Style</span>
            <span role="img" aria-label="Travel Style Icon">
              ✈️
            </span>
          </label>
          <Select
            options={options.travelStyles.map((style) => ({
              value: style,
              label: style,
            }))}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: darkMode ? '#333' : '#fcd53f',
              },
            })}
            onChange={(selectedOption) =>
              handleSelectChange('travelStyle', selectedOption.value)
            }
            className={`${darkMode ? 'dark-select' : ''}`}
          />
        </div>

        {/* Transportation Type */}
        <div className={`mb-4 ${darkMode ? 'dark-select' : ''}`}>
          <label className="mb-1 flex items-center space-x-2">
            <span>Transportation Type</span>
            <span role="img" aria-label="Transport Icon">
              🚆
            </span>
          </label>
          <Select
            options={options.transportationTypes.map((style) => ({
              value: style,
              label: style,
            }))}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: darkMode ? '#333' : '#fcd53f',
              },
            })}
            onChange={(selectedOption) =>
              handleSelectChange('transportationType', selectedOption.value)
            }
            className={`${darkMode ? 'dark-select' : ''}`}
          />
        </div>

        {/* Activity Type */}
        <div className={`mb-4 ${darkMode ? 'dark-select' : ''}`}>
          <label className="mb-1 flex items-center space-x-2">
            <span>Activity Type</span>
            <span role="img" aria-label="Activity Icon">
              ⛹️
            </span>
          </label>
          <Select
            options={options.activityTypes.map((type) => ({
              value: type,
              label: type,
            }))}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: darkMode ? '#333' : '#fcd53f',
              },
            })}
            onChange={(selectedOption) =>
              handleSelectChange('activityType', selectedOption.value)
            }
            className={`${darkMode ? 'dark-select' : ''}`}
          />
        </div>

        {/* Cuisine Type */}
        <div className={`mb-4 ${darkMode ? 'dark-select' : ''}`}>
          <label className="mb-1 flex items-center space-x-2">
            <span>Cuisine Type</span>
            <span role="img" aria-label="Cuisine Icon">
              🍔
            </span>
          </label>
          <Select
            options={options.cuisineTypes.map((cuisine) => ({
              value: cuisine.name,
              label: cuisine.name,
            }))}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: darkMode ? '#333' : '#fcd53f',
              },
            })}
            onChange={(selectedOption) =>
              handleSelectChange('cuisineType', selectedOption.value)
            }
            className={`${darkMode ? 'dark-select' : ''}`}
          />
        </div>

        {/* Language */}
        <div className={`mb-4 ${darkMode ? 'dark-select' : ''}`}>
          <label className="mb-1 flex items-center space-x-2">
            <span>Language</span>
            <span role="img" aria-label="Language Icon">
              🗣️
            </span>
          </label>
          <Select
            options={options.languages}
            onChange={(selectedOption) =>
              handleSelectChange('language', selectedOption.value)
            }
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: darkMode ? '#333' : '#fcd53f',
              },
            })}
            className={`${darkMode ? 'dark-select' : ''} cursor-pointer`}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Plan My Trip 🎯
        </button>
      </div>
    </div>
  );
}

export default TripPlanner;
