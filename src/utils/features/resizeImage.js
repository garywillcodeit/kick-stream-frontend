const resizeImage = async (file, size = 200) => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = size;
        canvas.height = size;

        const scale = Math.max(size / img.width, size / img.height);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const xOffset = (size - newWidth) / 2;
        const yOffset = (size - newHeight) / 2;

        ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);

        try {
          const base64 = canvas.toDataURL("image/jpeg", 0.8);
          resolve(base64);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = reject;
    };

    reader.onerror = reject;
  });
};

export default resizeImage;
