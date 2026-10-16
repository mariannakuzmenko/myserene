import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/legal-page";

export const Route = createFileRoute("/datenschutz")({
  head: () => legalHead("/datenschutz", "Datenschutzerklärung", "Informationen zur Verarbeitung personenbezogener Daten bei MySerene gemäß DSGVO."),
  component: () => (
    <LegalPage
      title="Datenschutzerklärung"
      intro="Der Schutz Ihrer Daten ist uns wichtig. Nachfolgend informieren wir Sie gemäß Art. 13 DSGVO darüber, welche Daten wir verarbeiten und welche Rechte Sie haben."
      sections={[
        { h: "1. Verantwortliche Stelle", p: ["[VOLLSTÄNDIGER NAME]\n[GESCHÄFTSADRESSE]\nE-Mail: [E-MAIL]"] },
        { h: "2. Hosting und Server-Logfiles", p: ["Die Website wird bei [HOSTING-ANBIETER] gehostet. Beim Aufruf werden technisch notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp) verarbeitet, um die Website sicher und stabil bereitzustellen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung. [VON ANWALT ZU PRÜFEN]"] },
        { h: "3. Lokale Speicherung im Browser", p: ["MySerene speichert Einstellungen wie Lautstärke, Favoriten, zuletzt gehörte Klänge und den Sleep-Timer lokal in Ihrem Browser (localStorage). Diese Daten verlassen Ihr Gerät nicht und werden nicht an uns übertragen. Sie können sie jederzeit über die Browsereinstellungen löschen. Rechtsgrundlage ist § 25 Abs. 2 TDDDG, da die Speicherung für die von Ihnen gewünschte Funktion erforderlich ist."] },
        { h: "4. Kontaktaufnahme", p: ["Wenn Sie uns per E-Mail oder Kontaktformular kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen."] },
        { h: "5. Newsletter", p: ["Sofern ein Newsletter angeboten wird, erfolgt der Versand nur nach Ihrer Einwilligung (Double-Opt-in, Art. 6 Abs. 1 lit. a DSGVO). Sie können die Einwilligung jederzeit widerrufen. Versanddienstleister: [ANBIETER ERGÄNZEN]"] },
        { h: "6. Benutzerkonto und zukünftiges Abonnement", p: ["Bei Einführung von Benutzerkonten und Premium-Abonnements werden die zur Vertragserfüllung erforderlichen Daten (z. B. E-Mail-Adresse, Abonnementstatus) verarbeitet (Art. 6 Abs. 1 lit. b DSGVO). Die Zahlungsabwicklung erfolgt über einen externen Zahlungsdienstleister: [ZAHLUNGSANBIETER ERGÄNZEN]. Zahlungsdaten werden nicht von uns gespeichert. Steuerrelevante Daten werden gemäß gesetzlichen Fristen (bis zu 10 Jahre) aufbewahrt."] },
        { h: "7. Externe Inhalte", p: ["Einige Bilder und Medien werden von Drittanbietern (z. B. [BILD-CDN]) geladen. Dabei wird Ihre IP-Adresse an diese Anbieter übermittelt. [LISTE DER DIENSTE UND RECHTSGRUNDLAGE ERGÄNZEN]"] },
        { h: "8. Ihre Rechte", list: ["Auskunft (Art. 15 DSGVO)", "Berichtigung (Art. 16 DSGVO)", "Löschung (Art. 17 DSGVO)", "Einschränkung der Verarbeitung (Art. 18 DSGVO)", "Datenübertragbarkeit (Art. 20 DSGVO)", "Widerspruch (Art. 21 DSGVO)", "Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)", "Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)"] },
        { h: "9. Änderungen", p: ["Wir passen diese Datenschutzerklärung an, wenn sich unser Angebot oder die Rechtslage ändert."] },
      ]}
    />
  ),
});
