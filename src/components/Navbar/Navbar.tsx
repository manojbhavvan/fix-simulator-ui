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

  const isCertificationsRoute = location.pathname.startsWith("/certifications");
  const isDashboardRoute =
    location.pathname === "/" || location.pathname === "/dashboard";

  useEffect(() => {
    if (!navRef.current) return;
    const height = navRef.current.offsetHeight;
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${height}px`
    );
  }, []);

  useEffect(() => {
    if (isCertificationsRoute) {
      setActive("fileUpload");
    }
  }, [isCertificationsRoute]);

  useEffect(() => {
    if (!isDashboardRoute) return;

    const dashboard = document.getElementById("dashboard");
    const monitoring = document.getElementById("monitoring");

    if (!dashboard || !monitoring) return;

    const navbarHeight =
      parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--navbar-height")
      ) || 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const dashboardEntry = entries.find(
          (e) => e.target.id === "dashboard"
        );
        const monitoringEntry = entries.find(
          (e) => e.target.id === "monitoring"
        );

        if (monitoringEntry?.isIntersecting) {
          setActive("monitoring");
          return;
        }

        if (dashboardEntry?.isIntersecting) {
          setActive("dashboard");
        }
      },
      {
        rootMargin: `-${navbarHeight}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    observer.observe(dashboard);
    observer.observe(monitoring);

    return () => observer.disconnect();
  }, [isDashboardRoute]);

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
      className="sticky top-0 z-50 bg-base-100 border-b border-base-300 shadow-sm"
    >
      {/* Title */}
      <div className="px-6 py-3 border-b border-base-200">
        <span className="text-lg font-semibold">
          AI FIX Certification Tool
        </span>
      </div>

      {/* Tabs */}
      <div className="px-6 relative">
        <div className="flex gap-6 text-sm relative">
          {/* Dashboard */}
          <NavItem
            ref={(el) => (tabsRef.current.dashboard = el)}
            label="Dashboard"
            active={active === "dashboard"}
            onClick={() => {
              setActive("dashboard");

              if (isCertificationsRoute) {
                navigate("/dashboard");
                return;
              }

              document
                .getElementById("dashboard")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />

          {/* File Upload */}
          <div
            ref={(el) => (tabsRef.current.fileUpload = el)}
            className={`py-3 cursor-pointer ${
              active === "fileUpload"
                ? "text-base-content"
                : "text-base-content/70 hover:text-base-content"
            }`}
            onClick={() => navigate("/certifications")}
          >
            File Upload
          </div>

          {/* Monitoring */}
          <NavItem
            ref={(el) => (tabsRef.current.monitoring = el)}
            label="Monitoring"
            active={active === "monitoring"}
            onClick={() => {
              setActive("monitoring");

              if (isCertificationsRoute) {
                navigate("/dashboard");
                setTimeout(() => {
                  document
                    .getElementById("monitoring")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 50);
                return;
              }

              document
                .getElementById("monitoring")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />

          {/* Underline */}
          <span
            className="absolute bottom-0 h-[2px] bg-primary rounded
                       transition-all duration-300 ease-out"
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
