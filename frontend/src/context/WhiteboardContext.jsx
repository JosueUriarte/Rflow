import { createContext, useReducer } from "react";

export const WhiteboardContext = createContext();

export const whiteboardsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WHITEBOARD":
      return {
        whiteboards: action.payload,
      };

    case "CREATE_WHITEBOARD":
      return {
        whiteboards: [action.payload, ...state.whiteboards],
      };
    case "DELETE_WHITEBOARD":
      return {
        whiteboards: state.whiteboards.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const WhiteboardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(whiteboardsReducer, {
    whiteboards: null,
  });

  return (
    <WhiteboardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WhiteboardContext.Provider>
  );
};
