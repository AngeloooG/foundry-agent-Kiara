import { Outlet, useLocation } from "react-router-dom";
import { RouteTelemetry } from "~/app/RouteTelemetry";
import { Header } from "~/components/navigation/Header";
import styles from "./KiaraLayout.module.css";

export function KiaraLayout() {
  const location = useLocation();
  const isChatRoute = location.pathname === "/chat";

  return (
    <div className={styles.shell}>
      <RouteTelemetry />
      <Header />
      <div className={isChatRoute ? styles.chatContent : styles.pageContent}>
        <Outlet />
      </div>
    </div>
  );
}
