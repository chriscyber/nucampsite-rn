// An action is an event that describes something that happened in the app. So these are the events that can change state. The payload is additional info about what happened (in addition to type). Action passed to reducers. dispatch is a redux store method; the only way to update state is to call store.dispatch and pass in action object (line 23)

import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchComments = () => (dispatch) => {
  // the function inside the dispatch function stops action from going to reducer while middleware uses fetch (async)
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMess) => ({
  //this is the action creator
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess,
});

export const addComments = (comments) => ({
  //this is the action creator
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const postComment = (campsiteId, rating, author, text) => (dispatch) => {
  const date = new Date();
  let dateString = date.toISOString();

  const newComment = {
    campsiteId,
    rating,
    author,
    text,
    date: dateString,
  };
  setTimeout(() => {
    dispatch(addComment(newComment));
  }, 2000);
};

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const fetchCampsites = () => (dispatch) => {
  dispatch(campsitesLoading());

  return fetch(baseUrl + "campsites")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((campsites) => dispatch(addCampsites(campsites)))
    .catch((error) => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
  type: ActionTypes.CAMPSITES_LOADING,
});

export const campsitesFailed = (errMess) => ({
  type: ActionTypes.CAMPSITES_FAILED,
  payload: errMess,
});

export const addCampsites = (campsites) => ({
  type: ActionTypes.ADD_CAMPSITES,
  payload: campsites,
});

export const fetchPromotions = () => (dispatch) => {
  dispatch(promotionsLoading());

  return fetch(baseUrl + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((promotions) => dispatch(addPromotions(promotions)))
    .catch((error) => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
  type: ActionTypes.PROMOTIONS_LOADING,
});

export const promotionsFailed = (errMess) => ({
  type: ActionTypes.PROMOTIONS_FAILED,
  payload: errMess,
});

export const addPromotions = (promotions) => ({
  type: ActionTypes.ADD_PROMOTIONS,
  payload: promotions,
});

export const fetchPartners = () => (dispatch) => {
  dispatch(partnersLoading());

  return fetch(baseUrl + "partners")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((partners) => dispatch(addPartners(partners)))
    .catch((error) => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
  type: ActionTypes.PARTNERS_LOADING,
});

export const partnersFailed = (errMess) => ({
  type: ActionTypes.PARTNERS_FAILED,
  payload: errMess,
});

export const addPartners = (partners) => ({
  type: ActionTypes.ADD_PARTNERS,
  payload: partners,
});

export const postFavorite = (campsiteId) => (dispatch) => {
  setTimeout(() => {
    //to sim server delay
    dispatch(addFavorite(campsiteId));
  }, 2000);
};

export const addFavorite = (campsiteId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: campsiteId,
});
