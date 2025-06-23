import { BriefcaseBusiness, House, Search, Settings } from "lucide-react";

// navbar navlinks
// interface iDropdownNavLink {
//   label: string;
//   href: string;
//   icon: React.ReactNode;
// }
// export const dropDownNavLinks: iDropdownNavLink[] = [
//   {
//     label: "Workspace",
//     href: "/workspace",
//     icon: <BriefcaseBusiness />,
//   },
//   {
//     label: "Settings",
//     href: "/workspace/settings",
//     icon: <Settings />,
//   },
// ];

// sidebar top actons buttons

interface IWsSidebarData {
  label: string;
  href: string;
  icon: React.ReactNode;
}
export const wsSidebarDdata: IWsSidebarData[] = [
  {
    label: "Search",
    href: "/workspace/search",
    icon: <Search />,
  },
  {
    label: "Home",
    href: "/",
    icon: <House />,
  },
  // {
  //   label: "Inbox",
  //   href: "/workspace/inbox",
  //   icon: <Inbox />,
  // },
];

// private ws-sidebar collections
interface IWsDefaultPages {
  label: string;
  href: string;
  icon: React.ReactNode | string;
}
export const wsDefaultPages: IWsDefaultPages[] = [
  // {
  //   label: "Weekly",
  //   href: "/workspace/weekly",
  //   icon: <AlignJustify />,
  // },
  // {
  //   label: "Monthly",
  //   href: "/workspace/monthly",
  //   icon: <CalendarDays />,
  // },
  {
    label: "Welcome to Smarnika",
    href: "/workspace/welcome",
    icon: "👋",
  },
];
