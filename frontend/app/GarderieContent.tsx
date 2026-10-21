import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Activities from "@/components/Activities";
import {
  getActivites,
  getGarderie,
  getServices,
} from "@/lib/api";

export default async function GarderieContent() {
  const [garderie, services, activites] = await Promise.all([
    getGarderie(),
    getServices(),
    getActivites(),
  ]);

  return (
    <main>
      <div className="page-shell">
        <Navbar garderie={garderie} />
        <Hero garderie={garderie} />
      </div>

      <Services services={services} />
      <Activities activites={activites} />

      <footer className="footer" id="contact">
        <div>
          <span className="brand-mark" aria-hidden="true">
            ✿
          </span>
          <h2>{garderie.name}</h2>
          <p>{garderie.tagline}</p>
        </div>

        <div className="footer-contact">
          <strong>Parlons de votre petit explorateur</strong>
          <a href={`tel:${garderie.phone.replaceAll(" ", "")}`}>
            {garderie.phone}
          </a>
          <a href={`mailto:${garderie.email}`}>
            {garderie.email}
          </a>
          <span>{garderie.address}</span>
          <span>{garderie.openingHours}</span>
        </div>

        <small className="copyright">
          © {new Date().getFullYear()} {garderie.name}.
          Tous droits réservés.
        </small>
      </footer>
    </main>
  );
}