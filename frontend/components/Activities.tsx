import type { Activite } from "@/lib/api";

export default function Activities({ activites }: { activites: Activite[] }) {
  return (
    <section className="section activities-section" id="activites">
      <div className="section-heading">
        <span className="eyebrow">JOUER POUR APPRENDRE</span>
        <h2>Des journées pleines de <em>merveilles.</em></h2>
        <p>Des activités adaptées à l&apos;âge des enfants, pour nourrir leur imagination et leur curiosité.</p>
      </div>
      <div className="activity-grid">
        {activites.map((activite, index) => (
          <article className="activity-card" key={activite.id}>
            <span className="activity-index">0{index + 1}</span>
            <div>
              <h3>{activite.title}</h3>
              <p>{activite.description}</p>
              <span className="age-pill">Âge : {activite.ageGroup}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}