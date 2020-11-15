import { StateEnum, BootcampState, Bootcamp, Course, Review } from "../type";

export default (state: BootcampState, action: any) => {
  switch (action.type) {
    case StateEnum.GET_BOOTCAMPS:
      return {
        ...state,
        bootcamps: action.payload.data,
        pagination: action.payload.pagination,
        count: action.payload.count,
        loading: false,
      };
    case StateEnum.GET_BOOTCAMP:
      return {
        ...state,
        bootcamp: action.payload.data,
        loading: false,
      };

    case StateEnum.BOOTCAMP_CREATE:
      return {
        ...state,
        bootcamps: [...state.bootcamps, action.payload.data],
        success: action.payload.success,
        loading: false,
      };
    case StateEnum.BOOTCAMP_UPDATE:
      return {
        ...state,
        bootcamps: state.bootcamps.map((bootcamp: Bootcamp) =>
          bootcamp._id === action.payload.data._id ? action.payload.data : bootcamp
        ),
        success: action.payload.success,
        loading: false,
      };
    case StateEnum.BOOTCAMP_DELETE:
      return {
        ...state,
        bootcamps: state.bootcamps.filter((bootcamp: Bootcamp) => bootcamp._id !== action.payload),
      };
    case StateEnum.BOOTCAMP_PHOTO:
      return {
        ...state,
        image: action.payload.response.data,
        success: action.payload.response.success,
        loading: false,
      };
    case StateEnum.FILTERED_BOOTCAMP:
      return {
        ...state,
        bootcamps: action.payload.data,
        pagination: null,
        loading: false,
        count: action.payload.count,
      };
    case StateEnum.SET_CURRENT:
      return {
        ...state,
        currentBootcamp: action.payload,
        courses: action.payload.courses,
      };
    case StateEnum.CLEAR_CURRENT:
      return {
        ...state,
        currentBootcamp: null,
        courses: [],
      };
    case StateEnum.BOOTCAMP_ERROR:
    case StateEnum.COURSE_ERROR:
    case StateEnum.REVIEW_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case StateEnum.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case StateEnum.CLEAR_SUCCESS:
      return {
        ...state,
        success: false,
      };
    case StateEnum.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case StateEnum.CLEAR_BOOTCAMPS:
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
        error: null,
      };
    case StateEnum.CLEAR_BOOTCAMP:
      return {
        ...state,
        bootcamp: null,
      };
    case StateEnum.ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload.data],
        success: action.payload.success,
        loading: false,
      };
    case StateEnum.UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map((course: Course) =>
          course._id === action.payload.data._id ? action.payload.data : course
        ),
        success: action.payload.success,
        loading: false,
      };
    case StateEnum.DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course: Course) => course._id !== action.payload),
        loading: false,
      };
    case StateEnum.CURRENT_COURSE:
      return {
        ...state,
        currentCourse: action.payload,
      };
    case StateEnum.CLEAR_CURRENTCOURSE:
      return {
        ...state,
        currentCourse: null,
      };
    case StateEnum.GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload.data,
        loading: false,
      };
    case StateEnum.CLEAR_REVIEWS:
      return {
        ...state,
        reviews: [],
      };
    case StateEnum.GETBOOTCAMP_REVIEWS:
      return {
        ...state,
        bootcampReviews: action.payload.data,
        loading: false,
      };
    case StateEnum.CLEARBOOTCAMP_REVIEWS:
      return {
        ...state,
        bootcampReviews: null,
      };
    case StateEnum.ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload.data],
        success: action.payload.success,
        loading: false,
      };
    case StateEnum.UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((review: Review) =>
          review._id === action.payload.data._id ? action.payload.data : review
        ),
        success: action.payload.success,
        loading: false,
      };
    case StateEnum.DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review: Review) => review._id !== action.payload),
        loading: false,
      };
    case StateEnum.SET_CURRENTREVIEW:
      return {
        ...state,
        currentReview: action.payload,
      };
    case StateEnum.CLEAR_CURRENTREVIEW:
      return {
        ...state,
        currentReview: null,
      };
    default:
      return state;
  }
};
