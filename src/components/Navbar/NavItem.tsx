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
            className={`
        relative py-3 cursor-pointer font-medium
        ${active
                    ? "text-primary"
                    : "text-base-content/70 hover:text-base-content"}
      `}
        >
            {label}
        </div>
    );
});
