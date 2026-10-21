import { Suspense } from "react";
import GarderieContent from "./GarderieContent";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="loading-page">
          <span className="brand-mark" aria-hidden="true">
            ✿
          </span>
          <h1>Préparons une belle journée !</h1>
          <p>Chargement des informations de la garderie...</p>
        </main>
      }
    >
      <GarderieContent />
    </Suspense>
  );
}