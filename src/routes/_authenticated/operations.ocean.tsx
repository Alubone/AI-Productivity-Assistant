import { createFileRoute } from "@tanstack/react-router";
import { Ship } from "lucide-react";
import { OpsPage } from "@/components/ops-page";

export const Route = createFileRoute("/_authenticated/operations/ocean")({
  component: () => (
    <OpsPage
      icon={Ship}
      title="Ocean Freight"
      description="Vessels, lanes, port calls and container flow."
      highlights={[
        { label: "Active vessels", value: "138", hint: "Across major trade lanes" },
        { label: "Containers in transit", value: "42,910", hint: "TEU equivalent" },
        { label: "On-time arrivals", value: "92.4%", hint: "Last 30 days" },
      ]}
    />
  ),
});