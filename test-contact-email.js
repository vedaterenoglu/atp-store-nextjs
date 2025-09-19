/**
 * Test script for contact form email functionality
 * Tests SendGrid configuration and both email templates (company & user)
 * Note: This test sends emails with inline HTML similar to templates
 */

require('dotenv').config({ path: '.env.development' });

async function testSendGridEmail() {
  console.log('🧪 Testing Contact Form Email Configuration...\n');

  // Check environment variables
  console.log('1️⃣ Checking Environment Variables:');
  console.log('   SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? '✅ Set' : '❌ Missing');
  console.log('   EMAIL_TO:', process.env.EMAIL_TO || '❌ Missing');
  console.log('   EMAIL_FROM:', process.env.EMAIL_FROM || '❌ Missing');
  console.log('   CONTACT_EMAIL_TO:', process.env.CONTACT_EMAIL_TO || '❌ Missing (using fallback)');
  console.log('   CONTACT_EMAIL_FROM:', process.env.CONTACT_EMAIL_FROM || '❌ Missing (using fallback)');
  console.log('');

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || process.env.EMAIL_TO || 'info@alfe.se';
  const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM || process.env.EMAIL_FROM || 'noreply@alfe.se';

  if (!SENDGRID_API_KEY) {
    console.error('❌ SENDGRID_API_KEY not found in environment variables!');
    console.log('\n📝 Please ensure .env.development contains:');
    console.log('   SENDGRID_API_KEY=SG.your-api-key-here');
    process.exit(1);
  }

  console.log('2️⃣ Email Configuration:');
  console.log('   TO:', CONTACT_EMAIL_TO);
  console.log('   FROM:', CONTACT_EMAIL_FROM);
  console.log('');

  // Prepare test data
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+46701234567',
    subject: 'support',
    message: 'This is a test message to verify that the contact form email functionality is working correctly with HTML templates.',
    timestamp: new Date().toISOString()
  };

  console.log('3️⃣ Preparing emails with HTML templates...');
  console.log('   Testing BOTH emails will be sent');
  console.log('   Company email to:', CONTACT_EMAIL_TO);
  console.log('   User confirmation to: test@example.com');
  console.log('');

  // Prepare company notification email (simulating admin template)
  const companyEmailData = {
    personalizations: [{
      to: [{ email: CONTACT_EMAIL_TO }]
    }],
    from: { email: CONTACT_EMAIL_FROM },
    reply_to: { email: 'test@example.com' },
    subject: '[SUPPORT] New Contact Form Submission',
    content: [
      {
        type: 'text/html',
        value: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${testData.name}</p>
            <p><strong>Email:</strong> ${testData.email}</p>
            <p><strong>Phone:</strong> ${testData.phone}</p>
            <p><strong>Subject:</strong> ${testData.subject}</p>
            <hr style="border: 1px solid #ccc;">
            <h3>Message:</h3>
            <p>${testData.message}</p>
            <hr style="border: 1px solid #ccc;">
            <p style="color: #666; font-size: 12px;">Sent at ${testData.timestamp}</p>
          </div>
        `
      }
    ]
  };

  // Prepare user confirmation email (simulating user template)
  const userEmailData = {
    personalizations: [{
      to: [{ email: 'test@example.com' }]
    }],
    from: { email: CONTACT_EMAIL_FROM },
    subject: 'Thank you for contacting ATP Store',
    content: [
      {
        type: 'text/html',
        value: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for your message!</h2>
            <p>Dear ${testData.name},</p>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <hr style="border: 1px solid #ccc;">
            <h3>Your message:</h3>
            <p>${testData.message}</p>
            <hr style="border: 1px solid #ccc;">
            <p style="color: #666; font-size: 12px;">This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        `
      }
    ]
  };

  console.log('4️⃣ Sending COMPANY notification email via SendGrid API...\n');

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SENDGRID_API_KEY}`
      },
      body: JSON.stringify(companyEmailData)
    });

    console.log('5️⃣ Company Email SendGrid Response:');
    console.log('   Status:', response.status, response.statusText);
    console.log('   Headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      console.log('\n✅ SUCCESS! Company notification email sent!');
      console.log(`📧 Check inbox for: ${CONTACT_EMAIL_TO}`);

      // Send user confirmation email
      console.log('\n6️⃣ Sending USER confirmation email via SendGrid API...\n');

      const userResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SENDGRID_API_KEY}`
        },
        body: JSON.stringify(userEmailData)
      });

      console.log('7️⃣ User Email SendGrid Response:');
      console.log('   Status:', userResponse.status, userResponse.statusText);
      console.log('   Headers:', Object.fromEntries(userResponse.headers.entries()));

      if (userResponse.ok) {
        console.log('\n✅ SUCCESS! User confirmation email sent!');
        console.log('📧 Check inbox for: test@example.com');
        console.log('\n🎉 BOTH EMAILS SENT SUCCESSFULLY WITH TEMPLATES!');
      } else {
        const userErrorText = await userResponse.text();
        console.error('\n❌ FAILED! User email SendGrid returned an error:');
        console.error('   Status:', userResponse.status);
        console.error('   Error:', userErrorText);

        try {
          const errorJson = JSON.parse(userErrorText);
          console.error('\n📋 User Email Error Details:');
          if (errorJson.errors) {
            errorJson.errors.forEach((err, index) => {
              console.error(`   ${index + 1}. ${err.message}`);
              if (err.field) console.error(`      Field: ${err.field}`);
              if (err.help) console.error(`      Help: ${err.help}`);
            });
          }
        } catch (e) {
          // Not JSON, already logged as text
        }
      }
    } else {
      const errorText = await response.text();
      console.error('\n❌ FAILED! SendGrid returned an error:');
      console.error('   Status:', response.status);
      console.error('   Error:', errorText);

      // Parse error if it's JSON
      try {
        const errorJson = JSON.parse(errorText);
        console.error('\n📋 Error Details:');
        if (errorJson.errors) {
          errorJson.errors.forEach((err, index) => {
            console.error(`   ${index + 1}. ${err.message}`);
            if (err.field) console.error(`      Field: ${err.field}`);
            if (err.help) console.error(`      Help: ${err.help}`);
          });
        }
      } catch (e) {
        // Not JSON, already logged as text
      }

      console.log('\n🔍 Troubleshooting Tips:');
      console.log('   1. Verify API key is valid in SendGrid dashboard');
      console.log('   2. Check sender authentication for:', CONTACT_EMAIL_FROM);
      console.log('   3. Ensure domain is verified in SendGrid');
      console.log('   4. Check API key has "Mail Send" permission');
    }
  } catch (error) {
    console.error('\n❌ Network Error:', error.message);
    console.log('\n🔍 Troubleshooting Tips:');
    console.log('   1. Check internet connection');
    console.log('   2. Verify SendGrid API is accessible');
    console.log('   3. Check for proxy/firewall issues');
  }

  console.log('\n📊 Test Complete!');
}

// Run the test
testSendGridEmail().catch(console.error);