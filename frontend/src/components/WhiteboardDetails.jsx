import { Button } from "@mui/material";
import { useWhiteboardContext } from "../hooks/useWhiteboardContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WhiteboardDetails = ({ whiteboard }) => {
  const { dispatch } = useWhiteboardContext();
  console.log('whiteboard: ' + whiteboard);
  // const handleClick = async () => {
  //   const response = await fetch("/api/whiteboard/" + whiteboard._id, {
  //     method: "DELETE",
  //   });
  //   const json = await response.json();

  //   if (response.ok) {
  //     dispatch({ type: "DELETE_WHITEBOARD", payload: json });
  //   }
  // };

  return (
    <div>
      <Button>{whiteboard.title}</Button>
    </div>
  )
  
};
export default WhiteboardDetails;
