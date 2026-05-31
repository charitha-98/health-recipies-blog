
export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image) return Response.json({ error: "No image found" }, { status: 400 });

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const API_KEY = process.env.GEMINI_API_KEY;
    const MODEL = "gemini-2.5-flash"; // මෙය හරියටම මෙහෙම දාන්න
    const URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`;

    const response = await fetch(URL, {
      method: "POST", // මේක අනිවාර්යයෙන්ම POST විය යුතුයි
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: "Analyze this food image and provide nutritional facts (calories, protein, carbs, fat) in a clean JSON format." },
            { inline_data: { mime_type: image.type, data: base64Image } }
          ]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", JSON.stringify(data, null, 2));
      return Response.json({ error: data.error.message }, { status: 500 });
    }

    // සාර්ථකව ප්‍රතිඵලය ලබාදීම
    const result = data.candidates[0].content.parts[0].text;
    return Response.json({ result });
    
  } catch (error) {
    console.error("System Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}