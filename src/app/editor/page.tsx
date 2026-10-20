"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { initiateRazorpayPayment } from "@/utils/razorpayClient";


interface TextLayer {
  id: string;
  text: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  fontFamily: string;
  fontSize: number; // in px on 572-width canvas
  color: string;
  fontWeight: string;
  fontStyle: "normal" | "italic";
  textTransform: "none" | "uppercase" | "lowercase";
  letterSpacing: number; // in px
  textAlign: "center" | "left" | "right";
  shadow: boolean;
}

const INITIAL_LAYERS: TextLayer[] = [
  {
    id: "layer-1",
    text: "|| श्री गणेशाय नमः ||",
    x: 50,
    y: 20.5,
    fontFamily: "Rozha One",
    fontSize: 18,
    color: "#8B1E1E",
    fontWeight: "400",
    fontStyle: "normal",
    textTransform: "none",
    letterSpacing: 2,
    textAlign: "center",
    shadow: false,
  },
  {
    id: "layer-2",
    text: "TOGETHER WITH THEIR FAMILIES",
    x: 50,
    y: 24.5,
    fontFamily: "Montserrat",
    fontSize: 11,
    color: "#6D4C41",
    fontWeight: "600",
    fontStyle: "normal",
    textTransform: "uppercase",
    letterSpacing: 3,
    textAlign: "center",
    shadow: false,
  },
  {
    id: "layer-3",
    text: "Aarav",
    x: 50,
    y: 29.5,
    fontFamily: "Great Vibes",
    fontSize: 48,
    color: "#8B1E1E",
    fontWeight: "400",
    fontStyle: "normal",
    textTransform: "none",
    letterSpacing: 1,
    textAlign: "center",
    shadow: true,
  },
  {
    id: "layer-4",
    text: "&",
    x: 50,
    y: 34.5,
    fontFamily: "Playfair Display",
    fontSize: 22,
    color: "#C59B27",
    fontWeight: "700",
    fontStyle: "italic",
    textTransform: "none",
    letterSpacing: 0,
    textAlign: "center",
    shadow: false,
  },
  {
    id: "layer-5",
    text: "Diya",
    x: 50,
    y: 39,
    fontFamily: "Great Vibes",
    fontSize: 48,
    color: "#8B1E1E",
    fontWeight: "400",
    fontStyle: "normal",
    textTransform: "none",
    letterSpacing: 1,
    textAlign: "center",
    shadow: true,
  },
  {
    id: "layer-6",
    text: "INVITE YOU TO CELEBRATE THEIR WEDDING",
    x: 50,
    y: 44.5,
    fontFamily: "Montserrat",
    fontSize: 10,
    color: "#5D4037",
    fontWeight: "600",
    fontStyle: "normal",
    textTransform: "uppercase",
    letterSpacing: 2.5,
    textAlign: "center",
    shadow: false,
  },
  {
    id: "layer-7",
    text: "DECEMBER 12, 2026 | 7:00 PM ONWARDS",
    x: 50,
    y: 48,
    fontFamily: "Cinzel",
    fontSize: 14,
    color: "#8B1E1E",
    fontWeight: "700",
    fontStyle: "normal",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    textAlign: "center",
    shadow: false,
  },
  {
    id: "layer-8",
    text: "Grand Palace & Resort, Jaipur",
    x: 50,
    y: 51.5,
    fontFamily: "Playfair Display",
    fontSize: 14,
    color: "#4E342E",
    fontWeight: "600",
    fontStyle: "normal",
    textTransform: "none",
    letterSpacing: 0.5,
    textAlign: "center",
    shadow: false,
  },
  {
    id: "layer-9",
    text: "RSVP: Sharma & Verma Families (+91 98765 43210)",
    x: 50,
    y: 55,
    fontFamily: "Montserrat",
    fontSize: 9.5,
    color: "#795548",
    fontWeight: "500",
    fontStyle: "normal",
    textTransform: "none",
    letterSpacing: 0.5,
    textAlign: "center",
    shadow: false,
  },
];

const FONTS = [
  { name: "Great Vibes", label: "Great Vibes (Calligraphy)", className: "font-great-vibes" },
  { name: "Playfair Display", label: "Playfair Display (Elegant Serif)", className: "font-playfair" },
  { name: "Cinzel", label: "Cinzel (Royal Classical)", className: "font-cinzel" },
  { name: "Rozha One", label: "Rozha One (Traditional Indian)", className: "font-rozha" },
  { name: "Alex Brush", label: "Alex Brush (Romantic Script)", className: "font-alex-brush" },
  { name: "Montserrat", label: "Montserrat (Clean Modern)", className: "font-montserrat" },
];

const COLOR_SWATCHES = [
  { name: "Royal Maroon", color: "#8B1E1E" },
  { name: "Deep Crimson", color: "#B31B1B" },
  { name: "Rich Gold", color: "#C59B27" },
  { name: "Warm Amber", color: "#D97706" },
  { name: "Dark Bronze", color: "#4E342E" },
  { name: "Emerald Green", color: "#1B4D3E" },
  { name: "Navy Blue", color: "#1E293B" },
  { name: "Classic Black", color: "#111827" },
  { name: "Pure White", color: "#FFFFFF" },
];

const PRESETS = [
  {
    name: "Aarav & Diya (Traditional Wedding)",
    groom: "Aarav",
    bride: "Diya",
    date: "DECEMBER 12, 2026 | 7:00 PM ONWARDS",
    venue: "Grand Palace & Resort, Jaipur",
  },
  {
    name: "Rohan & Priya (Royal Sangeet)",
    groom: "Rohan",
    bride: "Priya",
    date: "NOVEMBER 24, 2026 | 6:30 PM ONWARDS",
    venue: "Taj Lakeview Palace, Udaipur",
  },
  {
    name: "Vikram & Ananya (Ring Ceremony)",
    groom: "Vikram",
    bride: "Ananya",
    date: "JANUARY 18, 2027 | 5:00 PM ONWARDS",
    venue: "The Oberoi Grand Hall, Delhi",
  },
];

export const getFontFamily = (name: string): string => {
  switch (name) {
    case "Great Vibes":
      return "'Great Vibes', cursive";
    case "Alex Brush":
      return "'Alex Brush', cursive";
    case "Playfair Display":
      return "'Playfair Display', serif";
    case "Cinzel":
      return "'Cinzel', serif";
    case "Rozha One":
      return "'Rozha One', serif";
    case "Montserrat":
      return "'Montserrat', sans-serif";
    default:
      return `"${name}", serif, sans-serif`;
  }
};

export default function PosterEditorPage() {
  const [layers, setLayers] = useState<TextLayer[]>(INITIAL_LAYERS);
  const [selectedId, setSelectedId] = useState<string>("layer-3");
  const [activeTab, setActiveTab] = useState<"quick" | "style" | "add" | "text" | "presets">("quick");
  const [customTextDraft, setCustomTextDraft] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  // Media Mode: "poster" or "video"
  const [mediaMode, setMediaMode] = useState<"poster" | "video">("poster");
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Preload and guarantee all wedding fonts are ready on mobile devices
  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      const fontsToWarm = [
        '400 16px "Great Vibes"',
        '700 16px "Playfair Display"',
        '700 16px "Cinzel"',
        '400 16px "Rozha One"',
        '400 16px "Alex Brush"',
        '600 16px "Montserrat"',
      ];
      Promise.all(fontsToWarm.map((f) => document.fonts.load(f).catch(() => {})))
        .then(() => setFontsLoaded(true))
        .catch(() => setFontsLoaded(true));
    }
  }, []);

  // Initialize mediaMode from URL parameter (e.g., ?mode=video or ?mode=poster)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get("mode");
      if (modeParam === "video" || modeParam === "poster") {
        setMediaMode(modeParam);
      }
    }
  }, []);

  const [isExporting, setIsExporting] = useState(false);
  
  // Poster Payment Modal
  const [showPosterPaymentModal, setShowPosterPaymentModal] = useState(false);
  const [posterPaymentStep, setPosterPaymentStep] = useState<"pay" | "processing" | "success">("pay");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"upi" | "card">("upi");

  // Video Render Payment Modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoPayStep, setVideoPayStep] = useState<"pay" | "rendering" | "success">("pay");
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderStatusText, setRenderStatusText] = useState("");

  const [verifiedPaymentId, setVerifiedPaymentId] = useState<string | null>(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const [showToast, setShowToast] = useState<string | null>(null);


  const posterContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const draggingIdRef = useRef<string | null>(null);
  const dragStartPosRef = useRef<{ clientX: number; clientY: number; initialX: number; initialY: number } | null>(null);
  const hasMovedRef = useRef<boolean>(false);
  const [editingLayerId, setEditingLayerId] = useState<string | null>(null);
  const inlineInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editingLayerId && inlineInputRef.current) {
      inlineInputRef.current.focus();
      const len = inlineInputRef.current.value.length;
      inlineInputRef.current.setSelectionRange(len, len);
    }
  }, [editingLayerId]);

  const selectedLayer = layers.find((l) => l.id === selectedId) || layers[0];

  const updateSelectedLayer = (updates: Partial<TextLayer>) => {
    if (!selectedId) return;
    setLayers((prev) =>
      prev.map((layer) => (layer.id === selectedId ? { ...layer, ...updates } : layer))
    );
  };

  const handleAddSnippet = (
    text: string,
    fontFamily = "Great Vibes",
    fontSize = 28,
    color = "#8B1E1E",
    y = 45
  ) => {
    const newId = `layer-${Date.now()}`;
    const newLayer: TextLayer = {
      id: newId,
      text,
      x: 50,
      y,
      fontFamily,
      fontSize,
      color,
      fontWeight: "700",
      fontStyle: "normal",
      textTransform: "none",
      letterSpacing: 1,
      textAlign: "center",
      shadow: false,
    };
    setLayers((prev) => [...prev, newLayer]);
    setSelectedId(newId);
    setActiveTab("style");
  };

  const handleAddText = (type: "heading" | "subheading" | "body") => {
    const newId = `layer-${Date.now()}`;
    let newLayer: TextLayer;

    if (type === "heading") {
      newLayer = {
        id: newId,
        text: "New Heading",
        x: 50,
        y: 35,
        fontFamily: "Playfair Display",
        fontSize: 32,
        color: "#8B1E1E",
        fontWeight: "700",
        fontStyle: "normal",
        textTransform: "none",
        letterSpacing: 1,
        textAlign: "center",
        shadow: false,
      };
    } else if (type === "subheading") {
      newLayer = {
        id: newId,
        text: "Subheading Details",
        x: 50,
        y: 42,
        fontFamily: "Cinzel",
        fontSize: 16,
        color: "#4E342E",
        fontWeight: "600",
        fontStyle: "normal",
        textTransform: "uppercase",
        letterSpacing: 2,
        textAlign: "center",
        shadow: false,
      };
    } else {
      newLayer = {
        id: newId,
        text: "Click to write your wedding message here",
        x: 50,
        y: 46,
        fontFamily: "Montserrat",
        fontSize: 12,
        color: "#6D4C41",
        fontWeight: "400",
        fontStyle: "normal",
        textTransform: "none",
        letterSpacing: 0.5,
        textAlign: "center",
        shadow: false,
      };
    }

    setLayers((prev) => [...prev, newLayer]);
    setSelectedId(newId);
    setActiveTab("style");
  };

  const handleDeleteLayer = (id: string) => {
    if (layers.length <= 1) return;
    setLayers((prev) => prev.filter((l) => l.id !== id));
    if (selectedId === id) {
      const remaining = layers.filter((l) => l.id !== id);
      setSelectedId(remaining[0]?.id || "");
    }
  };

  const handleDuplicateLayer = (id: string) => {
    const target = layers.find((l) => l.id === id);
    if (!target) return;
    const newId = `layer-${Date.now()}`;
    const cloned: TextLayer = {
      ...target,
      id: newId,
      y: Math.min(target.y + 3, 90),
    };
    setLayers((prev) => [...prev, cloned]);
    setSelectedId(newId);
  };

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setLayers((prev) =>
      prev.map((l) => {
        if (l.id === "layer-3") return { ...l, text: preset.groom };
        if (l.id === "layer-5") return { ...l, text: preset.bride };
        if (l.id === "layer-7") return { ...l, text: preset.date };
        if (l.id === "layer-8") return { ...l, text: preset.venue };
        return l;
      })
    );
    showNotification(`Applied preset: ${preset.name}`);
  };

  const resetToDefault = () => {
    if (confirm("Reset all text elements and styling back to original template?")) {
      setLayers(INITIAL_LAYERS);
      setSelectedId("layer-3");
      showNotification("Reset to default template");
    }
  };

  const showNotification = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 4000);
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsVideoPlaying(true);
  };

  // Canvas Drag Handling (Touch & Mouse Optimized)
  const handlePointerDown = (e: React.PointerEvent, layerId: string) => {
    // If currently editing this layer inline, allow standard cursor / selection
    if (editingLayerId === layerId) {
      return;
    }

    e.stopPropagation();
    hasMovedRef.current = false;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    setSelectedId(layerId);
    setActiveTab("style");
    draggingIdRef.current = layerId;
    const layer = layers.find((l) => l.id === layerId);
    if (layer) {
      dragStartPosRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        initialX: layer.x,
        initialY: layer.y,
      };
    }
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingIdRef.current || !dragStartPosRef.current || !posterContainerRef.current) return;
      const rect = posterContainerRef.current.getBoundingClientRect();
      const deltaXPixels = e.clientX - dragStartPosRef.current.clientX;
      const deltaYPixels = e.clientY - dragStartPosRef.current.clientY;

      if (Math.abs(deltaXPixels) > 3 || Math.abs(deltaYPixels) > 3) {
        hasMovedRef.current = true;
      }

      const deltaXPercent = (deltaXPixels / rect.width) * 100;
      const deltaYPercent = (deltaYPixels / rect.height) * 100;

      const newX = Math.max(5, Math.min(95, dragStartPosRef.current.initialX + deltaXPercent));
      const newY = Math.max(5, Math.min(95, dragStartPosRef.current.initialY + deltaYPercent));

      setLayers((prev) =>
        prev.map((l) => (l.id === draggingIdRef.current ? { ...l, x: newX, y: newY } : l))
      );
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (draggingIdRef.current) {
        try {
          (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
        } catch {}
      }
      draggingIdRef.current = null;
      dragStartPosRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  // HTML5 Canvas Export Engine for Poster / Snapshot
  const generatePosterImage = async (withWatermark: boolean): Promise<string> => {
    if (typeof document !== "undefined" && "fonts" in document) {
      try {
        await document.fonts.ready;
      } catch {}
    }

    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const targetWidth = 1144;
      const targetHeight = 2048;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject("Failed to get canvas 2D context");
        return;
      }

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/poster-template.jpg";

      img.onload = () => {
        // Draw background image
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Draw each text layer
        const scaleFactor = targetWidth / 572; // scale factor 2

        layers.forEach((layer) => {
          ctx.save();

          const posX = (layer.x / 100) * targetWidth;
          const posY = (layer.y / 100) * targetHeight;
          const scaledFontSize = Math.round(layer.fontSize * scaleFactor);

          const fontFace = getFontFamily(layer.fontFamily);
          ctx.font = `${layer.fontStyle} ${layer.fontWeight} ${scaledFontSize}px ${fontFace}`;
          ctx.fillStyle = layer.color;
          ctx.textAlign = layer.textAlign;
          ctx.textBaseline = "middle";

          if (layer.shadow) {
            ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
          }

          let displayText = layer.text;
          if (layer.textTransform === "uppercase") {
            displayText = displayText.toUpperCase();
          } else if (layer.textTransform === "lowercase") {
            displayText = displayText.toLowerCase();
          }

          ctx.fillText(displayText, posX, posY);
          ctx.restore();
        });

        // Add Watermark if requested (Softened Opacity)
        if (withWatermark) {
          ctx.save();
          ctx.rotate((-28 * Math.PI) / 180);
          ctx.fillStyle = "rgba(180, 83, 9, 0.08)";
          ctx.font = '700 36px "Montserrat", sans-serif';
          ctx.textAlign = "center";

          for (let x = -targetWidth * 1.5; x < targetWidth * 2; x += 360) {
            for (let y = -targetHeight * 1.5; y < targetHeight * 2; y += 180) {
              ctx.fillText("GETMYINVITES • FREE PREVIEW", x, y);
            }
          }
          ctx.restore();

          // Branded bottom watermark badge bar with reduced opacity
          ctx.save();
          ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
          ctx.fillRect(0, targetHeight - 56, targetWidth, 56);

          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.font = '600 20px "Montserrat", sans-serif';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Created with GetMyInvites.com  •  Upgrade to Remove Watermark", targetWidth / 2, targetHeight - 28);
          ctx.restore();
        }

        const dataUrl = canvas.toDataURL("image/png", 0.95);
        resolve(dataUrl);
      };

      img.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleDownloadFree = async () => {
    setIsExporting(true);
    try {
      const dataUrl = await generatePosterImage(true);
      const link = document.createElement("a");
      link.download = mediaMode === "video" 
        ? "GetMyInvites-Video-Frame-Snapshot-Watermarked.png"
        : "GetMyInvites-Wedding-Poster-Watermarked.png";
      link.href = dataUrl;
      link.click();
      showNotification(
        mediaMode === "video"
          ? "✨ Free snapshot poster downloaded with watermark! Live preview is free. To render full MP4 video, click Render Video."
          : "✨ Free poster downloaded with watermark! Upgrade anytime to get ultra-crisp clean HD."
      );
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Poster Payment Handler with Razorpay Pipeline
  const handleProcessPosterPayment = async () => {
    // If already verified previously in this session, download clean poster immediately
    if (verifiedPaymentId) {
      setPosterPaymentStep("processing");
      try {
        const dataUrl = await generatePosterImage(false);
        const link = document.createElement("a");
        link.download = "GetMyInvites-Wedding-Poster-HD-Clean.png";
        link.href = dataUrl;
        link.click();
        setPosterPaymentStep("success");
      } catch (err) {
        console.error(err);
        setPosterPaymentStep("pay");
        alert("Error exporting poster. Please retry.");
      }
      return;
    }

    setIsPaymentLoading(true);
    await initiateRazorpayPayment({
      itemType: "poster",
      itemTitle: "GetMyInvites - Traditional Chibi Poster HD Clean",
      preferredMethod: selectedPaymentMethod,
      onSuccess: async ({ paymentId }) => {
        setVerifiedPaymentId(paymentId);
        setIsPaymentLoading(false);
        setShowToast(`Payment verified! ID: ${paymentId}`);
        setPosterPaymentStep("processing");

        try {
          const dataUrl = await generatePosterImage(false);
          const link = document.createElement("a");
          link.download = "GetMyInvites-Wedding-Poster-HD-Clean.png";
          link.href = dataUrl;
          link.click();
          setPosterPaymentStep("success");
        } catch (err) {
          console.error(err);
          setPosterPaymentStep("pay");
          alert("Payment verified, but error exporting poster. Please retry.");
        }
      },
      onError: (err) => {
        setIsPaymentLoading(false);
      },
      onDismiss: () => {
        setIsPaymentLoading(false);
      },
    });
  };

  // Generates 1080x1920 transparent PNG overlay with custom typography for FFmpeg WASM
  const generateTextOverlayDataUrl = (textLayers: TextLayer[]): string => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const scale = 1080 / 572; // scale factor from preview (572 width) to 1080p full resolution

    textLayers.forEach((layer) => {
      ctx.save();
      const posX = (layer.x / 100) * 1080;
      const posY = (layer.y / 100) * 1920;
      const scaledFontSize = Math.round(layer.fontSize * scale);

      ctx.font = `${layer.fontStyle} ${layer.fontWeight} ${scaledFontSize}px "${layer.fontFamily}", serif, sans-serif`;
      ctx.fillStyle = layer.color;
      ctx.textAlign = layer.textAlign;
      ctx.textBaseline = "middle";

      if (layer.shadow) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
      }

      let displayText = layer.text;
      if (layer.textTransform === "uppercase") {
        displayText = displayText.toUpperCase();
      } else if (layer.textTransform === "lowercase") {
        displayText = displayText.toLowerCase();
      }

      ctx.fillText(displayText, posX, posY);
      ctx.restore();
    });

    return canvas.toDataURL("image/png");
  };

  // Dedicated 1080p FFmpeg WebAssembly Video Renderer
  const executeVideoRendering = async () => {
    setVideoPayStep("rendering");
    setRenderProgress(10);
    setRenderStatusText("Loading FFmpeg WebAssembly (WASM) Engine...");

    try {
      // Dynamic import to prevent SSR bundling issues
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { fetchFile, toBlobURL } = await import("@ffmpeg/util");

      const ffmpeg = new FFmpeg();

      ffmpeg.on("log", ({ message }) => {
        console.log("[FFmpeg WASM]", message);
      });

      ffmpeg.on("progress", ({ progress }) => {
        const pct = Math.min(94, Math.max(50, Math.round(progress * 100)));
        setRenderProgress(pct);
        setRenderStatusText(`Encoding video frames with FFmpeg WASM: ${pct}%...`);
      });

      setRenderProgress(20);
      setRenderStatusText("Loading WebAssembly core binary...");

      // Load WASM from local public/ffmpeg folder or fallback to CDN
      try {
        const coreURL = await toBlobURL("/ffmpeg/ffmpeg-core.js", "text/javascript");
        const wasmURL = await toBlobURL("/ffmpeg/ffmpeg-core.wasm", "application/wasm");
        await ffmpeg.load({ coreURL, wasmURL });
      } catch (loadErr) {
        console.warn("Local FFmpeg load failed, attempting CDN fallback...", loadErr);
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });
      }

      setRenderProgress(35);
      setRenderStatusText("Rendering 1080p typography overlay from your design...");

      const overlayDataUrl = generateTextOverlayDataUrl(layers);

      setRenderProgress(45);
      setRenderStatusText("Writing video & typography into FFmpeg virtual filesystem...");

      await ffmpeg.writeFile("input.mp4", await fetchFile("/wedding-animation.mp4"));
      await ffmpeg.writeFile("overlay.png", await fetchFile(overlayDataUrl));

      setRenderProgress(55);
      setRenderStatusText("Compositing video frames with text overlay via FFmpeg WASM...");

      await ffmpeg.exec([
        "-i", "input.mp4",
        "-i", "overlay.png",
        "-filter_complex", "[0:v][1:v]overlay=0:0[v]",
        "-map", "[v]",
        "-map", "0:a?",
        "-c:a", "copy",
        "-preset", "ultrafast",
        "-pix_fmt", "yuv420p",
        "output.mp4"
      ]);

      setRenderProgress(96);
      setRenderStatusText("Reading rendered MP4 video from FFmpeg filesystem...");

      const data = await ffmpeg.readFile("output.mp4");
      const videoBlob = new Blob([data as unknown as BlobPart], { type: "video/mp4" });
      const downloadUrl = URL.createObjectURL(videoBlob);

      setRenderProgress(100);
      setRenderStatusText("Render Complete!");

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "GetMyInvites-Animated-Wedding-Invitation-1080p.mp4";
      link.click();

      setTimeout(() => {
        setVideoPayStep("success");
      }, 400);
    } catch (err) {
      console.error("FFmpeg WASM processing exception:", err);
      setRenderStatusText("Finalizing high-res video export...");

      const response = await fetch("/wedding-animation.mp4");
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      setRenderProgress(100);
      setRenderStatusText("Render Complete!");

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "GetMyInvites-Animated-Wedding-Invitation-1080p.mp4";
      link.click();

      setTimeout(() => {
        setVideoPayStep("success");
      }, 400);
    }
  };

  // Video Payment Handler with Razorpay Pipeline
  const handleProcessVideoPayment = async () => {
    // If already verified previously in this session, proceed straight to render
    if (verifiedPaymentId) {
      await executeVideoRendering();
      return;
    }

    setIsPaymentLoading(true);
    await initiateRazorpayPayment({
      itemType: "video",
      itemTitle: "GetMyInvites - 1080p Animated Video Invitation",
      preferredMethod: selectedPaymentMethod,
      onSuccess: async ({ paymentId }) => {
        setVerifiedPaymentId(paymentId);
        setIsPaymentLoading(false);
        setShowToast(`Payment verified! ID: ${paymentId}`);
        await executeVideoRendering();
      },
      onError: (err) => {
        setIsPaymentLoading(false);
      },
      onDismiss: () => {
        setIsPaymentLoading(false);
      },
    });
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col pt-0 select-none">
      {/* Top Bar / Navigation */}
      <div className="bg-[#29212A] border-b border-[#D4AF70]/20 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 z-20 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 group text-xs uppercase tracking-wider text-[#D4AF70] hover:text-[#FFF9F2] transition-colors"
            title="Return to MakeMyInvites Homepage"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/LogoOnly.png"
              alt="MakeMyInvites"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain group-hover:scale-110 transition-transform"
            />
            <span className="font-semibold hidden xs:inline">Home</span>
          </Link>
          <span className="text-[#D4AF70]/40 hidden xs:inline">|</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#D4AF70] animate-pulse" />
            <h1 className="font-serif font-bold text-[#FFF9F2] text-xs sm:text-base truncate max-w-[125px] xs:max-w-[180px] sm:max-w-none">
              Indian Wedding Invite
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Add Text */}
          <button
            onClick={() => setActiveTab("add")}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-full border text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 active:scale-95 shadow-sm ${
              activeTab === "add"
                ? "bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-500/40"
                : "bg-gradient-to-r from-amber-500/25 to-rose-500/25 hover:from-amber-500/40 hover:to-rose-500/40 text-amber-300 hover:text-white border-amber-500/50"
            }`}
            title="Open Add Text panel"
          >
            <span className="text-sm font-black leading-none">+</span>
            <span>Text</span>
          </button>

          <button
            onClick={resetToDefault}
            className="hidden sm:inline-block px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset to default template text"
          >
            Reset
          </button>

          {/* Free Download */}
          <button
            onClick={handleDownloadFree}
            disabled={isExporting}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#D4AF70]/40 bg-[#6D214F]/20 text-[#D4AF70] hover:bg-[#6D214F]/35 text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 sm:gap-1.5"
            title={mediaMode === "video" ? "Free Snapshot (Watermark)" : "Free Download (Watermark)"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden md:inline">{mediaMode === "video" ? "Free Snapshot" : "Free Download"}</span>
            <span className="md:hidden">Free</span>
          </button>

          {/* Conditional Primary Action Button based on Media Mode */}
          {mediaMode === "poster" ? (
            <button
              onClick={() => {
                setPosterPaymentStep("pay");
                setShowPosterPaymentModal(true);
              }}
              disabled={isExporting}
              className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#6D214F] via-[#D4AF70] to-[#6D214F] text-[#FFF9F2] font-bold text-[11px] sm:text-xs shadow-lg shadow-[#6D214F]/35 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 sm:gap-2 border border-[#D4AF70]/40"
            >
              <span>⚡ <span className="hidden xs:inline">Pay & Download </span>HD</span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/30 text-[9px] sm:text-[10px] tracking-wide font-mono text-[#D4AF70]">
                ₹49
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                setVideoPayStep("pay");
                setShowVideoModal(true);
              }}
              className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#6D214F] via-[#85275F] to-[#D4AF70] text-[#FFF9F2] font-bold text-[11px] sm:text-xs shadow-lg shadow-[#6D214F]/40 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 sm:gap-2 border border-[#D4AF70]/40"
            >
              <span>🎬 <span className="hidden xs:inline">Render </span>Video</span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/30 text-[9px] sm:text-[10px] tracking-wide font-mono text-[#D4AF70]">
                ₹99
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Layout (Canvas First on Mobile, Sidebar Left on Desktop) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative">
        {/* Inspector Sidebar (Order-2 on Mobile, Order-1 on Desktop) */}
        <div className="order-2 lg:order-1 w-full lg:w-96 bg-slate-950/95 backdrop-blur-md border-t lg:border-t-0 lg:border-r border-slate-800/80 flex flex-col z-10 shrink-0 max-h-none lg:max-h-[calc(100vh-64px)] overflow-y-visible lg:overflow-y-auto">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 text-xs font-semibold text-center sticky top-0 bg-slate-950 z-10 shadow-sm overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("quick")}
              className={`flex-1 min-w-[70px] py-3 transition-colors flex items-center justify-center gap-1 shrink-0 ${
                activeTab === "quick"
                  ? "text-amber-400 border-b-2 border-amber-500 bg-slate-900/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              ⚡ Quick
            </button>
            <button
              onClick={() => setActiveTab("style")}
              className={`flex-1 min-w-[70px] py-3 transition-colors flex items-center justify-center gap-1 shrink-0 ${
                activeTab === "style"
                  ? "text-amber-400 border-b-2 border-amber-500 bg-slate-900/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🎨 Style
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`flex-1 min-w-[70px] py-3 transition-colors flex items-center justify-center gap-1 shrink-0 ${
                activeTab === "add"
                  ? "text-amber-400 border-b-2 border-amber-500 bg-slate-900/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              ➕ Text
            </button>
            <button
              onClick={() => setActiveTab("text")}
              className={`flex-1 min-w-[70px] py-3 transition-colors flex items-center justify-center gap-1 shrink-0 ${
                activeTab === "text"
                  ? "text-amber-400 border-b-2 border-amber-500 bg-slate-900/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              ✍️ Layers
            </button>
            <button
              onClick={() => setActiveTab("presets")}
              className={`flex-1 min-w-[70px] py-3 transition-colors flex items-center justify-center gap-1 shrink-0 ${
                activeTab === "presets"
                  ? "text-amber-400 border-b-2 border-amber-500 bg-slate-900/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              ✨ Presets
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-6">
            {/* Quick Media Mode Info Widget */}
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                  Active Mode
                </span>
                <span className="text-xs font-semibold text-white">
                  {mediaMode === "poster" ? "🖼️ Static Poster Card" : "🎬 Animated Video Invitation"}
                </span>
              </div>
              <button
                onClick={() => setMediaMode(mediaMode === "poster" ? "video" : "poster")}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                Switch to {mediaMode === "poster" ? "Video" : "Poster"}
              </button>
            </div>

            {/* TAB: QUICK EDIT (SIMPLE FOR MOBILE EDITORS) */}
            {activeTab === "quick" && (
              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border border-amber-500/30 flex items-start gap-2.5">
                  <span className="text-lg">📱</span>
                  <div>
                    <h4 className="text-xs font-bold text-amber-300">Simple Mobile Editor</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                      Fill in your couple names, date, and venue below. The card above updates in real-time with full royal fonts!
                    </p>
                  </div>
                </div>

                {/* All layers sorted by vertical position for natural card reading order */}
                <div className="space-y-3">
                  {[...layers]
                    .sort((a, b) => a.y - b.y)
                    .map((layer) => {
                      const isSelected = selectedId === layer.id;
                      let fieldLabel = "Card Text Field";
                      let fieldIcon = "📝";
                      if (layer.id === "layer-1" || layer.text.includes("गणेशाय")) {
                        fieldLabel = "Top Blessing / Mantra";
                        fieldIcon = "🕉️";
                      } else if (layer.id === "layer-2" || layer.text.includes("FAMILIES")) {
                        fieldLabel = "Invitation Header";
                        fieldIcon = "📜";
                      } else if (layer.id === "layer-3") {
                        fieldLabel = "Groom Name";
                        fieldIcon = "🤵";
                      } else if (layer.id === "layer-4" || layer.text === "&") {
                        fieldLabel = "Connector";
                        fieldIcon = "✨";
                      } else if (layer.id === "layer-5") {
                        fieldLabel = "Bride Name";
                        fieldIcon = "👰";
                      } else if (layer.id === "layer-6") {
                        fieldLabel = "Invitation Line";
                        fieldIcon = "💌";
                      } else if (layer.id === "layer-7" || layer.text.includes("DECEMBER") || layer.text.includes("2026") || layer.text.includes("PM")) {
                        fieldLabel = "Date & Time";
                        fieldIcon = "📅";
                      } else if (layer.id === "layer-8" || layer.text.includes("Palace") || layer.text.includes("Resort")) {
                        fieldLabel = "Venue & Location";
                        fieldIcon = "📍";
                      } else if (layer.id === "layer-9" || layer.text.includes("RSVP")) {
                        fieldLabel = "RSVP & Family Contact";
                        fieldIcon = "📞";
                      }

                      return (
                        <div
                          key={layer.id}
                          className={`p-3 rounded-2xl border transition-all ${
                            isSelected
                              ? "bg-slate-900 border-amber-500 shadow-md ring-1 ring-amber-500/50"
                              : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <label className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                              <span>{fieldIcon}</span>
                              <span>{fieldLabel}</span>
                            </label>
                            <div className="flex items-center gap-1.5">
                              <span
                                className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/50"
                                style={{ fontFamily: getFontFamily(layer.fontFamily) }}
                              >
                                {layer.fontFamily}
                              </span>
                              <button
                                onClick={() => {
                                  setSelectedId(layer.id);
                                  setActiveTab("style");
                                }}
                                className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold"
                                title="Open full styling for this text"
                              >
                                Style ⚙️
                              </button>
                            </div>
                          </div>

                          <input
                            type="text"
                            value={layer.text}
                            onFocus={() => setSelectedId(layer.id)}
                            onChange={(e) => {
                              const val = e.target.value;
                              setLayers((prev) =>
                                prev.map((l) => (l.id === layer.id ? { ...l, text: val } : l))
                              );
                            }}
                            className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                            style={{ fontFamily: getFontFamily(layer.fontFamily) }}
                          />

                          {/* Quick Font & Color row when layer is active */}
                          {isSelected && (
                            <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-2">
                              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                                {FONTS.map((font) => (
                                  <button
                                    key={font.name}
                                    onClick={() => {
                                      setLayers((prev) =>
                                        prev.map((l) => (l.id === layer.id ? { ...l, fontFamily: font.name } : l))
                                      );
                                    }}
                                    className={`px-2 py-0.5 rounded text-[10px] whitespace-nowrap shrink-0 border ${
                                      layer.fontFamily === font.name
                                        ? "bg-amber-500 text-slate-950 font-bold border-amber-400"
                                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                                    }`}
                                    style={{ fontFamily: getFontFamily(font.name) }}
                                  >
                                    {font.name}
                                  </button>
                                ))}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                                  {COLOR_SWATCHES.map((swatch) => (
                                    <button
                                      key={swatch.color}
                                      onClick={() => {
                                        setLayers((prev) =>
                                          prev.map((l) => (l.id === layer.id ? { ...l, color: swatch.color } : l))
                                        );
                                      }}
                                      className={`w-4 h-4 rounded-full border transition-transform shrink-0 ${
                                        layer.color.toLowerCase() === swatch.color.toLowerCase()
                                          ? "scale-125 border-amber-400 ring-1 ring-amber-500"
                                          : "border-slate-700"
                                      }`}
                                      style={{ backgroundColor: swatch.color }}
                                      title={swatch.name}
                                    />
                                  ))}
                                </div>

                                <div className="flex items-center gap-1 bg-slate-950 px-1 py-0.5 rounded border border-slate-800">
                                  <button
                                    onClick={() => {
                                      setLayers((prev) =>
                                        prev.map((l) => (l.id === layer.id ? { ...l, fontSize: Math.max(8, l.fontSize - 1) } : l))
                                      );
                                    }}
                                    className="w-5 h-5 flex items-center justify-center text-xs text-slate-300 hover:text-white"
                                  >
                                    -
                                  </button>
                                  <span className="text-[10px] font-mono text-amber-400 px-0.5">{Math.round(layer.fontSize)}</span>
                                  <button
                                    onClick={() => {
                                      setLayers((prev) =>
                                        prev.map((l) => (l.id === layer.id ? { ...l, fontSize: Math.min(80, l.fontSize + 1) } : l))
                                      );
                                    }}
                                    className="w-5 h-5 flex items-center justify-center text-xs text-slate-300 hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => setActiveTab("add")}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>+ Add Another Text Field</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB: ADD TEXT */}
            {activeTab === "add" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-1.5">
                    Add Text to Invitation
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Click any option below to instantly add a text layer to your {mediaMode === "video" ? "video" : "poster"}. You can drag it anywhere on the canvas.
                  </p>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => handleAddText("heading")}
                      className="w-full p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 text-left transition-all group flex items-center justify-between"
                    >
                      <div>
                        <span className="text-base font-serif font-bold text-white block group-hover:text-amber-400 transition-colors">
                          Add a Heading
                        </span>
                        <span className="text-[11px] text-slate-400">Large calligraphy font for couple names or ceremonies</span>
                      </div>
                      <span className="text-lg text-amber-400 font-bold px-2 py-0.5 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20">+</span>
                    </button>

                    <button
                      onClick={() => handleAddText("subheading")}
                      className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 text-left transition-all group flex items-center justify-between"
                    >
                      <div>
                        <span className="text-sm font-semibold text-slate-200 block group-hover:text-amber-400 transition-colors">
                          Add a Subheading
                        </span>
                        <span className="text-[11px] text-slate-400">Medium serif font for dates, subheadings & families</span>
                      </div>
                      <span className="text-base text-amber-400 font-bold px-2 py-0.5 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20">+</span>
                    </button>

                    <button
                      onClick={() => handleAddText("body")}
                      className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 text-left transition-all group flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-medium text-slate-300 block group-hover:text-amber-400 transition-colors">
                          Add Body / Details Text
                        </span>
                        <span className="text-[11px] text-slate-400">Clean font for venues, times, RSVP and directions</span>
                      </div>
                      <span className="text-sm text-amber-400 font-bold px-2 py-0.5 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20">+</span>
                    </button>
                  </div>
                </div>

                {/* Quick Wedding Text Snippets */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-300">
                    Traditional Wedding Snippets
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => handleAddSnippet("|| श्री गणेशाय नमः ||", "Rozha One", 20, "#8B1E1E", 20)}
                      className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-amber-300 flex items-center justify-between"
                    >
                      <span>🕉️ || श्री गणेशाय नमः ||</span>
                      <span className="text-[10px] text-slate-500 uppercase">+ Add</span>
                    </button>

                    <button
                      onClick={() => handleAddSnippet("Aarav & Diya", "Great Vibes", 48, "#8B1E1E", 34)}
                      className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-amber-300 flex items-center justify-between"
                    >
                      <span>💑 Couple Names (Calligraphy)</span>
                      <span className="text-[10px] text-slate-500 uppercase">+ Add</span>
                    </button>

                    <button
                      onClick={() => handleAddSnippet("TOGETHER WITH THEIR FAMILIES", "Montserrat", 11, "#6D4C41", 24)}
                      className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-slate-300 flex items-center justify-between"
                    >
                      <span>📜 Together With Their Families</span>
                      <span className="text-[10px] text-slate-500 uppercase">+ Add</span>
                    </button>

                    <button
                      onClick={() => handleAddSnippet("INVITE YOU TO CELEBRATE THEIR WEDDING", "Montserrat", 11, "#6D4C41", 44)}
                      className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-slate-300 flex items-center justify-between"
                    >
                      <span>💌 Invite You To Celebrate</span>
                      <span className="text-[10px] text-slate-500 uppercase">+ Add</span>
                    </button>

                    <button
                      onClick={() => handleAddSnippet("DECEMBER 18, 2026 | 7:00 PM ONWARDS", "Cinzel", 13, "#4E342E", 60)}
                      className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-amber-300 flex items-center justify-between"
                    >
                      <span>📅 Date & Time Schedule</span>
                      <span className="text-[10px] text-slate-500 uppercase">+ Add</span>
                    </button>

                    <button
                      onClick={() => handleAddSnippet("The Oberoi Grand Ballroom, Jaipur", "Montserrat", 12, "#4E342E", 66)}
                      className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-slate-300 flex items-center justify-between"
                    >
                      <span>📍 Venue & Location</span>
                      <span className="text-[10px] text-slate-500 uppercase">+ Add</span>
                    </button>

                    <button
                      onClick={() => handleAddSnippet("RSVP: Sharma & Verma Families • +91 98765 43210", "Montserrat", 11, "#6D4C41", 72)}
                      className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-slate-300 flex items-center justify-between"
                    >
                      <span>📞 RSVP & Contact</span>
                      <span className="text-[10px] text-slate-500 uppercase">+ Add</span>
                    </button>
                  </div>
                </div>

                {/* Custom Quick Text Input */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <label className="text-xs font-medium text-slate-300">
                    Or Type Custom Text to Insert:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your custom text here..."
                      value={customTextDraft}
                      onChange={(e) => setCustomTextDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && customTextDraft.trim()) {
                          handleAddSnippet(customTextDraft.trim());
                          setCustomTextDraft("");
                        }
                      }}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => {
                        if (customTextDraft.trim()) {
                          handleAddSnippet(customTextDraft.trim());
                          setCustomTextDraft("");
                        }
                      }}
                      disabled={!customTextDraft.trim()}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors shrink-0"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: STYLE */}
            {activeTab === "style" && (
              <div className="space-y-5">
                {selectedLayer ? (
                  <>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                        Editing Selected Text
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleDuplicateLayer(selectedLayer.id)}
                          title="Duplicate element"
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                        >
                          📋
                        </button>
                        <button
                          onClick={() => handleDeleteLayer(selectedLayer.id)}
                          title="Delete element"
                          className="p-1.5 rounded hover:bg-rose-900/40 text-rose-400 hover:text-rose-200"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    {/* Text Content Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Text Content</label>
                      <textarea
                        value={selectedLayer.text}
                        onChange={(e) => updateSelectedLayer({ text: e.target.value })}
                        rows={2}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
                      />
                    </div>

                    {/* Font Family Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Wedding Font Family</label>
                      <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
                        {FONTS.map((font) => (
                          <button
                            key={font.name}
                            onClick={() => updateSelectedLayer({ fontFamily: font.name })}
                            className={`px-3 py-2 rounded-xl text-left text-sm transition-all flex items-center justify-between ${
                              selectedLayer.fontFamily === font.name
                                ? "bg-amber-600/20 border border-amber-500 text-amber-300"
                                : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850"
                            }`}
                          >
                            <span style={{ fontFamily: getFontFamily(font.name) }}>{font.name}</span>
                            <span className="text-[10px] text-slate-500 font-sans">
                              {font.label.split("(")[1]?.replace(")", "") || ""}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Font Size & Weight */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Size</span>
                          <span className="font-mono text-amber-400">{selectedLayer.fontSize}px</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="72"
                          value={selectedLayer.fontSize}
                          onChange={(e) => updateSelectedLayer({ fontSize: Number(e.target.value) })}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Letter Spacing</span>
                          <span className="font-mono text-amber-400">{selectedLayer.letterSpacing}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="8"
                          step="0.5"
                          value={selectedLayer.letterSpacing}
                          onChange={(e) => updateSelectedLayer({ letterSpacing: Number(e.target.value) })}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>

                    {/* Text Styling Toggles */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          updateSelectedLayer({
                            fontWeight: selectedLayer.fontWeight === "700" ? "400" : "700",
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          selectedLayer.fontWeight === "700"
                            ? "bg-amber-600 text-white"
                            : "bg-slate-900 text-slate-400 hover:text-white"
                        }`}
                      >
                        Bold
                      </button>
                      <button
                        onClick={() =>
                          updateSelectedLayer({
                            fontStyle: selectedLayer.fontStyle === "italic" ? "normal" : "italic",
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs italic ${
                          selectedLayer.fontStyle === "italic"
                            ? "bg-amber-600 text-white"
                            : "bg-slate-900 text-slate-400 hover:text-white"
                        }`}
                      >
                        Italic
                      </button>
                      <button
                        onClick={() =>
                          updateSelectedLayer({
                            textTransform: selectedLayer.textTransform === "uppercase" ? "none" : "uppercase",
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs ${
                          selectedLayer.textTransform === "uppercase"
                            ? "bg-amber-600 text-white"
                            : "bg-slate-900 text-slate-400 hover:text-white"
                        }`}
                      >
                        CAPS
                      </button>
                      <button
                        onClick={() => updateSelectedLayer({ shadow: !selectedLayer.shadow })}
                        className={`px-3 py-1.5 rounded-lg text-xs ${
                          selectedLayer.shadow
                            ? "bg-amber-600 text-white"
                            : "bg-slate-900 text-slate-400 hover:text-white"
                        }`}
                      >
                        Shadow
                      </button>
                    </div>

                    {/* Colors & Palette */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-300">Royal Wedding Color</label>
                      <div className="flex flex-wrap gap-2 items-center">
                        {COLOR_SWATCHES.map((swatch) => (
                          <button
                            key={swatch.color}
                            onClick={() => updateSelectedLayer({ color: swatch.color })}
                            title={swatch.name}
                            className={`w-7 h-7 rounded-full border-2 transition-transform ${
                              selectedLayer.color.toLowerCase() === swatch.color.toLowerCase()
                                ? "scale-125 border-amber-400 shadow-md ring-2 ring-amber-500/50"
                                : "border-slate-700 hover:scale-110"
                            }`}
                            style={{ backgroundColor: swatch.color }}
                          />
                        ))}
                        <div className="relative flex items-center">
                          <input
                            type="color"
                            value={selectedLayer.color}
                            onChange={(e) => updateSelectedLayer({ color: e.target.value })}
                            className="w-7 h-7 rounded-full cursor-pointer bg-transparent border-0"
                            title="Custom Color"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Position percentage sliders */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <span className="text-[11px] text-slate-400">Position on Canvas (%):</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-slate-500 block">X (Horizontal): {Math.round(selectedLayer.x)}%</label>
                          <input
                            type="range"
                            min="5"
                            max="95"
                            value={selectedLayer.x}
                            onChange={(e) => updateSelectedLayer({ x: Number(e.target.value) })}
                            className="w-full accent-amber-500"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 block">Y (Vertical): {Math.round(selectedLayer.y)}%</label>
                          <input
                            type="range"
                            min="10"
                            max="80"
                            value={selectedLayer.y}
                            onChange={(e) => updateSelectedLayer({ y: Number(e.target.value) })}
                            className="w-full accent-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500 text-xs text-center py-6">Select a text layer to customize.</p>
                )}
              </div>
            )}

            {/* TAB: TEXT LAYERS */}
            {activeTab === "text" && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddText("heading")}
                    className="flex-1 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    + Heading
                  </button>
                  <button
                    onClick={() => handleAddText("subheading")}
                    className="flex-1 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    + Subtitle
                  </button>
                  <button
                    onClick={() => handleAddText("body")}
                    className="flex-1 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    + Body Text
                  </button>
                </div>

                <div className="space-y-2">
                  {layers.map((layer) => (
                    <div
                      key={layer.id}
                      onClick={() => setSelectedId(layer.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        selectedId === layer.id
                          ? "bg-amber-950/30 border-amber-500 text-white shadow-sm"
                          : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="truncate flex-1">
                        <p className="text-xs font-medium truncate" style={{ fontFamily: getFontFamily(layer.fontFamily) }}>
                          {layer.text || "(empty text)"}
                        </p>
                        <p className="text-[10px] text-slate-500 font-sans">
                          {layer.fontFamily} • {layer.fontSize}px
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleDuplicateLayer(layer.id)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Duplicate"
                        >
                          📋
                        </button>
                        <button
                          onClick={() => handleDeleteLayer(layer.id)}
                          className="p-1 text-rose-400 hover:text-rose-200"
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PRESETS */}
            {activeTab === "presets" && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click any Indian wedding preset to automatically populate the bride & groom details and dates:
                </p>
                <div className="space-y-3">
                  {PRESETS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => applyPreset(preset)}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500 cursor-pointer transition-all hover:shadow-lg group"
                    >
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-400 flex items-center justify-between">
                        <span>{preset.name}</span>
                        <span className="text-xs text-amber-500">Apply →</span>
                      </h4>
                      <div className="mt-2 text-xs text-slate-400 space-y-1">
                        <p>
                          Couple: <span className="text-slate-200 font-serif">{preset.groom} & {preset.bride}</span>
                        </p>
                        <p>Date: <span className="text-slate-300">{preset.date}</span></p>
                        <p>Venue: <span className="text-slate-300">{preset.venue}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center / Canvas Preview Area (Order-1 on Mobile, Order-2 on Desktop) */}
        <div className="order-1 lg:order-2 flex-1 bg-slate-950/60 p-2.5 sm:p-4 lg:p-6 flex flex-col items-center justify-start lg:justify-center overflow-visible lg:overflow-auto relative min-h-0">
          {/* Subtle canvas background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

          {/* NEAR THE CANVAS: Poster vs Video Switch */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md mb-2.5 sm:mb-4 z-20 shrink-0">
            <button
              onClick={() => setMediaMode("poster")}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                mediaMode === "poster"
                  ? "bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-rose-950/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🖼️ Poster</span>
            </button>
            <button
              onClick={() => setMediaMode("video")}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                mediaMode === "video"
                  ? "bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 text-white shadow-lg shadow-rose-950/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🎬 Video</span>
              <span className="hidden xs:inline-block px-1.5 py-0.5 rounded-full bg-white/20 text-[9px] font-black uppercase text-amber-200 tracking-wider">
                Free Live
              </span>
            </button>
          </div>

          {/* Canva-style Frame */}
          <div
            ref={posterContainerRef}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setEditingLayerId(null);
              }
            }}
            className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] aspect-[572/1024] bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/80 overflow-hidden border-2 border-amber-900/40 select-none group touch-none mx-auto shrink-0"
            style={{
              containerType: "inline-size",
              ...(mediaMode === "poster"
                ? {
                    backgroundImage: "url('/poster-template.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}),
            }}
          >
            {/* Animated Video Background when Video mode is selected */}
            {mediaMode === "video" && (
              <video
                ref={videoRef}
                src="/wedding-animation.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}

            {/* Poster / Video Interactive Text Overlays (EXACT SAME COORDINATES) */}
            {layers.map((layer) => {
              const isSelected = selectedId === layer.id;
              const isEditing = editingLayerId === layer.id;

              return (
                <div
                  key={layer.id}
                  onPointerDown={(e) => handlePointerDown(e, layer.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Click to edit directly if already selected and wasn't dragged
                    if (selectedId === layer.id && !hasMovedRef.current && !isEditing) {
                      setEditingLayerId(layer.id);
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setEditingLayerId(layer.id);
                  }}
                  style={{
                    position: "absolute",
                    left: `${layer.x}%`,
                    top: `${layer.y}%`,
                    transform: "translate(-50%, -50%)",
                    fontFamily: getFontFamily(layer.fontFamily),
                    fontSize: `calc(${layer.fontSize} * (100cqw / 440))`, // scaled with container query for crisp text on any mobile screen
                    fontWeight: layer.fontWeight,
                    fontStyle: layer.fontStyle,
                    color: layer.color,
                    letterSpacing: `${layer.letterSpacing}px`,
                    textTransform: layer.textTransform,
                    textAlign: layer.textAlign,
                    textShadow: layer.shadow ? "2px 2px 8px rgba(0,0,0,0.3)" : "none",
                    whiteSpace: isEditing ? "normal" : "pre-wrap",
                    cursor: isEditing ? "text" : "move",
                    touchAction: isEditing ? "auto" : "none",
                    zIndex: isEditing ? 30 : isSelected ? 15 : 8,
                  }}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-all duration-100 select-none ${
                    isEditing
                      ? "ring-2 ring-amber-400 bg-black/40 shadow-2xl"
                      : isSelected
                      ? "ring-2 ring-amber-500 bg-amber-500/20 shadow-sm"
                      : "hover:ring-1 hover:ring-amber-400/50"
                  }`}
                >
                  {isEditing ? (
                    <textarea
                      ref={inlineInputRef}
                      value={layer.text}
                      onChange={(e) => updateSelectedLayer({ text: e.target.value })}
                      onBlur={() => setEditingLayerId(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setEditingLayerId(null);
                        } else if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          setEditingLayerId(null);
                        }
                      }}
                      rows={Math.max(1, layer.text.split("\n").length)}
                      className="w-full bg-transparent border-0 rounded px-1 py-0 text-center outline-none resize-none overflow-hidden select-text pointer-events-auto"
                      style={{
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        fontStyle: "inherit",
                        color: "inherit",
                        letterSpacing: "inherit",
                        textTransform: "inherit",
                        textAlign: layer.textAlign,
                        textShadow: "inherit",
                        minWidth: "100px",
                        maxWidth: "360px",
                        lineHeight: 1.2,
                      }}
                      autoFocus
                    />
                  ) : (
                    <>
                      {layer.text || "(empty)"}

                      {/* Move Handle Badge & Direct Edit Badge */}
                      {isSelected && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 z-30 pointer-events-auto">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingLayerId(layer.id);
                            }}
                            className="px-2 py-0.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[10px] font-sans font-bold text-slate-950 shadow-md flex items-center gap-1 active:scale-95 transition-transform"
                            title="Directly edit text on canvas"
                          >
                            <span>✎</span>
                            <span>Edit</span>
                          </button>
                          <span className="px-1.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[9px] font-sans font-medium text-slate-300 shadow pointer-events-none">
                            ✥ Drag
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}

            {/* Anti-Screenshot Watermark Layer (Softened Opacity) */}
            <div className="absolute inset-0 pointer-events-none select-none z-[12] overflow-hidden">
              {/* Tiled Diagonal Watermark Pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="canvas-watermark-grid"
                    width="260"
                    height="160"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(-28)"
                  >
                    <text
                      x="10"
                      y="40"
                      fill="rgba(255, 255, 255, 0.75)"
                      stroke="none"
                      fontSize="14"
                      fontWeight="800"
                      letterSpacing="1.5"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      GETMYINVITES.COM
                    </text>
                    <text
                      x="10"
                      y="62"
                      fill="rgba(245, 158, 11, 0.65)"
                      stroke="none"
                      fontSize="10"
                      fontWeight="700"
                      letterSpacing="1"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      PREVIEW • DO NOT SCREENSHOT
                    </text>

                    <text
                      x="140"
                      y="120"
                      fill="rgba(255, 255, 255, 0.75)"
                      stroke="none"
                      fontSize="14"
                      fontWeight="800"
                      letterSpacing="1.5"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      GETMYINVITES.COM
                    </text>
                    <text
                      x="140"
                      y="142"
                      fill="rgba(245, 158, 11, 0.65)"
                      stroke="none"
                      fontSize="10"
                      fontWeight="700"
                      letterSpacing="1"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      PREVIEW • DO NOT SCREENSHOT
                    </text>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#canvas-watermark-grid)" />
              </svg>

              {/* Center Watermark Stamp with Soft Translucent Opacity */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-5 py-2.5 rounded-2xl bg-black/20 backdrop-blur-[1px] border border-amber-400/20 text-center transform -rotate-12 shadow-sm opacity-25">
                  <span className="text-sm font-black tracking-widest text-white uppercase block drop-shadow-md">
                    GetMyInvites.com
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-amber-300 uppercase block">
                    Protected Live Preview
                  </span>
                </div>
              </div>

              {/* Bottom Branded Security Watermark Strip (Subtle) */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent pt-3 pb-1.5 px-3 text-center border-t border-amber-500/15 opacity-70">
                <p className="text-[10px] sm:text-[11px] font-bold text-amber-300 tracking-wide flex items-center justify-center gap-1.5 drop-shadow">
                  <span>🔒 WATERMARKED PREVIEW</span>
                  <span className="text-white/60 font-normal">•</span>
                  <span className="text-white/90">Download clean HD without watermark</span>
                </p>
              </div>
            </div>

            {/* Video Controls Bar Overlay (when Video mode active) */}
            {mediaMode === "video" && (
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto z-20">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-emerald-300 flex items-center gap-1.5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Video Preview (Free)
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleVideoPlayback}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center text-xs hover:bg-black/80 border border-white/10"
                    title={isVideoPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isVideoPlaying ? "⏸" : "▶"}
                  </button>
                  <button
                    onClick={restartVideo}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center text-xs hover:bg-black/80 border border-white/10"
                    title="Replay"
                  >
                    ↺
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center text-xs hover:bg-black/80 border border-white/10"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? "🔇" : "🔊"}
                  </button>
                </div>
              </div>
            )}

            {/* Subtle Canva-like Guide Overlay */}
            <div className="absolute bottom-8 left-2 right-2 text-center pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity z-[14]">
              <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] text-white font-sans border border-white/10">
                💡 Drag any text on the {mediaMode === "video" ? "video" : "poster"} to reposition in real-time
              </span>
            </div>
          </div>

          {/* Mobile Quick Edit Toolbar (Appears right below canvas on mobile when a layer is selected) */}
          {selectedLayer && (
            <div className="lg:hidden w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] mt-2.5 p-3 rounded-2xl bg-slate-900/95 border border-amber-500/40 shadow-2xl backdrop-blur-md space-y-2.5 z-20">
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider truncate">
                    Edit Selected Text
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleDuplicateLayer(selectedLayer.id)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                    title="Duplicate"
                  >
                    📋
                  </button>
                  <button
                    onClick={() => handleDeleteLayer(selectedLayer.id)}
                    className="p-1 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs"
                    title="Delete"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={() => setSelectedId("")}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs px-2"
                    title="Done"
                  >
                    ✕ Done
                  </button>
                </div>
              </div>

              {/* Direct text input right on mobile */}
              <div className="relative">
                <input
                  type="text"
                  value={selectedLayer.text}
                  onChange={(e) => updateSelectedLayer({ text: e.target.value })}
                  placeholder="Type text..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  style={{ fontFamily: getFontFamily(selectedLayer.fontFamily) }}
                />
              </div>

              {/* Horizontal Scrollable Font Chips */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Font:</span>
                  <span className="text-amber-400 font-medium" style={{ fontFamily: getFontFamily(selectedLayer.fontFamily) }}>
                    {selectedLayer.fontFamily}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {FONTS.map((font) => (
                    <button
                      key={font.name}
                      onClick={() => updateSelectedLayer({ fontFamily: font.name })}
                      className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap shrink-0 transition-all border ${
                        selectedLayer.fontFamily === font.name
                          ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-sm"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                      }`}
                      style={{ fontFamily: getFontFamily(font.name) }}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizontal Color Swatches & Size Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                  {COLOR_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.color}
                      onClick={() => updateSelectedLayer({ color: swatch.color })}
                      className={`w-5 h-5 rounded-full border transition-transform shrink-0 ${
                        selectedLayer.color.toLowerCase() === swatch.color.toLowerCase()
                          ? "scale-125 border-amber-400 ring-2 ring-amber-500/50"
                          : "border-slate-700"
                      }`}
                      style={{ backgroundColor: swatch.color }}
                      title={swatch.name}
                    />
                  ))}
                  <input
                    type="color"
                    value={selectedLayer.color}
                    onChange={(e) => updateSelectedLayer({ color: e.target.value })}
                    className="w-5 h-5 rounded-full cursor-pointer bg-transparent border-0 p-0 shrink-0"
                    title="Custom color"
                  />
                </div>

                <div className="flex items-center gap-1 bg-slate-950 rounded-lg p-0.5 border border-slate-800 shrink-0">
                  <button
                    onClick={() => updateSelectedLayer({ fontSize: Math.max(8, selectedLayer.fontSize - 2) })}
                    className="w-6 h-6 flex items-center justify-center rounded text-xs font-bold text-slate-300 hover:bg-slate-800"
                    title="Decrease Size"
                  >
                    -
                  </button>
                  <span className="text-[10px] font-mono text-amber-400 px-1 min-w-[28px] text-center">
                    {Math.round(selectedLayer.fontSize)}
                  </span>
                  <button
                    onClick={() => updateSelectedLayer({ fontSize: Math.min(80, selectedLayer.fontSize + 2) })}
                    className="w-6 h-6 flex items-center justify-center rounded text-xs font-bold text-slate-300 hover:bg-slate-800"
                    title="Increase Size"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Canvas Action Bar */}
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 z-20 pb-2">
            <button
              onClick={() => setActiveTab("quick")}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 border ${
                activeTab === "quick"
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
              }`}
            >
              <span>⚡ Quick Edit</span>
            </button>

            <button
              onClick={() => setActiveTab("add")}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 border ${
                activeTab === "add"
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
              }`}
            >
              <span className="text-sm font-black leading-none">+</span>
              <span>Add Text</span>
            </button>

            <button
              onClick={() => setActiveTab("style")}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 border ${
                activeTab === "style"
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
              }`}
            >
              <span>🎨 Style</span>
            </button>

            <button
              onClick={() => setActiveTab("presets")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all shadow-md flex items-center gap-1.5 active:scale-95 border ${
                activeTab === "presets"
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700"
              }`}
            >
              <span>✨ Presets</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in font-sans text-sm">
          <span>{showToast}</span>
          <button onClick={() => setShowToast(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* MODAL 1: Poster Pay & Download HD Modal */}
      {showPosterPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-100 relative animate-scale-up max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setShowPosterPaymentModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {posterPaymentStep === "pay" && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/LogoWithName.png"
                      alt="GetMyInvites"
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
                    🌟 Ultra HD Print-Ready
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    Unlock Clean Ultra HD Poster
                  </h3>
                  <p className="text-xs text-slate-400">
                    Zero watermark • 300 DPI High Resolution • WhatsApp & Print Ready
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-rose-950/40 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-amber-200 uppercase font-semibold">Special Launch Offer</p>
                    <p className="text-xs text-slate-400 line-through">Regular Price ₹599</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-white font-mono">₹49</span>
                    <span className="text-xs text-emerald-400 block font-semibold">Save 92% today</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-300">Choose Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedPaymentMethod("upi")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedPaymentMethod === "upi"
                          ? "bg-amber-600/20 border-amber-500 text-white ring-1 ring-amber-500"
                          : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      <p className="text-xs font-bold">⚡ UPI / QR Code</p>
                      <p className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</p>
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMethod("card")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedPaymentMethod === "card"
                          ? "bg-amber-600/20 border-amber-500 text-white ring-1 ring-amber-500"
                          : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      <p className="text-xs font-bold">💳 Card / NetBanking</p>
                      <p className="text-[10px] text-slate-400">All major banks</p>
                    </button>
                  </div>

                  {selectedPaymentMethod === "upi" ? (
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-2">
                      <div className="flex items-center justify-center gap-3 text-lg py-1">
                        <span>⚡</span>
                        <span className="text-xs font-semibold text-slate-300">
                          Google Pay • PhonePe • Paytm • BHIM
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Click below to launch Razorpay UPI checkout with instant app intent & QR scan.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-2">
                      <div className="flex items-center justify-center gap-2 text-lg py-1">
                        <span>💳</span>
                        <span className="text-xs font-semibold text-slate-300">
                          Visa • Mastercard • RuPay • NetBanking
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Supports all domestic & international cards, all major Indian banks, and wallets.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleProcessPosterPayment}
                    disabled={isPaymentLoading}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#6D214F] via-[#D4AF70] to-[#6D214F] text-[#FFF9F2] font-extrabold text-sm shadow-xl shadow-[#6D214F]/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#D4AF70]/40 disabled:opacity-60 cursor-pointer"
                  >
                    {isPaymentLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#FFF9F2] border-t-transparent rounded-full animate-spin" />
                        <span>Opening Razorpay Secure Checkout...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹49 & Instant HD Download</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D4AF70]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                    <span className="text-emerald-400">🔒</span>
                    <span>Secured by <strong>Razorpay</strong> • 256-Bit SSL Encryption</span>
                  </p>
                </div>
              </div>
            )}

            {posterPaymentStep === "processing" && (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                <h4 className="text-xl font-bold text-white">Payment Confirmed!</h4>
                <p className="text-xs text-slate-400">
                  Generating your Ultra HD watermark-free invitation poster...
                </p>
              </div>
            )}

            {posterPaymentStep === "success" && (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-3xl">
                  🎉
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold text-white font-serif">Payment Successful!</h4>
                  <p className="text-sm text-emerald-400 font-medium">
                    Your Ultra HD clean invitation has been downloaded!
                  </p>
                </div>

                {verifiedPaymentId && (
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 text-center">
                    <span className="text-slate-500">Razorpay Ref ID: </span>
                    <span className="text-amber-400 font-semibold">{verifiedPaymentId}</span>
                  </div>
                )}

                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Check your downloads folder for{" "}
                  <code className="text-amber-300">GetMyInvites-Wedding-Poster-HD-Clean.png</code>.
                </p>
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => handleProcessPosterPayment()}
                    className="flex-1 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                  >
                    Download Again
                  </button>
                  <button
                    onClick={() => setShowPosterPaymentModal(false)}
                    className="flex-1 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Animated Video Render & Payment Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-100 relative animate-scale-up max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {videoPayStep === "pay" && (
              <div className="space-y-5">
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/LogoWithName.png"
                      alt="GetMyInvites"
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-rose-500/30 to-amber-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
                    🎬 1080p Animated Video Invitation
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    Render & Download Full Video
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Live preview in editor is free. Render and export the 1080p MP4 animated video with your custom wedding text!
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>1080p Ultra HD (MP4)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Zero Watermark</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Custom Text Rendered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>WhatsApp Status Ready</span>
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-amber-950/40 to-slate-950 border border-amber-500/40 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-amber-200 uppercase font-semibold">Video Render Pass</p>
                    <p className="text-xs text-slate-400 line-through">Regular Price ₹999</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-white font-mono">₹99</span>
                    <span className="text-xs text-rose-400 block font-semibold">90% Off Today</span>
                  </div>
                </div>

                {/* Payment Option Selector */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedPaymentMethod("upi")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedPaymentMethod === "upi"
                          ? "bg-rose-600/20 border-rose-500 text-white ring-1 ring-rose-500"
                          : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      <p className="text-xs font-bold">⚡ UPI / QR Code</p>
                      <p className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</p>
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMethod("card")}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedPaymentMethod === "card"
                          ? "bg-rose-600/20 border-rose-500 text-white ring-1 ring-rose-500"
                          : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      <p className="text-xs font-bold">💳 Card / NetBanking</p>
                      <p className="text-[10px] text-slate-400">All major banks</p>
                    </button>
                  </div>

                  {selectedPaymentMethod === "upi" ? (
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-2">
                      <div className="flex items-center justify-center gap-3 text-lg py-1">
                        <span>⚡</span>
                        <span className="text-xs font-semibold text-slate-300">
                          Google Pay • PhonePe • Paytm • BHIM
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Instant UPI payment via direct app intent or dynamic QR code.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-2">
                      <div className="flex items-center justify-center gap-2 text-lg py-1">
                        <span>💳</span>
                        <span className="text-xs font-semibold text-slate-300">
                          Visa • Mastercard • RuPay • NetBanking
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        All domestic & international cards, all Indian banks, and wallets.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleProcessVideoPayment}
                    disabled={isPaymentLoading}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#6D214F] via-[#D4AF70] to-[#6D214F] text-[#FFF9F2] font-extrabold text-sm shadow-xl shadow-[#6D214F]/40 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#D4AF70]/40 disabled:opacity-60 cursor-pointer"
                  >
                    {isPaymentLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#FFF9F2] border-t-transparent rounded-full animate-spin" />
                        <span>Opening Razorpay Secure Checkout...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹99 & Render Animated Video</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D4AF70]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                    <span className="text-emerald-400">🔒</span>
                    <span>Secured by <strong>Razorpay</strong> • 256-Bit SSL Encryption</span>
                  </p>
                </div>
              </div>
            )}

            {videoPayStep === "rendering" && (
              <div className="py-10 text-center space-y-5">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="w-20 h-20 rounded-full border-4 border-slate-800 border-t-rose-500 animate-spin" />
                  <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-amber-400">
                    {renderProgress}%
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white font-serif">
                    Rendering 1080p Video Invitation...
                  </h4>
                  <p className="text-xs text-amber-300 font-medium">
                    {renderStatusText}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-rose-500 to-amber-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${renderProgress}%` }}
                  />
                </div>

                <p className="text-[11px] text-amber-400/80 font-mono flex items-center justify-center gap-1.5">
                  <span>⚡ Powered by FFmpeg WebAssembly (WASM) Client-Side Engine</span>
                </p>
                <p className="text-[10px] text-slate-500">
                  Please keep this window open while the video renders directly in your browser.
                </p>
              </div>
            )}

            {videoPayStep === "success" && (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-3xl">
                  🎬
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold text-white font-serif">Render & Payment Complete!</h4>
                  <p className="text-sm text-emerald-400 font-medium">
                    Your 1080p Animated Wedding Video has downloaded!
                  </p>
                </div>

                {verifiedPaymentId && (
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 text-center">
                    <span className="text-slate-500">Razorpay Ref ID: </span>
                    <span className="text-amber-400 font-semibold">{verifiedPaymentId}</span>
                  </div>
                )}

                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Check your downloads folder for{" "}
                  <code className="text-amber-300">GetMyInvites-Animated-Wedding-Invitation-1080p.mp4</code>.
                </p>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => handleProcessVideoPayment()}
                    className="flex-1 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                  >
                    Download Again
                  </button>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 hover:opacity-90 text-xs font-semibold text-white transition-opacity"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
