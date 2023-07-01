import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getApiItems } from "../api/api";
import s from "./Tabl.module.css";

const Tabl = ({
  pacients,
  doctors,
  setPatientsState,
  setDoctorsState,
  setAppointmentsState,
  appointments,
  open,
  setOpen,
  statustable,
  appointmentsstate,
  result,
  resulttable,
  doctorsstate,
  pacientsstate,
  saveNewTimeState,
}) => {
  const [openPreview, setOpenPreview] = useState(false);
  const [idViewCard, setIdViewCard] = useState("");
  const [idInput, setidInput] = useState("");
  const [inputTime, setInputTime] = useState(false);

  const [dataUpdate, setDataUpdate] = useState([]);

  const clickViewCard = (idItmem) => {
    setIdViewCard(idItmem);
    setOpenPreview(true);
  };

  const closeClickViewCard = (idItmem) => {
    setIdViewCard("");
    setOpenPreview(false);
  };

  const clickOpenInput = (idItmem) => {
    setidInput(idItmem);
    setInputTime(true);
  };

  const saveNewTime = (d, idItmem, value) => {
    const t = { ...d, time: value };

    setDataUpdate((prevArray) => [...prevArray, t]);
    saveNewTimeState({ id: idItmem, value: value });
  };

  const clickCloseInput = () => {
    setidInput("");
    setInputTime(false);
  };

  const clickSaveData = () => {
    // const o = appointmentsstate.map(
    //   (f) => `${f.pacient}, ${f.doctor}, ${f.time}`
    // );
    // const n = o.join("\n");
    getApiItems.saveNewData(dataUpdate);
  };

  useEffect(() => {
    getApiItems.getItems().then((data) => {
      statustable(data.statusText);
      setPatientsState(data.data.allPatient);
      setDoctorsState(data.data.allDoctors);
      setAppointmentsState(data.data.dataAppoIntments);
    });
  }, [resulttable]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplate: "1fr/ auto auto",
        gap: "15px",
        padding: "15px",
      }}
    >
      <div class="table-responsive">
        <table>
          <tbody>
            {appointmentsstate
              ? appointmentsstate.map((d) => (
                  <tr>
                    <td
                      className={d.color === "blue" ? "green" : d.color}
                      style={{
                        display: "grid",
                        gridTemplate: "1fr/1fr 1fr 1fr 3fr",
                        justifyContent: "space-between",
                        width: "auto",
                      }}
                    >
                      <span>{d.pacient}</span> <span>{d.doctor}</span>
                      <span>{d.time}</span>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
      <div class="table-responsive" style={{ display: "grid", gap: "20px" }}>
        <table>
          <tbody>
            {appointmentsstate
              ? appointmentsstate.map((d) => (
                  <tr>
                    <td
                      className={d.color}
                      style={{
                        display: "grid",
                        gridTemplate: "1fr/1fr 1fr 1fr 3fr",
                        justifyContent: "space-between",
                        width: "auto",
                        position: "relative",
                      }}
                    >
                      <span>{d.pacient}</span>
                      <span>{d.doctor}</span>
                      {inputTime && idInput === d.id ? (
                        <div>
                          <input
                            type="text"
                            style={{ width: "18px" }}
                            onChange={(e) =>
                              saveNewTime(d, d.id, e.target.value)
                            }
                            value={d.time}
                          ></input>{" "}
                          <span
                            onClick={() => clickCloseInput()}
                            style={{ cursor: "pointer" }}
                          >
                            save
                          </span>
                        </div>
                      ) : (
                        <span onClick={() => clickOpenInput(d.id)}>
                          {" "}
                          {d.time}{" "}
                        </span>
                      )}
                      <span>
                        <button onClick={() => clickViewCard(d.id)}>
                          View Card
                        </button>
                      </span>
                      {openPreview &&
                      d.id === idViewCard &&
                      (d.color === "green" || d.color === "blue") ? (
                        <div
                          style={{
                            position: "absolute",
                            border: "1px solid #000",
                            width: "200px",
                            height: "auto",
                            backgroundColor: "#fff",
                            right: "30px",
                            top: "25px",
                            zIndex: "200",
                            padding: "5px",
                          }}
                        >
                          <div
                            onClick={() => closeClickViewCard()}
                            style={{
                              display: "grid",
                              justifyItems: "end",
                              paddingRight: "10px",
                              cursor: "pointer",
                            }}
                          >
                            X
                          </div>
                          <div
                            style={{
                              display: "grid",
                              justifyItems: "start",
                              paddingLeft: "20px",
                              paddingBottom: "20px",
                            }}
                          >
                            <div>Patient: {d.pacient}</div>
                            <div>Doctor: {d.doctor}</div>
                            <div>Appointment: {d.time}</div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>

        <button
          onClick={() => clickSaveData()}
          style={{
            width: "200px",
            height: "30px",
            display: "grid",
            justifySelf: "end",
            alignItems: "center",
          }}
        >
          Save Data
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPatientsState: (data) => dispatch({ type: "PACIENTSSTATE", text: data }),
    setDoctorsState: (data) => dispatch({ type: "DOCTORSSTATE", text: data }),
    setAppointmentsState: (data) =>
      dispatch({ type: "APPOINTMENTSSTATE", text: data }),
    status: (data) => dispatch({ type: "STATUS", text: data }),
    statustable: (data) => dispatch({ type: "STATUSTABLE", text: data }),
    saveNewTimeState: (data) => dispatch({ type: "NEWTIME", text: data }),
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(Tabl);
