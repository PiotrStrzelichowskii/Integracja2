import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Konfiguracja transportera SMTP
const createTransporter = () => {
  // Sprawdź czy wszystkie wymagane zmienne są dostępne
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    console.error('SMTP configuration missing:', {
      host: !!host,
      port: !!port,
      user: !!user,
      pass: !!pass
    });
    return null;
  }

  try {
    return nodemailer.createTransport({
      host: host,
      port: parseInt(port, 10),
      secure: false, // Port 587 używa STARTTLS, nie SSL
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        // Wyłącz weryfikację certyfikatu - konieczne dla hostingu współdzielonego
        // gdzie certyfikat jest wystawiony dla głównej domeny hostingu, nie dla subdomeny klienta
        rejectUnauthorized: false,
        // Alternatywnie można użyć servername, ale rejectUnauthorized: false jest prostsze
        // servername: host
      },
    });
  } catch (error) {
    console.error('Error creating SMTP transporter:', error);
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    console.log('Received data:', { name, email, subject, message: message?.length });

    // Walidacja danych
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Wszystkie wymagane pola muszą być wypełnione' },
        { status: 400 }
      );
    }

    // Walidacja email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Nieprawidłowy format adresu email' },
        { status: 400 }
      );
    }

    // Walidacja długości wiadomości
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Wiadomość musi mieć co najmniej 10 znaków' },
        { status: 400 }
      );
    }

    // Sprawdzenie czy SMTP jest skonfigurowany
    const transporter = createTransporter();
    if (!transporter) {
      console.error('SMTP transporter not configured');
      return NextResponse.json(
        { 
          error: 'Usługa email nie jest skonfigurowana',
          details: 'Brak konfiguracji SMTP. Sprawdź plik .env.local i dodaj SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.',
          code: 'MISSING_SMTP_CONFIG'
        },
        { status: 503 }
      );
    }

    // Pobierz główny adres email z zmiennych środowiskowych lub użyj domyślnego
    const mainEmail = process.env.MAIN_EMAIL || 'info@integracja4x4.pl';
    const fromEmail = process.env.SMTP_USER || 'automat@integracja4x4.pl';

    // Wysyłanie emaila
    console.log('Attempting to send email via SMTP...');
    console.log('From:', fromEmail);
    console.log('To:', mainEmail);
    console.log('Reply-To:', email);

    const mailOptions = {
      from: `Integracja 4x4 <${fromEmail}>`,
      to: mainEmail,
      replyTo: email,
      subject: subject ? `[Kontakt] ${subject}` : '[Kontakt] Nowa wiadomość',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
            Nowa wiadomość z formularza kontaktowego
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Dane kontaktowe:</h3>
            <p><strong>Imię:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${subject ? `<p><strong>Temat:</strong> ${subject}</p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #555; margin-top: 0;">Wiadomość:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px; border-left: 4px solid #28a745;">
            <p style="margin: 0; color: #155724; font-size: 14px;">
              <strong>Uwaga:</strong> Ta wiadomość została wysłana automatycznie z formularza kontaktowego na stronie integracja4x4.pl
            </p>
          </div>
        </div>
      `,
      // Alternatywna wersja tekstowa (opcjonalnie)
      text: `
Nowa wiadomość z formularza kontaktowego

Dane kontaktowe:
Imię: ${name}
Email: ${email}
${subject ? `Temat: ${subject}` : ''}

Wiadomość:
${message}

---
Ta wiadomość została wysłana automatycznie z formularza kontaktowego na stronie integracja4x4.pl
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Wiadomość została wysłana pomyślnie',
        messageId: info.messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('SMTP error:', error);
    
    // Bardziej szczegółowe logowanie błędów
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    // Zwróć bardziej szczegółowy błąd w trybie development
    const errorMessage = process.env.NODE_ENV === 'development' && error instanceof Error
      ? error.message
      : 'Wystąpił błąd podczas wysyłania wiadomości';

    return NextResponse.json(
      { 
        error: 'Wystąpił błąd podczas wysyłania wiadomości',
        details: process.env.NODE_ENV === 'development' && error instanceof Error 
          ? error.message 
          : undefined
      },
      { status: 500 }
    );
  }
}
