import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn(
      "relative mx-auto flex w-full justify-center",
      className,
    )}
    {...props}
  >
    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-sky-500/10 to-indigo-500/5 blur-xl" />
    {props.children}
  </nav>
);

Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex flex-row items-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/80 px-3 py-2 backdrop-blur-xl shadow-[0_0_50px_rgba(14,165,233,0.08)]",
      className,
    )}
    {...props}
  />
));

PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "relative",
      className,
    )}
    {...props}
  />
));

PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: "ghost",
        size,
      }),
      `
        relative overflow-hidden rounded-xl border
        transition-all duration-300 ease-out
        hover:scale-[1.06]
        active:scale-[0.96]
      `,
      isActive
        ? `
          border-cyan-400/60
          bg-cyan-500/15
          text-cyan-100
          shadow-[0_0_18px_rgba(34,211,238,0.25)]
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-400/10 before:to-sky-500/5
        `
        : `
          border-slate-800/80
          bg-slate-900/70
          text-slate-400
          hover:border-sky-500/40
          hover:bg-slate-800/80
          hover:text-sky-200
        `,
      className,
    )}
    {...props}
  />
);

PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn(
      "gap-2 pl-3 font-mono tracking-wide",
      className,
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
    <span className="text-xs uppercase">Prev</span>
  </PaginationLink>
);

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(
      "gap-2 pr-3 font-mono tracking-wide",
      className,
    )}
    {...props}
  >
    <span className="text-xs uppercase">Next</span>
    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </PaginationLink>
);

PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      `
        flex h-10 w-10 items-center justify-center
        rounded-xl border border-slate-800/70
        bg-slate-900/60
        text-slate-500
        backdrop-blur-md
      `,
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4 animate-pulse" />
    <span className="sr-only">More pages</span>
  </span>
);

PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
