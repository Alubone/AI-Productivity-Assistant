import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { OpsPage } from "@/components/ops-page";

export const Route = createFileRoute("/_authenticated/operations/customs")({
  component: () => (
    <OpsPage
      icon={ShieldCheck}
      title="Customs & Compliance"
      description="Declarations, classifications and regulatory checks."
      highlights={[
        { label: "Declarations today", value: "612", hint: "Across 22 countries" },
        { label: "Held at customs", value: "9", hint: "Awaiting clearance" },
        { label: "Compliance score", value: "98.7%", hint: "Rolling 30 days" },
      ]}
    />
  ),
});