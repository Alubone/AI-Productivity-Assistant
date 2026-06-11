import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListTodo,
  Search,
  MessageSquare,
  LogOut,
  Moon,
  Sun,
  Menu,
  Ship,
  Plane,
  Truck,
  Warehouse,
  ShieldCheck,
  Network,
  User,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BrandLogo } from "@/components/brand-logo";

type Item = { to: string; label: string; icon: typeof Mail };

const SECTIONS: { label: string; items: Item[] }[] = [
  { label: "", items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] },
  {
    label: "AI Productivity",
    items: [
      { to: "/email", label: "Smart Email", icon: Mail },
      { to: "/notes", label: "Meeting Notes", icon: NotebookPen },
      { to: "/planner", label: "Task Planner", icon: ListTodo },
      { to: "/research", label: "Research", icon: Search },
      { to: "/chat", label: "AI Chatbot", icon: MessageSquare },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/operations/ocean", label: "Ocean Freight", icon: Ship },
      { to: "/operations/air", label: "Air Freight", icon: Plane },
      { to: "/operations/trucking", label: "Trucking", icon: Truck },
      { to: "/operations/warehouse", label: "Warehouse", icon: Warehouse },
      { to: "/operations/customs", label: "Customs & Compliance", icon: ShieldCheck },
      { to: "/operations/supply-chain", label: "Supply Chain Insights", icon: Network },
    ],
  },
];

function NavContent({ onNavigate, collapsed = false }: { onNavigate?: () => void; collapsed?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="flex h-full flex-col gap-2 p-3 text-sidebar-foreground">
      <Link to="/dashboard" onClick={onNavigate} className="flex items-center gap-2 px-2 py-3">
        <BrandLogo withWordmark={!collapsed} />
      </Link>

      <nav className="flex-1 overflow-y-auto space-y-5 pr-1">
        {SECTIONS.map((sec, i) => (
          <div key={i} className="space-y-1">
            {sec.label && !collapsed && (
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/50">
                {sec.label}
              </p>
            )}
            {sec.items.map((item) => {
              const active =
                pathname === item.to ||
                (item.to !== "/dashboard" && pathname.startsWith(item.to));
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all",
                    active
                      ? "bg-sidebar-primary/15 text-sidebar-primary font-medium shadow-sm"
                      : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    collapsed && "justify-center px-2",
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", active && "text-sidebar-primary")} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}

        <div className="space-y-1 pt-2 border-t border-sidebar-border">
          {!collapsed && (
            <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/50">
              Settings
            </p>
          )}
          <Link
            to="/profile"
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed && "justify-center px-2",
            )}
          >
            <User className="h-4 w-4 shrink-0" /> {!collapsed && "Profile"}
          </Link>
          <button
            onClick={toggle}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer",
              collapsed && "justify-center px-2",
            )}
          >
            {theme === "dark" ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
            {!collapsed && (theme === "dark" ? "Light mode" : "Dark mode")}
          </button>
          <button
            onClick={signOut}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer",
              collapsed && "justify-center px-2",
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" /> {!collapsed && "Sign out"}
          </button>
        </div>
      </nav>
    </div>
  );
}

export function TopBar({ onMenu }: { onMenu?: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b bg-background/85 backdrop-blur px-4 lg:px-6 h-16">
      <div className="flex min-w-0 items-center gap-3">
        {onMenu && (
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="lg:hidden">
          <BrandLogo withWordmark={false} />
        </div>
        <div className="hidden sm:block min-w-0">
          <p className="truncate text-sm font-semibold">Logistics AI Workplace Assistant</p>
          <p className="hidden md:block text-[11px] text-muted-foreground">Internal productivity suite for operations</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>
        <div className="hidden sm:flex items-center gap-2 rounded-full border bg-card pl-1 pr-3 py-1">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-[11px] font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>OU</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <p className="text-xs font-medium">Operations User</p>
            <p className="text-[10px] text-muted-foreground">Maersk · Copenhagen</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden">
        <TopBar onMenu={() => setOpen(true)} />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><span className="sr-only">Menu</span></SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-sidebar text-sidebar-foreground border-sidebar-border">
            <NavContent onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex shrink-0 border-r border-sidebar-border bg-sidebar transition-[width] duration-200",
          collapsed ? "w-[76px]" : "w-64",
        )}
      >
        <div className="relative w-full">
          <NavContent collapsed={collapsed} />
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-card text-foreground shadow hover:bg-accent cursor-pointer"
          >
            {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>
      </aside>
    </>
  );
}