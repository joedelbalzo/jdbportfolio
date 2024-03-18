import axios from "axios";

const scriptMerches = (state = [], action) => {
  if (action.type === "SET_MERCHES") {
    return action.merches;
  }
  if (action.type === "CREATE_MERCH") {
    return [action.merch, ...state];
  }
  if (action.type === "EDIT_MERCH") {
    state = state.map((merch) => {
      if (merch.id === action.merch.id) {
        return action.merch;
      }
      return merch;
    });
  }
  if (action.type === "DELETE_MERCH") {
    return state.filter((_merch) => _merch.id !== action.merch.id);
  }
  return state;
};

export const scriptFetchMerches = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/script/merches");
    dispatch({ type: "SET_MERCHES", merches: response.data });
  };
};
export const scriptCreateMerch = (merch) => {
  return async (dispatch) => {
    const response = await axios.post(`api/script/merches`, merch);
    dispatch({ type: "CREATE_MERCH", merch: response.data });
  };
};
export const scriptEditMerch = (merch) => {
  return async (dispatch) => {
    const response = await axios.put(`api/script/merches/${merch.id}`, merch);
    dispatch({ type: "EDIT_MERCH", merch: response.data });
  };
};
export const scriptDeleteMerch = (merch) => {
  return async (dispatch) => {
    await axios.delete(`api/script/merches/${merch.id}`);
    dispatch({ type: "DELETE_MERCH", merch });
  };
};

export default scriptMerches;
