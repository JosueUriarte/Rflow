import { createContext, useReducer } from "react";

export const InteractiveWhiteboardContext = createContext();

export const interactiveWhiteboardsReducer = (state, action) => {
  switch (action.type) {
    case "SET_INTERACTIVE_WHITEBOARD":
      return {
        interactiveWhiteboard: action.payload,
      };
    default:
      return state;
  }
};

export const InteractiveWhiteboardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(interactiveWhiteboardsReducer, {
    interactiveWhiteboard: null,
  });
  return (
    <InteractiveWhiteboardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InteractiveWhiteboardContext.Provider>
  );
};
