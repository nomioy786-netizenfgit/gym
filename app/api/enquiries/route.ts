import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phoneNumber, planName, planPrice, age, joiningDate, notes } = body;

    if (!fullName || !phoneNumber) {
      return NextResponse.json(
        { error: 'Full name and phone number are required.' },
        { status: 400 }
      );
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const enquiryNumber = body.enquiryNumber || `GYM-PK-${randomDigits}`;

    const newEnquiry = {
      id: `enq-${Date.now()}`,
      enquiryNumber,
      fullName: String(fullName).trim(),
      phoneNumber: String(phoneNumber).trim(),
      planName: planName || 'STANDARD PLAN',
      planPrice: Number(planPrice) || 1499,
      age: Number(age) || 24,
      joiningDate: joiningDate || 'Immediate',
      notes: notes ? String(notes).trim() : '',
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Membership enquiry recorded successfully.',
        data: newEnquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process enquiry.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'GYM Membership Enquiries API endpoint active.',
  });
}
