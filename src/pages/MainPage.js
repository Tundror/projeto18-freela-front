import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { UserContext } from '../contexts/userContext.js';
import { useNavigate } from 'react-router-dom';


export default function MainPage() {
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState('');
    const [citiesList, setCitiesList] = useState([]);
    const [formattedCities, setFormattedCities] = useState([]);
    const { setCityId } = useContext(UserContext);
    const url = 'http://localhost:5000/cities';
  
    useEffect(() => {
      const promise = axios.get(url);
      promise
        .then((response) => {
          setCitiesList(response.data);
          const data = response.data.map(
            (city) => `${city.city} - ${city.state}`
          );
          setFormattedCities(data);
        })
        .catch((error) => console.log('erro', error.response));
    }, []);
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
      console.log(event.target.value);
    };
  
    const handleSearch = () => {
      const selectedCity = citiesList.find(
        (city) => `${city.city} - ${city.state}` === selectedOption
      );
      if (selectedCity) {
        setCityId(selectedCity.id);
        localStorage.setItem('cityId', selectedCity.id);
        navigate(`/tickets/${selectedCity.id}`)
      }
    };
  
    return (
      <MainContainer>
        <Header>Viagens Alucinantes</Header>
        <Title>Selecione uma cidade</Title>
        <CityDropdown value={selectedOption} onChange={handleOptionChange}>
          <option value="">Selecione uma opção</option>
          {formattedCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </CityDropdown>
        <SearchButton onClick={handleSearch}>Buscar passagens</SearchButton>
      </MainContainer>
    );
  }

  const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://img.freepik.com/premium-photo/backpack-asian-man-mountain-see-view-panorama-beautiful-nature-landscape-sea-adventure-vacation-travel-leisure-asia-mu-ko-ang-thong-island-national-park-background-thailand_536080-1002.jpg?w=2000');
  background-size: cover;
  background-position: center;
`;

const Header = styled.header`
  position: fixed;
  display:flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #f3f7fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  color: #333;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  color: #333;
  font-weight: bold;
`;

const CityDropdown = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  background-color: #fff;
  color: #333;
  font-family: 'Roboto', sans-serif;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Lato', sans-serif;

  &:hover {
    background-color: #0056b3;
  }
`;