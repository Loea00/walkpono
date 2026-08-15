import Image from "next/image";

const galleryImages = Array.from({ length: 11 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/images/gallery/teach-${n}.jpg`;
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="grid gap-10 sm:grid-cols-[220px_1fr] sm:items-start">
        <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full border-4 border-sand-200 sm:mx-0 sm:w-full">
          <Image src="/images/portrait.jpg" alt="Aaron-Michael Ho" fill className="object-cover" />
        </div>
        <div>
          <h1 className="font-serif text-3xl text-fern-800">Aaron-Michael Ho</h1>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-fern-500">
            Greatness Guru &amp; Transformational Linguist
          </p>
          <div className="mt-5 space-y-4 text-ink-900/85 leading-relaxed">
            <p>
              Aaron-Michael Ho is the founder and operator of WalkPono LLC: The Greatness Institute.
              Working with groups, as well as individuals, WalkPono seeks to deepen understanding of the
              concepts aloha and pono; to encourage wholeness and healing in Hawai&#699;i and beyond.
            </p>
            <p>
              A long-time Hawaiian language teacher, a cultural body work practitioner, and formerly of the
              Cultural Resources team at Bishop Museum (the Hawai&#699;i State Museum of Cultural and
              Natural History), Aaron found a calling in combining his love and adoration for his native
              culture with his passion for coaching and creating space for healing.
            </p>
            <p>
              From keynote speaking to classroom teaching, or from one-on-one coaching to large-scale
              workshop facilitation, Aaron crafts masterfully interactive experiences ensuring each student
              or attendee comes away with a deeper, richer understanding of the topic engaged.
            </p>
            <p>
              WalkPono LLC considers itself very blessed to have had the opportunity to partner with such
              organizations as Hawai&#699;i Maoli, Hawaii Community Assets, AmeriCorps VISTAs, the American
              Red Cross, CoachKaipo.com, and the Mindful Forgiveness Center — just to name a few.
            </p>
            <p>
              The name of the game is &ldquo;experiential learning.&rdquo; WalkPono LLC: The Greatness
              Institute offers a myriad of classes and workshops, and none of them are about textbook
              teaching and lecture. We play games, engage in activities, hold discussions and
              debates&hellip;the content comes alive. After all, studied content might be
              fleeting&mdash;but you&rsquo;ll remember your experiences for a lifetime.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-serif text-2xl text-fern-800">In the Classroom</h2>
        <p className="mt-2 text-sm text-ink-900/70">
          A few moments from workshops, keynotes, and classes taught over the years.
        </p>
        <div className="mt-6 columns-2 gap-3 sm:columns-3">
          {galleryImages.map((src) => (
            <div key={src} className="mb-3 overflow-hidden rounded-lg border border-sand-300 bg-sand-100">
              <Image
                src={src}
                alt="Aaron-Michael Ho teaching a class or workshop"
                width={400}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
