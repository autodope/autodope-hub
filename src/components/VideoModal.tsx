import { useEffect, useRef, useCallback } from "react";

interface VideoModalProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ src, isOpen, onClose }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    // Autoplay
    videoRef.current?.play().catch(() => {});

    // Try fullscreen on the overlay container (non-blocking — modal still works if it fails)
    overlayRef.current?.requestFullscreen?.().catch(() => {});

    // Prevent background scroll
    document.body.style.overflow = "hidden";

    // Close on Escape when not in native fullscreen (native fullscreen handles its own Escape)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) handleClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="video-modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="DJ Orlando video"
    >
      {/* Stop clicks on the video itself from closing the modal */}
      <div
        className="video-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="video-modal-close"
          onClick={handleClose}
          aria-label="Close video"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5l15 15M16.5 1.5l-15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <video
          ref={videoRef}
          src={src}
          playsInline
          controls
          className="video-modal-video"
        />
      </div>
    </div>
  );
};

export default VideoModal;
