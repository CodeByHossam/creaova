import { useEffect, useState } from "react";
import { useLocation } from "react-router";

/**
 * A fragment is never sent to the server, so prerendered HTML cannot know which
 * hash the visitor opened. Reading `location.hash` during the first client
 * render makes the nav active state differ from that HTML and triggers React's
 * hydration error #418. Keep the server's empty hash for the hydration pass,
 * then reveal the real hash once the tree has hydrated.
 */
export function useHydratedLocationHash() {
  const location = useLocation();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(location.hash);
  }, [location.hash]);

  return hash;
}
