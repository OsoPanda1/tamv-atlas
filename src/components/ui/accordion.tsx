import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      `
        group relative overflow-hidden
        rounded-2xl border border-white/10
        bg-white/[0.02]
        backdrop-blur-xl
        transition-all duration-500
        hover:border-cyan-400/20
        hover:bg-cyan-500/[0.03]
        data-[state=open]:border-cyan-400/30
        data-[state=open]:shadow-[0_0_40px_rgba(34,211,238,0.08)]
      `,
      className
    )}
    {...props}
  />
));

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        `
          relative flex flex-1 items-center justify-between
          px-6 py-5
          text-left text-sm font-medium
          transition-all duration-300
          hover:text-cyan-300
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-cyan-400/40
          [&[data-state=open]>svg]:rotate-180
        `,
        className
      )}
      {...props}
    >
      {/* glow line */}
      <span
        className="
          absolute inset-x-0 bottom-0 h-px
          bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent
          opacity-0 transition-opacity duration-500
          group-data-[state=open]:opacity-100
        "
      />

      <span className="relative z-10">{children}</span>

      <ChevronDown
        className="
          h-4 w-4 shrink-0
          text-cyan-300/70
          transition-all duration-500
          group-hover:scale-110
        "
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      `
        overflow-hidden
        text-sm text-slate-300
        transition-all duration-500 ease-out
        data-[state=closed]:animate-accordion-up
        data-[state=open]:animate-accordion-down
      `
    )}
    {...props}
  >
    <div
      className={cn(
        `
          px-6 pb-6 pt-2
          leading-relaxed
        `,
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName =
  AccordionPrimitive.Content.displayName;

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
