import React from "react";

import SelectBox from "../select-box";

const filters = [
  {
    id: 1,
    name: "name"
  },
  {
    id: 2,
    name: "lowest price"
  },
  {
    id: 3,
    name: "highest price"
  }
];

export default function SelectHotel({ state, setState }) {
  console.log(state);

  function handleSort(param) {
    console.log("param", param);
    switch (param) {
      case "name":
        console.log("name", state.hotels.sort());
        return state.hotels.sort();
        break;
      case "lowest price":
        return state.hotels.sort(
          (a, b) => a.lowestAveragePrice.amount - b.lowestAveragePrice.amoun
        );
        break;
      case "highest price":
        state.hotels.sort(
          (a, b) => b.lowestAveragePrice.amount - a.lowestAveragePrice.amoun
        );
        break;
    }
  }

  function submitSort(e) {
    e.preventDefault();
    setState(prev => ({
      ...prev,
      hotels: handleSort(prev.filter[0].name)
    }));
  }

  function handleChange(value, formName) {
    setState(prev => ({
      ...prev,
      [formName]: value
    }));
  }

  return (
    <div className="select-hotel-container">
      <div className="content">
        <div className="filters">
          <SelectBox
            options={filters}
            defaultValue={filters.filter(f => f.id === state.filter)}
            value={state.filter}
            onChange={values => handleChange(values, "filter")}
          />

          <button onClick={submitSort}>sort</button>
        </div>
        <div className="hotel-list">
          {state.hotels.map((hotel, i) => (
            <div className="hotel" key={i}>
              <img
                src={hotel.hotelStaticContent.mainImage.url}
                className="photo"
              />
              <div className="details">
                <div>{hotel.hotelStaticContent.name}</div>
                <div>{hotel.hotelStaticContent.neighborhoodName}</div>
              </div>
              <div className="price">
                {hotel.lowestAveragePrice.symbol +
                  hotel.lowestAveragePrice.amount}
                <br />
                {"Rewards Miles: " + hotel.rewards.miles}
                <br />
                <button>Select</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
