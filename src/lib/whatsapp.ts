export function getWhatsAppUrl(name: string, concern: string, date: string) {
    const phone = process.env.WHATSAPP_NUMBER || "919079383340";
    const message = `Hello Dr. Faizan, I would like to book an appointment.
Name: ${name}
Concern: ${concern}
Preferred Date: ${date}`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function formatWhatsAppMessage(appointment: {
    patientName: string;
    concern: string;
    preferredDate: Date;
}) {
    const dateStr = appointment.preferredDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return getWhatsAppUrl(appointment.patientName, appointment.concern, dateStr);
}
