import type { NavItem } from "~/data/constants";

/** One shared rule for the primary and mobile nav current-page marker. */
function normalizePath(path: string) {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

function parseNavTarget(to: string) {
  const hashIndex = to.indexOf("#");
  return {
    path: normalizePath(hashIndex === -1 ? to : to.slice(0, hashIndex)),
    hash: hashIndex === -1 ? "" : to.slice(hashIndex),
  };
}

function isPathActive(itemPath: string, pathname: string) {
  const currentPath = normalizePath(pathname);
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}

/**
 * Return the one nav destination that should carry the current marker.
 *
 * A hash match wins. Without one, a path-only item wins; otherwise the first
 * hash item for that path is its page-level destination. That last rule keeps
 * /services on "Services" rather than marking both Services and Our approach.
 */
export function getActiveNavHref(items: NavItem[], pathname: string, hash: string) {
  const currentHash = hash ? (hash.startsWith("#") ? hash : `#${hash}`) : "";
  const candidates = items
    .map((item) => ({ item, target: parseNavTarget(item.to) }))
    .filter(({ target }) => isPathActive(target.path, pathname));

  if (candidates.length === 0) return undefined;

  if (currentHash) {
    const exactHashItem = candidates.find(({ target }) => target.hash === currentHash);
    if (exactHashItem) return exactHashItem.item.to;
  }

  const pathOnlyItem = candidates.find(({ target }) => !target.hash);
  return (pathOnlyItem ?? candidates[0]).item.to;
}
