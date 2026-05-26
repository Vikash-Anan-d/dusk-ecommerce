"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordsMatch = confirmPassword === "" || confirmPassword === password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No actual submission — form state only
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      {/* ── Decorative glow orbs ───────────── */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-accent/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />

      {/* ── Card ───────────────────────────── */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="glass rounded-2xl p-8 sm:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold tracking-widest gradient-text">
              DUSK
            </span>
            <div className="mt-1 h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>

          {/* Title */}
          <h1 className="mt-8 text-center text-2xl font-bold">
            Create Account
          </h1>
          <p className="mt-1 text-center text-sm text-muted">
            Join the DUSK community
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="register-name"
                className="mb-1.5 block text-sm font-medium text-muted"
              >
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                autoComplete="name"
                className="w-full rounded-lg border border-[var(--dusk-border)] bg-elevated px-4 py-2.5 text-sm text-foreground placeholder:text-dim outline-none transition-colors focus:border-[var(--dusk-border-hover)] focus:ring-1 focus:ring-primary/30"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="mb-1.5 block text-sm font-medium text-muted"
              >
                Email
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-lg border border-[var(--dusk-border)] bg-elevated px-4 py-2.5 text-sm text-foreground placeholder:text-dim outline-none transition-colors focus:border-[var(--dusk-border-hover)] focus:ring-1 focus:ring-primary/30"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="mb-1.5 block text-sm font-medium text-muted"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-[var(--dusk-border)] bg-elevated px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-dim outline-none transition-colors focus:border-[var(--dusk-border-hover)] focus:ring-1 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dim transition-colors hover:text-muted"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  id="register-toggle-password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="mb-1.5 block text-sm font-medium text-muted"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full rounded-lg border bg-elevated px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-dim outline-none transition-colors focus:ring-1 focus:ring-primary/30 ${
                    passwordsMatch
                      ? "border-[var(--dusk-border)] focus:border-[var(--dusk-border-hover)]"
                      : "border-red-500/60 focus:border-red-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dim transition-colors hover:text-muted"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  id="register-toggle-confirm-password"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {!passwordsMatch && (
                <p className="mt-1.5 text-xs text-red-400">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary w-full py-3 text-base"
              id="register-submit-btn"
            >
              <UserPlus size={16} />
              Create Account
            </button>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-dim">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary transition-colors hover:text-primary-light"
              id="register-login-link"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
