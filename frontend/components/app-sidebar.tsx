"use client"

import * as React from "react"
import {
  BarChart3,
  Database,
  LayoutDashboard,
  Compass,
  Bell,
  FileText,
  DatabaseBackup,
  Users,
  Briefcase,
  Command,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Actual app data.
const data = {
  user: {
    name: "Admin User",
    email: "admin@isn-analytica.io",
    avatar: "",
  },
  teams: [
    {
      name: "ISN Analytica",
      logo: BarChart3,
      plan: "Enterprise",
    },
    {
      name: "Data Team",
      logo: Command,
      plan: "Standard",
    },
  ],
  navMain: [
    {
      title: "Navigation",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: "Dashboards", url: "/dashboards" },
        { title: "Charts", url: "/charts" },
        { title: "Explore", url: "/explore" },
        { title: "Alerts", url: "/alerts" },
        { title: "Reports", url: "/reports" },
      ],
    },
    {
      title: "Data Management",
      url: "#",
      icon: Database,
      items: [
        { title: "Datasets", url: "/datasets" },
        { title: "Data Sources", url: "/data-sources" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Briefcase,
      items: [
        { title: "Organization", url: "/settings/organization" },
        { title: "Team Members", url: "/settings/members" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
