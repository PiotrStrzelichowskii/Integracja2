import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicjalizacja Resend tylko jeśli klucz API jest dostępny
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    console.log('API Key available:', !!process.env.RESEND_API_KEY);
    console.log('API Key length:', process.env.RESEND_API_KEY?.length);
    
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

    // Sprawdzenie czy Resend jest dostępny
    if (!resend) {
      console.error('Resend API key not configured');
      return NextResponse.json(
        { 
          error: 'Usługa email nie jest skonfigurowana',
          details: 'Brak klucza API Resend. Sprawdź plik .env.local i dodaj RESEND_API_KEY.',
          code: 'MISSING_API_KEY'
        },
        { status: 503 }
      );
    }

    // Wysyłanie emaila
    console.log('Attempting to send email...');
    const { data, error } = await resend.emails.send({
      from: 'Integracja 4x4 <onboarding@resend.dev>',
      to: ['info@integracja4x4.pl'],
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
    });

    if (error) {
      console.error('Resend error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Wystąpił błąd podczas wysyłania wiadomości', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Wiadomość została wysłana pomyślnie',
        id: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  }
}
