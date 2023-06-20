import axios from "axios";

const scriptReviews = (state = [], action) => {
  if (action.type === "REQUEST_REVIEWS") {
    return action.reviews;
  }
  if (action.type === "CREATE_REVIEW") {
    return [action.review, ...state];
  }
  if (action.type === "DELETE_REVIEW") {
    return state.filter((_review) => _review.id !== action.review.id);
  }

  return state;
};

export const scriptFetchUserReviews = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/reviews");
    dispatch({ type: "REQUEST_REVIEWS", reviews: response.data });
  };
};

export const scriptCreateReview = (review) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/reviews/", review, {
      headers: {
        authorization: token,
      },
    });

    dispatch({ type: "CREATE_REVIEW", review: response.data });
  };
};

export const scriptDeleteReview = (review) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/reviews/${review.id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "DELETE_REVIEW", review });
  };
};

// export const editReview = (review)=> {
//   return async(dispatch)=> {
//     const response = await axios.put(`/api/reviews/${review.id}`, review);
//     dispatch({type: 'EDIT_REVIEW', review: response.data})
//   };
// };

export default scriptReviews;
