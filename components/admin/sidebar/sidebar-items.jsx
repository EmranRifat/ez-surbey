import { Icon } from "@iconify/react";
import Image from "next/image";

export const sectionItemsWithTeams = [
  {
    key: "dashboard",
    title: "Dashboard",
    href: "/",
    icon: (
      <Image
        src="/logo/sidebar/side1.svg"
        alt="Dashboard"
        width="20"
        height="20"
      />
    ),
  },
  {
    key: "shopdata",
    title: "Shop Data",
    href: "/shopData",
    icon: (
      <Image
        src="/logo/sidebar/side2.svg"
        alt="Shopdata"
        width="20"
        height="20"
      />
    ),
  },
  {
    key: "start_day_list",
    title: "Start of Day List",
    href: "/dayList",
    icon: (
      <Image
        src="/icons/calender.svg"
        alt="daylist"
        width="20"
        height="20"
      />
    ),
  },
  {
    key: "agents",
    title: "Agents",
    href: "/users",
    icon: (
      <Icon
        icon="solar:users-group-two-rounded-outline"
        width={20}
        height={20}
      />
    ),
  },
  {
    key: "inventory",
    title: "Inventory",
    href: "/inventory",
    icon: (
      <Image
        src="/icons/inventory.svg"
        alt="Dashboard"
        width="20"
        height="20"
      />
    ),
  },
];
