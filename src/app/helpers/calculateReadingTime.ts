export const calculateReadingTime = (content: string) => {
  // Assuming an average reading speed of 200 words per minute
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute)
  return readingTimeMinutes
}
