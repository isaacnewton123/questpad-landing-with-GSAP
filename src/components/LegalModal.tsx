import { useEffect, useRef } from "react";
import { PiXBold, PiShieldCheckBold, PiFileTextBold, PiTelegramLogoBold, PiArrowUpRightBold } from "react-icons/pi";
import { PRIVACY_SECTIONS } from "../constants/privacy";
import { TERMS_SECTIONS } from "../constants/terms";

export type LegalTab = "terms" | "privacy";

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onClose: () => void;
  onTabChange: (tab: LegalTab) => void;
}

export default function LegalModal({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
}: LegalModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and listen for ESC key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset scroll to top when switching tabs
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  if (!isOpen) return null;

  const isTerms = activeTab === "terms";
  const sections = isTerms ? TERMS_SECTIONS : PRIVACY_SECTIONS;
  const title = isTerms ? "Terms of Service" : "Privacy Policy";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-slate-200 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {isTerms ? (
                <PiFileTextBold className="w-5 h-5 text-[#0047AB]" />
              ) : (
                <PiShieldCheckBold className="w-5 h-5 text-[#0047AB]" />
              )}
              <h2 id="legal-modal-title" className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                {title}
              </h2>
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Last Updated: June 2026 • QuestPad Ecosystem
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab switch buttons */}
            <div className="inline-flex p-1 bg-slate-200/70 rounded-full text-xs font-bold">
              <button
                type="button"
                onClick={() => onTabChange("terms")}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  isTerms
                    ? "bg-white text-slate-950 shadow-sm font-black"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Terms
              </button>
              <button
                type="button"
                onClick={() => onTabChange("privacy")}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  !isTerms
                    ? "bg-white text-slate-950 shadow-sm font-black"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Privacy
              </button>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
            >
              <PiXBold className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-7 font-sans text-slate-700 text-sm sm:text-base leading-relaxed scroll-smooth"
        >
          {sections.map((sec, idx) => (
            <section key={idx} className="space-y-2 pb-5 border-b border-slate-100 last:border-b-0 last:pb-0">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#0047AB] rounded-full inline-block" />
                <span>{sec.title}</span>
              </h3>
              <p className="text-slate-600 leading-relaxed pl-3.5">
                {sec.content}
              </p>
            </section>
          ))}

          {/* Contact Box */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-slate-950 text-sm sm:text-base mb-1">
                Have questions about our {title}?
              </p>
              <p className="text-xs sm:text-sm text-slate-600">
                Contact the official QuestPad team directly via Telegram.
              </p>
            </div>
            <a
              href="https://t.me/Isaacnewton1234"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0047AB] hover:bg-[#003888] text-white text-xs sm:text-sm font-bold tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              <PiTelegramLogoBold className="w-4 h-4" />
              <span>@Isaacnewton1234</span>
              <PiArrowUpRightBold className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-sans">
          <span>QuestPad © 2026 • TON Ecosystem</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-[#0047AB] cursor-pointer transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
