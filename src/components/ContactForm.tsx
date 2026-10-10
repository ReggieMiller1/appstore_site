"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitContactMessage } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", subject: "", message: "" };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(values: FormState) {
    const next: Partial<FormState> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!isValidEmail(values.email)) next.email = "Please enter a valid email.";
    if (!values.subject.trim()) next.subject = "Please add a subject.";
    if (!values.message.trim() || values.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      await submitContactMessage(form);
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`${field} ${errors.name ? "border-red-500" : "border-border"}`}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`${field} ${errors.email ? "border-red-500" : "border-border"}`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={`${field} ${errors.subject ? "border-red-500" : "border-border"}`}
          placeholder="What's this about?"
        />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${field} resize-none ${errors.message ? "border-red-500" : "border-border"}`}
          placeholder="Tell me about your idea or project..."
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          Thanks — your message has been sent. I'll get back to you soon.
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4" />
          Something went wrong. Please try again or email me directly.
        </div>
      )}
    </form>
  );
}
