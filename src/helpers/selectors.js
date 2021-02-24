


function getAppointmentsForDay(state, day) {
  let results = []
  for (let i = 0; i < state.days.length; i++) {
    const element = state.days[i];
    if (element.name === day) {
      let childArr = element.appointments
      for (let j = 0; j < childArr.length; j++) {
        const e = childArr[j];
        results.push(state.appointments[e])
      }
    }
  }
  return results
}

function getInterview(state, interview) {
  if (interview === null) return null;
  let tempInterview = state.interviewers[interview.interviewer]
  let results = {student: interview.student, interviewer: tempInterview}
  // console.log(results)
  return results
}

function getInterviewersForDay(state, day) {
  let results = []
  for (let i = 0; i < state.days.length; i++) {
    const element = state.days[i];
    if (element.name === day) {
      let childArr = element.interviewers
      for (let j = 0; j < childArr.length; j++) {
        const e = childArr[j];
        results.push(state.interviewers[e])
      }
    }
  }
  // console.log(results)
  return results
}

module.exports = {
  getInterview,
  getAppointmentsForDay,
  getInterviewersForDay
}