interface INavItem {
  to: string;
  icon: any;
  label: string;
  onClick?: () => void;
  notificationsCount?: number;
  notificationType?: "info" | "danger";
  activeRoutes?: string[];
}

export interface INavSection {
  title: string;
  items: INavItem[];
}

export const NavSections: INavSection[] = [
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
        to: "/dashboard/reviews",
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
        to: "/dashboard/tasks",
      },
      {
        icon: "ic:outline-assignment-returned",
        label: "Create Task",
        to: "/dashboard/tasks/new",
      },
      {
        icon: "tabler:user",
        label: "Testers",
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
