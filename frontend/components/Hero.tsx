import type { Garderie } from "@/lib/api";
import Image from "next/image";

export default function Hero({ garderie }: { garderie: Garderie }) {
  return (
    <section className="hero" id="accueil">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> UN PETIT MONDE, DE GRANDES DÉCOUVERTES</span>
        <h1>Le bonheur de grandir, <em>chaque jour.</em></h1>
        <p>{garderie.description}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#contact">Découvrir notre garderie <span aria-hidden="true">→</span></a>
          <a className="button button-quiet" href="#services">Nos services</a>
        </div>
        <div className="hero-note">
          <span className="avatar-stack" aria-hidden="true"><i>☺</i><i>♡</i><i>✿</i></span>
          <span><strong>Chaque enfant est unique.</strong><small>Chaque journée est une aventure.</small></span>
        </div>
      </div>
      <div className="hero-visual">
        <Image
          src="/hero.avif"
          alt="Un enfant qui sourit pendant un moment de jeu"
          width={1200}
          height={800}
        />
        <div className="floating-card">
          <span className="floating-icon">♡</span>
          <span><strong>Un cocon de douceur</strong><small>Bienveillance · Éveil · Confiance</small></span>
        </div>
        <span className="sun-doodle" aria-hidden="true">✳</span>
      </div>
    </section>
  );
}