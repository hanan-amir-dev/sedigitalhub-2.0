export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/our-project", label: "Our Project" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/user", label: "User" },
] as const;

export type NavLink = (typeof navLinks)[number];
