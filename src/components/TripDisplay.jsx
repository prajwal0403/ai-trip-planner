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

function TripDisplay({ data, loading }) {
  return (
    <div>
      <h1 className="text-center text-3xl">⭐️ Your Trip Details ⭐️</h1>

      {loading ? (
        <div
          className="flex items-center justify-center"
          style={{ height: '100vh', width: '100%' }}
        >
          <div className='block'>
            <div style={{marginLeft:'30%'}}>
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
            <div className='m-5'>
              {' '}
              🚗 Hang in there, we're busy crafting the perfect trip for you! 📸
            </div>
          </div>
        </div>
      ) : data.length === 0 ? (
        <div
          style={{ height: '50vh' }}
          className="text-center text-2xl flex items-center justify-center"
        >
          <div> 🌍 Please fill the details to generate your trip 🏞️</div>
        </div>
      ) : (
        <ReactMarkdown className="markdown">{data}</ReactMarkdown>
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
