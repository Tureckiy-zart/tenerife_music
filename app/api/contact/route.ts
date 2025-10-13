// export const dynamic = 'force-dynamic'

// import { NextResponse } from 'next/server'

// const prisma = new PrismaClient()

// export async function POST(request: Request) {
//   try {
//     const { name, email, message } = await request.json()

//     // Validate required fields
//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { error: 'Name, email, and message are all required' },
//         { status: 400 }
//       )
//     }

//     // Validate field types
//     if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
//       return NextResponse.json(
//         { error: 'All fields must be valid strings' },
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

//     // Validate field lengths
//     if (name.trim().length < 2) {
//       return NextResponse.json(
//         { error: 'Name must be at least 2 characters long' },
//         { status: 400 }
//       )
//     }

//     if (message.trim().length < 10) {
//       return NextResponse.json(
//         { error: 'Message must be at least 10 characters long' },
//         { status: 400 }
//       )
//     }

//     if (message.trim().length > 2000) {
//       return NextResponse.json(
//         { error: 'Message must be less than 2000 characters' },
//         { status: 400 }
//       )
//     }

//     // Save to database
//     const contact = await prisma.contact.create({
//       data: {
//         name: name.trim(),
//         email: email.toLowerCase().trim(),
//         message: message.trim(),
//       },
//     })

//     return NextResponse.json(
//       {
//         message: 'Contact form submitted successfully!',
//         contact: {
//           id: contact.id,
//           name: contact.name,
//           email: contact.email,
//           createdAt: contact.createdAt,
//         }
//       },
//       { status: 201 }
//     )

//   } catch (error) {
//     console.error('Contact form error:', error)

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
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are all required" },
        { status: 400 }
      );
    }

    // Validate field types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "All fields must be valid strings" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400 }
      );
    }

    if (message.trim().length > 2000) {
      return NextResponse.json(
        { error: "Message must be less than 2000 characters" },
        { status: 400 }
      );
    }

    // Placeholder for future database integration
    console.log("Contact form received:", { name, email, message });

    return NextResponse.json(
      {
        message: "Contact form submitted successfully!",
        contact: {
          id: Math.floor(Math.random() * 100000),
          name: name.trim(),
          email: email.toLowerCase().trim(),
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
