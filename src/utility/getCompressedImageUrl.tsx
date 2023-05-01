import imageCompression from 'browser-image-compression';

export const getCompressedImageUrl = async (image: string, maxSize: number): Promise<string> => {
  const fileToCompress = await imageCompression.getFilefromDataUrl(image, 'file.jpg');
  const compressedImage = await imageCompression(fileToCompress, {
    maxSizeMB: maxSize,
    alwaysKeepResolution: true,
    useWebWorker: true
  });

  return await imageCompression.getDataUrlFromFile(compressedImage);
};
