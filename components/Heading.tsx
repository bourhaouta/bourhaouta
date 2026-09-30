import type { ElementType, ReactNode } from "react";

type Props = {
  caption: string;
  noMargin?: boolean;
  isLight?: boolean;
  className?: string;
  as?: ElementType;
  children: ReactNode;
};

export default function Heading({ caption, noMargin, isLight, className = "", as: Tag = "h2", children }: Props) {
  return (
    <div className={`flex flex-col text-xl font-medium ${noMargin ? "" : "mb-4"} ${className}`}>
      <span
        aria-hidden
        className={`-mb-4 text-4xl leading-none font-light tracking-widest select-none ${
          isLight ? "text-white/50" : "text-secondary-100"
        }`}
      >
        {caption}
      </span>

      <Tag className={isLight ? "text-white" : undefined}>{children}</Tag>
    </div>
  );
}
