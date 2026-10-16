import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/legal-page";

export const Route = createFileRoute("/abo-bedingungen")({
  head: () => legalHead("/abo-bedingungen", "Abo-Bedingungen", "Bedingungen für zukünftige MySerene Premium-Abonnements: Laufzeit, Verlängerung, Kündigung."),
  component: () => (
    <LegalPage
      title="Abo-Bedingungen (Premium)"
      intro="Premium-Abonnements sind derzeit noch nicht buchbar. Diese Bedingungen beschreiben die geplante Ausgestaltung und gelten erst ab dem offiziellen Start."
      sections={[
        { h: "1. Tarife", list: ["Premium Monatlich: [PREIS] € pro Monat inkl. MwSt.", "Premium Jährlich: [PREIS] € pro Jahr inkl. MwSt."] },
        { h: "2. Preis und Abrechnungszeitraum", p: ["Der Preis wird zu Beginn jedes Abrechnungszeitraums (monatlich bzw. jährlich) im Voraus fällig. Alle Preise verstehen sich als Endpreise inklusive gesetzlicher Umsatzsteuer. [ggf. kostenloser Testzeitraum: DAUER ERGÄNZEN]"] },
        { h: "3. Automatische Verlängerung", p: ["Das Abonnement verlängert sich automatisch um den gewählten Zeitraum, sofern es nicht vor Ablauf gekündigt wird. Bei Jahresabonnements gilt nach der ersten Laufzeit [VERLÄNGERUNG AUF UNBESTIMMTE ZEIT MIT MONATLICHER KÜNDIGUNGSFRIST gemäß § 309 Nr. 9 BGB – VON ANWALT ZU PRÜFEN]."] },
        { h: "4. Kündigung", p: ["Sie können Ihr Abonnement jederzeit zum Ende des laufenden Abrechnungszeitraums kündigen – in Ihrem Benutzerkonto über den Kündigungsbutton („Verträge hier kündigen“, § 312k BGB) oder per E-Mail an [E-MAIL]. Sie erhalten eine Bestätigung der Kündigung."] },
        { h: "5. Zugang zu Premium-Inhalten", p: ["Während eines aktiven Abonnements erhalten Sie Zugang zu allen als „Premium“ gekennzeichneten Inhalten, z. B. erweiterten Klangbibliotheken, Meditationen und Schlafprogrammen. Der konkrete Umfang wird vor Abschluss angezeigt."] },
        { h: "6. Nach der Kündigung", p: ["Nach Ablauf des bezahlten Zeitraums endet der Zugang zu Premium-Inhalten. Kostenlose Inhalte bleiben weiterhin nutzbar. Bereits gezahlte Beträge werden für den laufenden Zeitraum nicht anteilig erstattet, soweit gesetzlich nichts anderes gilt."] },
        { h: "7. Zahlungsabwicklung", p: ["Die Zahlung erfolgt über einen externen Zahlungsdienstleister: [ZAHLUNGSANBIETER ERGÄNZEN]. Es gelten ergänzend dessen Bedingungen. MySerene speichert keine vollständigen Zahlungsdaten."] },
        { h: "8. Preisänderungen", p: ["Preisänderungen werden rechtzeitig vor Beginn des nächsten Abrechnungszeitraums mitgeteilt. [ZUSTIMMUNGSVERFAHREN VON ANWALT ZU PRÜFEN]"] },
        { h: "9. Widerrufsrecht", p: ["Für Verbraucher gilt das gesetzliche Widerrufsrecht gemäß der Widerrufsbelehrung."] },
      ]}
    />
  ),
});
