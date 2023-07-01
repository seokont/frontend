// Инициальное состояние
const initialState = {
  pacients: "",
  pacientsstate: "",
  doctorsstate: "",
  appointmentsstate: "",
  doctors: "",
  appointments: "",
  result: "",
  resultfortabl: "",
};

// Редюсер (Reducer)
export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PACIENTS":
      return { ...state, pacients: action.text };
    case "PACIENTSSTATE":
      return { ...state, pacientsstate: action.text };
    case "DOCTORSSTATE":
      return { ...state, doctorsstate: action.text };
    case "APPOINTMENTSSTATE":
      return { ...state, appointmentsstate: action.text };
    case "DOCTORS":
      return { ...state, doctors: action.text };
    case "APPOINTMENTS":
      return { ...state, appointments: action.text };
    case "DECREMENT":
      return { ...state, appointments: "", pacients: "", doctors: "" };
    case "STATUS":
      return { ...state, result: action.text };
    case "STATUSTABLE":
      return { ...state, resultfortabl: action.text };

    case "NEWTIME":
      return {
        ...state,
        appointmentsstate: [
          ...state.appointmentsstate.map((g) => {            
            if (action.text.id === g.id) {
              return { ...g, time: action.text.value, color: 'blue' };
            } else return {...g}
          }),
        ],
      };
    default:
      return state;
  }
};
