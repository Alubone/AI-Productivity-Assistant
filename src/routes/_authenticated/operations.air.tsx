import { createFileRoute } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { OpsPage } from "@/components/ops-page";

export const Route = createFileRoute("/_authenticated/operations/air")({
  component: () => (
    <OpsPage
      icon={Plane}
      title="Air Freight"
      description="Charter and scheduled air cargo across global hubs."
      highlights={[
        { label: "Active flights", value: "47", hint: "Including charters" },
        { label: "Tonnage today", value: "1,260 t", hint: "Across all hubs" },
        { label: "Hub utilization", value: "78%", hint: "CPH · DXB · HKG" },
      ]}
    />
  ),
});