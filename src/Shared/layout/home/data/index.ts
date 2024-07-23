export const footerSections = [
  {
    title: "For Candidates",
    links: [
      { title: "Browse Jobs", href: "#" },
      { title: "Add Resume", href: "#" },
      { title: "Job Alerts", href: "#" },
      { title: "My Bookmarks", href: "#" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { title: "Browse Candidates", href: "#" },
      { title: "Post a Job", href: "#" },
      { title: "Post a Task", href: "#" },
      { title: "Plans & Pricing", href: "#" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { title: "Contact", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Use", href: "#" },
    ],
  },
  {
    title: "Account",
    links: [
      { title: "Log In", href: "#" },
      { title: "My Account", href: "#" },
    ],
  },
];



export const NoAuthNavLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Find work",
    href: "/login",
  },

  {
    name: "Contact Us",
    href: "/contact",
  },
  {
    name: "Blog",
    href: "/blog",
  },
]

export const TesterNavLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Browse Tasks",
    href: "/tasks",
    disableUnverified: true,

  },
  {
    name: "Dashboard",
    href: "#",
    disableUnverified: true,
    children: [
      {
        name: "Dashboard",
        href: "/dashboard",
      },
      {
        name: "Messages",
        href: "/dashboard/messages",
      },
      {
        name: "Reviews",
        href: "/dashboard/reviews",
      },
      {
        name: "Bookmarks",
        href: "/dashboard/bookmarks",
      },
      {
        name: "Tasks",
        href: "/dashboard/tasks",
      },
      {
        name: "Settings",
        href: "/dashboard/settings",
      },
    ],
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];
export const DeveloperNavLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Browse Tasks",
    href: "/tasks",
  },
  {
    name: "Dashboard",
    href: "#",
    children: [
      {
        name: "Dashboard",
        href: "/dashboard",
      },
      {
        name: "Messages",
        href: "/dashboard/messages",
      },
      {
        name: "Reviews",
        href: "/dashboard/reviews",
      },
      {
        name: "Bookmarks",
        href: "/dashboard/bookmarks",
      },
      {
        name: "Tasks",
        href: "/dashboard/tasks",
      },
      {
        name: "Settings",
        href: "/dashboard/settings",
      },
    ],
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];