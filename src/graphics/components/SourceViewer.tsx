"use client";

import { useEffect, useMemo, useState } from "react";
import { codeToHtml } from "shiki";

type Props = {
  code: string;
  language?: string;
  explain?: string;
  title?: string;
};

export function SourceViewer({
  code,
  language = "javascript",
  explain,
  title = "algorithm.js",
}: Props) {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const lines = useMemo(() => code.trim().split("\n"), [code]);

  useEffect(() => {
    let active = true;
    codeToHtml(code.trim(), {
      lang: language,
      theme: "github-dark-default",
    }).then((result) => {
      if (active) setHtml(result);
    });
    return () => {
      active = false;
    };
  }, [code, language]);

  async function copy() {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="border border-line bg-bg-2">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <div className="flex items-center gap-3">
          <span className="text-ink">{title}</span>
          <span>lang: {language}</span>
          <span>{lines.length} lines</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="border border-line px-2 py-0.5 text-ink hover:border-cyan hover:text-cyan"
          >
            {collapsed ? "expand" : "collapse"}
          </button>
          <button
            type="button"
            onClick={copy}
            className="border border-line px-2 py-0.5 text-ink hover:border-cyan hover:text-cyan"
          >
            {copied ? "copied" : "copy source"}
          </button>
        </div>
      </div>
      {explain ? (
        <p className="border-b border-line bg-bg px-3 py-2.5 text-xs leading-6 text-muted">
          <span className="mr-2 uppercase tracking-[0.14em] text-cyan">Algorithm:</span>
          {explain}
        </p>
      ) : null}
      {!collapsed ? (
        <div className=" grid max-h-[420px] grid-cols-[40px_1fr] overflow-auto text-[11px] leading-5">
          <div
            aria-hidden="true"
            className="select-none border-r border-line bg-bg py-3 pr-2 text-right font-mono text-[10px] leading-5 text-muted/60"
          >
            {lines.map((_, idx) => (
              <div key={idx}>{idx + 1}</div>
            ))}
          </div>
          <div
            className="overflow-x-auto p-3 [&_code]:font-mono [&_pre]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      ) : null}
    </div>
  );
}
