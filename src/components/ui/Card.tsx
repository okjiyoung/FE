import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  bgColor?: string;
}

export function Card({
  children,
  className = "",
  bgColor = "bg-teum-white",
  ...props
}: CardProps) {
  return (
    <div
      className={`w-full rounded-[24px] p-[20px] ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
