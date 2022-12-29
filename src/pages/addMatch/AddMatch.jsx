import React from 'react'
import { useState } from 'react'
import './AddMatch.css'

function AddMatch() {
  // info for a match
  /*
    {
      "team1": "Germaun",
      "team2": "USd",
      "startdate": "2000-03-21",
      "starttime": "03:10",
      "endtime": "04:50",
      "staduim_name": "cairol",
      "lineman2": "lls",
      "group1": "c",
      "group2": "d",
      "lineman1": "lls",
      "mainreferee": "lls",
      "round": 5,
      "baseprice": 3.5
    } 
  */

    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [startdate, setStartDate] = useState("");
    const [starttime, setStartTime] = useState("");
    const [endtime, setEndTime] = useState("");
    const [stadium_name, setStadiumName] = useState("");
    const [lineman1, setLineman1] = useState("");
    const [lineman2, setLineman2] = useState("");
    const [group1, setGroup1] = useState("");
    const [group2, setGroup2] = useState("");
    const [mainreferee, setMainReferee] = useState("");
    const [round, setRound] = useState("");
    const [baseprice, setBasePrice] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      const match = { team1, team2, startdate, starttime, endtime, stadium_name, lineman1, lineman2, group1, group2, mainreferee, round, baseprice };
      console.log(match);
      // axios.post(`${BASE_URL}/add_match`, match)
    }

  return (
    <div className='add-match'>
      <h2>Add a New Match</h2>
      <form onSubmit={handleSubmit}>
        <label>Team 1</label>
        <input type='text' name='team1' onChange={(e) => setTeam1(e.target.value)} value={team1}/>
        <label>Team 2</label>
        <input type='text' name='team2' onChange={(e) => setTeam2(e.target.value)} value={team2}/>
        <label>Start Date</label>
        <input type='date' name='startdate' onChange={(e) => setStartDate(e.target.value)} value={startdate}/>
        <label>Start Time</label>
        <input type='time' name='starttime'onChange={(e) => setStartTime(e.target.value)} value={starttime}/>
        <label>End Time</label>
        <input type='time' name='endtime' onChange={(e) => setEndTime(e.target.value)} value={endtime}/>
        <label>Stadium Name</label>
        <input type='text' name='stadium_name' onChange={(e) => setStadiumName(e.target.value)} value={stadium_name}/>
        <label>Lineman 1</label>
        <input type='text' name='lineman1' onChange={(e) => setLineman1(e.target.value)} value={lineman1}/>
        <label>Lineman 2</label>
        <input type='text' name='lineman2' onChange={(e) => setLineman2(e.target.value)} value={lineman2}/>
        <label>Group 1</label>
        <input type='text' name='group1' onChange={(e) => setGroup1(e.target.value)} value={group1}/>
        <label>Group 2</label>
        <input type='text' name='group2' onChange={(e) => setGroup2(e.target.value)} value={group2}/>
        <label>Main Referee</label>
        <input type='text' name='mainreferee' onChange={(e) => setMainReferee(e.target.value)} value={mainreferee} />
        <label>Round</label>
        <input type='number' name='round' onChange={(e) => setRound(e.target.value)} value={round}/>
        <label>Base Price</label>
        <input type='number' name='baseprice' onChange={(e) => setBasePrice(e.target.value)} value={baseprice} />
        <button type='submit' >Add Match</button>
      </form>
    </div>
  )
}

export default AddMatch