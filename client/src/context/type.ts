import React from "react";

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
  _id: string;
  role: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Bootcamp {
  _id: string;
  location: {
    city: string;
    state: string;
  };
  careers: string[];
  photo: string;
  housing: boolean;
  jobAssistance: boolean;
  jobGuarantee: boolean;
  acceptGi: true;
  user: string;
  name: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  createdAt: string;
  slug: string;
  averageCost: number;
  averageRating: number;
  courses: Course[];
}

export interface Course {
  _id: string;
  scholarshipAvailable: boolean;
  title: string;
  description: string;
  weeks: string;
  tuition: string;
  minimumSkill: string;
  bootcamp: Bootcamp;
  user: User;
  createdAt: string;
}

export interface Review {
  _id: string;
  title: string;
  text: string;
  ratings: string;
  bootcamp: Bootcamp;
  user: string;
  createdAt: string;
}

export interface ReviewWithUser {
  _id: string;
  title: string;
  text: string;
  ratings: string;
  bootcamp: Bootcamp;
  user: User;
  createdAt: string;
}

export type BootcampState = {
  bootcamps: Partial<Bootcamp>[];
  bootcamp: Partial<Bootcamp>;
  currentBootcamp: any;
  courses: Course[];
  currentCourse: Partial<Course>;
  reviews: Review[];
  bootcampReviews: Partial<ReviewWithUser[]>;
  currentReview: Partial<Review>;
  image: string;
  filtered: Partial<Bootcamp>[];
  count: number;
  pagination: {
    prev: {
      page: string;
    };
    next: {
      page: string;
    };
  };
  loading: boolean;
  success: boolean;
  error: string;
};

export interface BContextProps extends BootcampState {
  getBootcamps: (page?: number, limit?: number) => void;
  getBootcamp: (id: string) => void;
  addBootcamp: (formData: Partial<Bootcamp>) => void;
  updateBootcamp: (formData: Partial<Bootcamp>, bootcampId: string) => void;
  deleteBootcamp: (bootcampId: string) => void;
  filterBootcamp: (zipcode: string, searchRad: string) => void;
  selectBootcamp: (averageRating: number, averageCost: number) => void;
  uploadImage: (file: any, bootcampId: string) => void;
  clearFiltered: () => void;
  setCurrent: (bootcamp: Partial<Bootcamp>) => void;
  clearCurrent: () => void;
  clearError: () => void;
  clearSuccess: () => void;
  clearBootcamps: () => void;
  clearBootcamp: () => void;
  addCourse: (formData: Partial<Course>, bootcampId: string) => void;
  updateCourse: (formData: Partial<Course>, courseId: string) => void;
  deleteCourse: (courseId: string) => void;
  addCurrentCourse: (course: Partial<Course>) => void;
  clearCurrentCourse: () => void;
  getReviews: () => void;
  clearReviews: () => void;
  getBootcampReviews: (bootcampId: string) => void;
  clearBootcampReviews: () => void;
  addReview: (formData: Partial<Review>, bootcampId: string) => void;
  updateReview: (formData: Partial<Review>, reviewId: string) => void;
  deleteReviews: (reviewId: string) => void;
  addCurrentReview: (review: Partial<Review>) => void;
  clearCurrentReview: () => void;
}

export interface Alert {
  msg: string;
  type: string;
  id: string;
}

export type AlertStateProps = {
  alerts: Alert[];
};

export interface AlertContextProps extends AlertStateProps {
  setAlert: (msg: string, type: string, timeout?: number) => void;
}

export type AuthStateProps = {
  isAuthenticated: boolean;
  loading: false;
  error: string;
  user: User;
  success: false;
};

export interface LoginProps {
  email: string;
  password: string;
}

export interface UpdateUserProps {
  name: string;
  email: string;
}

export interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
  password2: string;
  role: string;
}

export interface UpdatePasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthContextProps extends AuthStateProps {
  loadUser: () => void;
  registerUser: (formData: RegisterUserProps) => void;
  loginUser: (formData: LoginProps) => void;
  logoutUser: () => void;
  updateUser: (formData: UpdateUserProps) => void;
  updatePassword: (formData: UpdatePasswordProps) => void;
  clearError: () => void;
  clearSuccess: () => void;
}

export interface Props {
  children: JSX.Element[] | JSX.Element;
}

export type FormEventProps =
  | React.FormEvent<HTMLFormElement>
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;
