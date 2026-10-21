import type { Garderie } from "@/lib/api";

export default function Navbar({ garderie }: { garderie: Garderie }) {
  return (
    <header className="navbar">
      <a className="brand" href="#accueil" aria-label={`${garderie.name}, accueil`}>
        <span className="brand-mark" aria-hidden="true">✿</span>
        <span>
          <strong>{garderie.name}</strong>
          <small>Le bonheur de grandir</small>
        </span>
      </a>
      <nav aria-label="Navigation principale">
        <a href="#accueil">Accueil</a>
        <a href="#services">Nos services</a>
        <a href="#activites">Activités</a>
        <a className="nav-cta" href="#contact">Nous contacter <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}