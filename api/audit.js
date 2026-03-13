export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    return response.status(500).json({ error: "Missing OPENAI_API_KEY" });
  }

  const { query, category, searchHistory, image, filename } = request.body ?? {};

  const content = [
    {
      type: "input_text",
      text:
        "You are inDepth, a B2B AI-shopping monitoring copilot for eBay. " +
        "Analyze the user-supplied shopping prompt and any uploaded screenshot evidence. " +
        "Infer the likely visibility or trust issue automatically. " +
        "Use recent search history to personalize recommendations when relevant. " +
        "Return concise monitoring guidance for a business team.",
    },
    {
      type: "input_text",
      text:
        `Shopping prompt: ${query || ""}\n` +
        `Category or product line: ${category || ""}\n` +
        `Recent search history: ${JSON.stringify(searchHistory || [])}\n` +
        `Filename: ${filename || "none"}`,
    },
  ];

  if (image) {
    content.push({
      type: "input_image",
      image_url: image,
    });
  }

  const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "user",
          content,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "audit_result",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              reply: { type: "string" },
              favoriteCategory: { type: "string" },
              preferredBrand: { type: "string" },
              budgetMemory: { type: "string" },
              results: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    title: { type: "string" },
                    body: { type: "string" },
                  },
                  required: ["title", "body"],
                },
              },
            },
            required: [
              "reply",
              "favoriteCategory",
              "preferredBrand",
              "budgetMemory",
              "results",
            ],
          },
        },
      },
    }),
  });

  if (!openAIResponse.ok) {
    const errorText = await openAIResponse.text();
    return response.status(openAIResponse.status).json({ error: errorText });
  }

  const result = await openAIResponse.json();
  const outputText = result.output_text;

  try {
    return response.status(200).json(JSON.parse(outputText));
  } catch {
    return response.status(500).json({ error: "Invalid model JSON output" });
  }
}
