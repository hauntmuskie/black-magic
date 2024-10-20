import { safetySettings } from "@/lib/gemini/safety";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(request: Request) {
  const { namaPenyihir, namaTarget, jenisSantet, isPermanent } =
    await request.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
    safetySettings,
  });

  const prompt = `Buatlah lelucon singkat dan lucu tapi serius tentang santet online dengan detail berikut:
  Penyihir: ${namaPenyihir}
  Target: ${namaTarget}
  Jenis Santet: ${jenisSantet}
  ${isPermanent ? "Santet Permanen" : "Santet Sementara"}
  Lelucon harus dalam Bahasa Indonesia dan tidak lebih dari 3 kalimat dan santetnya berhasil.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Error generating curse:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses santet." },
      { status: 500 }
    );
  }
}
