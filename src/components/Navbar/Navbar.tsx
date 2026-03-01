import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavItem } from "./NavItem";
import { useTheme } from "../../theme/useTheme";
import { Sun, Moon } from "lucide-react";

type TabKey = "dashboard" | "fileUpload" | "monitoring" | "simconfig";

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggle } = useTheme();

  const tabsRef = useRef<Record<TabKey, HTMLDivElement | null>>({
    dashboard: null,
    fileUpload: null,
    monitoring: null,
    simconfig: null,
  });

  const [active, setActive] = useState<TabKey>("dashboard");
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
  });

  // Sync active tab with route
  useEffect(() => {
    if (location.pathname.startsWith("/certifications")) {
      setActive("fileUpload");
    } else if (location.pathname.startsWith("/monitoring")) {
      setActive("monitoring");
    } else if (location.pathname.startsWith("/simulator/config")){
      setActive("simconfig");
    }
    else {
      setActive("dashboard");
    }
  }, [location.pathname]);

  // Navbar height
  useEffect(() => {
    if (!navRef.current) return;
    const height = navRef.current.offsetHeight;
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${height}px`
    );
  }, []);

  // Underline animation
  useEffect(() => {
    const el = tabsRef.current[active];
    if (!el) return;

    setUnderlineStyle({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }, [active]);

  return (
    <div
      ref={navRef}
      className="
        sticky top-0 z-50 
        bg-background dark:bg-darkBackground
        border-b border-borderColor dark:border-darkBorder
        shadow-sm
        transition-colors duration-300
      "
    >
      <div className="px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img src="/logo.svg" alt="IntelliFIX Logo" className="h-8 w-auto" />
          <h1 className="text-2xl font-semibold text-brand tracking-tight flex items-baseline">
            Intelli
            <span className="text-text dark:text-darkText">FIX</span>
            <span className="text-[10px] ml-1 text-text-muted dark:text-darkText/60">
              Simulation Engine
            </span>
          </h1>
        </div>

        <button
          onClick={toggle}
          className="
            p-2 rounded-lg
            bg-background-muted dark:bg-darkBackground-muted
            border border-borderColor dark:border-darkBorder
            hover:bg-background-subtle dark:hover:bg-darkBackground-subtle
            transition-colors duration-300
          "
        >
          {isDark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-text-muted" />
          )}
        </button>
      </div>

      <div className="px-6 relative">
        <div className="flex gap-8 text-sm relative">
          <NavItem
            ref={(el) => (tabsRef.current.dashboard = el)}
            label="Dashboard"
            active={active === "dashboard"}
            onClick={() => navigate("/dashboard")}
          />

          <NavItem
            ref={(el) => (tabsRef.current.simconfig = el)}
            label="Simulator Configuration"
            active={active === "simconfig"}
            onClick={() => navigate("/simulator/config")}
          />

          <NavItem
            ref={(el) => (tabsRef.current.fileUpload = el)}
            label="Run Certification"
            active={active === "fileUpload"}
            onClick={() => navigate("/certifications")}
          />

          <NavItem
            ref={(el) => (tabsRef.current.monitoring = el)}
            label="Monitoring"
            active={active === "monitoring"}
            onClick={() => navigate("/monitoring")}
          />

          <span
            className="absolute bottom-0 h-[2px] bg-brand rounded transition-all duration-300 ease-out"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
            }}
          />
        </div>
      </div>
    </div>
  );
}