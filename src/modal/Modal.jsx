import React, { useState } from "react";
import { connect } from "react-redux";
import { getApiItems } from "../api/api";
import s from "./Modal.module.css";
import moment from "moment";

const Modal = ({
  pacients,
  doctors,
  appointments,
  open,
  setOpen,
  status,
  pacientsstate,
  doctorsstate,
}) => {
  const onclickClose = () => {
    setOpen(false);
    status("");
  };

  console.log(open);

  return (
    <div>
      <div
        className={open ? s.App_visib : s.App_no_visib}
        style={{
          display: "grid",
          position: "absolute",
          zIndex: "1000",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: "100%",
          width: "100%",
          top: "0",
          left: "0",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: "1001",
            color: "#fff",
            top: "30px",
            right: "20px",
            fontSize: "30px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={onclickClose}
        >
          X
        </div>

        <div
          style={{
            padding: "10px",
            justifySelf: "center",
            alignSelf: "center",
            zIndex: "1000",
            backgroundColor: "#fff",
            height: "300px",
            maxWidth: "350px",
            width: "100%",
            textAlign: "left",
          }}
        >
          Successful Patients:
          {pacientsstate
            ? pacientsstate.map((d) => (
                <div>
                  {d.type} {d.time} {d.name}{" "}
                  {d.data ? moment(d.data).format("YYYY.MM.DD") : ""}
                </div>
              ))
            : ""}
          Successful Doctors:
          {doctorsstate
            ? doctorsstate.map((d) => (
                <div>
                  {d.type} {d.time} {d.name}{" "}
                  {d.data ? moment(d.data).format("YYYY.MM.DD") : ""}
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pacients: state.counter.pacients,
    doctors: state.counter.doctors,
    doctorsstate: state.counter.doctorsstate,
    appointments: state.counter.appointments,
    appointmentsstate: state.counter.appointmentsstate,
    pacientsstate: state.counter.pacientsstate,
    resulttable: state.counter.statustable,
  };
};

export default connect(mapStateToProps)(Modal);
