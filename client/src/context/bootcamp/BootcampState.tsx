import React, { useReducer, createContext } from "react";
import axios from "axios";
import BootcampReducer from "./bootcampReducer";
import { StateEnum, Props, BContextProps, Bootcamp } from "../type";

const initialState = {
  bootcamps: [],
  bootcamp: {},
  currentBootcamp: {},
  courses: [],
  currentCourse: {},
  reviews: [],
  bootcampReviews: [],
  currentReview: {},
  image: "",
  filtered: [],
  count: 0,
  pagination: {},
  loading: false,
  success: false,
  error: "",
};

const BootcampContext = createContext<Partial<BContextProps>>({});

const BootcampState: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(BootcampReducer, initialState);

  //   Methods

  //Bootcamps
  //Get all bootcamps
  const getBootcamps = async (page = 1, limit = 4) => {
    setLoading();

    try {
      const res = await axios.get(`/api/v1/bootcamps?limit=${limit}&page=${page}`);
      dispatch({
        type: StateEnum.GET_BOOTCAMPS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.BOOTCAMP_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Get a particular bootcamp
  const getBootcamp = async (id: string) => {
    setLoading();

    try {
      const res = await axios.get(`/api/v1/bootcamps/${id}`);
      dispatch({
        type: StateEnum.GET_BOOTCAMP,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.BOOTCAMP_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Create a new bootcamp
  const addBootcamp = async (formData: Partial<Bootcamp>) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/bootcamps", formData, config);
      dispatch({
        type: StateEnum.BOOTCAMP_CREATE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.BOOTCAMP_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Update a bootcamp
  const updateBootcamp = async (formData: any, bootcampId: any) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/v1/bootcamps/${bootcampId}`, formData, config);

      dispatch({
        type: StateEnum.BOOTCAMP_UPDATE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.BOOTCAMP_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Upload bootcamp image
  const uploadImage = async (file: any, bootcampId: any) => {
    setLoading();
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.put(`/api/v1/bootcamps/${bootcampId}/photo`, formData, config);
      dispatch({
        type: StateEnum.BOOTCAMP_PHOTO,
        payload: {
          response: res.data,
          id: bootcampId,
        },
      });
    } catch (err) {
      dispatch({
        type: StateEnum.BOOTCAMP_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const filterBootcamp = async (zipcode: any, searchRad: any) => {
    setLoading();
    try {
      const res = await axios.get(`/api/v1/bootcamps/radius/${zipcode}/${searchRad}`);
      dispatch({
        type: StateEnum.FILTERED_BOOTCAMP,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.BOOTCAMP_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const selectBootcamp = async (averageRating: any, averageCost: any) => {
    setLoading();
    try {
      const res = await axios.get(
        `/api/v1/bootcamps?averageRating[gte]=${averageRating}&averageCost[lte]=${averageCost}`
      );

      dispatch({
        type: StateEnum.FILTERED_BOOTCAMP,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.BOOTCAMP_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const clearFiltered = () => {
    dispatch({
      type: StateEnum.CLEAR_FILTER,
    });
  };

  //Delete bootcamp
  const deleteBootcamp = async (bootcampId: any) => {
    setLoading();
    try {
      await axios.delete(`/api/v1/bootcamps/${bootcampId}`);
      dispatch({
        type: StateEnum.BOOTCAMP_DELETE,
        payload: bootcampId,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.BOOTCAMP_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Set personal bootcamp to currentbootcamp state
  const setCurrent = (bootcamp: any) => {
    dispatch({
      type: StateEnum.SET_CURRENT,
      payload: bootcamp,
    });
  };

  //Clear personal bootcamp from currentbootcamp state
  const clearCurrent = () => {
    dispatch({
      type: StateEnum.CLEAR_CURRENT,
    });
  };

  //Clear errors
  const clearError = () => {
    dispatch({
      type: StateEnum.CLEAR_ERROR,
    });
  };

  //Set Loading
  const setLoading = () => {
    dispatch({
      type: StateEnum.SET_LOADING,
    });
  };

  //Clear Success. This is used to effectively manage the Alert System.
  const clearSuccess = () => {
    dispatch({
      type: StateEnum.CLEAR_SUCCESS,
    });
  };

  //Clear individual bootcamp after page visit
  const clearBootcamp = () => {
    dispatch({
      type: StateEnum.CLEAR_BOOTCAMP,
    });
  };

  //Clear bootcamp on logout
  const clearBootcamps = () => {
    dispatch({
      type: StateEnum.CLEAR_BOOTCAMPS,
    });
  };

  // Courses

  //Add a new course associated with a bootcamp
  const addCourse = async (formData: any, bootcampId: any) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`/api/v1/bootcamps/${bootcampId}/courses`, formData, config);
      dispatch({
        type: StateEnum.ADD_COURSE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.COURSE_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Update a course
  const updateCourse = async (formData: any, courseId: any) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/v1/courses/${courseId}`, formData, config);
      dispatch({
        type: StateEnum.UPDATE_COURSE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.COURSE_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Delete a course
  const deleteCourse = async (courseId: any) => {
    setLoading();
    try {
      await axios.delete(`/api/v1/courses/${courseId}`);
      dispatch({
        type: StateEnum.DELETE_COURSE,
        payload: courseId,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.COURSE_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Add current course to the currentCourse state, to dynamically edit or delete
  const addCurrentCourse = (course: any) => {
    dispatch({
      type: StateEnum.CURRENT_COURSE,
      payload: course,
    });
  };

  //clear current course from the state after each edit or delete
  const clearCurrentCourse = () => {
    dispatch({
      type: StateEnum.CLEAR_CURRENTCOURSE,
    });
  };

  //Reviews
  //Get all reviews
  const getReviews = async () => {
    setLoading();
    try {
      const res = await axios.get("/api/v1/reviews");
      dispatch({
        type: StateEnum.GET_REVIEWS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.REVIEW_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // Clear all reviews
  const clearReviews = () => {
    dispatch({
      type: StateEnum.CLEAR_REVIEWS,
    });
  };

  //Get all reviews for a particular bootcamp
  const getBootcampReviews = async (bootcampId: any) => {
    setLoading();
    try {
      const res = await axios.get(`/api/v1/bootcamps/${bootcampId}/reviews`);
      dispatch({
        type: StateEnum.GETBOOTCAMP_REVIEWS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.REVIEW_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const clearBootcampReviews = () => {
    dispatch({
      type: StateEnum.CLEARBOOTCAMP_REVIEWS,
    });
  };

  //add review
  const addReview = async (formData: any, bootcampId: any) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`/api/v1/bootcamps/${bootcampId}/reviews`, formData, config);
      dispatch({
        type: StateEnum.ADD_REVIEW,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.REVIEW_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Update reviews
  const updateReview = async (formData: any, reviewId: any) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/v1/reviews/${reviewId}`, formData, config);
      dispatch({
        type: StateEnum.UPDATE_REVIEW,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.REVIEW_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Delete reviews
  const deleteReviews = async (reviewId: any) => {
    setLoading();
    try {
      await axios.delete(`/api/v1/reviews/${reviewId}`);
      dispatch({
        type: StateEnum.DELETE_REVIEW,
        payload: reviewId,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.REVIEW_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Add current review to the current review state, to dynamically edit
  const addCurrentReview = (review: any) => {
    dispatch({
      type: StateEnum.SET_CURRENTREVIEW,
      payload: review,
    });
  };

  //clear current review from the state after each edit
  const clearCurrentReview = () => {
    dispatch({
      type: StateEnum.CLEAR_CURRENTREVIEW,
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
        clearCurrentReview,
      }}
    >
      {children}
    </BootcampContext.Provider>
  );
};

export { BootcampState, BootcampContext };
