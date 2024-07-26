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
        to: "/dashboard",
      },
      {
        icon: "ic:outline-question-answer",
        label: "Messages",
        to: "/dashboard/messages",
        
      },
      {
        icon: "ic:baseline-star-border",
        label: "Bookmarks",
        to: "/dashboard/bookmarks",
      },
      {
        icon: "ic:outline-rate-review",
        label: "Reviews",
        to: "/dashboard/reviews",
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
    title: "Assessment",
    items: [
      {
        icon: "ic:outline-assignment", // Outlined icon for assessments
        label: "Assessment",
        to: "/dashboard/assessments",
      },
      {
        icon: "ic:outline-menu-book", // Outlined icon for learning materials
        label: "Learning Materials",
        to: "/dashboard/learning-materials",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        icon: "ic:outline-settings",
        label: "Settings",
        to: "/dashboard/settings",
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
        to: "/dashboard",
      },
      {
        icon: "ic:baseline-power-settings-new",
        label: "Logout",
        to: "?modal=logout",
      },
      {
        icon: "ic:outline-settings",
        label: "Settings",
        to: "/dashboard/settings",
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
        to: "/dashboard",
      },

      {
        icon: "ic:outline-menu-book", // Outlined icon for learning materials
        label: "Learning Materials",
        to: "/dashboard/learning-materials",
      },
      {
        icon: "ic:outline-settings",
        label: "Settings",
        to: "/dashboard/settings",
      },
      {
        icon: "ic:baseline-power-settings-new",
        label: "Logout",
        to: "?modal=logout",
      },
    ],
  },
];
