export enum StateEnum {
  SET_ALERT = "SET_ALERT",
  CLEAR_ALERT = "CLEAR_ALERT",
  SET_LOADING = "SET_LOADING",
  CLEAR_SUCCESS = "CLEAR_SUCCESS",
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  USER_LOADED = "USER_LOADED",
  LOGOUT_USER = "LOGOUT_USER",
  CLEAR_ERROR = "CLEAR_ERROR",
  AUTH_ERROR = "AUTH_ERROR",
  UPDATE_USER = "UPDATE_USER",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
  UPDATE_ERROR = "UPDATE_ERROR",
  GET_BOOTCAMPS = "GET_BOOTCAMPS",
  GET_BOOTCAMP = "GET_BOOTCAMP",
  BOOTCAMP_CREATE = "BOOTCAMP_CREATE",
  BOOTCAMP_UPDATE = "BOOTCAMP_UPDATE",
  BOOTCAMP_DELETE = "BOOTCAMP_DELETE",
  BOOTCAMP_PHOTO = "BOOTCAMP_PHOTO",
  FILTERED_BOOTCAMP = "FILTERED_BOOTCAMP",
  CLEAR_FILTER = "CLEAR_FILTER",
  BOOTCAMP_ERROR = "BOOTCAMP_ERROR",
  SET_CURRENT = "SET_CURRENT",
  CLEAR_CURRENT = "CLEAR_CURRENT",
  CLEAR_BOOTCAMPS = "CLEAR_BOOTCAMPS",
  CLEAR_BOOTCAMP = "CLEAR_BOOTCAMP",
  ADD_COURSE = "ADD_COURSE",
  UPDATE_COURSE = "UPDATE_COURSE",
  DELETE_COURSE = "DELETE_COURSE",
  COURSE_ERROR = "COURSE_ERROR",
  CURRENT_COURSE = "CURRENT_COURSE",
  CLEAR_CURRENTCOURSE = "CLEAR_CURRENTCOURSE",
  ADD_REVIEW = "ADD_REVIEW",
  UPDATE_REVIEW = "UPDATE_REVIEW",
  DELETE_REVIEW = "DELETE_REVIEW",
  GET_REVIEWS = "GET_REVIEWS",
  CLEAR_REVIEWS = "CLEAR_REVIEWS",
  GETBOOTCAMP_REVIEWS = "GETBOOTCAMP_REVIEWS",
  CLEARBOOTCAMP_REVIEWS = "CLEARBOOTCAMP_REVIEWS",
  REVIEW_ERROR = "REVIEW_ERROR",
  SET_CURRENTREVIEW = "SET_CURRENTREVIEW",
  CLEAR_CURRENTREVIEW = "CLEAR_CURRENTREVIEW",
}

export interface User {
  id: string;
  role: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Bootcamp {
  id: string;
  location: {};
  careers: string[];
  photo: string;
  housing: boolean;
  jobAssitance: boolean;
  jobGuarantee: boolean;
  acceptGi: true;
  user: User;
  name: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  createdAt: string;
  slug: string;
  averageCost: number;
  averageRating: number;
}

export interface Course {
  id: string;
  scholarshipAvailable: boolean;
  title: string;
  description: string;
  weeks: string;
  tuition: number;
  minimumSkill: string;
  bootcamp: Bootcamp;
  user: User;
  createdAt: string;
}

export interface Review {
  id: string;
  title: string;
  text: "string";
  ratings: number;
  bootcamp: Bootcamp;
  user: User;
  createdAt: string;
}

export type BootcampState = {
  bootcamps: Bootcamp[];
  bootcamp: Bootcamp;
  currentBootcamp: Bootcamp;
  courses: Course[];
  currentCourse: Course;
  reviews: Review[];
  bootcampReviews: Review[];
  currentReview: Review;
  image: string;
  filtered: Bootcamp[];
  count: number;
  pagination: {};
  loading: boolean;
  success: boolean;
  error: {};
};

export interface BContextProps extends BootcampState {
  getBootcamps: () => void;
  getBootcamp: () => void;
  addBootcamp: () => void;
  updateBootcamp: () => void;
  deleteBootcamp: () => void;
  filterBootcamp: () => void;
  selectBootcamp: () => void;
  uploadImage: () => void;
  clearFiltered: () => void;
  setCurrent: () => void;
  clearCurrent: () => void;
  clearError: () => void;
  clearSuccess: () => void;
  clearBootcamps: () => void;
  clearBootcamp: () => void;
  addCourse: () => void;
  updateCourse: () => void;
  deleteCourse: () => void;
  addCurrentCourse: () => void;
  clearCurrentCourse: () => void;
  getReviews: () => void;
  clearReviews: () => void;
  getBootcampReviews: () => void;
  clearBootcampReviews: () => void;
  addReview: () => void;
  updateReview: () => void;
  deleteReviews: () => void;
  addCurrentReview: () => void;
  clearCurrentReview: () => void;
}

export interface Props {
  children: JSX.Element[] | JSX.Element;
}
