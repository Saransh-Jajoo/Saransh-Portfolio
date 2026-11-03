import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "line";
  className?: string;
  download?: boolean;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  download,
  external,
}: Props) {
  const styles = {
    primary:
      "bg-ink text-bg hover:bg-cyan hover:text-bg border-transparent",
    ghost:
      "bg-transparent text-ink border-line hover:border-cyan/60 hover:text-cyan",
    line: "bg-transparent text-muted border-transparent hover:text-ink px-0",
  }[variant];

  const shared = cn(
    "inline-flex items-center justify-center gap-2 border px-5 py-3 text-[0.72rem] tracking-[0.16em] uppercase transition-colors duration-300",
    "font-[family-name:var(--font-mono-jb)]",
    styles,
    className,
  );

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={shared}
        target="_blank"
        rel="noreferrer"
        download={download}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={shared} download={download}>
      {children}
    </Link>
  );
}
