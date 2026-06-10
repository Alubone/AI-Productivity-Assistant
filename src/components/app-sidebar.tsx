import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListTodo,
  Search,
  MessageSquare,
  Sparkles,
  LogOut,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email", icon: Mail },
  { to: "/notes", label: "Meeting Notes", icon: NotebookPen },
  { to: "/planner", label: "Task Planner", icon: ListTodo },
  { to: "/research", label: "Research", icon: Search },
  { to: "/chat", label: "AI Chatbot", icon: MessageSquare },
] as const;

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <Link to="/dashboard" onClick={onNavigate} className="flex items-center gap-2 px-2 py-2 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">Aiden</p>
          <p className="text-[11px] text-muted-foreground leading-tight">Workplace AI</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t pt-3 space-y-1">
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={toggle}>
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={signOut}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
        <p className="px-3 pt-2 text-[10px] text-muted-foreground leading-tight">
          AI outputs may be inaccurate. Always review before acting.
        </p>
      </div>
    </div>
  );
}

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b bg-background/80 backdrop-blur px-4 h-14">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold text-sm">Aiden</span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <NavContent onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 border-r bg-sidebar">
        <div className="w-full"><NavContent /></div>
      </aside>
    </>
  );
}