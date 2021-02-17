import React from "react";
// const classname = require ("classnames");
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  let eachDay = props.days.map(day => {

    console.log(day)
    return <DayListItem
    key={day.id} 
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  />
  
  })
  return (
    <ul>
      {eachDay}
    </ul>
  )
};