import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

async function readStreamAsString(stream: ReadableStream<Uint8Array>): Promise<string> {
  let result = "";
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += new TextDecoder().decode(value);
  }
  return result;
}

export async function POST(req: NextRequest) {
    try {
        if (req.body === null) {
          return new NextResponse("Bad Request", { status: 400 });
        }
  
        const bodyAsString = await readStreamAsString(req.body);
        const parsedBody = JSON.parse(bodyAsString);


        const { 
            id, 
            first_name: firstName, 
            last_name: lastName, 
            email_addresses: emailAddresses, 
            username, 
            image_url: imageUrl 
        } = parsedBody.data;

        // Vérifier si l'utilisateur existe déjà dans votre base de données Prisma
        const existingUser = await prismadb.user.findUnique({
            where: { id },
        });

        if (existingUser) {
            return new NextResponse(JSON.stringify({ message: "User already exists" }), { status: 409 });
        }

        // Créer un nouvel utilisateur dans votre base de données Prisma s'il n'existe pas
        const newUser = await prismadb.user.create({
            data: {
                id,
                email: emailAddresses[0]?.email_address,
                firstName,
                lastName,
                username: username,
                imageUrl,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        return new NextResponse(JSON.stringify({ newUser }), { status: 201 });

    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}
