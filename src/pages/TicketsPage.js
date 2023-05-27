import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext.js";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import dayjs from "dayjs";

export default function TicketsPage() {
    const { cityId } = useContext(UserContext);
    const [tickets, setTickets] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        
        localStorage.setItem('cityId', id);
        const storedCityId = localStorage.getItem('cityId');
        const url = `http://localhost:5000/tickets/${storedCityId}`;
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
    }, [cityId]);

    return (
        <MainContainer>
            <Header>Viagens Alucinantes</Header>
            <Title>Selecione uma passagem</Title>
            <TicketsContainer>
                {tickets.map((ticket) => (

                    <TicketCard key={ticket.id}>
                        <p>Departure: {ticket.departure_city}</p>
                        <p>Destination: {ticket.destination_city}</p>
                        <p>Date: {dayjs(ticket.time).format("DD/MM/YYYY")}</p>
                        <p>Time: {dayjs(ticket.time).format("HH:mm")}</p>
                        <p>Price: R$ {ticket.price}</p>
                        <p>Company: {ticket.company}</p>
                    </TicketCard>
                ))}
            </TicketsContainer>
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
  width: 200px;
  height:100px;
  margin: 10px;
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