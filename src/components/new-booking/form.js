import React from "react";

import axios from "axios";

import SelectBox from "../select-box";
import DatePicker from "../date-picker";
import { tsPropertySignature } from "@babel/types";

const locations = [
  {
    id: 1,
    name: "Alsip"
  },
  {
    id: 2,
    name: "Bedford Park"
  },
  {
    id: 3,
    name: "Chicago"
  },
  {
    id: 4,
    name: "Des Plaines"
  },
  {
    id: 5,
    name: "Lincolnshire"
  },
  {
    id: 6,
    name: "Naperville"
  },
  {
    id: 7,
    name: "Rosemont"
  }
];

const rewards = [
  {
    id: 1,
    name: "United MileagePlus"
  },
  {
    id: 2,
    name: "Southwest Rapid Rewards"
  }
];

const guests = [
  {
    id: 1,
    name: "1 Guest"
  },
  {
    id: 2,
    name: "2 Guests"
  },
  {
    id: 3,
    name: "3 Guests"
  },
  {
    id: 4,
    name: "4 Guests"
  },
  {
    id: 5,
    name: "5 Guests"
  }
];

const rooms = [
  {
    id: 1,
    name: "1 Room"
  },
  {
    id: 2,
    name: "2 Rooms"
  },
  {
    id: 3,
    name: "3 Rooms"
  }
];

export default function Form({ state, setState }) {
  function handleSubmit(e) {
    const formData = ["location", "reward", "from", "to", "guests", "rooms"];
    e.preventDefault();
    const keys = Object.keys(state);
    for (let i = 0; i < keys.length; i++) {
      if (formData.includes(keys[i]) && !state[keys[i]]) {
        alert(`${keys[i]} cannot be empty`);
        return;
      }
    }
    axios
      .get("https://homework-app.rocketmiles.com/fe-homework/rates")
      .then(({ data }) => {
        let { hotels } = data.results;

        hotels = hotels.filter(
          hotel =>
            hotel.hotelStaticContent.address.city.toLowerCase() ===
            state.location[0].name.toLowerCase()
        );

        setState(prev => ({
          ...prev,
          step: prev.step + 1,
          hotels: hotels
        }));
      })
      .catch(error => {
        alert(error.message);
      });
  }
  function handleChange(value, formName) {
    setState(prev => ({
      ...prev,
      [formName]: value
    }));
  }
  return (
    <form>
      <div className="container">
        <div className="new-booking-container">
          <div className="first-row">
            <div className="locations">
              <SelectBox
                options={locations}
                placeholder="Please select a location"
                value={state.location}
                onChange={values => handleChange(values, "location")}
              />
            </div>
            <div className="rewards">
              <SelectBox
                options={rewards}
                placeholder="Please select a reward program"
                value={state.reward}
                onChange={values => handleChange(values, "reward")}
              />
            </div>
          </div>
          <div className="second-row">
            <div className="start-date">
              <DatePicker
                selected={state.from}
                onChange={date => handleChange(date, "from")}
                dateFormat="MM/DD/YYYY"
              />
            </div>
            <div className="end-date">
              <DatePicker
                selected={state.to}
                onChange={date => handleChange(date, "to")}
                dateFormat="MM/DD/YYYY"
              />
            </div>
            <div className="guests">
              <SelectBox
                options={guests}
                defaultValue={guests.filter(guest => guest.id === state.guests)}
                onChange={values => handleChange(values, "guests")}
              />
            </div>
            <div className="rooms">
              <SelectBox
                options={rooms}
                defaultValue={rooms.filter(room => room.id === state.rooms)}
                onChange={values => handleChange(values, "rooms")}
              />
            </div>
          </div>
          <div className="btn-container">
            <button className="submit-button" onClick={handleSubmit}>
              Search properties and earn rewards
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
