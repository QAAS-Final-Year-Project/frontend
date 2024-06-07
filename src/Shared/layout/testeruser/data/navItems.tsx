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
        icon: "ic:outline-business-center",
        label: "Jobs",
        to: "/jobs",
      },
      {
        icon: "ic:outline-assignment",
        label: "Tasks",
        to: "/Tasks",
      },
      {
        icon: "tabler:user",
        label: "Customers",
        to: "/dashboard/testers",
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
        to: "/logout",
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
    ],
  },
];
