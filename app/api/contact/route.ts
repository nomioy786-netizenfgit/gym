import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phoneNumber, message } = body;

    if (!fullName || !phoneNumber) {
      return NextResponse.json(
        { error: 'Full name and phone number are required.' },
        { status: 400 }
      );
    }

    const newContact = {
      id: `msg-${Date.now()}`,
      fullName: String(fullName).trim(),
      phoneNumber: String(phoneNumber).trim(),
      message: message ? String(message).trim() : '',
      status: 'Unread',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Contact enquiry submitted successfully.',
        data: newContact,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process contact message.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'GYM Contact API endpoint active.',
  });
}
