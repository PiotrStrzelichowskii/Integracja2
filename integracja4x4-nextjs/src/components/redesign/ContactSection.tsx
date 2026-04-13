"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { useTranslations } from "@/hooks/use-translations";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errors: FormErrors;
}

export default function ContactSection() {
  const { t } = useTranslations();
  const { toast } = useToast();
  const reduceMotion = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const contactInfo = [
    { icon: "call", label: t('contactCallLabel'), value: "+48 501 318 521", sub: "PS Bikes Mariusz Strzelichowski", href: "tel:+48501318521" },
    { icon: "mail", label: t('contactMailLabel'), value: "info@integracja4x4.pl", sub: t('contactMailSub'), href: "mailto:info@integracja4x4.pl" },
    { icon: "location_on", label: t('contactAddressLabel'), value: "ul. Powstania Styczniowego", sub: "30-298 Kraków", href: null },
    { icon: "credit_card", label: t('contactAccountLabel'), value: "76 2490 0005 0000 4000 1600 9299", sub: t('contactAccountSub'), href: null },
  ];

  const subjectOptions = [t('contactSubject1'), t('contactSubject2'), t('contactSubject3'), t('contactSubject4')];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: subjectOptions[0],
    message: "",
  });
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errors: {},
  });

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = t('nameRequired');
    else if (formData.name.trim().length < 2) errors.name = t('nameMinLength');

    if (!formData.email.trim()) errors.email = t('emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = t('emailInvalid');

    if (!formData.message.trim()) errors.message = t('messageRequired');
    else if (formData.message.trim().length < 10)
      errors.message = t('messageMinLength');

    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formState.errors[name as keyof FormErrors]) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: undefined },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: t('error'), description: t('validationError'), variant: "destructive" });
      return;
    }
    setFormState((prev) => ({ ...prev, isSubmitting: true, isError: false, isSuccess: false }));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseText = await response.text();
      let result;
      if (responseText) {
        try { result = JSON.parse(responseText); }
        catch { throw new Error("Nieprawidłowa odpowiedź serwera"); }
      } else {
        throw new Error("Pusta odpowiedź serwera");
      }
      if (!response.ok) {
        if (result.code === "MISSING_API_KEY")
          throw new Error("Formularz kontaktowy nie jest jeszcze skonfigurowany. Skontaktuj się z administratorem.");
        throw new Error(result.error || "Wystąpił błąd podczas wysyłania");
      }
      setFormState((prev) => ({ ...prev, isSubmitting: false, isSuccess: true }));
      trackEvent.contactFormSubmit();
      toast({ title: t('messageSent'), description: t('messageSentDescription') });
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: subjectOptions[0], message: "" });
        setFormState({ isSubmitting: false, isSuccess: false, isError: false, errors: {} });
      }, 3000);
    } catch (error) {
      setFormState((prev) => ({ ...prev, isSubmitting: false, isError: true }));
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      trackEvent.contactFormError(errorMessage);
      toast({
        title: t('sendError'),
        description: error instanceof Error ? error.message : t('sendErrorDescription'),
        variant: "destructive",
      });
    }
  };

  return (
    <motion.section
      id="kontakt"
      className="py-16 md:py-32 bg-surface-container-lowest topo-bg"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
        {/* Contact info */}
        <motion.div className="space-y-6 md:space-y-8" variants={fadeUp}>
          <span className="text-[#F16523] font-headline uppercase tracking-[0.3em] text-sm font-bold">
            {t('contactSectionLabel')}
          </span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter">
            {t('contactSectionTitle')}
          </h2>
          <p className="text-lg text-on-surface/60">
            {t('contactSectionSubtitle')}
          </p>

          <div className="space-y-4 md:space-y-6 pt-2 md:pt-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-6">
                <div className="w-14 h-14 bg-surface-container-high rounded-full flex items-center justify-center text-primary-container border border-outline-variant/20 flex-shrink-0">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-on-surface/40 font-bold">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-xl font-headline font-bold text-on-surface hover:text-primary-container transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-xl font-headline font-bold text-on-surface">{item.value}</div>
                  )}
                  {item.sub && (
                    <div className="text-sm text-on-surface/40 mt-0.5">{item.sub}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          className="bg-[#131313] p-6 md:p-10 border border-outline-variant/10 shadow-2xl"
          style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
          variants={fadeUp}
        >
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-[10px] uppercase tracking-widest font-bold text-on-surface/60 ml-1">
                  {t('contactNameLabel')}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contactNamePlaceholder')}
                  className={`w-full bg-surface-container-high border-none focus:ring-2 focus:ring-primary-container p-3 md:p-4 text-on-surface placeholder:text-on-surface/20 outline-none transition-all input-clipped ${formState.errors.name ? "ring-2 ring-red-500" : ""}`}
                />
                {formState.errors.name && (
                  <p className="text-red-400 text-xs flex items-center gap-1 ml-1">
                    <AlertCircle className="h-3 w-3" /> {formState.errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-[10px] uppercase tracking-widest font-bold text-on-surface/60 ml-1">
                  {t('contactEmailLabel')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contactEmailPlaceholder')}
                  className={`w-full bg-surface-container-high border-none focus:ring-2 focus:ring-primary-container p-3 md:p-4 text-on-surface placeholder:text-on-surface/20 outline-none transition-all ${formState.errors.email ? "ring-2 ring-red-500" : ""}`}
                />
                {formState.errors.email && (
                  <p className="text-red-400 text-xs flex items-center gap-1 ml-1">
                    <AlertCircle className="h-3 w-3" /> {formState.errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-subject" className="text-[10px] uppercase tracking-widest font-bold text-on-surface/60 ml-1">
                {t('contactSubjectLabel')}
              </label>
              <div className="relative">
              <select
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-surface-container-high border-none focus:ring-2 focus:ring-primary-container p-3 md:p-4 text-on-surface appearance-none outline-none transition-all input-clipped pr-10"
              >
                {subjectOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F16523] pointer-events-none material-symbols-outlined text-base">
                expand_more
              </span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-[10px] uppercase tracking-widest font-bold text-on-surface/60 ml-1">
                {t('contactMessageLabel')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder={t('contactMessagePlaceholder')}
                className={`w-full bg-surface-container-high border-none focus:ring-2 focus:ring-primary-container p-3 md:p-4 text-on-surface placeholder:text-on-surface/20 outline-none transition-all resize-none input-clipped ${formState.errors.message ? "ring-2 ring-red-500" : ""}`}
              />
              {formState.errors.message && (
                <p className="text-red-400 text-xs flex items-center gap-1 ml-1">
                  <AlertCircle className="h-3 w-3" /> {formState.errors.message}
                </p>
              )}
              <p className="text-xs text-on-surface/30 ml-1">
                {formData.message.length}
                {t('contactCharMin')}
              </p>
            </div>

            <button
              type="submit"
              disabled={formState.isSubmitting || formState.isSuccess}
              className="btn-offroad-primary font-montserrat uppercase tracking-wide inline-flex w-full items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed [@media(min-height:1000px)]:md:text-lg [@media(min-height:1000px)]:md:py-4 [@media(min-height:1000px)]:md:px-10"
            >
              {formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('contactSending')}
                </>
              ) : formState.isSuccess ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  {t('contactSent')}
                </>
              ) : (
                <span>{t('contactSendBtn')}</span>
              )}
            </button>

            <p className="text-xs text-on-surface/30 text-center">
              {t('contactRequiredNote')}
            </p>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}
