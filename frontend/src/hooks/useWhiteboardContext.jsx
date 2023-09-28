import { WhiteboardContext } from "../context/WhiteboardContext";
import { useContext } from "react";

export const useWhiteboardContext = () => {
  const context = useContext(WhiteboardContext);

  if (!context) {
    throw Error(
      "useWhiteboardContext must be used within a WhiteboardContextProvider"
    );
  }

  return context;
};
