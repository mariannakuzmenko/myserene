import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/legal-page";

export const Route = createFileRoute("/gesundheit")({
  head: () => legalHead("/gesundheit", "Gesundheit & Sicherheit", "MySerene ist ein Wellness-Angebot und ersetzt keine medizinische Beratung. Hinweise zur sicheren Nutzung."),
  component: () => (
    <LegalPage
      title="Gesundheit & Sicherheit"
      intro="MySerene ist ein Wellness- und Entspannungsangebot – kein medizinischer Dienst."
      sections={[
        { h: "Keine medizinische Beratung", p: ["MySerene stellt keine medizinischen Diagnosen, bietet keine Behandlung und erteilt keine medizinische oder therapeutische Beratung. Die Inhalte dienen ausschließlich der allgemeinen Entspannung und dem Wohlbefinden."] },
        { h: "Kein Ersatz für professionelle Hilfe", p: ["Entspannungs-, Meditations- und Atemübungen ersetzen keine ärztliche, psychotherapeutische oder sonstige professionelle Versorgung. Wenden Sie sich bei gesundheitlichen Beschwerden an eine Ärztin oder einen Arzt. In akuten Notfällen wählen Sie bitte den Notruf 112."] },
        { h: "Sicher üben", list: ["Brechen Sie eine Übung sofort ab, wenn Sie sich schwindelig, unwohl oder kurzatmig fühlen.", "Atmen Sie in Ihrem eigenen, angenehmen Tempo – niemals mit Zwang.", "Üben Sie Atemübungen nicht beim Autofahren, Schwimmen oder in anderen Situationen, die volle Aufmerksamkeit erfordern.", "Bei Schwangerschaft, Herz-Kreislauf- oder Atemwegserkrankungen, Epilepsie oder psychischen Erkrankungen sprechen Sie vorab mit Ihrer Ärztin oder Ihrem Arzt.", "Hören Sie Klänge in angenehmer Lautstärke."] },
        { h: "Klänge und Frequenzen", p: ["Beschreibungen zu Klängen, Frequenzen oder Binaural Beats beziehen sich auf das subjektive Entspannungserleben. Wir machen keine Aussagen zu Heilwirkungen, Gewichtsabnahme oder der Behandlung von Krankheiten."] },
        { h: "Eigenverantwortung", p: ["Die Nutzung erfolgt in eigener Verantwortung. Achten Sie auf Ihren Körper und gönnen Sie sich Pausen, wann immer Sie sie brauchen."] },
      ]}
    />
  ),
});
