import React, { useReducer } from "react";
import BootcampContext from "./bootcampContext";
import BootcampReducer from "./bootcampReducer";
import axios from "axios";
import {
  SET_LOADING,
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  BOOTCAMP_UPDATE,
  BOOTCAMP_CREATE,
  BOOTCAMP_DELETE,
  FILTERED_BOOTCAMP,
  CLEAR_FILTER,
  BOOTCAMP_PHOTO,
  SET_CURRENT,
  CLEAR_CURRENT,
  BOOTCAMP_ERROR,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  CLEAR_BOOTCAMPS,
  CLEAR_BOOTCAMP,
  ADD_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  CURRENT_COURSE,
  CLEAR_CURRENTCOURSE,
  COURSE_ERROR,
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  GET_REVIEWS,
  CLEAR_REVIEWS,
  GETBOOTCAMP_REVIEWS,
  CLEARBOOTCAMP_REVIEWS,
  SET_CURRENTREVIEW,
  CLEAR_CURRENTREVIEW,
  REVIEW_ERROR
} from "../type";

const BootcampState = props => {
  const initialState = {
    bootcamps: [],
    bootcamp: null,
    currentBootcamp: null,
    courses: [],
    currentCourse: null,
    reviews: [],
    bootcampReviews: null,
    currentReview: null,
    image: null,
    filtered: null,
    count: null,
    pagination: null,
    loading: false,
    success: false,
    error: null
  };

  const [state, dispatch] = useReducer(BootcampReducer, initialState);

  //   Methods

  //Bootcamps
  //Get all bootcamps
  const getBootcamps = async (page = 1, limit = 4) => {
    setLoading();

    try {
      const res = await axios.get(
        `/api/v1/bootcamps?limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_BOOTCAMPS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOTCAMP_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Get a particular bootcamp
  const getBootcamp = async id => {
    setLoading();

    try {
      const res = await axios.get(`/api/v1/bootcamps/${id}`);
      dispatch({
        type: GET_BOOTCAMP,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOTCAMP_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Create a new bootcamp
  const addBootcamp = async formData => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/v1/bootcamps", formData, config);
      dispatch({
        type: BOOTCAMP_CREATE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOTCAMP_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Update a bootcamp
  const updateBootcamp = async (formData, bootcampId) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/v1/bootcamps/${bootcampId}`,
        formData,
        config
      );

      dispatch({
        type: BOOTCAMP_UPDATE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOTCAMP_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Upload bootcamp image
  const uploadImage = async (file, bootcampId) => {
    setLoading();
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    try {
      const res = await axios.put(
        `/api/v1/bootcamps/${bootcampId}/photo`,
        formData,
        config
      );
      dispatch({
        type: BOOTCAMP_PHOTO,
        payload: {
          response: res.data,
          id: bootcampId
        }
      });
    } catch (err) {
      dispatch({
        type: BOOTCAMP_ERROR,
        payload: err.response.data.error
      });
    }
  };

  const filterBootcamp = async (zipcode, searchRad) => {
    setLoading();
    try {
      const res = await axios.get(
        `/api/v1/bootcamps/radius/${zipcode}/${searchRad}`
      );
      dispatch({
        type: FILTERED_BOOTCAMP,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOTCAMP_ERROR,
        payload: err.response.data.error
      });
    }
  };

  const selectBootcamp = async (averageRating, averageCost) => {
    setLoading();
    try {
      const res = await axios.get(
        `/api/v1/bootcamps?averageRating[gte]=${averageRating}&averageCost[lte]=${averageCost}`
      );

      dispatch({
        type: FILTERED_BOOTCAMP,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOOTCAMP_ERROR,
        payload: err.response.data.error
      });
    }
  };

  const clearFiltered = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  //Delete bootcamp
  const deleteBootcamp = async bootcampId => {
    setLoading();
    try {
      await axios.delete(`/api/v1/bootcamps/${bootcampId}`);
      dispatch({
        type: BOOTCAMP_DELETE,
        payload: bootcampId
      });
    } catch (err) {
      dispatch({
        type: BOOTCAMP_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Set personal bootcamp to currentbootcamp state
  const setCurrent = bootcamp => {
    dispatch({
      type: SET_CURRENT,
      payload: bootcamp
    });
  };

  //Clear personal bootcamp from currentbootcamp state
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  //Clear errors
  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    });
  };

  //Set Loading
  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };

  //Clear Success. This is used to effectively manage the Alert System.
  const clearSuccess = () => {
    dispatch({
      type: CLEAR_SUCCESS
    });
  };

  //Clear individual bootcamp after page visit
  const clearBootcamp = () => {
    dispatch({
      type: CLEAR_BOOTCAMP
    });
  };

  //Clear bootcamp on logout
  const clearBootcamps = () => {
    dispatch({
      type: CLEAR_BOOTCAMPS
    });
  };

  // Courses

  //Add a new course associated with a bootcamp
  const addCourse = async (formData, bootcampId) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(
        `/api/v1/bootcamps/${bootcampId}/courses`,
        formData,
        config
      );
      dispatch({
        type: ADD_COURSE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Update a course
  const updateCourse = async (formData, courseId) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/v1/courses/${courseId}`,
        formData,
        config
      );
      dispatch({
        type: UPDATE_COURSE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Delete a course
  const deleteCourse = async courseId => {
    setLoading();
    try {
      await axios.delete(`/api/v1/courses/${courseId}`);
      dispatch({
        type: DELETE_COURSE,
        payload: courseId
      });
    } catch (err) {
      dispatch({
        type: COURSE_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Add current course to the currentCourse state, to dynamically edit or delete
  const addCurrentCourse = course => {
    dispatch({
      type: CURRENT_COURSE,
      payload: course
    });
  };

  //clear current course from the state after each edit or delete
  const clearCurrentCourse = () => {
    dispatch({
      type: CLEAR_CURRENTCOURSE
    });
  };

  //Reviews
  //Get all reviews
  const getReviews = async () => {
    setLoading();
    try {
      const res = await axios.get("/api/v1/reviews");
      dispatch({
        type: GET_REVIEWS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.error
      });
    }
  };

  // Clear all reviews
  const clearReviews = () => {
    dispatch({
      type: CLEAR_REVIEWS
    });
  };

  //Get all reviews for a particular bootcamp
  const getBootcampReviews = async bootcampId => {
    setLoading();
    try {
      const res = await axios.get(`/api/v1/bootcamps/${bootcampId}/reviews`);
      dispatch({
        type: GETBOOTCAMP_REVIEWS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.error
      });
    }
  };

  const clearBootcampReviews = () => {
    dispatch({
      type: CLEARBOOTCAMP_REVIEWS
    });
  };

  //add review
  const addReview = async (formData, bootcampId) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post(
        `/api/v1/bootcamps/${bootcampId}/reviews`,
        formData,
        config
      );
      dispatch({
        type: ADD_REVIEW,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Update reviews
  const updateReview = async (formData, reviewId) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        `/api/v1/reviews/${reviewId}`,
        formData,
        config
      );
      dispatch({
        type: UPDATE_REVIEW,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Delete reviews
  const deleteReviews = async reviewId => {
    setLoading();
    try {
      await axios.delete(`/api/v1/reviews/${reviewId}`);
      dispatch({
        type: DELETE_REVIEW,
        payload: reviewId
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Add current review to the current review state, to dynamically edit
  const addCurrentReview = review => {
    dispatch({
      type: SET_CURRENTREVIEW,
      payload: review
    });
  };

  //clear current review from the state after each edit
  const clearCurrentReview = () => {
    dispatch({
      type: CLEAR_CURRENTREVIEW
    });
  };

  return (
    <BootcampContext.Provider
      value={{
        bootcamps: state.bootcamps,
        bootcamp: state.bootcamp,
        currentBootcamp: state.currentBootcamp,
        courses: state.courses,
        currentCourse: state.currentCourse,
        reviews: state.reviews,
        bootcampReviews: state.bootcampReviews,
        currentReview: state.currentReview,
        image: state.image,
        filtered: state.filtered,
        count: state.count,
        pagination: state.pagination,
        loading: state.loading,
        error: state.error,
        success: state.success,
        getBootcamps,
        getBootcamp,
        addBootcamp,
        updateBootcamp,
        deleteBootcamp,
        filterBootcamp,
        selectBootcamp,
        uploadImage,
        clearFiltered,
        setCurrent,
        clearCurrent,
        clearError,
        clearSuccess,
        clearBootcamps,
        clearBootcamp,
        addCourse,
        updateCourse,
        deleteCourse,
        addCurrentCourse,
        clearCurrentCourse,
        getReviews,
        clearReviews,
        getBootcampReviews,
        clearBootcampReviews,
        addReview,
        updateReview,
        deleteReviews,
        addCurrentReview,
        clearCurrentReview
      }}
    >
      {props.children}
    </BootcampContext.Provider>
  );
};

export default BootcampState;
