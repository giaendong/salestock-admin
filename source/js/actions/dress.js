export const GET_DRESS_START = 'GET_DRESS_START';
export const GET_DRESS_ERROR = 'GET_DRESS_ERROR';
export const GET_DRESS_SUCCESS = 'GET_DRESS_SUCCESS';
export const GET_DRESS_EMPTY = 'GET_DRESS_EMPTY';

export const CREATE_DRESS_START = 'CREATE_DRESS_START';
export const CREATE_DRESS_ERROR = 'CREATE_DRESS_ERROR';
export const CREATE_DRESS_SUCCESS = 'CREATE_DRESS_SUCCESS';

export const DELETE_DRESS_START = 'DELETE_DRESS_START';
export const DELETE_DRESS_ERROR = 'DELETE_DRESS_ERROR';
export const DELETE_DRESS_SUCCESS = 'DELETE_DRESS_SUCCESS';


export function getDress(page) {
  return {
    type: GET_DRESS_START,
    page,
  };
}

export function createDress(data) {
  return {
    type: CREATE_DRESS_START,
    data,
  };
}

export function deleteDress(id) {
  return {
    type: DELETE_DRESS_START,
    id,
  };
}
