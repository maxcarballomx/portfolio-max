/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const customerEmail = e.record.get("email");
  const customerName = e.record.get("name");
  const subject = e.record.get("subject");
  const message = e.record.get("message");
  const inquiryType = e.record.get("inquiryType") || "General Inquiry";

  // Send confirmation email to customer
  const customerMessage = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: customerEmail }],
    subject: "We received your message",
    html: "<h2>Thank you for contacting us, " + customerName + "!</h2><p>We have received your " + inquiryType + " and will get back to you as soon as possible.</p><p><strong>Your message:</strong><br>" + message + "</p>"
  });
  $app.newMailClient().send(customerMessage);

  // Send notification email to admin
  const adminMessage = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: "Contact Form"
    },
    to: [{ address: "admin@maxcarballo.com" }],
    subject: "New Contact Form Submission: " + subject,
    html: "<h2>New " + inquiryType + " from " + customerName + "</h2><p><strong>Email:</strong> " + customerEmail + "</p><p><strong>Subject:</strong> " + subject + "</p><p><strong>Message:</strong><br>" + message + "</p><p><strong>Record ID:</strong> " + e.record.id + "</p>"
  });
  $app.newMailClient().send(adminMessage);

  e.next();
}, "contacts");