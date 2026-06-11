import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { OpsPage } from "@/components/ops-page";

export const Route = createFileRoute("/_authenticated/operations/supply-chain")({
  component: () => (
    <OpsPage
      icon={Network}
      title="Supply Chain Insights"
      description="End-to-end visibility and disruption signals."
      highlights={[
        { label: "Active disruptions", value: "4", hint: "Weather & port congestion" },
        { label: "At-risk shipments", value: "127", hint: "Predicted delay >24h" },
        { label: "Network health", value: "Stable", hint: "AI risk index 0.18" },
      ]}
    />
  ),
});