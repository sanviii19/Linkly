import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

export const CardSpotlight = ({
    children,
    radius = 250,
    color = "rgba(139, 92, 246, 0.15)", // Default faint violet spotlight
    className,
    ...props
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return (
        <div
            className={cn(
                "group/spotlight relative overflow-hidden",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {/* The motion div conditionally renders based on hover to circumvent the unused variable lint error, or we can just apply opacity purely based on isHovering if we want */}
            <motion.div
                className={cn(
                    "pointer-events-none absolute z-0 -inset-px transition duration-300",
                    isHovering ? "opacity-100" : "opacity-0"
                )}
                style={{
                    backgroundColor: color,
                    maskImage: useMotionTemplate`
                        radial-gradient(
                            ${radius}px circle at ${mouseX}px ${mouseY}px,
                            white,
                            transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-10 w-full h-full pointer-events-none flex flex-col flex-1">
                <div className="pointer-events-auto h-full w-full flex flex-col flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};
