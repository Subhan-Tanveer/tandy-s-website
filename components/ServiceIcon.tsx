import {
  AppWindow,
  Building2,
  Rows3,
  Sun,
  Grid3x3,
  CloudRain,
  BatteryCharging,
  SprayCan,
  Lightbulb,
  Feather,
  Fence,
  Fan,
  Home,
  type LucideProps,
} from "lucide-react";
import type { Service } from "@/lib/services";

const ICONS: Record<Service["icon"], React.ComponentType<LucideProps>> = {
  AppWindow,
  Building2,
  Rows3,
  Sun,
  Grid3x3,
  CloudRain,
  BatteryCharging,
  SprayCan,
  Lightbulb,
  Feather,
  Fence,
  Fan,
  Home,
};

export default function ServiceIcon({
  name,
  ...props
}: { name: Service["icon"] } & LucideProps) {
  const Icon = ICONS[name];
  return <Icon {...props} />;
}
