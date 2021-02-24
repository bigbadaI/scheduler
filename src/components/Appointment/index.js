import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {
  //consts for different renders
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //passes on info from the form and transitions the page
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE, true));
  };

  //when clicking the delete transition to confirm it
  function appDelete() {
    transition(CONFIRM);
  };

  //after confirmation pass on the the api call to delete and transition the page
  function confirmDelete() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true));

  };

  //Brings up edit for exisiting appoinments
  function edit() {
    transition(EDIT);
  };

  //close error window
  function closeWindow() {
    transition(SHOW);
  };

  return (
    <article className="appoinment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={appDelete}
          onEdit={edit}
        />
      )}
      {mode === CONFIRM && <Confirm
        message="Are you sure you want to delete appoinment?"
        onConfirm={confirmDelete}
        onCancel={() => transition(SHOW)} />}

      {mode === SAVING && 
      <Status message="Saving" />}

      {mode === DELETING && 
      <Status message="Deleting" />}

      {mode === ERROR_SAVE && 
      <Error onClose={closeWindow} />}

      {mode === ERROR_DELETE && 
      <Error onClose={closeWindow} />}

    </article>
  )
};