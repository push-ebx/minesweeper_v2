import {useLocation} from "@happysanta/router";
import {useEffect, useState} from "react";

export const useActivePanel = view => {
  const location = useLocation();
  const [activePanel, setActivePanel] = useState(location.getViewActivePanel(view))

  useEffect(() => {
    setActivePanel(location.getViewActivePanel(view))
  }, [view, location])

  return [activePanel]
}