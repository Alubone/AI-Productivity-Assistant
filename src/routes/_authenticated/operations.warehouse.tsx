import { createFileRoute } from "@tanstack/react-router";
import { Warehouse } from "lucide-react";
import { OpsPage } from "@/components/ops-page";

export const Route = createFileRoute("/_authenticated/operations/warehouse")({
  component: () => (
    <OpsPage
      icon={Warehouse}
      title="Warehouse"
      description="Inbound, outbound and inventory across DCs."
      highlights={[
        { label: "Inbound today", value: "318", hint: "Pallets received" },
        { label: "Outbound today", value: "402", hint: "Pallets shipped" },
        { label: "Capacity used", value: "71%", hint: "Across 14 sites" },
      ]}
    />
  ),
});