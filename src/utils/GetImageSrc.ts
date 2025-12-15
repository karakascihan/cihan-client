export const getImageSrc = (base64String: string) => {
    const getImageType = (base64String: string) => {
      if (base64String.startsWith('/9j/')) {
        return 'jpeg';
      } else if (base64String.startsWith('iVBORw0KGgo')) {
        return 'png';
      } else if (base64String.startsWith('R0lGODlh') || base64String.startsWith('R0lGODdh')) {
        return 'gif';
      } else if (base64String.startsWith('UklGR')) {
        return 'webp';
      }
      // Add more checks for other image types if needed
      return 'jpeg'; // Default to jpeg if type cannot be determined
    };
  
    const imageType = getImageType(base64String);
    return `data:image/${imageType};base64,${base64String}`;
  };