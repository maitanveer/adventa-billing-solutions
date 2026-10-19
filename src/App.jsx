import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  ClipboardCheck,
  FileCheck2,
  FileClock,
  HeartPulse,
  Menu,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const emailAddress = 'adventabillingsolution@gmail.com';
const phoneDisplay = '03700376012';
const phoneLink = '+923700376012';
const whatsappLink = `https://wa.me/923700376012?text=${encodeURIComponent('Hello ADVENTA Billing Solutions, I would like to learn more about your medical billing services.')}`;
const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const services = [
  { title: 'Medical billing', icon: FileCheck2, summary: 'Charge entry, billing data management, and claim workflow support.', detail: 'Support with preparing and processing medical claims, managing billing data, and keeping submission workflows organized.', helps: 'Addresses time-consuming billing administration and avoidable gaps in claim preparation.' },
  { title: 'Revenue cycle management', icon: Banknote, summary: 'A coordinated view of billing tasks and reimbursement progress.', detail: 'Support across agreed revenue cycle activities, with attention to claim progress, accounts receivable follow-up, and workflow visibility.', helps: 'Helps practices keep billing activity moving and understand where follow-up may be needed.' },
  { title: 'Claims management', icon: ClipboardCheck, summary: 'Preparation, submission, status monitoring, and issue follow-up.', detail: 'Assistance with claims preparation and submission, monitoring claim status, and identifying missing or inconsistent information.', helps: 'Provides a more organized way to track claim activity and surface issues for attention.' },
  { title: 'Payment posting', icon: Banknote, summary: 'Payment and adjustment recording with discrepancy follow-up.', detail: 'Posting insurance payments and adjustments, recording patient payments where applicable, and reconciling payment information.', helps: 'Supports clearer account records and helps identify payment details that may need review.' },
  { title: 'Denial management', icon: FileClock, summary: 'Review denied or rejected claims and coordinate next steps.', detail: 'Reviewing denials, identifying potential causes, correcting issues where appropriate, and supporting resubmission or appeal workflows when applicable.', helps: 'Helps teams understand claim issues and coordinate appropriate follow-up.' },
  { title: 'Eligibility and verification', icon: BadgeCheck, summary: 'Insurance eligibility and relevant benefit checks.', detail: 'Checking insurance eligibility and coverage, verifying relevant benefits before services, and supporting accurate patient and insurance details.', helps: 'Can help practices address coverage information gaps earlier in the billing workflow.' },
  { title: 'Provider credentialing', icon: ShieldCheck, summary: 'Enrollment documentation and payer workflow assistance.', detail: 'Assistance with provider enrollment documentation, credentialing applications, and follow-up through payer workflows.', helps: 'Supports the administrative coordination involved in enrollment processes.' },
  { title: 'Account Receivable', icon: Sparkles, summary: 'Accelerate cash flow and reduce outstanding balances.', detail: 'Tracking unpaid claims, following up on outstanding balances, monitoring payment progress, and identifying opportunities to improve collections and reduce aged receivables.', helps: 'Helps healthcare practices improve cash flow visibility, reduce overdue balances, and support timely reimbursements.' },
];

const faqs = [
  { question: 'What types of practices can discuss services with ADVENTA?', answer: 'Healthcare providers can contact ADVENTA to discuss their practice, current billing workflow, and the support they are looking for. Service fit and scope are confirmed directly.' },
  { question: 'Are all services listed available to every client?', answer: 'Not necessarily. The services shown are potential areas to discuss, not a promise that every service is currently offered or suitable for every practice. ADVENTA will confirm scope during an initial conversation.' },
  { question: 'How do I get started?', answer: 'Use the contact form or email ADVENTA with a brief description of your practice and business needs. Please do not send patient records or other protected health information.' },
  { question: 'Does the contact form send my message directly?', answer: 'Yes. The form sends your business inquiry through EmailJS to ADVENTA. You will see an on-page confirmation only after EmailJS confirms the request was accepted.' },
];

const navLinks = [['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Why ADVENTA', '/process'], ['Contact', '/contact']];

function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Brand() {
  return <Link className="brand" to="/" aria-label="ADVENTA Billing Solutions home"><img src="/logo.png" alt="" className="brand__mark" /><span className="brand__text"><strong>ADVENTA</strong><span>Billing Solutions</span></span></Link>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setMenuOpen(false), [pathname]);
  return (
    <header className="site-header"><div className="header-inner">
      <Brand />
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        {navLinks.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>{label}</NavLink>)}
        <Link className="button button--small button--orange nav-cta" to="/contact">Discuss your needs <ArrowUpRight size={15} /></Link>
      </nav>
    </div></header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main shell">
        <div className="footer-brand-block"><Brand /><p>Accurate Claims. Faster Reimbursements.</p></div>
        <div className="footer-column"><h2>Explore</h2><Link to="/about">About ADVENTA</Link><Link to="/services">Services</Link><Link to="/process">Why ADVENTA</Link></div>
        <div className="footer-column"><h2>Get in touch</h2><a href={`mailto:${emailAddress}`}>{emailAddress}</a><a href={`tel:${phoneLink}`}>{phoneDisplay}</a><Link to="/contact">Contact our team <ArrowUpRight size={14} /></Link></div>
      </div>
      <div className="footer-bottom shell"><span>© {new Date().getFullYear()} ADVENTA Billing Solutions</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div>
    </footer>
  );
}

function PageIntro({ eyebrow, title, body }) {
  return <section className="page-intro shell"><p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p><h1>{title}</h1>{body && <p className="page-intro__body">{body}</p>}</section>;
}

function CTASection({ title = 'Let’s talk about your billing needs.', body = 'Start with a conversation about your practice, your workflow, and the support you are looking for.' }) {
  return <section className="cta-band"><div className="cta-band__inner shell"><div><p className="eyebrow eyebrow--light">A thoughtful next step</p><h2>{title}</h2><p>{body}</p></div><Link to="/contact" className="button button--light">Discuss your billing needs <ArrowRight size={17} /></Link></div></section>;
}

function ServiceCards({ featured = false }) {
  const shownServices = featured ? services.slice(0, 4) : services;
  return <div className={featured ? 'service-grid service-grid--featured' : 'service-grid'}>{shownServices.map(({ title, icon: Icon, summary, detail, helps }) => <article className="service-card" key={title}><span className="service-card__icon"><Icon size={21} strokeWidth={1.8} /></span><h3>{title}</h3><p>{featured ? summary : detail}</p>{!featured && <p className="service-card__helps"><strong>Practice support:</strong> {helps}</p>}<Link to="/contact" state={{ service: title }} className="text-link">Discuss this service <ArrowRight size={15} /></Link></article>)}</div>;
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  return <div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item${openIndex === index ? ' is-open' : ''}`} key={faq.question}><h3><button type="button" aria-expanded={openIndex === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}><span>{faq.question}</span><span className="faq-toggle" aria-hidden="true">{openIndex === index ? '−' : '+'}</span></button></h3><div id={`faq-answer-${index}`} className="faq-answer" hidden={openIndex !== index}><p>{faq.answer}</p></div></div>)}</div>;
}

function HomePage() {
  return <><PageMeta title="Medical Billing & RCM | ADVENTA Billing Solutions" description="ADVENTA helps healthcare providers simplify medical billing and revenue cycle workflows. Accurate Claims. Faster Reimbursements." /><main>
    <section className="hero"><div className="hero__inner shell"><div className="hero__copy"><p className="eyebrow"><span className="eyebrow-line" />Medical billing, made more manageable</p><h1>Smarter medical billing for <span>better financial performance.</span></h1><p className="hero__tagline">Accurate Claims. Faster Reimbursements.</p><p className="hero__body">ADVENTA helps healthcare providers simplify billing and revenue cycle work, so practice teams can give more attention to patient care.</p><div className="hero__actions"><Link to="/contact" className="button button--orange">Discuss your billing needs <ArrowRight size={17} /></Link><Link to="/services" className="button button--outline">Explore our services</Link></div><div className="hero__note"><ShieldCheck size={17} /><span>Clear communication. Careful follow-through.</span></div></div><div className="hero-visual" aria-label="Healthcare team collaborating on practice operations" role="img"><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1300&q=85" alt="Healthcare professionals discussing patient care" /><div className="hero-visual__label"><span className="status-dot" /><div><strong>Practice-first support</strong><span>Billing workflows shaped around your needs</span></div></div><div className="hero-visual__index">01 <span>/ 05</span></div></div></div><a className="hero-scroll" href="#introduction"><span>Scroll to explore</span><ArrowDown size={15} /></a></section>
    <section id="introduction" className="intro-section section-pad"><div className="shell intro-grid"><div><p className="eyebrow"><span className="eyebrow-line" />A steadier billing workflow</p><h2>More room to focus on <em>care.</em></h2></div><div className="intro-copy"><p>Medical billing can pull time and attention away from the work your practice is here to do. ADVENTA Billing Solutions supports healthcare providers with reliable, accurate billing and revenue cycle assistance.</p><p>We take time to understand your needs, communicate clearly, and agree on a service scope that fits your practice.</p><Link to="/about" className="text-link">Get to know ADVENTA <ArrowRight size={16} /></Link></div></div></section>
    <section className="services-preview section-pad section-warm"><div className="shell"><div className="section-heading section-heading--split"><div><p className="eyebrow"><span className="eyebrow-line" />Potential areas of support</p><h2>Billing support, shaped<br />around your practice.</h2></div><p>These are service areas to discuss with ADVENTA. Availability and scope are confirmed directly before any engagement.</p></div><ServiceCards featured /><div className="center-action"><Link to="/services" className="button button--outline">View all service areas <ArrowRight size={16} /></Link></div></div></section>
    <section className="why-section section-pad"><div className="shell why-grid"><div className="why-heading"><p className="eyebrow"><span className="eyebrow-line" />A considered approach</p><h2>Dependable support.<br /><em>Clear expectations.</em></h2><p>Good billing support starts with understanding how your practice works. ADVENTA’s approach is collaborative, transparent, and tailored to the agreed scope.</p><Link to="/process" className="text-link">See how we work <ArrowRight size={16} /></Link></div><div className="principles-list">{[['01', 'Organized workflows', 'Agree clear responsibilities and keep billing tasks coordinated.'], ['02', 'Attention to detail', 'Give claim information and follow-up the careful review they need.'], ['03', 'Open communication', 'Keep conversations direct, timely, and centered on practice needs.']].map(([number, title, text]) => <div className="principle" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={17} /></div>)}</div></div></section>
    <section className="process-strip section-pad section-warm"><div className="shell"><div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" />Start with a conversation</p><h2>A straightforward way to begin.</h2></div><div className="mini-steps">{[['01', 'Discuss', 'Share what your practice needs.'], ['02', 'Assess', 'Review workflow and service fit.'], ['03', 'Agree', 'Set clear scope and responsibilities.'], ['04', 'Collaborate', 'Keep communication ongoing.']].map(([number, title, text]) => <div key={number}><span>{number}</span><strong>{title}</strong><p>{text}</p></div>)}</div></div></section>
    <section className="faq-section section-pad"><div className="shell faq-grid"><div><p className="eyebrow"><span className="eyebrow-line" />Questions, answered</p><h2>A few things to know.</h2><p className="muted">Have a question specific to your practice? We’re happy to discuss it.</p><Link to="/contact" className="text-link">Ask ADVENTA <ArrowRight size={16} /></Link></div><FAQ /></div></section>
    <CTASection title="Let us handle the billing, so you can focus on better healthcare." />
  </main></>;
}

function AboutPage() {
  return <><PageMeta title="About ADVENTA | Medical Billing Solutions" description="Learn how ADVENTA Billing Solutions supports healthcare providers with dependable medical billing and revenue cycle assistance." /><main>
    <PageIntro eyebrow="About ADVENTA" title={<>Better support for<br /><em>the business of care.</em></>} body="We help healthcare providers simplify medical billing and revenue cycle work with reliable service, clear communication, and solutions shaped around each practice." />
    <section className="about-story section-pad section-warm"><div className="shell about-story__grid"><div className="about-story__stamp"><HeartPulse size={38} strokeWidth={1.3} /><span>ADVENTA<br />Billing Solutions</span><small>Accurate Claims. Faster Reimbursements.</small></div><div><p className="eyebrow"><span className="eyebrow-line" />Our company</p><h2>We take billing complexity off your plate.</h2><p>ADVENTA Billing Solutions helps healthcare providers streamline medical billing and revenue cycle management. Our work is designed to support accurate claims, reduce administrative workload, and help practices follow billing activity with greater clarity.</p><p>Our goal is to give providers more room to focus on quality patient care while we handle the complexities of medical billing and revenue management. We believe dependable service begins with listening, transparent communication, and an understanding of each practice’s needs.</p><p className="about-story__closing">Let us handle the billing, so you can focus on better healthcare.</p></div></div></section>
    <section className="mission-section section-pad"><div className="shell mission-grid"><article><p className="eyebrow"><span className="eyebrow-line" />Our mission</p><h2>Make billing work more manageable.</h2><p>Support healthcare providers with accurate, reliable billing and revenue cycle assistance, reducing administrative burden so they can focus on quality patient care.</p></article><article><p className="eyebrow"><span className="eyebrow-line" />Our vision</p><h2>More attention where it matters.</h2><p>Contribute to a healthcare environment where providers have dependable, transparent billing support and more room to focus on caring for patients.</p></article></div></section>
    <section className="values-section section-pad"><div className="shell"><div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" />What guides our work</p><h2>Principles we bring to every conversation.</h2></div><div className="values-grid">{[['01', 'Accuracy', 'Careful attention to billing details and claim information.'], ['02', 'Reliability', 'A consistent, organized approach to agreed responsibilities.'], ['03', 'Transparency', 'Clear communication about scope, progress, and follow-up.'], ['04', 'Confidentiality', 'Respect for sensitive information and responsible handling practices.'], ['05', 'Client-focused service', 'Support shaped around the needs and workflows of each practice.']].map(([number, title, text]) => <article className="value-item" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <CTASection title="Let’s explore whether ADVENTA is a fit for your practice." />
  </main></>;
}

function ServicesPage() {
  return <><PageMeta title="Medical Billing Services & RCM | ADVENTA" description="Explore potential medical billing, claims management, payment posting, denial follow-up, and revenue cycle support areas with ADVENTA." /><main>
    <PageIntro eyebrow="Services" title={<>Practical support across<br /><em>the billing cycle.</em></>} body="Explore potential areas of support for your practice. Every service, workflow, and responsibility is discussed and confirmed directly with ADVENTA before an engagement." />
    <section className="services-page section-pad section-warm"><div className="shell"><div className="service-scope-note"><ShieldCheck size={20} /><p><strong>Service scope is confirmed with each practice.</strong> The items below are areas to discuss, not a guarantee that each service is currently offered or suitable for every client.</p></div><ServiceCards /><div className="services-tail"><MessagesSquare size={21} /><p>Not sure what kind of support fits? Start with a conversation about your current billing workflow.</p><Link to="/contact" className="button button--orange">Request a consultation <ArrowRight size={16} /></Link></div></div></section>
  </main></>;
}

const processSteps = [
  ['01', 'Initial discussion', 'We learn about your practice, current billing needs, and the kind of support you are seeking.'],
  ['02', 'Needs assessment', 'Together, we review the relevant workflow and clarify the service requirements to discuss.'],
  ['03', 'Onboarding', 'If there is a fit, responsibilities, access, documentation, and working processes are agreed before service begins.'],
  ['04', 'Service delivery', 'ADVENTA carries out the billing and revenue cycle tasks that have been agreed with your practice.'],
  ['05', 'Ongoing communication', 'Stay connected on claim issues, progress, and opportunities to improve the agreed workflow.'],
];

function ProcessPage() {
  return <><PageMeta title="Why ADVENTA & Our Process | Medical Billing Support" description="See ADVENTA's collaborative approach to medical billing support, from an initial discussion through ongoing communication." /><main>
    <PageIntro eyebrow="Why ADVENTA / Our process" title={<>A thoughtful partner<br /><em>for billing work.</em></>} body="Organized workflows, careful claim attention, and clear communication can make billing administration more manageable. We start by understanding what your practice actually needs." />
    <section className="benefits-section section-pad section-warm"><div className="shell benefits-grid"><div className="benefits-lead"><p className="eyebrow"><span className="eyebrow-line" />The way we work</p><h2>Support built on clarity and follow-through.</h2><p>Every practice is different. Our approach begins with a conversation and builds around an agreed scope, so responsibilities and expectations are understood from the start.</p></div><div className="benefit-points">{[['Organized billing workflows', 'Bring structure to the billing tasks your practice chooses to discuss.'], ['Attention to claim accuracy', 'Review claim details carefully and surface information that may need attention.'], ['Support for claim follow-up', 'Keep agreed follow-up work visible and coordinated.'], ['Clear communication', 'Discuss progress, questions, and next steps in a straightforward way.'], ['A tailored service approach', 'Shape the working relationship around your requirements and workflow.']].map(([title, text]) => <article key={title}><span><BadgeCheck size={18} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="timeline-section section-pad"><div className="shell"><div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" />From first conversation to ongoing support</p><h2>A clear process, agreed together.</h2></div><div className="timeline">{processSteps.map(([number, title, text]) => <article className="timeline-step" key={number}><span className="timeline-step__number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <CTASection title="Start with a conversation about your practice." />
  </main></>;
}

function ContactPage() {
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', practice: '', email: '', phone: '', service: location.state?.service || '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [submissionState, setSubmissionState] = useState('idle');
  const submissionLockRef = useRef(false);

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setStatus('');
    setSubmissionState('idle');
  }

  async function submitForm(event) {
    event.preventDefault();
    if (submissionLockRef.current) return;
    const nextErrors = {};
    const email = formData.email.trim();
    const emailField = document.getElementById('email');
    if (!formData.name.trim()) nextErrors.name = 'Enter your name.';
    if (!formData.practice.trim()) nextErrors.practice = 'Enter your business or practice name.';
    if (!emailField?.validity.valid || !/^[^\s@]+@(?:[^\s.@]+\.)+[^\s.@]+$/.test(email)) nextErrors.email = 'Enter a valid work email address.';
    if (!formData.service.trim()) nextErrors.service = 'Select a service of interest.';
    if (!formData.message.trim()) nextErrors.message = 'Add a brief message about your business needs.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('Please review the highlighted fields.');
      setSubmissionState('error');
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      setStatus('Email delivery is not configured yet. Please use the direct email link below.');
      setSubmissionState('error');
      return;
    }

    submissionLockRef.current = true;
    setSubmissionState('sending');
    setStatus('Sending your inquiry...');
    try {
      const response = await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: formData.name.trim(),
          business_name: formData.practice.trim(),
          reply_to: email,
          phone: formData.phone.trim() || 'Not provided',
          service: formData.service,
          message: formData.message.trim(),
        },
        { publicKey: emailJsConfig.publicKey },
      );
      if (!Number.isInteger(response.status) || response.status < 200 || response.status >= 300) {
        throw new Error(`EmailJS returned status ${response.status}.`);
      }
      setSubmissionState('success');
      setStatus('Your inquiry was sent successfully. Thank you for contacting ADVENTA.');
    } catch (error) {
      console.error('EmailJS inquiry delivery failed.', error);
      setSubmissionState('error');
      setStatus('We could not send your inquiry. Please try again or use the direct email link below.');
    } finally {
      submissionLockRef.current = false;
    }
  }

  const fieldProps = (name) => ({ id: name, name, value: formData[name], onChange: updateField, disabled: submissionState === 'sending', 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${name}-error` : undefined });

  return <><PageMeta title="Contact ADVENTA | Discuss Your Billing Needs" description="Contact ADVENTA Billing Solutions by email, phone, or a business inquiry form. Please do not submit patient information." /><main>
    <PageIntro eyebrow="Contact ADVENTA" title={<>Let’s talk about<br /><em>your practice.</em></>} body="Tell us a little about the billing support you are looking for. We’ll use your message to start a business conversation." />
    <section className="contact-section section-pad section-warm"><div className="shell contact-grid">
      <aside className="contact-details"><p className="eyebrow"><span className="eyebrow-line" />Reach our team</p><h2>ADVENTA<br />Billing Solutions</h2><p>We welcome inquiries from healthcare providers interested in discussing medical billing and revenue cycle support.</p><a className="contact-detail" href={`mailto:${emailAddress}`} aria-label={`Email ADVENTA at ${emailAddress}`}><span className="contact-detail__icon"><MessagesSquare size={18} /></span><span><small>Email</small><strong>{emailAddress}</strong></span><ArrowUpRight size={17} /></a><a className="contact-detail" href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label={`Chat with ADVENTA on WhatsApp at ${phoneDisplay}`}><span className="contact-detail__icon"><HeartPulse size={18} /></span><span><small>WhatsApp</small><strong>{phoneDisplay}</strong></span><ArrowUpRight size={17} /></a><div className="privacy-callout"><ShieldCheck size={18} /><p>Please do not include patient names, records, or other protected health information in your message.</p></div></aside>
      <div className="contact-form-wrap"><div className="form-heading"><p className="eyebrow"><span className="eyebrow-line" />Business inquiry</p><h2>How can we support you?</h2><p>Fields marked with <span aria-hidden="true">*</span> are required.</p></div>
        <form className="contact-form" noValidate onSubmit={submitForm}>
          {status && <p className={`form-status${submissionState === 'error' ? ' form-status--error' : ''}`} role={submissionState === 'error' ? 'alert' : 'status'}>{status}</p>}
          <div className="form-row"><div className="form-field"><label htmlFor="name">Your name <span>*</span></label><input {...fieldProps('name')} autoComplete="name" required />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</div><div className="form-field"><label htmlFor="practice">Business or practice name <span>*</span></label><input {...fieldProps('practice')} autoComplete="organization" required />{errors.practice && <span className="field-error" id="practice-error">{errors.practice}</span>}</div></div>
          <div className="form-row"><div className="form-field"><label htmlFor="email">Work email <span>*</span></label><input {...fieldProps('email')} type="email" autoComplete="email" required />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</div><div className="form-field"><label htmlFor="phone">Phone number <span className="optional">Optional</span></label><input {...fieldProps('phone')} type="tel" autoComplete="tel" /></div></div>
          <div className="form-field"><label htmlFor="service">Service of interest <span>*</span></label><select {...fieldProps('service')} required><option value="">Select an area</option>{services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}<option value="Something else">Something else</option></select>{errors.service && <span className="field-error" id="service-error">{errors.service}</span>}</div>
          <div className="form-field"><label htmlFor="message">How can we help? <span>*</span></label><textarea {...fieldProps('message')} rows="5" required placeholder="Share a brief overview of your practice's business needs. Please do not include patient details." />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</div>
          <p className="form-privacy">Your details will be sent to ADVENTA through EmailJS. Please do not include patient information. Read our <Link to="/privacy">privacy notice</Link>.</p><button className="button button--orange form-submit" type="submit" disabled={submissionState === 'sending'} aria-busy={submissionState === 'sending'}>{submissionState === 'sending' ? <><span className="form-spinner" aria-hidden="true" />Sending inquiry...</> : submissionState === 'success' ? <>Inquiry sent <ArrowRight size={17} /></> : submissionState === 'error' ? <>Try again <ArrowRight size={17} /></> : <>Send Inquiry <ArrowRight size={17} /></>}</button><p className="form-fallback">If the form does not work, <a href={`mailto:${emailAddress}`}>email ADVENTA directly</a>.</p>
        </form>
      </div>
    </div></section>
  </main></>;
}

function LegalPage({ type }) {
  const privacy = type === 'privacy';
  const title = privacy ? 'Privacy notice' : 'Terms of use';
  return <><PageMeta title={`${title} | ADVENTA Billing Solutions`} description={`${title} for the ADVENTA Billing Solutions website.`} /><main className="legal-page shell"><p className="eyebrow"><span className="eyebrow-line" />ADVENTA Billing Solutions</p><h1>{title}</h1><p className="legal-updated">Website information for prospective business clients</p>
    {privacy ? <><h2>Information you provide</h2><p>The contact form sends the business inquiry details you enter to ADVENTA through EmailJS, a third-party email delivery service. EmailJS and the email providers involved may process those details to deliver the message under their own privacy policies.</p><h2>Do not send patient information</h2><p>This website is for business inquiries only. Do not include patient names, records, health information, or other protected health information in the form or email.</p><h2>Website data</h2><p>This site does not currently use analytics, advertising cookies, or a server-side contact database. Standard hosting providers may process technical request data needed to deliver the website.</p><h2>Questions</h2><p>For questions about this notice, contact <a href={`mailto:${emailAddress}`}>{emailAddress}</a>.</p><p className="legal-caveat">This notice describes the current website behavior and should be reviewed for the applicable business and legal requirements before launch.</p></> : <><h2>Website information</h2><p>Information on this website is provided to introduce ADVENTA Billing Solutions and potential areas of medical billing support. It is not a service agreement or a guarantee that any particular service is available.</p><h2>Confirming services</h2><p>Service availability, scope, responsibilities, and working arrangements must be discussed and agreed directly with ADVENTA before any engagement.</p><h2>Appropriate use</h2><p>Do not use the contact form to submit patient records or protected health information. The contact form sends business inquiry details through EmailJS to ADVENTA; a success message appears only after EmailJS confirms acceptance of the request.</p><h2>Contact</h2><p>Questions about the website can be sent to <a href={`mailto:${emailAddress}`}>{emailAddress}</a>.</p><p className="legal-caveat">These terms are a starting point and should be reviewed for the applicable business and legal requirements before launch.</p></>}
  </main></>;
}

function NotFoundPage() {
  return <main className="not-found shell"><span>404</span><p className="eyebrow"><span className="eyebrow-line" />Page not found</p><h1>This page isn’t part of the plan.</h1><p>That address may have changed. Head back to the homepage or get in touch with ADVENTA.</p><Link to="/" className="button button--orange">Back to home <ArrowRight size={16} /></Link></main>;
}

export default function App() {
  return <><ScrollToTop /><Header /><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/process" element={<ProcessPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/privacy" element={<LegalPage type="privacy" />} /><Route path="/terms" element={<LegalPage type="terms" />} /><Route path="*" element={<NotFoundPage />} /></Routes><Footer /></>;
}