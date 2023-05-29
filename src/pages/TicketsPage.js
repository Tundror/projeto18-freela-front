import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext.js";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";


export default function TicketsPage() {
    const { cityId, setCityId } = useContext(UserContext);
    const [tickets, setTickets] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 200]);
    const { id } = useParams();
    useEffect(() => {

        localStorage.setItem('cityId', id);
        const storedCityId = localStorage.getItem('cityId');
        setCityId(storedCityId)
        const initialUrl = process.env.REACT_APP_API_URL
        const url = `${initialUrl}/tickets/${storedCityId}?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

        async function fetchTickets() {
            try {
                const response = await axios.get(url);
                console.log(response.data)
                setTickets(response.data);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        }

        fetchTickets();
    }, []);

    return (
        <MainContainer>
            <Header>Viagens Alucinantes</Header>
            <p>Preço: R$ {priceRange[0]} - R$ {priceRange[1]}</p>
            <PriceSliderContainer><Slider
                range
                min={0}
                max={200}
                defaultValue={[0, 200]}
                onChange={setPriceRange}
            /></PriceSliderContainer>

            <Title>Selecione uma passagem</Title>
            <TicketsContainer>
                {tickets
                    .filter((ticket) => ticket.price >= priceRange[0] && ticket.price <= priceRange[1])
                    .map((ticket) => (
                        <Link to={`/tickets/selected/${ticket.id}`} key={ticket.id}>
                            <TicketCard>
                                <p>Local de partida: {ticket.departure_city}</p>
                                <p>Data: {dayjs(ticket.time).format("DD/MM/YYYY")}</p>
                                <p>Horario: {dayjs(ticket.time).format("HH:mm")}</p>
                                <p>Preco: R$ {ticket.price}</p>
                            </TicketCard>
                        </Link>
                    ))}
            </TicketsContainer>
        </MainContainer>
    );
}

const PriceSliderContainer = styled.div`
  width: 500px;
  margin-bottom: 20px;
  .custom-slider {
    width: 100%;
  }
`;

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

const TicketCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 200px;
  height:100px;
  margin: 10px;
  p{
    margin-bottom: 10px;
  }
`;

const TicketsContainer = styled.div`
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