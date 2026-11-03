import { cn } from "@/lib/cn";

type Props = {
  index: string;
  kicker: string;
  title: string;
  titleClassName?: string;
  children?: React.ReactNode;
};

export function SectionHeading({
  index,
  kicker,
  title,
  titleClassName,
  children,
}: Props) {
  return (
    <header className="grid gap-8 lg:grid-cols-[140px_1fr] lg:gap-16">
      <div className="meta pt-2">
        <span className="text-cyan">{index}</span>
        <span className="mx-3 text-line-strong">/</span>
        <span>{kicker}</span>
      </div>
      <div className="max-w-4xl">
        <h2
          className={cn(
            "display text-[clamp(2.1rem,5.4vw,4.6rem)] text-ink",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {children ? (
          <div className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-muted">
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
