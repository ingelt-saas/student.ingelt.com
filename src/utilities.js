export const audioTypes = [
    "audio/mpeg",          // MP3
    "audio/ogg",           // Ogg Vorbis
    "audio/wav",           // Waveform Audio File Format (WAV)
    "audio/webm",          // WebM audio
    "audio/flac",          // Free Lossless Audio Codec (FLAC)
];

export const videoTypes = [
    "video/mp4",         // MP4 (H.264 video codec with AAC audio)
    "video/webm",        // WebM (VP9 video codec with Vorbis or Opus audio)
    "video/ogg",         // Ogg video (Theora video codec with Vorbis audio)
    "video/avi",         // iTunes video
];

export const applicationTypes = [
    "application/pdf",            // PDF (Portable Document Format)
    "application/zip",            // ZIP archive
    "application/vnd.ms-excel",   // Microsoft Excel
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel (OpenXML)
    "application/msword",         // Microsoft Word
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word (OpenXML)
    "application/vnd.ms-powerpoint", // Microsoft PowerPoint
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PowerPoint (OpenXML)
];

export const fileDownload = (awsFileUrl, fileName) => new Promise(async (resolve, reject) => {
    try {
        const res = await fetch(awsFileUrl);
        const blob = await res.blob();

        const a = document.createElement("a");
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
        resolve(true);
    } catch (err) {
        reject(err)
    }
});