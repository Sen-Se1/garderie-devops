import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "./Hero";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} alt={props.alt ?? ""} />
  ),
}));

describe("Hero", () => {
  it("affiche le titre Ma Garderie", () => {
    render(
      <Hero
        garderie={{
          name: "Ma Garderie",
          tagline: "Grandir chaque jour",
          description: "Une garderie accueillante.",
          address: "Nabeul",
          phone: "+216 72 000 000",
          email: "contact@example.com",
          openingHours: "8h–18h",
          ageRange: "3 mois à 5 ans",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: /le bonheur de grandir, chaque jour/i,
      }),
    ).toBeInTheDocument();
  });
});
