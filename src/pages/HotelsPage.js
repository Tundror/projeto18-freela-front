import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext.js";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import Slider from "rc-slider";

export default function HotelsPage() {
    const { setCityId } = useContext(UserContext);
    const [hotels, setHotels] = useState([]);
    const { id } = useParams();
    const [priceRange, setPriceRange] = useState([0, 300]);
    useEffect(() => {

        localStorage.setItem('cityId', id);
        const storedCityId = localStorage.getItem('cityId');
        setCityId(storedCityId)
        const initialUrl = process.env.REACT_APP_API_URL
        const url = `${initialUrl}/hotels/${storedCityId}`;
        async function fetchHotels() {
            try {
                const response = await axios.get(url);
                console.log(response.data)
                setHotels(response.data);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        }

        fetchHotels();
    }, []);
    return (
        <MainContainer>
            <Header>Viagens Alucinantes</Header>
            <p>Preço: R$ {priceRange[0]} - R$ {priceRange[1]}</p>
            <PriceSliderContainer><Slider
                range
                min={0}
                max={300}
                defaultValue={[0, 300]}
                onChange={setPriceRange}
            /></PriceSliderContainer>

            <Title>Aqui estão os hotéis na cidade de {hotels[0]?.city}</Title>
            <HotelsContainer>
                {hotels
                    .filter((hotel) => hotel.day_price >= priceRange[0] && hotel.day_price <= priceRange[1])
                    .map((hotel) => (
                        <Link to={`/hotels/selected/${hotel.id}`} key={hotel.id}>
                            <HotelCard key={hotel.id}>
                                <Image src={hotel.image} alt={hotel.name} />
                                <p>Nome: {hotel.name}</p>
                                <p>Preço por dia: R$ {hotel.day_price}</p>
                            </HotelCard>
                        </Link>
                    ))}
            </HotelsContainer>
        </MainContainer>
    );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("https://img.freepik.com/premium-photo/backpack-asian-man-mountain-see-view-panorama-beautiful-nature-landscape-sea-adventure-vacation-travel-leisure-asia-mu-ko-ang-thong-island-national-park-background-thailand_536080-1002.jpg?w=2000");
  background-size: cover;
  background-position: center;
`;

const PriceSliderContainer = styled.div`
  width: 500px;
  margin-bottom: 20px;
  .custom-slider {
    width: 100%;
  }
`;

const Image = styled.img`
    width:200px;
    height: 200px;
    margin-bottom: 5px;
`

const HotelCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  min-width: 200px;
  max-width: 500px;
  min-height:100px;
  margin: 10px;
  p{
    margin-bottom: 5px;
  }
`;

const HotelsContainer = styled.div`
    display: flex;
    width: 80%;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
`
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