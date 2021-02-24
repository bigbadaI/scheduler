import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  //Used for updating the day count in booking interview
  function updateSpots(day, days, appointments) {

    let spots = 0;
    const dayObj = days.find(d => d.name === day);

    const appId = dayObj.appointments
    for (const i of appId) {
      const appoinment = appointments[i];
      if (!appoinment.interview) {
        spots++
      }
    }

    const newDayObj = { ...dayObj, spots };
    const newArray = days.map(item => item.name === day ? newDayObj : item);
    return newArray;
  };

  //makes api call to delete an interview
  function cancelInterview(id) {

    const url = `/api/appointments/${id}`

    return axios.delete(url)
      .then(() => {
        let num = state.days[0].spots
        num++
        state.days[0].spots = num
        reRender()
        setState({
          ...state
        })
      })
  }

  //makes an api call to book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const url = `/api/appointments/${id}`
    return axios.put(url, appointment)
      .then((res) => {
        const days = updateSpots(state.day, state.days, appointments)
        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  //renders the page
  useEffect(() => {
    reRender()
  }, [])

  //used for rendering the page and refreshing after cancelling an appointment
  function reRender() {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
    return
  };
  return {
    cancelInterview,
    bookInterview,
    state,
    setDay
  }
}
