import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "~/services/telemetry";

const routeNames: Record<string, string> = {
  "/": "Kiara - Inicio",
  "/chat": "Kiara - Chat",
  "/cases": "Kiara - Casos",
  "/technology": "Kiara - Tecnología",
  "/faq": "Kiara - FAQ",
};

export function RouteTelemetry() {
  const location = useLocation();

  useEffect(() => {
    const normalizedPath = location.pathname.startsWith("/cases/")
      ? "/cases/:id"
      : location.pathname;
    const name = routeNames[normalizedPath] ?? "Kiara - Página";
    trackPageView(name, normalizedPath);
  }, [location.pathname]);

  return null;
}
