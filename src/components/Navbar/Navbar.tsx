import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavItem } from "./NavItem";

type TabKey = "dashboard" | "fileUpload" | "monitoring";

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const tabsRef = useRef<Record<TabKey, HTMLDivElement | null>>({
    dashboard: null,
    fileUpload: null,
    monitoring: null,
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
    } else {
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
      className="sticky top-0 z-50 bg-background border-b border-border shadow-sm"
    >
      <div className="px-6 py-4 border-b border-border bg-background flex items-center">
        <h1 className="text-2xl font-semibold text-brand tracking-tight">
          Intelli<span className="text-text">FIX</span>
        </h1>
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
            ref={(el) => (tabsRef.current.fileUpload = el)}
            label="File Upload"
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