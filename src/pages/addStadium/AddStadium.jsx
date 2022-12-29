import { useState } from "react";
import "./AddStadium.css";

// info for a stadium
/* 
    {
  "staduim_name": "cairol",
  "n_seats": 5,
  "address": "5wadi",
  "shape": 5,
  "location": "cairo"
    }
*/

const AddStadium = () => {
    const [stadium_name, setStadiumName] = useState("");
    const [seatNum, setSeatNum] = useState("");
    const [address, setAddress] = useState("");
    const [shape, setShape] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const stadium = { stadium_name, seatNum, address, shape, location };
        console.log(stadium);
        // axios.post(`${BASE_URL}/add_stadium`, stadium)
    }

    return ( 
        <div className="add-stadium">
            <h2>Add a new Stadium</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" required value={stadium_name} onChange={(e) => setStadiumName(e.target.value)}/>
                <label>Number of seats</label>
                <input type="number" required value={seatNum} onChange={(e) => setSeatNum(e.target.value)}/>
                <label>Address</label>
                <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)}/>
                <label>Shape</label>
                <input type="text" required value={shape} onChange={(e) => setShape(e.target.value)}/>
                <label>Location</label>
                <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)}/>
                <button type='submit'>Add Stadium</button>
            </form>
        </div> 
    );
}
 
export default AddStadium;