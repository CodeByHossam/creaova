import { useSyncExternalStore } from "react";
import { useLocation } from "react-router";

/**
 * A fragment is never sent to the server, so prerendered HTML cannot know which
 * hash the visitor opened. Reading `location.hash` during the first client
 * render makes the nav active state differ from that HTML and triggers React's
 * hydration error #418. Keep the server's empty hash for the hydration pass,
 * then reveal the real hash once the tree has hydrated.
 *
 * `useSyncExternalStore` only causes one hydration-driven update. Hash changes
 * continue to flow through `useLocation()` without a second state copy.
 */
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useHydratedLocationHash() {
  const { hash } = useLocation();
  const isHydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return isHydrated ? hash : "";
}
