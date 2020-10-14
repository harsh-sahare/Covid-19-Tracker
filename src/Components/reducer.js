export const default_state = {
  country_name: "World Wide",
  case_type: "confirmed"
};

export default function Reducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, country_name: action.value };
    case "SET_CASE_TYPE":
      return { ...state, case_type: action.value };

    default:
      return state;
  }
}
