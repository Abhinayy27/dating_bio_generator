"use client";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface BioParams {
  profession: string;
  interest: string;
  trait: string;
}

export async function generateBio({ profession, interest, trait }: BioParams): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenAI API key is missing. Please check your environment variables.");
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert dating profile writer with a witty sense of humor and a gift for wordplay.
Your specialties include:
- Crafting memorable first impressions through clever word associations
- Weaving profession-specific metaphors naturally into bios
- Using subtle humor and playful language
- Creating instant emotional connections through relatable descriptions
- Finding unique angles to present common interests

Writing style guidelines:
- Avoid clichés and generic dating profile language
- Use active voice and dynamic verbs
- Include one unexpected or surprising element
- Create visual imagery through specific details
- Balance humor with authenticity
- Never use phrases like "looking for" or "seeking"

Your bios should make the reader think "This person seems intriguing and genuine" rather than "This is another dating profile."`,
        },
        {
          role: "user",
          content: `Create an irresistible dating profile bio with these elements:
Profession: ${profession}
Passion: ${interest}
Key trait: ${trait}

Requirements:
- Maximum 150 characters
- Include a subtle, clever reference to their profession
- Weave in their interest in an unexpected way
- Use their personality trait to create intrigue
- Add one playful element or mild joke
- End with something memorable or quotable
- Focus on what makes them unique

Style: Imagine writing for a charming person who doesn't take themselves too seriously but has depth and genuine passion for what they do.`,
        },
      ],
      temperature: 0.75,
      max_tokens: 150,
      presence_penalty: 0.6,
    });

    return completion.choices[0].message.content || "Failed to generate bio. Please try again.";
  } catch (error: any) {
    console.error("Error generating bio:", error);
    throw new Error("Failed to generate bio. Please try again later.");
  }
}