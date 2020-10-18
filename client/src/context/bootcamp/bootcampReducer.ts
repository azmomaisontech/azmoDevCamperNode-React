import {
  SET_LOADING,
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  BOOTCAMP_UPDATE,
  BOOTCAMP_CREATE,
  BOOTCAMP_DELETE,
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
  GETBOOTCAMP_REVIEWS,
  CLEARBOOTCAMP_REVIEWS,
  GET_REVIEWS,
  CLEAR_REVIEWS,
  SET_CURRENTREVIEW,
  CLEAR_CURRENTREVIEW,
  REVIEW_ERROR,
  FILTERED_BOOTCAMP
} from "../type";

export default (state, action) => {
  switch (action.type) {
    case GET_BOOTCAMPS:
      return {
        ...state,
        bootcamps: action.payload.data,
        pagination: action.payload.pagination,
        count: action.payload.count,
        loading: false
      };
    case GET_BOOTCAMP:
      return {
        ...state,
        bootcamp: action.payload.data,
        loading: false
      };

    case BOOTCAMP_CREATE:
      return {
        ...state,
        bootcamps: [...state.bootcamps, action.payload.data],
        success: action.payload.success,
        loading: false
      };
    case BOOTCAMP_UPDATE:
      return {
        ...state,
        bootcamps: state.bootcamps.map(bootcamp =>
          bootcamp._id === action.payload.data._id
            ? action.payload.data
            : bootcamp
        ),
        success: action.payload.success,
        loading: false
      };
    case BOOTCAMP_DELETE:
      return {
        ...state,
        bootcamps: state.bootcamps.filter(
          bootcamp => bootcamp._id !== action.payload
        )
      };
    case BOOTCAMP_PHOTO:
      return {
        ...state,
        image: action.payload.response.data,
        success: action.payload.response.success,
        loading: false
      };
    case FILTERED_BOOTCAMP:
      return {
        ...state,
        bootcamps: action.payload.data,
        pagination: null,
        loading: false,
        count: action.payload.count
      };
    case SET_CURRENT:
      return {
        ...state,
        currentBootcamp: action.payload,
        courses: action.payload.courses
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        currentBootcamp: null,
        courses: []
      };
    case BOOTCAMP_ERROR:
    case COURSE_ERROR:
    case REVIEW_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: false
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case CLEAR_BOOTCAMPS:
      return {
        ...state,
        bootcamps: [],
        bootcamp: null,
        image: null,
        filtered: null,
        count: null,
        pagination: null,
        loading: false,
        success: false,
        currentBootcamp: null,
        courses: [],
        reviews: [],
        error: null
      };
    case CLEAR_BOOTCAMP:
      return {
        ...state,
        bootcamp: null
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload.data],
        success: action.payload.success,
        loading: false
      };
    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map(course =>
          course._id === action.payload.data._id ? action.payload.data : course
        ),
        success: action.payload.success,
        loading: false
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course._id !== action.payload),
        loading: false
      };
    case CURRENT_COURSE:
      return {
        ...state,
        currentCourse: action.payload
      };
    case CLEAR_CURRENTCOURSE:
      return {
        ...state,
        currentCourse: null
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload.data,
        loading: false
      };
    case CLEAR_REVIEWS:
      return {
        ...state,
        reviews: []
      };
    case GETBOOTCAMP_REVIEWS:
      return {
        ...state,
        bootcampReviews: action.payload.data,
        loading: false
      };
    case CLEARBOOTCAMP_REVIEWS:
      return {
        ...state,
        bootcampReviews: null
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload.data],
        success: action.payload.success,
        loading: false
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review._id === action.payload.data._id ? action.payload.data : review
        ),
        success: action.payload.success,
        loading: false
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== action.payload),
        loading: false
      };
    case SET_CURRENTREVIEW:
      return {
        ...state,
        currentReview: action.payload
      };
    case CLEAR_CURRENTREVIEW:
      return {
        ...state,
        currentReview: null
      };
    default:
      return state;
  }
};
