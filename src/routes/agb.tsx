import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/legal-page";

export const Route = createFileRoute("/agb")({
  head: () => legalHead("/agb", "AGB / Nutzungsbedingungen", "Allgemeine Geschäfts- und Nutzungsbedingungen für MySerene."),
  component: AGB,
});

function AGB() {
  return (

      <LegalPage
        title="AGB / Nutzungsbedingungen"
        sections={[
          { h: "§ 1 Geltungsbereich", p: ["Diese Bedingungen gelten für die Nutzung der Website und der Dienste von MySerene, angeboten von [VOLLSTÄNDIGER NAME], [GESCHÄFTSADRESSE] („Anbieterin“). Abweichende Bedingungen der Nutzer gelten nicht."] },
          { h: "§ 2 Leistungen", p: ["MySerene bietet digitale Inhalte zur Entspannung: Naturklänge, Klangmischungen, geführte Meditationen, Atemübungen und Artikel. Ein Teil der Inhalte ist kostenlos. Künftig können zusätzliche Premium-Inhalte gegen Entgelt angeboten werden; hierfür gelten ergänzend die Abo-Bedingungen."] },
          { h: "§ 3 Kein medizinisches Angebot", p: ["MySerene ist ein Wellness- und Entspannungsangebot und ersetzt keine ärztliche oder therapeutische Beratung, Diagnose oder Behandlung. Einzelheiten finden Sie unter „Gesundheit & Sicherheit“."] },
          { h: "§ 4 Benutzerkonto", p: ["Für bestimmte Funktionen kann ein Benutzerkonto erforderlich sein. Nutzer müssen wahrheitsgemäße Angaben machen und ihre Zugangsdaten vertraulich behandeln. Die Nutzung ist Personen ab [MINDESTALTER] Jahren gestattet."] },
          { h: "§ 5 Nutzungsrechte", p: ["Nutzer erhalten ein einfaches, nicht übertragbares Recht, die Inhalte für private, nicht-kommerzielle Zwecke zu nutzen. Vervielfältigung, Weitergabe oder öffentliche Wiedergabe sind nicht gestattet."] },
          { h: "§ 6 Verfügbarkeit", p: ["Wir bemühen uns um eine möglichst unterbrechungsfreie Verfügbarkeit. Wartungsarbeiten oder technische Störungen können zu vorübergehenden Einschränkungen führen."] },
          { h: "§ 7 Haftung", p: ["Die Anbieterin haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt. Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt. [VON ANWALT ZU PRÜFEN]"] },
          { h: "§ 8 Widerrufsrecht", p: ["Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Einzelheiten siehe Widerrufsbelehrung."] },
          { h: "§ 9 Änderungen", p: ["Änderungen dieser Bedingungen werden registrierten Nutzern rechtzeitig vorab mitgeteilt. [VERFAHREN VON ANWALT ZU PRÜFEN]"] },
          { h: "§ 10 Schlussbestimmungen", p: ["Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gegenüber Verbrauchern gilt diese Rechtswahl nur, soweit nicht zwingende Verbraucherschutzvorschriften des Staates ihres gewöhnlichen Aufenthalts entgegenstehen. Sollten einzelne Bestimmungen unwirksam sein, bleibt der Vertrag im Übrigen wirksam."] },
        ]}
      />

  );
}
