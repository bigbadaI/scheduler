import React from "react";
import "components/InterviewerListItem.scss";
const classname = require ("classnames");

export default function InterviewerListItem(props) {
  const interviewerClass = classname("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected
 }
 )
 const interviewerClass2 = classname("interviewers__item", {
  "interviewers__item--selected": props.selected
}
)
let interviewer = ""
if (props.selected) interviewer = props.name


  return(
    <li className={interviewerClass2} onClick={() => props.setInterviewer(props.name)}>
  <img
    className= {interviewerClass}
    src={props.avatar}
    alt={props.name}
  />
  {interviewer}
</li>
  )
};