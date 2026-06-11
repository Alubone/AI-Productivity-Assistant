import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { User, Moon, Sun, LogOut } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="mx-auto max-w-3xl p-6 lg:p-10">
      <PageHeader icon={User} title="Profile & Settings" description="Manage your workspace preferences." />
      <div className="rounded-2xl border bg-card p-6 flex items-center gap-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <Avatar className="h-14 w-14">
          <AvatarFallback className="text-base font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>OU</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-semibold">Operations User</p>
          <p className="text-sm text-muted-foreground truncate">{email || "operations@maersk.com"}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Maersk · Copenhagen HQ</p>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border bg-card divide-y" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center justify-between p-5">
          <div>
            <p className="font-medium">Appearance</p>
            <p className="text-sm text-muted-foreground">Switch between light and dark workspace.</p>
          </div>
          <Button variant="outline" onClick={toggle}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
        </div>
        <div className="flex items-center justify-between p-5">
          <div>
            <p className="font-medium">Session</p>
            <p className="text-sm text-muted-foreground">Sign out of this device.</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}