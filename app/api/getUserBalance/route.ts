// Importations nécessaires
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// Fonction GET asynchrone
export async function GET(req: NextRequest) {
  try {
    console.log("Starting authentication...");
    const { userId } = auth();
    console.log("UserID:", userId);
    
    const user = await currentUser();
    console.log("User:", user);

    if (!userId || !user) {
      console.log("User not authenticated or not found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userBalance = await prismadb.user.findUnique({
      where: { id: userId },
      select: {
        tokenBalance: true,
        tokenFromSales: true
      }
    });

    if (!userBalance) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(userBalance), { status: 200 });

  } catch (error) {
    console.error(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
