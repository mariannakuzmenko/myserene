import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/legal-page";

export const Route = createFileRoute("/widerruf")({
  head: () => legalHead("/widerruf", "Widerrufsbelehrung", "Informationen zum Widerrufsrecht für Verbraucher bei MySerene."),
  component: () => (
    <LegalPage
      title="Widerrufsbelehrung"
      intro="Verbraucherinnen und Verbrauchern steht ein Widerrufsrecht nach folgender Maßgabe zu."
      sections={[
        { h: "Widerrufsrecht", p: ["Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.", "Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ([VOLLSTÄNDIGER NAME], [GESCHÄFTSADRESSE], E-Mail: [E-MAIL]) mittels einer eindeutigen Erklärung (z. B. per E-Mail) über Ihren Entschluss informieren. Sie können dafür das unten stehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Frist reicht die rechtzeitige Absendung der Mitteilung."] },
        { h: "Folgen des Widerrufs", p: ["Wenn Sie diesen Vertrag widerrufen, erstatten wir Ihnen alle Zahlungen unverzüglich und spätestens binnen vierzehn Tagen ab Eingang Ihres Widerrufs. Wir verwenden dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, es wurde ausdrücklich etwas anderes vereinbart. Haben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, zahlen Sie einen angemessenen Betrag, der dem Anteil der bis zum Widerruf erbrachten Leistungen entspricht."] },
        { h: "Vorzeitiges Erlöschen bei digitalen Inhalten", p: ["Das Widerrufsrecht kann bei Verträgen über digitale Inhalte vorzeitig erlöschen, wenn wir mit der Ausführung begonnen haben, nachdem Sie ausdrücklich zugestimmt haben und Ihre Kenntnis bestätigt haben, dass Sie dadurch Ihr Widerrufsrecht verlieren (§ 356 Abs. 5 BGB). [UMSETZUNG IM CHECKOUT VON ANWALT ZU PRÜFEN]"] },
        { h: "Muster-Widerrufsformular", p: ["(Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück.)\n\nAn: [VOLLSTÄNDIGER NAME], [GESCHÄFTSADRESSE], [E-MAIL]\n\nHiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung / Bereitstellung digitaler Inhalte (*):\n\nBestellt am (*) / erhalten am (*):\nName des/der Verbraucher(s):\nAnschrift des/der Verbraucher(s):\nUnterschrift (nur bei Mitteilung auf Papier):\nDatum:\n\n(*) Unzutreffendes streichen."] },
      ]}
    />
  ),
});
