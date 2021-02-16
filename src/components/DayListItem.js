import React from "react";
import "components/DayListItem.scss";
const classname = require ("classnames");

export default function DayListItem(props) {
  const dayClass = classname("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
 }
 

)
const formatSpots = function(val) {
  if (val === 0) return "no spots remaining";
  if (val === 1) return "1 spot remaining";
  return `${val} spots remaining`
};
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  )
};