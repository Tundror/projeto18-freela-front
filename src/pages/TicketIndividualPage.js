import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext.js";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import "rc-slider/assets/index.css";
import { useNavigate } from 'react-router-dom';


export default function TicketsIndividualPage() {
    const { cityId } = useContext(UserContext);
    const { setTicketId } = useContext(UserContext);
    const [tickets, setTickets] = useState([]);
    const [priceRange] = useState([0, 200]);
    const { id } = useParams();
    const navigate = useNavigate()
    useEffect(() => {

        localStorage.setItem('ticketId', id);
        const storedTicketId = localStorage.getItem('ticketId');
        setTicketId(storedTicketId)
        const url = `http://localhost:5000/tickets/selected/${storedTicketId}`;

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
        function confirmTicket(){
            navigate(`/hotels/${cityId}`)
        }

    return (
        <MainContainer>
            <Header>Viagens Alucinantes</Header>

            <Title>Confirme a passagem escolhida</Title>
            <TicketsContainer>
                {tickets
                    .filter((ticket) => ticket.price >= priceRange[0] && ticket.price <= priceRange[1])
                    .map((ticket) => (
                            <TicketCard>
                                <p>Saida: {ticket.departure_city}</p>
                                <p>Destino: {ticket.destination_city}</p>
                                <p>Data: {dayjs(ticket.time).format("DD/MM/YYYY")}</p>
                                <p>Horario: {dayjs(ticket.time).format("HH:mm")}</p>
                                <p>Preco: R$ {ticket.price}</p>
                                <p>Empresa: {ticket.company}</p>
                            </TicketCard>
                    ))}
            </TicketsContainer>
            <SearchButton onClick={confirmTicket}>Confirmar passagem</SearchButton>
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

const TicketCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  height:300px;
  margin: 10px;
  p{
    font-size: 40px;
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