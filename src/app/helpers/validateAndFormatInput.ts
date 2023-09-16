export const validateAndFormatInput = (input: string) => {
  // Replace spaces with hyphens and convert to lowercase
  const formattedInput = input.toLowerCase().replace(/\s+/g, '-');
    
  // Remove trailing hyphens
  const finalInput = formattedInput.replace(/-+$/, '');

  return finalInput;
}