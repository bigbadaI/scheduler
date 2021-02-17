import React from "react"
import "components/Appointment/styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"



export default function Appointment(props) {
if (props.interview) {
  // console.log(props)
  return (
  <article className="appoinment">
    <Header time={props.time} />
    <Show interviewer={props.interview.interviewer} student={props.interview.student} />
  </article>
  )
} else {
  return (  
  <article className="appoinment">
    <Header time={props.time} />
    <Empty />
  </article>
  )
}
}