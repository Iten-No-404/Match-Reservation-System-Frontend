import React, { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import axios from 'axios';
import './Tickets.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAuthToken, setAuthToken, setUser } from '../../states/user-slice/user-slice';
import { deleteTicket, getTickets, selectTickets, selectTicketStatus, selectTicketStatusMessage } from '../../states/ticket-slice/ticket-slice';
import { getMatches, selectAllMatches, selectMatchStatus, selectMatchStatusMessage } from '../../states/match-slice/match-slice';

// const Tickets = () => {
function Tickets() {
  // dummy list of tickets
  // const tickets = [
  // {
  //   id: 1,
  //   price: 100,
  //   row: 1,
  //   seat: 1,
  //   level: 1,
  //   seat_id: 1,
  //   match_id: 1
  // },
  // {
  //   id: 2,
  //   price: 100,
  //   row: 1,
  //   seat: 2,
  //   level: 1,
  //   seat_id: 2,
  //   match_id: 2
  // }]

  const [ticketsPending, setTicketsPending] = useState(false);
  const [matchesPending, setmatchesPending] = useState(false);
  const [matchesWithTickets, setMatchesWithTickets] = useState(null);

  const dispatch = useDispatch();
  const authToken = useSelector(selectUserAuthToken);
  const tickets = useSelector(selectTickets)
  const ticketStatus = useSelector(selectTicketStatus);
  const ticketMessage = useSelector(selectTicketStatusMessage);
  const matchStatus = useSelector(selectMatchStatus);
  const matchMessage = useSelector(selectMatchStatusMessage);
  const matches = useSelector(selectAllMatches)
  console.log(tickets);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const authToken2 = localStorage.getItem('authToken');
    if(authToken2) {
      dispatch(setAuthToken(authToken2))
    }
    if (loggedInUser) {
        dispatch(setUser(loggedInUser));
      }
      else
          window.location = '/';
  }, [])

  useEffect(() => {
    console.log("Hi!!!!");
    if(authToken)
      dispatch(getTickets({token: authToken}))
  },[authToken])

  useEffect(() => {
    if(authToken && tickets.length > 0){
      dispatch(getMatches())
      // if (ticketStatus === 'fulfilled' && matchStatus === 'fulfilled') {
        //filter the matches to get the matches that have tickets
        // setMatchesWithTickets(matches.filter((match) => tickets.find((ticket) => ticket.match_id === match.match_id)))
        console.log(matches)
      // }
      // filter the matches to get the matches that have tickets
      // const matchesWithTickets = matches.filter((match) => tickets.find((ticket) => ticket.match_id === match.match_id))
    }
  },[authToken, tickets])

  const handleDelete = (ticketId) => {
    const result = dispatch(deleteTicket({id:ticketId, token:authToken}))
    console.log(result)
    dispatch(getMatches())
    dispatch(getTickets({token: authToken}))
  }

  //get Match from matchesWithTicket using the current ticket id
  // const match = matchesWithTickets.find((match) => match.match_id === ticket.match_id)

  return ( 
    <div className="tickets">
      <h1>Tickets</h1>
      <div className="tickets-list">
        {tickets?.map((ticket) => {
          return (
              <Card key={ticket.id} className='card'>
                <Card.Body>
                  {/* get Match from matchesWithTicket using the current ticket id */}
                  <Card.Title className='card-title'>{(matches?.find((match) => match?.match_id === ticket?.match_id)).team1} vs. {(matches?.find((match) => match?.match_id === ticket?.match_id)).team2} </Card.Title>
                  <Card.Subtitle className="text-dark">Price: {ticket.price}</Card.Subtitle>
                  <Card.Text className='card-text'>
                    Row: {ticket.row} Seat: {ticket.seat} Level: {ticket.level}
                  </Card.Text>
                  {/* this button should refund the ticket given the required conditions */}
                  <button onClick={() => handleDelete(ticket.id)}>Cancel</button>
                </Card.Body>
              </Card>   
        )
           }
          )
        }
      </div>
    </div>
   );
}
 
export default Tickets;
