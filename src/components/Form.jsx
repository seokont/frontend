import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getApiItems } from "../api/api";
import Modal from "../modal/Modal.jsx";

const Form = ({
  pacients,
  setPatients,
  setDoctors,
  setAppointments,
  increment,
  decrement,
  appointments,
  doctors,
  setPatientsState,
  setAppointmentsState,
  setDoctorsState,
  status,
  result,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (result === "OK") {
      setOpen(true);
    }
  }, [result]);

  
  const onChangeDataPatients = (e) => {
    setPatients(e.target.value);
  };

  const onChangeDataDoctors = (e) => {
    setDoctors(e.target.value);
  };

  const onChangeDataAppointments = (e) => {
    setAppointments(e.target.value);
  };

  const clickButtonSend = () => {
    getApiItems
      .getItemsForApi({
        pacients: pacients,
        doctors: doctors,
        appointments: appointments,
      })
      .then((data) => {
        if (data.statusText === "OK") {
          setPatientsState(data.data.allPatient);
          setDoctorsState(data.data.allDoctors);
          setAppointmentsState(data.data.appoIntments);
          status(data.statusText);
          // setOpen(true);
        }
      });
  };

  const clickButtonDelete = () => {
    getApiItems.clearDb();
    decrement();
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplate: "1fr/1fr 1fr 1fr",
          gap: "20px",
          margin: "20px 20px 0 20px",
        }}
      >
        <div style={{ width: "100%" }}>
          <p>Patients</p>
          <textarea
            onChange={onChangeDataPatients}
            style={{ height: "400px", width: "100%" }}
          ></textarea>
        </div>
        <div style={{ width: "100%" }}>
          <p>Doctors</p>
          <textarea
            onChange={onChangeDataDoctors}
            style={{ height: "400px", width: "100%" }}
          ></textarea>
        </div>
        <div style={{ width: "100%" }}>
          <p>Appointments</p>
          <textarea
            onChange={onChangeDataAppointments}
            style={{ height: "400px", width: "100%" }}
          ></textarea>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplate: "1fr/200px 200px ",
          gap: "20px",
          margin: "20px 20px 0 20px",
        }}
      >
        <button onClick={clickButtonSend}>Send Data</button>
        <button onClick={clickButtonDelete}>Clear DB</button>
      </div>

      <Modal open={open} setOpen={setOpen} status={status} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pacients: state.counter.pacients,
    doctors: state.counter.doctors,
    appointments: state.counter.appointments,
    result: state.counter.result,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPatients: (e) => dispatch({ type: "PACIENTS", text: e }),
    setDoctors: (e) => dispatch({ type: "DOCTORS", text: e }),
    setAppointments: (e) => dispatch({ type: "APPOINTMENTS", text: e }),
    setPatientsState: (data) => dispatch({ type: "PACIENTSSTATE", text: data }),
    setDoctorsState: (data) => dispatch({ type: "DOCTORSSTATE", text: data }),
    setAppointmentsState: (data) =>
      dispatch({ type: "APPOINTMENTSSTATE", text: data }),

    decrement: (e) => dispatch({ type: "DECREMENT" }),
    status: (data) => dispatch({ type: "STATUS", text: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
