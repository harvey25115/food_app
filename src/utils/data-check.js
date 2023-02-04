import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * custom hook: use to check data on mount
 */
export default function useCheckData(dataContext) {
  const nav = useNavigate();
  useEffect(() => {
    if (!dataContext.category || !dataContext.seatCount) {
      nav("/category");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
