export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log("User message:", message);

    // Free API call
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();

    return Response.json({
      reply: `AI Response: ${data.quote}`,
    });

  } catch (error) {
    console.error("Error:", error);

    return Response.json(
      { reply: "Demo response: API failed" },
      { status: 200 }
    );
  }
}