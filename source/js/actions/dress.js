export const GET_DRESS_START = 'GET_DRESS_START';
export const GET_DRESS_ERROR = 'GET_DRESS_ERROR';
export const GET_DRESS_SUCCESS = 'GET_DRESS_SUCCESS';


export function getDress(page) {
  return {
    type: GET_DRESS_START,
    page,
  };
}
