# WatFix Chemicals - Email Form Setup Instructions

This document explains how to set up the contact form to send emails to watfixchemicals@gmail.com using EmailJS.

## EmailJS Setup Instructions

1. **Create an EmailJS Account**:
   - Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
   - The free plan allows 200 emails per month, which should be sufficient for initial website usage

2. **Create an Email Service**:
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose "Gmail" as your service provider
   - Connect your watfixchemicals@gmail.com account
   - Name the service "default_service" (this matches the code in main.js)

3. **Create an Email Template**:
   - Go to "Email Templates" in your dashboard
   - Click "Create New Template"
   - Name the template "template_watfix" (this matches the code in main.js)
   - Design your template using these variables:
     - {{from_name}} - The name of the person submitting the form
     - {{company}} - The company name
     - {{reply_to}} - The email address (also set as the reply-to address)
     - {{phone}} - The phone number
     - {{product}} - The product they're interested in
     - {{message}} - Their message
   - Save the template

4. **Get Your Public Key**:
   - Go to "Account" → "API Keys" in your dashboard
   - Copy your "Public Key"

5. **Update the Website Code**:
   - Open index.html
   - Find this line: `emailjs.init("YOUR_PUBLIC_KEY");`
   - Replace "YOUR_PUBLIC_KEY" with the actual public key you copied

## Testing the Form

After completing the setup:
1. Open the website
2. Fill out the contact form
3. Submit the form
4. You should receive an email at watfixchemicals@gmail.com with the form data
5. The person submitting the form will see a success message

## Troubleshooting

If emails are not being sent:
- Check the browser console for any error messages
- Verify that your EmailJS account is active
- Make sure the service name, template name, and public key are correctly entered in the code
- Check if your Gmail account has any security settings that might block the connection

For more advanced customization, refer to the [EmailJS documentation](https://www.emailjs.com/docs/).
