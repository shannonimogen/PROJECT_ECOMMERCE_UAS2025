// Template EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Ganti dengan public key Anda

const emailTemplate = `
Dear Shannon Imogen,

You have received a new message from your website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Best regards,
Your Website Contact Form
`; 