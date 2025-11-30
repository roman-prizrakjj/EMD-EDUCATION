import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PulseBeams = ({
  children,
  beams,
  className,
  gradientColors = {
    start: "#18CCFC",
    middle: "#6344F5",
    end: "#AE48FF"
  }
}) => {
  return (
    <div className={cn("relative flex h-full w-full items-center justify-center overflow-hidden", className)}>
      <div className="relative z-10">{children}</div>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 858 434"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        {beams.map((beam, index) => (
          <React.Fragment key={index}>
            <path
              d={beam.path}
              stroke="url(#gradient-static)"
              strokeOpacity="0.2"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <motion.path
              d={beam.path}
              stroke={`url(#gradient-${index})`}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <motion.linearGradient
                id={`gradient-${index}`}
                gradientUnits="userSpaceOnUse"
                initial={beam.gradientConfig.initial}
                animate={beam.gradientConfig.animate}
                transition={beam.gradientConfig.transition}
              >
                <stop stopColor={gradientColors.start} stopOpacity="0" />
                <stop stopColor={gradientColors.start} />
                <stop offset="0.325" stopColor={gradientColors.middle} />
                <stop offset="1" stopColor={gradientColors.end} stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </React.Fragment>
        ))}
        <defs>
          <linearGradient
            id="gradient-static"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop stopColor={gradientColors.start} stopOpacity="0.2" />
            <stop offset="1" stopColor={gradientColors.end} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {beams.map((beam, index) => (
          <React.Fragment key={`dots-${index}`}>
            {beam.connectionPoints.map((point, idx) => (
              <circle
                key={idx}
                cx={point.cx}
                cy={point.cy}
                r={point.r}
                fill="white"
                fillOpacity="0.1"
              />
            ))}
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};
