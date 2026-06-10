import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Truck,
  Package,
  Warehouse,
  ClipboardList,
  Plus,
  Moon,
  Sun,
  Check,
  Trash2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cargoflow — Logistics Task Manager" },
      { name: "description", content: "A calm, modern task manager for logistics teams. Organize shipments, warehouse ops, and deliveries with clarity." },
      { property: "og:title", content: "Cargoflow — Logistics Task Manager" },
      { property: "og:description", content: "Plan shipments, warehouse ops, and deliveries with a calm, modern task manager built for logistics teams." },
    ],
  }),
  component: Index,
});

type Category = "shipments" | "warehouse" | "deliveries" | "admin";

type Task = {
  id: string;
  title: string;
  category: Category;
  done: boolean;
  createdAt: number;
};

const CATEGORIES: { id: Category; label: string; icon: typeof Truck }[] = [
  { id: "shipments", label: "Shipments", icon: Truck },
  { id: "warehouse", label: "Warehouse", icon: Warehouse },
  { id: "deliveries", label: "Deliveries", icon: Package },
  { id: "admin", label: "Admin", icon: ClipboardList },
];

const SEED: Task[] = [
  { id: "1", title: "Confirm container MSKU-4421 ETA at Port of Rotterdam", category: "shipments", done: false, createdAt: Date.now() - 5000 },
  { id: "2", title: "Audit aisle B-12 inventory levels", category: "warehouse", done: false, createdAt: Date.now() - 4000 },
  { id: "3", title: "Dispatch route 17 — 14 stops", category: "deliveries", done: true, createdAt: Date.now() - 3000 },
  { id: "4", title: "File customs paperwork for shipment #88291", category: "admin", done: false, createdAt: Date.now() - 2000 },
  { id: "5", title: "Schedule maintenance for forklift F-08", category: "warehouse", done: false, createdAt: Date.now() - 1000 },
];

function Index() {
  const { theme, toggle } = useTheme();
  const [tasks, setTasks] = useState<Task[]>(SEED);
  const [filter, setFilter] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("shipments");

  useEffect(() => {
    const stored = localStorage.getItem("cargoflow.tasks");
    if (stored) {
      try { setTasks(JSON.parse(stored)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cargoflow.tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => (filter === "all" ? true : t.category === filter))
      .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => Number(a.done) - Number(b.done) || b.createdAt - a.createdAt);
  }, [tasks, filter, query]);

  const counts = useMemo(() => {
    const map: Record<Category, number> = { shipments: 0, warehouse: 0, deliveries: 0, admin: 0 };
    tasks.forEach((t) => { if (!t.done) map[t.category]++; });
    return map;
  }, [tasks]);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  const addTask = () => {
    const title = newTitle.trim();
    if (!title) return;
    setTasks((prev) => [
      { id: crypto.randomUUID(), title, category: newCategory, done: false, createdAt: Date.now() },
      ...prev,
    ]);
    setNewTitle("");
  };

  const toggleTask = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const removeTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-subtle)" }}>
      <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">Cargoflow</h1>
              <p className="text-xs text-muted-foreground">Logistics task manager</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <StatCard label="Open tasks" value={total - completed} />
          <StatCard label="Completed" value={completed} />
          <StatCard label="Progress" value={`${progress}%`} />
          <StatCard label="Categories" value={CATEGORIES.length} />
        </section>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-1">
            <p className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Categories
            </p>
            <CategoryButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="All tasks"
              count={tasks.filter((t) => !t.done).length}
              icon={ClipboardList}
            />
            {CATEGORIES.map((c) => (
              <CategoryButton
                key={c.id}
                active={filter === c.id}
                onClick={() => setFilter(c.id)}
                label={c.label}
                count={counts[c.id]}
                icon={c.icon}
              />
            ))}
          </aside>

          {/* Main */}
          <main>
            {/* New task composer */}
            <div
              className="rounded-2xl border bg-card p-4 mb-6"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Add a new logistics task…"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  className="flex-1 h-11 bg-background"
                />
                <Select value={newCategory} onValueChange={(v) => setNewCategory(v as Category)}>
                  <SelectTrigger className="sm:w-44 h-11 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={addTask}
                  className="h-11 px-5 text-primary-foreground border-0"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add task
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 h-10 bg-card"
              />
            </div>

            {/* Tasks */}
            <ul className="space-y-2">
              {filtered.length === 0 && (
                <li className="rounded-2xl border border-dashed py-16 text-center text-sm text-muted-foreground">
                  No tasks here. Enjoy the calm.
                </li>
              )}
              {filtered.map((task) => {
                const cat = CATEGORIES.find((c) => c.id === task.category)!;
                const Icon = cat.icon;
                return (
                  <li
                    key={task.id}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-all hover:border-primary/40",
                      task.done && "opacity-60",
                    )}
                    style={{ boxShadow: "var(--shadow-soft)" }}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      aria-label="Toggle complete"
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                        task.done
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30 hover:border-primary",
                      )}
                    >
                      {task.done && <Check className="h-3.5 w-3.5" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium text-foreground truncate",
                          task.done && "line-through",
                        )}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="gap-1 font-normal text-xs">
                          <Icon className="h-3 w-3" />
                          {cat.label}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      aria-label="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </main>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      className="rounded-2xl border bg-card p-4"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tracking-tight text-foreground mt-1">{value}</p>
    </div>
  );
}

function CategoryButton({
  active,
  onClick,
  label,
  count,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  icon: typeof Truck;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className={cn("text-xs", active ? "text-primary" : "text-muted-foreground")}>
        {count}
      </span>
    </button>
  );
}
