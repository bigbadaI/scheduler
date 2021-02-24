import React, {useState} from "react"
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"

export default function Form(props) {
  const [error, setError] = useState("")
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)

  const reset = function(event) {
    setName("")
    setInterviewer(null)
    return;
  }

  //cancells changing an appoinment and clears the input
  const onCancel = function() {
    reset()
    props.onCancel()
  };

  //checks if input is emptpy then if not passes on name and interviwer info
  const onSave = function() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer)
  };


  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" 
    onSubmit={event => event.preventDefault()}
    >
      <input
        className="appointment__create-input text--semi-bold"
        name={name}
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={"Enter Student Name"}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger 
        onClick={onCancel}>Cancel
      </Button>
      <Button 
        confirm onClick={onSave}>Save
      </Button>
    </section>
  </section>
</main>
)
}