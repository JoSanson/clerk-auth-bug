// Importations nécessaires
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// Fonction POST asynchrone
export async function POST(req: NextRequest) {
  try {

    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {}

    // Si l'utilisateur est connecté, récupérez les données de l'utilisateur
    if (userId) {
      const userData = await prismadb.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          userConfig: true,
          contents: true,
          prompts: true,
          favorites: true,
          promptRating: true,
          promptUsage: true,
        },
      });

      if (!userData) {
        return new NextResponse("User not found", { status: 404 });
      }

      return new NextResponse(JSON.stringify(userData), { status: 200 });
    }

    // Si l'utilisateur n'est pas connecté, retournez une réponse appropriée
    return new NextResponse(JSON.stringify({ message: "User not authenticated" }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new NextResponse("Internal error", { status: 500 });
  }
  
}
