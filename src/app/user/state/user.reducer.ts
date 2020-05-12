export function reducer(state, action) {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return state;
  }
}
