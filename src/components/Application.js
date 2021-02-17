import React, {useState, useEffect} from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment"


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Frank Burns",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];





export default function Application(props) {
  const [days, setDays] = useState([])
  useEffect(() => {
    const testURL = "http://localhost:8001/api/days";
    axios.get(testURL).then(response => {
      console.log(response.data)
      setDays([...response.data])
    });
  }, [])
  let eachApp = appointments.map(appointment => {
    return(
    <Appointment key={appointment.id} {...appointment} />)
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={days}
          // day={day}
          setDays={setDays}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {}
        {eachApp}
      </section>
    </main>
  );
}
