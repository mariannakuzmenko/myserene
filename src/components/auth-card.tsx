import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AuroraBg, Logo } from "@/components/site-chrome";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="relative min-h-screen grid place-items-center px-4 py-16">
      <AuroraBg />
      <div className="w-full max-w-md glass-card rounded-[32px] p-7 sm:p-10 animate-rise">
        <Link to="/" className="flex items-center gap-2 justify-center">
          <Logo className="h-9" />
          <span className="font-bold text-lg text-ink">MySerene</span>
        </Link>
        <h1 className="mt-8 text-3xl font-semibold text-center text-ink">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-ink-soft text-center">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

export const inputCls =
  "w-full glass rounded-2xl px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-brand/60 placeholder:text-ink-soft/70";

export function Field({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input {...props} aria-invalid={!!error} className={`mt-1.5 ${inputCls}`} />
      {error && <span role="alert" className="mt-1 block text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}

export function Notice({ kind, children }: { kind: "error" | "success"; children: ReactNode }) {
  return (
    <div role={kind === "error" ? "alert" : "status"}
      className={`rounded-2xl px-4 py-3 text-sm font-medium ${kind === "error" ? "bg-destructive/10 text-destructive border border-destructive/30" : "bg-brand/10 text-ink border border-brand/30"}`}>
      {children}
    </div>
  );
}
