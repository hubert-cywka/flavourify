import imageCompression from 'browser-image-compression';

export const getCompressedImageUrl = async (image: string): Promise<string> => {
  const fileToCompress = await imageCompression.getFilefromDataUrl(image, 'file.jpg');
  const compressedImage = await imageCompression(fileToCompress, {
    maxSizeMB: 0.8,
    alwaysKeepResolution: true,
    useWebWorker: true
  });

  return await imageCompression.getDataUrlFromFile(compressedImage);
};
