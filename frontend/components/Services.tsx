import type { Service } from "@/lib/api";

export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="section services-section" id="services">
      <div className="section-heading">
        <span className="eyebrow">GRANDIR EN CONFIANCE</span>
        <h2>Tout pour les voir <em>s&apos;épanouir.</em></h2>
        <p>Un quotidien pensé avec amour pour apprendre, explorer et grandir à son rythme.</p>
      </div>
      <div className="service-grid">
        {services.map((service, index) => (
          <article className={`service-card service-card-${index % 4}`} key={service.id}>
            <span className="service-icon" aria-hidden="true">{service.icon}</span>
            <span className="service-number">0{index + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}