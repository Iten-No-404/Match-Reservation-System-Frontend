import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './Tickets.css'

const Tickets = () => {
  // dummy list of tickets
  const tickets = [
  {
    id: 1,
    price: 100,
    row: 1,
    seat: 1,
    level: 1,
    seat_id: 1,
    match_id: 1
  },
  {
    id: 2,
    price: 100,
    row: 1,
    seat: 2,
    level: 1,
    seat_id: 2,
    match_id: 2
  }]

  // dummy list of matches
  const matches = [
    {
      "tid1": 1,
      "tid2": 2,
      "lineman2": "Alessandro Giallatini",
      "lineman1": "Ciro Carbone",
      "mainreferee": "Daniele Orsato",
      "startdate": "2022-12-20",
      "starttime": "19:00:00",
      "endtime": "21:00:00",
      "round": 32,
      "staduim_name": "Al Bayt Stadium",
      "team1": "Qatar",
      "team2": "Ecuador",
      "group1": "a",
      "group2": "a",
      "match_id": 1,
      "sid": 1,
      "mytickets": [
          {
              "id": 1,
              "price": 3.5,
              "row": 3,
              "seat": 7,
              "level": 5,
              "sid": 1,
              "match_id": 1
          }
      ]
    }
  ]

  const mockGetMatchFromTicket = (ticketId) => {
    return matches.find((match) => match.mytickets.find((ticket) => ticket.id === ticketId))
  }

  // const getMatchFromTicket = (ticketId) => {
  //   axios.get(`${BASE_URL}/get_match_with_ticket_as_fan/${ticketId}`)
  //   .then((res) => {
  //     console.log(res.data)
  //     return res.data
  //   })
  // }

  const match = mockGetMatchFromTicket(1)

  return ( 
    <div className="tickets">
      <h1>Tickets</h1>
      <div className="tickets-list">
        {tickets.map((ticket) => (
          <Card className='card'>
            <Card.Body>
              <Card.Title className='card-title'>{match.team1} vs. {match.team2} </Card.Title>
              <Card.Subtitle className="text-dark">Price: {ticket.price}</Card.Subtitle>
              <Card.Text className='card-text'>
                Row: {ticket.row} Seat: {ticket.seat} Level: {ticket.level}
              </Card.Text>
              {/* this button should refund the ticket given the required conditions */}
              {/* <Button variant="dark">Return</Button> */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
   );
}
 
export default Tickets;
