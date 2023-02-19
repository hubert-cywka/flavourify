import imageCompression from 'browser-image-compression';

export const getCompressedImageUrl = async (image: string): Promise<string> => {
  const fileToCompress = await imageCompression.getFilefromDataUrl(image, 'file.png');
  const compressedImage = await imageCompression(fileToCompress, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1500,
    useWebWorker: true
  });

  return await imageCompression.getDataUrlFromFile(compressedImage);
};
