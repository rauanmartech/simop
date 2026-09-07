/**
 * Utilitário de processamento e otimização de imagens no navegador.
 * Redimensiona proporcionalmente para até 1080x1920 (sem upscale e sem distorção)
 * e converte para formato WebP comprimido (qualidade 85).
 */

export interface ProcessedImageResult {
  blob: Blob;
  fileName: string;
  originalSize: number;
  processedSize: number;
  width: number;
  height: number;
  previewUrl: string;
}

export async function processImageBeforeUpload(
  file: File,
  quality: number = 0.85
): Promise<ProcessedImageResult> {
  return new Promise((resolve, reject) => {
    // 1. Validação de tipo
    if (!file.type.startsWith("image/")) {
      return reject(new Error(`O arquivo "${file.name}" não é uma imagem válida.`));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error(`Erro ao ler o arquivo "${file.name}".`));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error(`Erro ao carregar a imagem "${file.name}".`));
      img.onload = () => {
        try {
          const origWidth = img.naturalWidth || img.width;
          const origHeight = img.naturalHeight || img.height;

          // 2. Cálculo de proporção: Máximo 1080x1920 (Landscape: 1920x1080, Portrait: 1080x1920)
          const isLandscape = origWidth >= origHeight;
          const maxAllowedWidth = isLandscape ? 1920 : 1080;
          const maxAllowedHeight = isLandscape ? 1080 : 1920;

          let targetWidth = origWidth;
          let targetHeight = origHeight;

          // Reduzir apenas se exceder o limite (nunca fazer upscale de imagens menores)
          if (origWidth > maxAllowedWidth || origHeight > maxAllowedHeight) {
            const widthRatio = maxAllowedWidth / origWidth;
            const heightRatio = maxAllowedHeight / origHeight;
            const ratio = Math.min(widthRatio, heightRatio);

            targetWidth = Math.round(origWidth * ratio);
            targetHeight = Math.round(origHeight * ratio);
          }

          // 3. Renderização no Canvas
          const canvas = document.createElement("canvas");
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            return reject(new Error("Falha ao inicializar contexto 2D do Canvas."));
          }

          // Qualidade de interpolação
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // 4. Conversão para WebP
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                return reject(new Error("Falha ao gerar o arquivo WebP otimizado."));
              }

              const baseName = file.name.replace(/\.[^/.]+$/, "");
              const webpFileName = `${baseName}.webp`;
              const previewUrl = URL.createObjectURL(blob);

              resolve({
                blob,
                fileName: webpFileName,
                originalSize: file.size,
                processedSize: blob.size,
                width: targetWidth,
                height: targetHeight,
                previewUrl,
              });
            },
            "image/webp",
            quality
          );
        } catch (err: any) {
          reject(err);
        }
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Formata bytes para string legível (ex: 2.4 MB, 450 KB).
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
