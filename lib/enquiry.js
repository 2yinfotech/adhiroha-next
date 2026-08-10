/**
 * Copy for the course enquiry modal, in the eleven locales the site publishes.
 *
 * Hatha, Ashtanga and Pranayama are not running as scheduled batches, so their
 * pages must not send anyone to a booking flow that cannot take the booking.
 * Every Join / Register / Apply button on those pages opens this instead.
 *
 * `{course}` is replaced with the course name taken from that page's own Course
 * JSON-LD, which is already translated per locale.
 */
export const ENQUIRY_STRINGS = {
  en: {
    title: "Register your interest",
    intro: "Fill this in to know more about the {course} and to register for it. We will write back with the upcoming dates.",
    name: "Your name", email: "Email address",
    send: "Send", sending: "Sending…", close: "Close",
    doneTitle: "Thank you", doneBody: "We have your details and will write to you shortly with the dates.",
    errRequired: "Please add your name and email so we can reply.",
    errGeneric: "Something went wrong. Please email info@adhiroha.com.",
    errNetwork: "Network error. Please check your connection and try again.",
  },
  da: {
    title: "Tilmeld din interesse",
    intro: "Udfyld her for at høre mere om {course} og tilmelde dig. Vi skriver tilbage med de kommende datoer.",
    name: "Dit navn", email: "E-mailadresse",
    send: "Send", sending: "Sender…", close: "Luk",
    doneTitle: "Tak", doneBody: "Vi har dine oplysninger og skriver til dig snarest med datoerne.",
    errRequired: "Skriv venligst dit navn og din e-mail, så vi kan svare.",
    errGeneric: "Noget gik galt. Skriv venligst til info@adhiroha.com.",
    errNetwork: "Netværksfejl. Tjek din forbindelse, og prøv igen.",
  },
  de: {
    title: "Interesse anmelden",
    intro: "Füllen Sie dies aus, um mehr über {course} zu erfahren und sich anzumelden. Wir melden uns mit den kommenden Terminen.",
    name: "Ihr Name", email: "E-Mail-Adresse",
    send: "Senden", sending: "Wird gesendet…", close: "Schließen",
    doneTitle: "Danke", doneBody: "Wir haben Ihre Angaben und schreiben Ihnen in Kürze mit den Terminen.",
    errRequired: "Bitte geben Sie Name und E-Mail an, damit wir antworten können.",
    errGeneric: "Etwas ist schiefgelaufen. Bitte schreiben Sie an info@adhiroha.com.",
    errNetwork: "Netzwerkfehler. Bitte prüfen Sie die Verbindung und versuchen Sie es erneut.",
  },
  es: {
    title: "Registra tu interés",
    intro: "Rellena esto para saber más sobre {course} y registrarte. Te escribiremos con las próximas fechas.",
    name: "Tu nombre", email: "Correo electrónico",
    send: "Enviar", sending: "Enviando…", close: "Cerrar",
    doneTitle: "Gracias", doneBody: "Tenemos tus datos y te escribiremos pronto con las fechas.",
    errRequired: "Añade tu nombre y correo para que podamos responderte.",
    errGeneric: "Algo salió mal. Escríbenos a info@adhiroha.com.",
    errNetwork: "Error de red. Comprueba tu conexión e inténtalo de nuevo.",
  },
  fr: {
    title: "Manifester votre intérêt",
    intro: "Remplissez ce formulaire pour en savoir plus sur {course} et vous inscrire. Nous vous répondrons avec les prochaines dates.",
    name: "Votre nom", email: "Adresse e-mail",
    send: "Envoyer", sending: "Envoi…", close: "Fermer",
    doneTitle: "Merci", doneBody: "Nous avons vos coordonnées et vous écrirons bientôt avec les dates.",
    errRequired: "Merci d'indiquer votre nom et votre e-mail pour que nous puissions répondre.",
    errGeneric: "Une erreur est survenue. Écrivez-nous à info@adhiroha.com.",
    errNetwork: "Erreur réseau. Vérifiez votre connexion et réessayez.",
  },
  it: {
    title: "Registra il tuo interesse",
    intro: "Compila per sapere di più su {course} e registrarti. Ti scriveremo con le prossime date.",
    name: "Il tuo nome", email: "Indirizzo email",
    send: "Invia", sending: "Invio…", close: "Chiudi",
    doneTitle: "Grazie", doneBody: "Abbiamo i tuoi dati e ti scriveremo presto con le date.",
    errRequired: "Inserisci nome ed email così possiamo risponderti.",
    errGeneric: "Qualcosa è andato storto. Scrivici a info@adhiroha.com.",
    errNetwork: "Errore di rete. Controlla la connessione e riprova.",
  },
  ja: {
    title: "参加のご登録",
    intro: "{course} について詳しく知り、ご登録いただくにはこちらにご記入ください。次回の日程をお知らせします。",
    name: "お名前", email: "メールアドレス",
    send: "送信", sending: "送信中…", close: "閉じる",
    doneTitle: "ありがとうございます", doneBody: "ご記入内容を承りました。日程が決まり次第ご連絡いたします。",
    errRequired: "ご返信できるよう、お名前とメールアドレスをご記入ください。",
    errGeneric: "問題が発生しました。info@adhiroha.com までご連絡ください。",
    errNetwork: "通信エラーです。接続をご確認のうえ、もう一度お試しください。",
  },
  nl: {
    title: "Interesse aanmelden",
    intro: "Vul dit in om meer te weten over {course} en je aan te melden. We schrijven terug met de komende data.",
    name: "Uw naam", email: "E-mailadres",
    send: "Versturen", sending: "Versturen…", close: "Sluiten",
    doneTitle: "Bedankt", doneBody: "We hebben uw gegevens en schrijven u binnenkort met de data.",
    errRequired: "Vul uw naam en e-mail in zodat we kunnen antwoorden.",
    errGeneric: "Er ging iets mis. Mail ons op info@adhiroha.com.",
    errNetwork: "Netwerkfout. Controleer uw verbinding en probeer het opnieuw.",
  },
  pl: {
    title: "Zgłoś zainteresowanie",
    intro: "Wypełnij, aby dowiedzieć się więcej o {course} i się zapisać. Odpiszemy z najbliższymi terminami.",
    name: "Imię i nazwisko", email: "Adres e-mail",
    send: "Wyślij", sending: "Wysyłanie…", close: "Zamknij",
    doneTitle: "Dziękujemy", doneBody: "Mamy Twoje dane i wkrótce napiszemy z terminami.",
    errRequired: "Podaj imię i e-mail, abyśmy mogli odpowiedzieć.",
    errGeneric: "Coś poszło nie tak. Napisz na info@adhiroha.com.",
    errNetwork: "Błąd sieci. Sprawdź połączenie i spróbuj ponownie.",
  },
  pt: {
    title: "Registre seu interesse",
    intro: "Preencha para saber mais sobre {course} e se registrar. Responderemos com as próximas datas.",
    name: "Seu nome", email: "Endereço de e-mail",
    send: "Enviar", sending: "Enviando…", close: "Fechar",
    doneTitle: "Obrigado", doneBody: "Recebemos seus dados e escreveremos em breve com as datas.",
    errRequired: "Informe seu nome e e-mail para que possamos responder.",
    errGeneric: "Algo deu errado. Escreva para info@adhiroha.com.",
    errNetwork: "Erro de rede. Verifique sua conexão e tente novamente.",
  },
  sv: {
    title: "Anmäl ditt intresse",
    intro: "Fyll i det här för att veta mer om {course} och anmäla dig. Vi återkommer med de kommande datumen.",
    name: "Ditt namn", email: "E-postadress",
    send: "Skicka", sending: "Skickar…", close: "Stäng",
    doneTitle: "Tack", doneBody: "Vi har dina uppgifter och skriver till dig snart med datumen.",
    errRequired: "Ange namn och e-post så att vi kan svara.",
    errGeneric: "Något gick fel. Mejla oss på info@adhiroha.com.",
    errNetwork: "Nätverksfel. Kontrollera anslutningen och försök igen.",
  },
};

export const enquiryStrings = (locale) => ENQUIRY_STRINGS[locale] || ENQUIRY_STRINGS.en;
