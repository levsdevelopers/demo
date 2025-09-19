import { Home, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const { t } = useTranslation();
  const links = [
    { to: "/", label: t("Dashboard"), icon: Home },
    { to: "/customers", label: t("Customers"), icon: Users },
    { to: "/settings", label: t("Settings"), icon: Settings },
  ];

  return (
    <aside className="w-60 h-screen border-r p-4">
      <NavigationMenu orientation="vertical">
        <NavigationMenuList className="flex flex-col gap-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavigationMenuItem key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium 
                   ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
}
