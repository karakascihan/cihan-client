/**
 * Utility functions for ProjectReport file handling
 */

/**
 * Convert a File object to base64 string
 */
export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        file
            .arrayBuffer()
            .then((buffer) => {
                const bytes = btoa(
                    new Uint8Array(buffer).reduce(
                        (acc, byte) => acc + String.fromCharCode(byte),
                        ""
                    )
                );
                resolve(bytes);
            })
            .catch(reject);
    });
};

/**
 * Get file extension from filename (with dot, uppercase)
 * Example: "document.pdf" => ".PDF"
 */
export const getFileExtension = (filename: string): string => {
    const extension = filename.split(".").pop();
    return extension ? "." + extension.toUpperCase() : "";
};

/**
 * Get filename without extension (uppercase)
 * Example: "document.pdf" => "DOCUMENT"
 */
export const getFileNameWithoutExtension = (filename: string): string => {
    return filename.split(".")[0].toUpperCase() || "";
};

/**
 * Create a data URL for file preview
 * @param bytes - Base64 encoded file bytes
 * @param extension - File extension (e.g., ".PDF", ".PNG")
 * @param getMimeType - Function to get MIME type from extension
 */
export const createFileDataUrl = (
    bytes: string,
    extension: string,
    getMimeType: (ext: string) => string
): string => {
    const cleanExtension = extension?.replace(".", "").toLowerCase();
    const mimeType = getMimeType(cleanExtension);
    return `data:${mimeType};base64,${bytes}`;
};
