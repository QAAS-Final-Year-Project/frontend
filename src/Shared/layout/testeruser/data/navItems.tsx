interface INavItem {
  to: string;
  icon: any;
  label: string;
  notificationsCount?: number;
  notificationType?: "info" | "danger";
  activeRoutes?: string[];
}

export interface INavSection {
  title: string;
  items: INavItem[];
}

export const ApprovedNavSections: INavSection[] = [
  {
    title: "Start",
    items: [
      {
        icon: "ic:outline-dashboard",
        label: "Dashboard",
        to: "/",
      },
      {
        icon: "ic:outline-question-answer",
        label: "Messages",
        to: "/messages",
        notificationsCount: 3,
        notificationType: "info",
      },
      {
        icon: "ic:baseline-star-border",
        label: "Bookmarks",
        to: "/bookmarks",
      },
      {
        icon: "ic:outline-rate-review",
        label: "Reviews",
        to: "/reviews",
      },
    ],
  },
  {
    title: "Organize and Manage",
    items: [
      {
        icon: "ic:outline-assignment",
        label: "Manage Tasks",
        to: "/dashboard/tasks",
      },
      {
        icon: "tabler:user",
        label: "Bids",
        to: "/dashboard/bids",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        icon: "ic:outline-settings",
        label: "Settings",
        to: "/settings",
      },
      {
        icon: "ic:baseline-power-settings-new",
        label: "Logout",
        to: "?modal=logout",
      },
    ],
  },
];

export const UnverifiedNavSections: INavSection[] = [
  {
    title: "On boarding",
    items: [
      {
        icon: "ic:outline-dashboard",
        label: "Verify Account",
        to: "/",
      },
      {
        icon: "ic:baseline-power-settings-new",
        label: "Logout",
        to: "?modal=logout",
      },
    ],
  },
];
export const VerifiedNavSections: INavSection[] = [
  {
    title: "Assessment",
    items: [
      {
        icon: "ic:outline-assignment", // Outlined icon for assessments
        label: "Take Assessments",
        to: "/",
      },
      {
        icon: "ic:outline-menu-book", // Outlined icon for learning materials
        label: "Learning Materials",
        to: "/learning-materials",
      },
      {
        icon: "ic:baseline-power-settings-new",
        label: "Logout",
        to: "?modal=logout",
      },
    ],
  },
];
