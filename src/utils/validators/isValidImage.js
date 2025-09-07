const isValidImage = async (file) => {
  return await new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => resolve(true);
    img.onerror = () => reject(new Error("This image is invalid."));
  });
};

export default isValidImage;
