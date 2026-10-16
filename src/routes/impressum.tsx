import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/legal-page";

export const Route = createFileRoute("/impressum")({
  head: () => legalHead("/impressum", "Impressum", "Anbieterkennzeichnung von MySerene gemäß § 5 DDG."),
  component: () => (
    <LegalPage
      title="Impressum"
      sections={[
        { h: "Angaben gemäß § 5 DDG", p: ["[VOLLSTÄNDIGER NAME]\n[GESCHÄFTSBEZEICHNUNG, falls vorhanden]\n[STRASSE HAUSNUMMER]\n[PLZ ORT]\nDeutschland"] },
        { h: "Kontakt", p: ["E-Mail: [E-MAIL]\nTelefon: [TELEFON, optional]"] },
        { h: "Umsatzsteuer", p: ["Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr., falls vorhanden]\nFalls Kleinunternehmerregelung nach § 19 UStG: [HINWEIS ERGÄNZEN]"] },
        { h: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV", p: ["[VOLLSTÄNDIGER NAME]\n[ANSCHRIFT WIE OBEN]"] },
        { h: "EU-Streitschlichtung", p: ["Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. [VON ANWALT ZU PRÜFEN]"] },
        { h: "Haftung für Inhalte und Links", p: ["Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität können wir jedoch keine Gewähr übernehmen. Für Inhalte externer Websites, auf die wir verlinken, sind ausschließlich deren Betreiber verantwortlich."] },
        { h: "Urheberrecht", p: ["Texte, Gestaltung und Audioinhalte von MySerene unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung oder Verwendung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung."] },
      ]}
    />
  ),
});
