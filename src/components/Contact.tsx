import { useState, type FormEvent } from "react";
import { profile } from "../data/portfolio";
import { Icon, Reveal, Section } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";

const CHANNELS = [
  { icon: "mail", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: "phone", label: "Phone", value: profile.phone, href: profile.phoneHref },
  { icon: "linkedin", label: "LinkedIn", value: "Pandurang Chavan", href: profile.linkedin },
  { icon: "github", label: "GitHub", value: "pandurangchavan809", href: profile.github },
  { icon: "leetcode", label: "LeetCode", value: "Pandurang_0188", href: profile.leetcode },
] as const;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(profile.formspree, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" kicker="Contact" title="Let's build something intelligent">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="card p-6 sm:p-8">
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Name
              <input name="name" required autoComplete="name" className="field mt-1.5" />
            </label>
            <label className="text-sm font-medium">
              Email
              <input name="email" type="email" required autoComplete="email" className="field mt-1.5" />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Subject
              <input name="subject" required className="field mt-1.5" />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Message
              <textarea name="message" rows={5} required className="field mt-1.5 resize-none" />
            </label>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              <p role="status" className="text-sm text-muted">
                {status === "sent" && "Thanks, your message is on its way."}
                {status === "error" && `That didn't send. Please email ${profile.email} instead.`}
              </p>
            </div>
          </form>
        </Reveal>

        <Reveal className="grid content-start gap-3">
          {CHANNELS.map(({ icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="card card-interactive flex items-center gap-4 p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-violet">
                <Icon name={icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-muted">{label}</span>
                <span className="block truncate text-sm font-medium">{value}</span>
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
