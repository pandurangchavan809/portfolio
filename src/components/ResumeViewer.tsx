import { useEffect, useRef, useState } from "react";
import resumeImage from "../assets/resume-view.webp";
import { CloseButton, Modal } from "./ui";

const ZOOMS = [100, 150, 200, 300];

/**
 * View-only resume. The site ships a watermarked raster, never the PDF, and paints it to a
 * canvas so there is no image to right-click and save. This deters casual copying only:
 * anything a browser can display can still be screenshotted.
 */
export function ResumeViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    if (!open) return;

    setLoaded(false);
    setZoom(0);
    const image = new Image();
    image.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext("2d")?.drawImage(image, 0, 0);
      setLoaded(true);
    };
    image.src = resumeImage;

    const blockShortcuts = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["s", "p"].includes(e.key.toLowerCase())) e.preventDefault();
    };
    window.addEventListener("keydown", blockShortcuts);
    return () => {
      image.onload = null;
      window.removeEventListener("keydown", blockShortcuts);
    };
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} label="Resume, view only" className="resume-dialog w-[min(56rem,calc(100vw-1rem))]">
      <div className="flex max-h-[94dvh] flex-col">
        <div className="flex items-center justify-between gap-3 p-4 sm:px-6">
          <div>
            <h3 className="font-display text-lg font-semibold">Resume</h3>
            <p className="text-xs text-muted">View only</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded-full border border-line" role="group" aria-label="Zoom">
              <button
                type="button"
                onClick={() => setZoom((z) => z - 1)}
                disabled={zoom === 0}
                aria-label="Zoom out"
                className="h-9 w-9 hover:bg-violet/15 disabled:opacity-40"
              >
                −
              </button>
              <span className="grid w-14 place-items-center border-x border-line font-mono text-xs">{ZOOMS[zoom]}%</span>
              <button
                type="button"
                onClick={() => setZoom((z) => z + 1)}
                disabled={zoom === ZOOMS.length - 1}
                aria-label="Zoom in"
                className="h-9 w-9 hover:bg-violet/15 disabled:opacity-40"
              >
                +
              </button>
            </div>
            <CloseButton onClick={onClose} />
          </div>
        </div>
        <div className="relative min-h-[50dvh] flex-1 overflow-auto border-t border-line bg-white">
          {!loaded && <p className="absolute inset-0 grid place-items-center text-sm text-neutral-600">Loading resume...</p>}
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Resume of Pandurang Chavan"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            style={{ width: `${ZOOMS[zoom]}%`, maxWidth: "none" }}
            className={`block select-none ${loaded ? "" : "invisible"}`}
          />
        </div>
      </div>
    </Modal>
  );
}
