/**
 * next/image leaves src untouched when the optimizer is off, so a project-subpath
 * host like GitHub Pages needs the base path added by hand.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
