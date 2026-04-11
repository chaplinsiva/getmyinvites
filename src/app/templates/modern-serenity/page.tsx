"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { Playfair_Display, Montserrat } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getUploadUrl } from "../actions";

const playfair = Playfair_Display({ subsets: ["latin"] });
const montserrat = Montserrat({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

// Draggable & Editable Text Component
function EditableText({ 
  id, 
  defaultText, 
  defaultPos = {x: 0, y: 0},
  isEditing, 
  className, 
  style = {} 
}: {
  id: string;
  defaultText: string;
  defaultPos?: {x: number, y: number};
  isEditing: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [pos, setPos] = useState(defaultPos);
  const [text, setText] = useState(defaultText);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number, startY: number, initialX: number, initialY: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isEditing) return;
    // Only drag if holding shift or empty area, wait, if it's contentEditable they need to be able to click to type.
    // Let's use a small drag handle, or require holding Alt to drag.
    if (e.altKey) {
      e.preventDefault();
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        initialX: pos.x,
        initialY: pos.y
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({
      x: dragRef.current.initialX + dx,
      y: dragRef.current.initialY + dy
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    dragRef.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={`relative group ${isEditing && 'hover:ring-1 hover:ring-dashed hover:ring-indigo-400'}`}>
      {isEditing && (
        <div className="absolute -top-6 left-0 text-[9px] uppercase tracking-wider text-indigo-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-indigo-50 px-2 py-0.5 rounded shadow-sm border border-indigo-100">
          Hold ALT to drag
        </div>
      )}
      <div 
        data-editable-id={id}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onBlur={(e) => setText(e.currentTarget.innerText)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          cursor: isDragging ? 'grabbing' : (isEditing ? 'text' : 'auto'),
          outline: 'none',
          whiteSpace: 'pre-wrap',
          ...style
        }}
        className={className}
      >
        {text}
      </div>
    </div>
  );
}

function TemplateContent() {
  const searchParams = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("media");
  const [scrollY, setScrollY] = useState(0);
  const [isUploading, setIsUploading] = useState<{ heroImage: boolean; storyImage: boolean }>({ heroImage: false, storyImage: false });

  // Make images entirely editable
  const [media, setMedia] = useState({
    heroImage: searchParams.get("heroImg") || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000",
    storyImage: searchParams.get("storyImg") || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000",
  });

  const [rsvpFields, setRsvpFields] = useState([
    { id: 'f1', type: 'text', label: 'Your Full Name', required: true },
    { id: 'f2', type: 'email', label: 'Your Email Address', required: true },
    { id: 'f3', type: 'text', label: 'Dietary Restrictions', required: false },
    { id: 'f4', type: 'checkbox', label: 'Joyfully Attending!', required: false },
  ]);

  const addRsvpField = (type: string) => {
    setRsvpFields([...rsvpFields, { id: Date.now().toString(), type, label: 'New Field', required: false }]);
  };

  const removeRsvpField = (id: string) => {
    setRsvpFields(rsvpFields.filter(f => f.id !== id));
  };

  const updateRsvpField = (id: string, key: string, value: any) => {
    setRsvpFields(rsvpFields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  useEffect(() => {
    if (!searchParams.has("heroImg")) setIsEditing(true);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'heroImage' | 'storyImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(prev => ({ ...prev, [fieldName]: true }));

    try {
      // 1. Get Presigned URL directly from our Action
      const { success, signedUrl, publicUrl, error } = await getUploadUrl(file.name, file.type, "modern-serenity");
      
      if (!success || !signedUrl || !publicUrl) {
         throw new Error(error || "Failed to generate upload URL");
      }

      // 2. Upload file DIRECTLY from the browser to Cloudflare CDN (bypassing Vercel!)
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Cloudflare R2 rejected upload (ensure CORS is configured).");

      // 3. Set the public URL in our editor
      setMedia(prev => ({ ...prev, [fieldName]: publicUrl }));
    } catch (err: any) {
      alert("Error uploading image: " + err.message);
    }

    setIsUploading(prev => ({ ...prev, [fieldName]: false }));
  };

  const [showPublishModal, setShowPublishModal] = useState(false);
  const [customDomain, setCustomDomain] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // 1. Gather all dragged / typed text from the DOM!
    const nodes = document.querySelectorAll("[data-editable-id]");
    const textData: any = {};
    nodes.forEach(node => {
       const id = node.getAttribute("data-editable-id");
       if (!id) return;
       // Parse transform string e.g. "translate(10px, 20px)"
       const style = (node as HTMLElement).style.transform || "";
       const match = style.match(/translate\((.*?)px,\s*(.*?)px\)/);
       let x = 0, y = 0;
       if (match) {
         x = parseFloat(match[1]);
         y = parseFloat(match[2]);
       }
       textData[id] = { text: (node as HTMLElement).innerText, x, y };
    });

    const finalizedData = {
      media,
      rsvpFields,
      textContent: textData
    };

    // 2. Call Save Action / DB upsert
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: "modern-serenity", // In real app, we use real UUID
          customDomain,
          data: finalizedData
        })
      });
      
      const r = await res.json();
      if (r.error) {
        alert("Error publishing: " + r.error);
      } else {
        const liveUrl = `https://makemyinvites.vercel.app/${customDomain}`;
        alert(`✅ Published! Share this link with your guests:\n\n${liveUrl}`);
        setIsEditing(false);
        setShowPublishModal(false);
      }
    } catch (e) {
       alert("Failed to publish");
    }
    
    setIsPublishing(false);
  };

  return (
    <div className={`relative min-h-screen ${montserrat.className} bg-white text-slate-800`}>
      
      {/* PUBLISH MODAL */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200">
             <h2 className={`${playfair.className} text-2xl font-bold text-slate-900 mb-2`}>Publish Invitation</h2>
             <p className="text-slate-500 text-sm mb-6 leading-relaxed">Choose a custom Web Address to send to your guests.</p>
             
             <div className="mb-2">
               <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Your Invitation URL</p>
               <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-100">
                 <div className="px-4 py-4 text-slate-400 font-medium text-sm flex items-center shrink-0 border-r border-slate-200 bg-white">
                   makemyinvites.vercel.app/
                 </div>
                 <input 
                   type="text" 
                   placeholder="sophia-and-jackson"
                   value={customDomain}
                   onChange={e => setCustomDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                   className="flex-1 p-4 bg-transparent outline-none font-bold text-slate-900 placeholder:text-slate-300 min-w-0"
                 />
               </div>
               {customDomain.length >= 3 && (
                 <p className="text-xs text-indigo-500 mt-2 font-medium truncate">✨ makemyinvites.vercel.app/{customDomain}</p>
               )}
             </div>
             
             <div className="mt-8 flex gap-3">
               <button onClick={() => setShowPublishModal(false)} className="flex-1 py-4 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
               <button onClick={handlePublish} disabled={isPublishing || customDomain.length < 3} className="flex-1 py-4 font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                 {isPublishing ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "Save & Publish"}
               </button>
             </div>
          </div>
        </div>
      )}
      
      {/* 
        PREMIUM EDITOR SIDEBAR (Media Only now, since text is in-place)
      */}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full md:w-80 h-screen bg-white/95 backdrop-blur-3xl border-r border-slate-200 shadow-2xl z-50 flex flex-col transition-transform duration-500 overflow-y-auto">
          
          {/* Header */}
          <div className="p-8 border-b border-slate-100 bg-white sticky top-0 z-10 text-center">
            <h2 className={`${playfair.className} text-xl font-bold text-slate-900 mb-2`}>Design Studio</h2>
            <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Live Visual Editor</p>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-medium leading-relaxed">
              Click any text to edit directly on the page.<br/>Hold <strong className="text-slate-900">ALT</strong> to drag text around!
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 sticky top-[152px] z-10">
            {["media", "rsvp config"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${
                  activeTab === tab ? "border-b-2 border-slate-900 text-slate-900 bg-white" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-8 flex-1">
            {activeTab === "media" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Configure Hero Background Image</label>
                  <label className="cursor-pointer flex items-center justify-center w-full p-4 bg-slate-50 border-2 border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-100 rounded-xl text-sm transition-all focus-within:ring-2 focus-within:ring-indigo-100">
                    <span className="text-slate-600 font-medium text-xs">Upload new Hero image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'heroImage')} />
                  </label>
                  <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200 relative group">
                    {isUploading.heroImage && (
                       <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10">
                          <span className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                       </div>
                    )}
                    {media.heroImage && <img src={media.heroImage} alt="Hero preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                  </div>
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Configure Story Section Image</label>
                  <label className="cursor-pointer flex items-center justify-center w-full p-4 bg-slate-50 border-2 border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-100 rounded-xl text-sm transition-all focus-within:ring-2 focus-within:ring-indigo-100">
                    <span className="text-slate-600 font-medium text-xs">Upload new Story image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'storyImage')} />
                  </label>
                  <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200 relative group">
                    {isUploading.storyImage && (
                       <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10">
                          <span className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                       </div>
                    )}
                    {media.storyImage && <img src={media.storyImage} alt="Story preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "rsvp config" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                
                {rsvpFields.map((field) => (
                  <div key={field.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group transition-all">
                    <button onClick={() => removeRsvpField(field.id)} className="absolute -top-2 -right-2 bg-rose-100 text-rose-600 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10 hover:bg-rose-500 hover:text-white">✕</button>
                    
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Field Label</label>
                        <input type="text" value={field.label} onChange={(e) => updateRsvpField(field.id, 'label', e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none" />
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Type</label>
                           <select value={field.type} onChange={(e) => updateRsvpField(field.id, 'type', e.target.value)} className="text-xs p-1 bg-white border border-slate-200 rounded outline-none focus:ring-2 focus:ring-indigo-100">
                             <option value="text">Text Input</option>
                             <option value="email">Email Input</option>
                             <option value="checkbox">Toggle / Checkbox</option>
                             <option value="number">Number Input</option>
                           </select>
                         </div>
                         <label className="flex items-center gap-2 cursor-pointer bg-white px-2 py-1 border border-slate-200 rounded">
                           <input type="checkbox" checked={field.required} onChange={(e) => updateRsvpField(field.id, 'required', e.target.checked)} className="w-3 h-3 rounded" />
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Required</span>
                         </label>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button onClick={() => addRsvpField('text')} className="p-2 border border-dashed border-slate-300 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-800 transition-colors bg-white">Add Field</button>
                  <button onClick={() => addRsvpField('checkbox')} className="p-2 border border-dashed border-slate-300 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-800 transition-colors bg-white">Add Checkbox</button>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 border-t border-slate-200 bg-slate-50 sticky bottom-0">
            <button 
              onClick={() => setShowPublishModal(true)} 
              className="w-full py-4 rounded-xl bg-slate-900 text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-3"
            >
              Finish & Publish
            </button>
            <Link href="/dashboard" className="block text-center mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
              Exit to Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* --- MODERN PARALLAX INVITATION DESIGN --- */}
      <div className={`transition-all duration-700 ease-in-out ${isEditing ? "md:ml-80 pointer-events-auto" : "ml-0"}`}>
        
        {/* HERO SECTION */}
        <section className="relative w-full h-[100vh] overflow-hidden flex flex-col items-center justify-center">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ 
              backgroundImage: `url('${media.heroImage}')`,
              transform: `translateY(${scrollY * 0.4}px) scale(1.05)`, // Subtle parallax and scale
            }}
          />
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="relative z-20 text-center text-white mt-auto pb-32 px-6 flex flex-col items-center" style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
            <div className="flex items-center justify-center gap-4">
              <EditableText 
                  id="p1" 
                  defaultText="Sophia" 
                  isEditing={isEditing} 
                  className={`${playfair.className} text-6xl md:text-8xl font-medium tracking-tight mb-6 leading-none drop-shadow-2xl`} 
              />
              <EditableText 
                  id="amp" 
                  defaultText="&" 
                  isEditing={isEditing} 
                  className="text-4xl italic font-light opacity-80 mx-2 mb-6" 
              />
              <EditableText 
                  id="p2" 
                  defaultText="Jackson" 
                  isEditing={isEditing} 
                  className={`${playfair.className} text-6xl md:text-8xl font-medium tracking-tight mb-6 leading-none drop-shadow-2xl`} 
              />
            </div>
            
            <EditableText 
                id="hero-subtitle" 
                defaultText="Are getting married" 
                isEditing={isEditing} 
                className="text-sm md:text-base tracking-[0.4em] uppercase font-medium opacity-90" 
            />
          </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="relative z-30 bg-white py-32 px-6 shadow-2xl flex flex-col items-center">
          <div className="w-px h-24 bg-slate-300 mx-auto mb-16" />
          
          <EditableText 
             id="details-title"
             defaultText="The Details"
             isEditing={isEditing}
             className={`${playfair.className} text-4xl md:text-5xl text-slate-900 mb-16 text-center`}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-24 text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center group">
              <span className="text-3xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">✨</span>
              <EditableText id="lbl-when" defaultText="When" isEditing={isEditing} className="text-sm font-bold tracking-[0.2em] uppercase text-slate-400 mb-3" />
              <EditableText id="date" defaultText="October 14, 2026" isEditing={isEditing} className={`${playfair.className} text-2xl text-slate-800`} />
              <EditableText id="time" defaultText="5:00 PM" isEditing={isEditing} className="text-slate-500 mt-2" />
            </div>
            
            <div className="flex flex-col items-center group">
              <span className="text-3xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500 delay-200 pointer-events-none">🥂</span>
              <EditableText id="lbl-where" defaultText="Where" isEditing={isEditing} className="text-sm font-bold tracking-[0.2em] uppercase text-slate-400 mb-3" />
              <EditableText id="venue" defaultText="The Glass Sanctuary" isEditing={isEditing} className={`${playfair.className} text-2xl text-slate-800`} />
              <EditableText id="address" defaultText="Downtown Bay Area" isEditing={isEditing} className="text-slate-500 mt-2" />
            </div>
          </div>
        </section>

        {/* PARALLAX STORY SPLIT SECTION */}
        <section className="w-full flex-col md:flex-row flex items-stretch min-h-[80vh] bg-slate-50 relative z-20">
          <div className="w-full md:w-1/2 p-16 md:p-32 flex flex-col justify-center items-start">
            <EditableText 
              id="story-title" 
              defaultText="Join us." 
              isEditing={isEditing} 
              className={`${playfair.className} text-4xl md:text-5xl text-slate-900 mb-8 max-w-full`} 
            />
            <EditableText 
              id="story-desc" 
              defaultText="We couldn't be more excited to share this incredible milestone with our closest friends and family. Please join us for an evening of dinner, dancing, and celebration under the stars." 
              isEditing={isEditing} 
              className="text-lg text-slate-600 leading-relaxed font-light mb-12 max-w-full text-left" 
            />
            
            <div className="bg-white p-8 border border-slate-100 shadow-xl rounded-2xl w-full max-w-sm pointer-events-auto">
              <EditableText 
                id="rsvp-title" 
                defaultText="Formal RSVP" 
                isEditing={isEditing} 
                className="text-sm font-bold tracking-[0.2em] uppercase text-slate-900 mb-6 text-center block w-full"
              />
              
              {isEditing ? (
                 <div className="flex flex-col gap-4">
                   {rsvpFields.map((f) => (
                     f.type === 'checkbox' ? (
                       <div key={f.id} className="relative flex items-center gap-3 mt-2 pointer-events-none">
                           <input type="checkbox" checked={false} readOnly className="w-4 h-4 rounded border-slate-300" />
                           <span className="text-sm text-slate-600">{f.label} {f.required && <span className="text-rose-500">*</span>}</span>
                       </div>
                     ) : (
                       <div key={f.id} className="relative pointer-events-none">
                          <input type={f.type} placeholder={`${f.label} ${f.required ? '*' : ''}`} readOnly className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400" />
                       </div>
                     )
                   ))}
                   <div className="w-full bg-slate-900 rounded-xl flex items-center justify-center h-12 mt-2 pointer-events-auto">
                      <EditableText id="btn-rsvp" defaultText="Send RSVP" isEditing={isEditing} className="text-white text-xs font-bold uppercase tracking-widest w-full text-center" />
                   </div>
                 </div>
              ) : (
                 <form className="flex flex-col gap-4">
                   {rsvpFields.map((f) => (
                     f.type === 'checkbox' ? (
                       <label key={f.id} className="flex items-center gap-3 mt-2 cursor-pointer group">
                          <input type="checkbox" name={f.id} required={f.required} className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900" />
                          <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{f.label} {f.required && <span className="text-rose-500">*</span>}</span>
                       </label>
                     ) : (
                       <input key={f.id} type={f.type} name={f.id} required={f.required} placeholder={`${f.label} ${f.required ? '*' : ''}`} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-shadow placeholder:text-slate-400" />
                     )
                   ))}

                   <button type="submit" onClick={(e) => { e.preventDefault(); alert("RSVP functionality would hit the DB here!"); }} className="w-full py-4 mt-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 hover:-translate-y-0.5">
                     Send RSVP
                   </button>
                 </form>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-full relative overflow-hidden pointer-events-none">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('${media.storyImage}')`,
                transform: `scale(1.2) translateY(${(scrollY - 600) * 0.15}px)`, // Intense smooth parallax
              }}
            />
          </div>
        </section>

        <footer className="bg-slate-900 text-white py-24 text-center z-30 relative flex flex-col items-center border-t-4 border-slate-800">
          <EditableText 
            id="footer-names"
            defaultText="Sophia & Jackson"
            isEditing={isEditing}
            className={`${playfair.className} text-5xl font-style-italic mb-6 opacity-90`}
          />
          <EditableText 
            id="footer-sub"
            defaultText="Can't wait to see you there!"
            isEditing={isEditing}
            className="text-xs uppercase tracking-[0.4em] text-slate-400"
          />
        </footer>

      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-400 tracking-widest text-xs uppercase">Loading Experience...</div>}>
      <TemplateContent />
    </Suspense>
  );
}
