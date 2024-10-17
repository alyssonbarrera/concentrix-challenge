import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimation,
  type HTMLMotionProps,
} from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  children?: ReactNode;
};

export function Reveal({ children, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
  });

  const mainControls = useAnimation();

  const defaultVariants = {
    hidden: {
      opacity: 0,
      y: 75,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const defaultTransition = {
    duration: 0.25,
    delay: 0.25,
  };

  const variants = rest.variants ?? defaultVariants;
  const transition = rest.transition ?? defaultTransition;

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      {...rest}
      variants={variants}
      transition={transition}
      initial="hidden"
      animate={mainControls}
      className={cn("h-full w-full", rest.className)}
    >
      {children}
    </motion.div>
  );
}
