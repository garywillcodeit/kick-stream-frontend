import isNull from "./isNull";

export const submitVideoValidator = async (data, type) => {
  const { categoryIds, title, file } = data;

  if (categoryIds.length === 0) {
    throw new Error("You must select at least one category.");
  }

  if (isNull(title.trim())) {
    throw new Error("You must write a title.");
  }

  if (title.trim().length > 200) {
    throw new Error("The title length cannot exceed 200 characters.");
  }

  if (type === "upload") {
    checkFileData(file);
    return await getDuration(file);
  }
};

export const uploadVideoValidator = async (file, isUploadAllowed, user) => {
  if (!isUploadAllowed) {
    throw new Error("Video upload is not allowed for the moment.");
  }

  console.log(user);

  if (user.isUploadLimitReached) {
    throw new Error("Only 3 uploads are authorized per 24 hours.");
  }

  checkFileData(file);
  await getDuration(file);
};

const getDuration = async (file) => {
  const video = document.createElement("video");
  video.src = URL.createObjectURL(file);
  video.preload = "metadata";
  let metadata;

  try {
    metadata = await new Promise((resolve, reject) => {
      video.onloadedmetadata = () => {
        const { videoWidth, videoHeight, duration } = video;
        metadataValidator(video, reject);
        resolve({ videoWidth, videoHeight, duration });
      };
      video.onerror = () => reject("Unable to load this video.");
    });
  } catch (error) {
    throw new Error(error);
  }

  URL.revokeObjectURL(video.src);
  video.remove();

  return metadata;
};
const checkFileData = (file) => {
  const { type, size } = file;

  if (!["video/mp4", "video/quicktime"].includes(type)) {
    throw new Error("Only MP4 & MOV videos are accepted.");
  }

  if (size > 3 * 1024 * 1024 * 1024) {
    throw new Error("The size of the video can't exceed 3GB.");
  }
};

const metadataValidator = (video, reject) => {
  const { videoWidth, videoHeight, duration } = video;

  if (!videoHeight || !videoHeight || !duration) {
    reject("Unable to load this video.");
  }

  if (videoHeight < videoWidth) {
    reject("Only vertical video are allowed.");
  }

  if (videoWidth < 480) {
    reject("The video quality is not good enough to be uploaded.");
  }

  if (videoWidth > 2160) {
    reject("The video resolution exceeds the maximum allowed (4K).");
  }

  if (duration < 10) {
    reject("The video can't be less than 10 seconds long.");
  }

  if (duration > 300) {
    reject("The video duration can't exceed 5 minutes.");
  }
};
