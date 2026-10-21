# ADVENTA Billing Solutions

Responsive React website for ADVENTA Billing Solutions, built with Vite.

## Local development

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, then preview it using `npm run preview`.

The site theme toggle is available in the main navigation. On first visit, the site follows the operating system's color preference; a choice made with the toggle is saved in local storage for later visits.

## Contact form and EmailJS setup

The contact form validates the required business inquiry fields and submits the visitor's name, business name, work email, optional phone, selected service, and message to ADVENTA using EmailJS. The form shows success only after EmailJS confirms the request. A direct email link remains available as a fallback.

Before enabling delivery:

1. Create an EmailJS account and add an Email Service connected to the mailbox that will send the inquiries.
2. Create an EmailJS email template. Set its **To Email** to `adventabillingsolution@gmail.com`. Set **Reply-To** to `{{reply_to}}`, so replies go to the visitor.
3. Use these template variables in the email subject/body:
   - `{{from_name}}` — visitor's name
   - `{{business_name}}` — business or practice
   - `{{reply_to}}` — visitor's work email
   - `{{phone}}` — phone number (or “Not provided”)
   - `{{service}}` — selected service
   - `{{message}}` — inquiry message
4. In the EmailJS dashboard, restrict browser use of the public key to the site's production domain and the local development origin used for testing. Keep EmailJS account credentials and private keys out of browser code.
5. Copy `.env.example` to `.env.local` and set the three values from the EmailJS dashboard:

   ```dotenv
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

   These are identifiers and the EmailJS browser public key; the `VITE_` values are included in the client bundle. Never put an EmailJS private key, secret, or account password in a `VITE_` variable.
6. Restart the Vite development server after changing environment variables. Submit a test inquiry with business-only information and confirm that the email arrives at `adventabillingsolution@gmail.com`. Do not rely on the form until this real delivery test succeeds.

When publishing, configure the same environment variables in the hosting provider's build environment. Do not publish `.env.local`.

The form is for business inquiries only. It warns visitors not to submit patient data or protected health information. EmailJS and the connected email providers process the submitted inquiry; review their privacy terms and the site's privacy notice before launch. Do not add a general contact backend that collects PHI without an appropriately reviewed process.

The service catalog is intentionally presented as potential areas to discuss. Confirm ADVENTA's actual offering and remove or revise entries before publishing. Review the privacy notice and terms for applicable business and legal requirements before launch.

The supplied logo is `public/logo.png`. The homepage also references a remotely hosted Unsplash image; replace it with an approved local image if external image hosting is not desired.

The supplied phone number is displayed in its original local format. The `tel:` link uses `+923700376012` as supplied in the project brief; verify the country and dialing format before deployment.