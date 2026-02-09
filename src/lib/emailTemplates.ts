export function donationReceiptTemplate({ name, reference, amountPaid, donationType, designation }:{ name:string; reference:string; amountPaid:number; donationType?:string; designation?:string }) {
  const subject = `Thank you for your donation — ${reference}`;
  const html = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <!-- Header with Logo -->
    <div style="max-width:680px;margin:0 auto;background:linear-gradient(135deg, #059669 0%, #047857 100%);padding:32px 24px;border-radius:8px 8px 0 0;text-align:center;">
      <img src="https://res.cloudinary.com/dsfodoe0d/image/upload/v1/connect-africa-logo" alt="Connect Africa" style="height:50px;margin-bottom:16px;" />
      <h1 style="color:#fff;margin:0;font-size:28px;">Connect Africa</h1>
      <p style="color:#d1fae5;margin:8px 0 0 0;font-size:14px;">Bringing Healthcare to Every Community</p>
    </div>

    <!-- Main Content -->
    <div style="max-width:680px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e6f4ef;border-top:none;">
      <h2 style="color:#059669;margin-top:0;margin-bottom:8px;">Thank you for your generous gift</h2>
      <p>Dear ${name || 'Friend'},</p>
      <p>We have successfully received your donation of <strong>₦${amountPaid.toLocaleString()}</strong>.</p>
      <p><strong>Donation reference:</strong> <code style="background:#f1f5f9;padding:4px 8px;border-radius:4px;font-family:monospace;">${reference}</code></p>
      <table style="width:100%;margin-top:16px;border-collapse:collapse">
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;width:40%;font-weight:600;">Type</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${donationType || 'One-time'}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;font-weight:600;">Destination</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${designation || 'Where most needed'}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;font-weight:600;">Date</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
        </tr>
      </table>

      <div style="background:#f0fdf4;border-left:4px solid #059669;padding:16px;margin-top:24px;border-radius:4px;">
        <p style="margin:0;color:#15803d;font-weight:600;margin-bottom:8px;">💚 Your Impact</p>
        <p style="margin:0;color:#166534;font-size:14px;">Your support directly provides essential medical supplies, equipment, and logistics to underserved clinics across Africa. Your generosity saves lives.</p>
      </div>

      <p style="margin-top:24px">We will email your official tax receipt to ${name} within 2-3 business days.</p>

      <p style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:24px;color:#059669;font-weight:600;">With heartfelt gratitude,<br/>The Connect Africa Team</p>

      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0" />
      <p style="font-size:12px;color:#6b7280;margin:0;">
        <strong>Questions?</strong> Reply to this email or visit <a href="${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://connectafrica.org'}" style="color:#059669;text-decoration:none;">our website</a>.<br/>
        <strong>Need help?</strong> Contact us at support@connectafrica.org
      </p>
    </div>
  </div>
  `;
  return { subject, html };
}

export function newsletterWelcomeTemplate({ unsubscribeToken }:{ unsubscribeToken:string }){
  const subject = 'Welcome — Connect Africa Newsletter';
  const unsubscribeUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || '#') + `/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  const html = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <div style="max-width:680px;margin:0 auto;padding:24px;background:#fff;border-radius:8px;border:1px solid #eef2f7;">
      <h2 style="color:#059669;margin-bottom:8px;">Welcome to Connect Africa</h2>
      <p>Thank you for subscribing to our newsletter. You'll now receive monthly updates on our programs, impact stories, and ways to help.</p>
      <ul>
        <li>Program updates and impact reports</li>
        <li>Volunteer and partnership opportunities</li>
        <li>Exclusive campaign previews</li>
      </ul>
      <p style="margin-top:12px">If you ever wish to unsubscribe, click <a href="${unsubscribeUrl}">here</a>.</p>

      <p style="margin-top:18px">Warm regards,<br/>The Connect Africa Team</p>
      <hr style="border:none;border-top:1px solid #f1f5f9;margin:18px 0" />
      <p style="font-size:12px;color:#6b7280">Visit <a href="${process.env.NEXT_PUBLIC_BACKEND_URL || '#'}">our website</a> for more information.</p>
    </div>
  </div>
  `;
  return { subject, html };
}
