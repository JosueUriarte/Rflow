import { useEffect } from "react";
import { useWhiteboardContext } from "../hooks/useWhiteboardContext";
// components
import WhiteboardDetails from "../components/WhiteboardDetails";

const WhiteboardPage = () => {
  const { whiteboards, dispatch } = useWhiteboardContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/whiteboards");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WHITEBOARD", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div>
      {whiteboards &&
        whiteboards.map((whiteboard) => (
          <WhiteboardDetails key={whiteboard._id} whiteboard={whiteboard} />
        ))}
    </div>
  );
}

export default WhiteboardPage;
