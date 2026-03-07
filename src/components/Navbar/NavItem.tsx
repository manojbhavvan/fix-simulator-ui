import { forwardRef } from "react";

export const NavItem = forwardRef<
    HTMLDivElement,
    {
        label: string;
        active: boolean;
        onClick: () => void;
    }
>(function NavItem({ label, active, onClick }, ref) {
    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`relative py-3 cursor-pointer font-medium transition-colors duration-200
            ${active
                    ? "text-brand"
                    : "text-text-muted dark:text-darkText-muted hover:text-brand"
                }
      `}
        >
            {label}
        </div>
    );
});