"use client";

import React from "react";
import { motion, type Variants } from "motion/react";

type RevealVariant = "fade-up" | "fade-down" | "zoom-in" | "slide-left" | "slide-right" | "flip-up";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

const variantStyles: Record<RevealVariant, { hidden: any; visible: any }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 50, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.82, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 70 },
    visible: { opacity: 1, x: 0 },
  },
  "flip-up": {
    hidden: { opacity: 0, rotateX: 30, y: 40 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.65,
  className = "",
  viewportMargin = "-60px",
  once = true,
}: ScrollRevealProps) {
  const selected = variantStyles[variant];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin as any }}
      variants={{
        hidden: selected.hidden,
        visible: {
          ...selected.visible,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1], // snappy Apple/Linear cubic-bezier
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  viewportMargin?: string;
  once?: boolean;
}

const containerVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.12,
  viewportMargin = "-60px",
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin as any }}
      variants={containerVariants(staggerDelay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  className?: string;
}

export function StaggerItem({
  children,
  variant = "fade-up",
  className = "",
}: StaggerItemProps) {
  const selected = variantStyles[variant];

  return (
    <motion.div
      variants={{
        hidden: selected.hidden,
        visible: {
          ...selected.visible,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
