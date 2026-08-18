import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from "@fluentui/react-components";
import {
  Chat24Regular,
  DarkTheme24Regular,
  Home24Regular,
  Library24Regular,
  MoreHorizontal24Regular,
  Person24Regular,
  QuestionCircle24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
  Wrench24Regular,
} from "@fluentui/react-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "~/hooks/useAuth";
import { useThemeContext } from "~/contexts/ThemeContext";
import type { ThemeType } from "~/contexts/ThemeContext";
import styles from "./Header.module.css";

const navigationItems = [
  { to: "/", label: "Inicio", icon: <Home24Regular />, end: true },
  { to: "/chat", label: "Hablar con Kiara", icon: <Chat24Regular />, end: false },
  { to: "/cases", label: "Casos", icon: <Library24Regular />, end: false },
  { to: "/technology", label: "Tecnología", icon: <Wrench24Regular />, end: false },
  { to: "/faq", label: "FAQ", icon: <QuestionCircle24Regular />, end: false },
] as const;

const themeItems: Array<{ value: ThemeType; label: string }> = [
  { value: "Light", label: "Tema claro" },
  { value: "Dark", label: "Tema oscuro" },
  { value: "System", label: "Usar tema del sistema" },
];

export function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { savedTheme, isDarkMode, setTheme } = useThemeContext();
  const displayName = user?.name ?? user?.username ?? "Usuario";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand} aria-label="Ir al inicio de Kiara">
          <span className={styles.logo} aria-hidden="true">K</span>
          <span className={styles.brandText}>
            <strong>Kiara</strong>
            <small>CONSEIN</small>
          </span>
        </NavLink>

        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <Menu positioning="below-end">
            <MenuTrigger disableButtonEnhancement>
              <Button
                appearance="subtle"
                icon={isDarkMode ? <WeatherMoon24Regular /> : <WeatherSunny24Regular />}
                aria-label={`Cambiar tema. Tema actual: ${savedTheme}`}
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {themeItems.map((item) => (
                  <MenuItem
                    key={item.value}
                    icon={item.value === "Dark" ? <DarkTheme24Regular /> : undefined}
                    onClick={() => setTheme(item.value)}
                  >
                    {item.label}{savedTheme === item.value ? " ✓" : ""}
                  </MenuItem>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>

          <div className={styles.user} title={displayName}>
            <Person24Regular aria-hidden="true" />
            <span>{displayName}</span>
          </div>

          <Menu positioning="below-end">
            <MenuTrigger disableButtonEnhancement>
              <Button
                className={styles.mobileMenuButton}
                appearance="subtle"
                icon={<MoreHorizontal24Regular />}
                aria-label="Abrir navegación"
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {navigationItems.map((item) => (
                  <MenuItem key={item.to} icon={item.icon} onClick={() => navigate(item.to)}>
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>
      </div>
    </header>
  );
}
