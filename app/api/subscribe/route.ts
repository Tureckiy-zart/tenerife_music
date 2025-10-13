// export const dynamic = 'force-dynamic'

// import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   try {
//     const { email } = await request.json()

//     // Validate email
//     if (!email || typeof email !== 'string') {
//       return NextResponse.json(
//         { error: 'Valid email address is required' },
//         { status: 400 }
//       )
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { error: 'Please provide a valid email address' },
//         { status: 400 }
//       )
//     }

//     // Check if email already exists
//     const existingSubscription = await prisma.subscription.findUnique({
//       where: { email: email.toLowerCase().trim() }
//     })

//     if (existingSubscription) {
//       return NextResponse.json(
//         { error: 'This email is already subscribed' },
//         { status: 409 }
//       )
//     }

//     // Save to database
//     const subscription = await prisma.subscription.create({
//       data: {
//         email: email.toLowerCase().trim(),
//       },
//     })

//     return NextResponse.json(
//       {
//         message: 'Successfully subscribed!',
//         subscription: {
//           id: subscription.id,
//           email: subscription.email,
//           createdAt: subscription.createdAt,
//         }
//       },
//       { status: 201 }
//     )

//   } catch (error) {
//     console.error('Subscription error:', error)

//     // Handle Prisma unique constraint error
//     if ((error as any)?.code === 'P2002') {
//       return NextResponse.json(
//         { error: 'This email is already subscribed' },
//         { status: 409 }
//       )
//     }

//     return NextResponse.json(
//       { error: 'An unexpected error occurred. Please try again.' },
//       { status: 500 }
//     )
//   } finally {
//     await prisma.$disconnect()
//   }
// }
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Simulate success (no DB yet)
    console.log("New subscription:", email);

    return NextResponse.json(
      {
        message: "Successfully subscribed!",
        subscription: {
          id: Math.floor(Math.random() * 100000),
          email: email.toLowerCase().trim(),
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscription error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
