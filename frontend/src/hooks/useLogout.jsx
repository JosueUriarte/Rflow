import { useAuthContext } from "./useAuthContext";
import { useWhiteboardContext } from "./useWhiteboardContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: whiteboardDispatch } = useWhiteboardContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    whiteboardDispatch({ type: "SET_WHITEBOARD", payload: "null" });
  };

  return { logout };
};
