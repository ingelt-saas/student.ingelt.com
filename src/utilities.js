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

export const videoExtensions = [
    ".mp4",
    ".mkv",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".webm",
    ".m4v",
    ".mpeg",
    ".mpg",
    ".3gp",
    ".m2ts",
    ".vob",
    ".ts",
    ".divx",
];

export const audioExtensions = [
    ".mp3",
    ".wav",
    ".ogg",
    ".flac",
    ".aac",
    ".m4a",
    ".wma",
    ".aiff",
    ".ape",
    ".alac",
    ".mid",
    ".midi",
    ".amr",
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

export const viewsShorten = (num) => {

    if (typeof num !== "number") {
        return "0";
    }
    num = num?.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
        return num;
    }
    let si = [
        { v: 1e3, s: "K" },
        { v: 1e6, s: "M" },
        { v: 1e9, s: "B" },
        { v: 1e12, s: "T" },
        { v: 1e15, s: "P" },
        { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (
        (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
        si[index].s
    );
};

export const secondsToHoursMinutes = (seconds) => {

    const hours = Math.floor(seconds / 3600); // Number of whole hours
    const remainingSeconds = seconds % 3600; // Remaining seconds after calculating hours
    const minutes = Math.floor(remainingSeconds / 60); // Number of whole minutes
    return `${hours.toString().padStart(2, 0)} h ${minutes
        .toString()
        .padStart(2, 0)} min`;
};


