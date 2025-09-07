const getRealImageMimetype = async (file) => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function (event) {
      if (event.target.readyState === FileReader.DONE) {
        const arr = new Uint8Array(event.target.result).subarray(0, 4);
        let header = "";
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }

        let mimeType;
        switch (true) {
          case header.startsWith("89504e47"):
            mimeType = "image/png";
            break;
          case header.startsWith("ffd8ffe0") ||
            header.startsWith("ffd8ffe1") ||
            header.startsWith("ffd8ffe2") ||
            header.startsWith("ffd8ffe3") ||
            header.startsWith("ffd8ffe8"):
            mimeType = "image/jpeg";
            break;
          case header.startsWith("47494638"):
            mimeType = "image/gif";
            break;
          case header.startsWith("52494646"):
            mimeType = "image/webp";
            break;
          case header.includes("6674797061766966") ||
            header.includes("6674797061766973") ||
            header.includes("667479706d696631") ||
            header.includes("667479706d736631"):
            mimeType = "image/avif";
            break;
          default:
            reject("This image type is not supported.");
            break;
        }
        resolve(mimeType);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};

export default getRealImageMimetype;
