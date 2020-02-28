import * as galleryService from "../services/galleryStore";

export function setAppClientState(authState) {
  return {
    type: "LOADED_CLIENT",
    authState
  };
}

export function loadGalleriesNotAsync({ payload }) {
  return {
    type: "LOAD_GALLERIES",
    payload
  };
}

export function loadGalleries({ contentTypeId }) {
  return dispatch => {
    return galleryService
      .loadGalleries(contentTypeId)
      .then(payload => dispatch(loadGalleriesNotAsync({ payload })));
  };
}

export function loadGallery(id) {
  return {
    type: "LOAD_GALLERY",
    payload: galleryService.loadGallery(id),
    meta: {
      id
    }
  };
}
