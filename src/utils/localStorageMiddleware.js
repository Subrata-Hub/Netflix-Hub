// localStorageMiddleware.js
export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Save the state of savedSlice to local storage
  const state = store.getState();
  localStorage.setItem("savedState", JSON.stringify(state.saved));

  return result;
};
