// backend/utils/ticketGenerator.ts
import fs from "fs";

export function generateTicketFile(ticket: any, path: string) {
  const content = `
Ticket ID: ${ticket.ticketId}
Event: ${ticket.eventName}
Date: ${ticket.eventDate} at ${ticket.eventTime}
Location: ${ticket.location}
Ticket Type: ${ticket.ticketType}
Seats: ${ticket.ticketQty}
Total Paid: Ksh ${ticket.subtotal}

Buyer:
${ticket.formData.firstName} ${ticket.formData.lastName}
${ticket.formData.email}
${ticket.formData.phone}
  `;

  fs.writeFileSync(path, content);
}
