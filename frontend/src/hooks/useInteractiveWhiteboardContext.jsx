import { InteractiveWhiteboardContext } from "../context/InteractiveWhiteboardContext";
import { useContext } from "react";

export const useInteractiveWhiteboardContext = () => {
  const context = useContext(InteractiveWhiteboardContext);

  if (!context) {
    throw Error("useInteractiveWhiteboardContext must be used within InteractiveWhiteboardContextProvider");
  }

  return context;
};
