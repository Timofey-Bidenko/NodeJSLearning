"use strict";
export default function generateLorem(type, amount) {
    const loremBase = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const loremWords = loremBase.split(" ");
    if (!["characters", "words", "paragraphs"].includes(type) || amount <= 0) {
        throw new Error("Invalid type or amount. Type must be 'characters', 'words', or 'paragraphs', and amount must be a positive number.");
    }
    if (type === "characters") {
        const text = loremBase.repeat(Math.ceil(amount / loremBase.length));
        return text.slice(0, amount);
    }
    if (type === "words") {
        const words = [];
        for (let i = 0; i < amount; i++) {
            words.push(loremWords[i % loremWords.length]);
        }
        return words.join(" ");
    }
    if (type === "paragraphs") {
        const paragraphs = [];
        for (let i = 0; i < amount; i++) {
            paragraphs.push(loremBase);
        }
        return paragraphs.join("\n\n");
    }
    // Fallback in case of unexpected errors
    throw new Error("Unexpected error occurred.");
}
