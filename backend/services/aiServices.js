const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta"; 

export const generateText = async (prompt) => {
  if (!API_KEY) {
    throw new Error("Missing Gemini API key. Set GEMINI_API_KEY in backend/.env.")
  }

  const response = await fetch(
    `${BASE_URL}/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{text: prompt}]
          }
        ]
      })
    }
  );

  const data = await response.json()

  if(!response.ok) {
    throw new Error( data?.error?.message || "Text generation failed")
  }

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No Response"
};


export const generateImage = async (prompt) => {
  const encodedPrompt = encodeURIComponent(prompt);


  const randomSeed = Math.floor(Math.random()* 1000000);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${randomSeed}&width=1024&height=1024&nologo=true`;


  const controller = new AbortController()
  const timeout = setTimeout(()=> controller.abort(), 90000)


  try{
    const response = await fetch(imageUrl, {signal: controller.signal});
    const buffer = await response.arrayBuffer();

    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;    

  } catch (err) {
    console.error("Pollinations Error:", err)
    throw new Error("Failed To Generate Image")
  } finally{
    clearTimeout(timeout)
  }
};