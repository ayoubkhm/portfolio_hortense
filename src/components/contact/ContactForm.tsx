"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(data: FormData): FormErrors {
    const newErrors: FormErrors = {};
    if (!data.name.trim()) newErrors.name = "Le nom est requis.";
    if (!data.email.trim()) {
      newErrors.email = "L\u2019email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email = "Veuillez entrer une adresse email valide.";
    }
    if (!data.service) newErrors.service = "Veuillez sélectionner un service.";
    if (!data.message.trim()) newErrors.message = "Le message est requis.";
    return newErrors;
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => { const next = { ...prev }; delete next[name as keyof FormErrors]; return next; });
    }
    if (submitError) setSubmitError(null);
    if (submitSuccess) setSubmitSuccess(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setFormData(initialFormData);
      } else {
        const body = await res.json().catch(() => null);
        setSubmitError(body?.error ?? "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      setSubmitError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-sand bg-white px-4 py-3 text-charcoal placeholder:text-warmgray focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors font-sans text-sm";
  const labelClasses = "block mb-1.5 text-sm font-medium text-charcoal";
  const errorTextClasses = "mt-1 text-xs text-red-600";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="name" className={labelClasses}>Nom complet <span className="text-gold">*</span></label>
        <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Votre nom" className={inputClasses} />
        {errors.name && <p className={errorTextClasses}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>Email <span className="text-gold">*</span></label>
        <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="votre@email.com" className={inputClasses} />
        {errors.email && <p className={errorTextClasses}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>Téléphone <span className="text-warmgray text-xs font-normal">(optionnel)</span></label>
        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="06 XX XX XX XX" className={inputClasses} />
      </div>

      <div>
        <label htmlFor="service" className={labelClasses}>Prestation souhaitée <span className="text-gold">*</span></label>
        <select id="service" name="service" required value={formData.service} onChange={handleChange} className={`${inputClasses} ${!formData.service ? "text-warmgray" : ""}`}>
          <option value="" disabled>Sélectionnez une prestation</option>
          <option value="Mariage">Mariage</option>
          <option value="Drone">Drone</option>
          <option value="Autre">Autre</option>
        </select>
        {errors.service && <p className={errorTextClasses}>{errors.service}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>Message <span className="text-gold">*</span></label>
        <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="Décrivez votre projet, la date souhaitée, le lieu..." className={`${inputClasses} resize-vertical`} />
        {errors.message && <p className={errorTextClasses}>{errors.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-gold px-6 py-3.5 text-white font-medium text-sm tracking-wide uppercase transition-all hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:opacity-60 disabled:cursor-not-allowed">
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours...
          </span>
        ) : "Envoyer le message"}
      </button>

      {submitSuccess && (
        <div className="rounded-lg border border-sage/30 bg-sage/10 p-4 text-sm text-sage">
          <p className="font-medium">Merci ! Votre message a bien été envoyé. Je vous répondrai dans les plus brefs délais.</p>
        </div>
      )}

      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p>{submitError}</p>
        </div>
      )}
    </form>
  );
}
