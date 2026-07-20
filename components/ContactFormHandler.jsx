"use client";

import { useEffect } from "react";

// The contact forms live inside dangerouslySetInnerHTML content (action="#"),
// so there is no React onSubmit. Attach one delegated submit listener that
// recognises a contact form (has an email input + a message textarea), POSTs it
// to /api/contact, and shows an inline success/error note.
export default function ContactFormHandler() {
  useEffect(() => {
    function isContactForm(form) {
      return (
        form.querySelector('input[name="email"]') &&
        form.querySelector('textarea[name="message"]')
      );
    }

    function note(form, msg, ok) {
      let el = form.querySelector(".cf-result");
      if (!el) {
        el = document.createElement("p");
        el.className = "cf-result";
        el.style.cssText =
          "margin-top:14px;font-size:13.5px;font-weight:500;text-align:center;line-height:1.5";
        form.appendChild(el);
      }
      el.style.color = ok ? "#2e7d32" : "#c0392b";
      el.textContent = msg;
    }

    async function onSubmit(e) {
      const form = e.target;
      if (!(form instanceof HTMLFormElement) || !isContactForm(form)) return;
      e.preventDefault();

      const btn = form.querySelector('.cf-send, button[type="submit"]');
      const original = btn ? btn.textContent : "";
      const val = (n) => form.querySelector(`[name="${n}"]`)?.value?.trim() || "";
      const data = {
        name: val("name"),
        email: val("email"),
        phone: val("phone"),
        message: val("message"),
      };

      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending…";
      }
      try {
        const res = await fetch("/api/contact/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json.ok) {
          form.reset();
          note(form, "Thank you! Your message has been sent — we’ll reply soon.", true);
        } else {
          note(
            form,
            json.error && typeof json.error === "string" && !json.message
              ? json.error
              : (json.message || "Something went wrong. Please email info@adhiroha.com."),
            false
          );
        }
      } catch {
        note(form, "Network error. Please email us at info@adhiroha.com.", false);
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = original;
        }
      }
    }

    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, []);

  return null;
}
