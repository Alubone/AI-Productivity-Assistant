import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { OpsPage } from "@/components/ops-page";

export const Route = createFileRoute("/_authenticated/operations/trucking")({
  component: () => (
    <OpsPage
      icon={Truck}
      title="Trucking"
      description="Fleet status, dispatch and inland transportation."
      highlights={[
        { label: "Trucks on the road", value: "2,184", hint: "Live telematics" },
        { label: "On-time deliveries", value: "96.1%", hint: "Last 7 days" },
        { label: "Idle fleet", value: "112", hint: "Available for dispatch" },
      ]}
    />
  ),
});