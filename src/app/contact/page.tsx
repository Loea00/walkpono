import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-serif text-3xl text-fern-800">Contact Us</h1>
      <p className="mt-2 text-ink-900/70">Have a question, or want to talk story? Reach out below.</p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
