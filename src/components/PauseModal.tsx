import { DiscountCard } from './DiscountCard';

interface PauseModalProps {
  score: number;
  bestScore: number;
  codeUnlockedEver: boolean;
  onResume: () => void;
  onRestart: () => void;
  onTitle: () => void;
}

export function PauseModal({
  score,
  bestScore,
  codeUnlockedEver,
  onResume,
  onRestart,
  onTitle,
}: PauseModalProps) {
  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-[#090a12]/75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pause-heading"
    >
      <div className="pixel-panel w-full max-w-sm p-5 sm:p-6 text-center">
        <h2 id="pause-heading" className="font-pixel text-xl sm:text-2xl text-[#f5f0e1] mb-1">
          SHIFT PAUSED
        </h2>
        <p className="text-xs text-[#b8bdd9] mb-4">
          Score {score} · Best {bestScore}
        </p>

        {codeUnlockedEver && (
          <div className="mb-4">
            <DiscountCard compact />
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onResume}
            className="pixel-btn w-full min-h-[48px] bg-[#38e59b] hover:bg-[#4ff0aa] text-[#141522] text-sm font-bold cursor-pointer"
          >
            RESUME
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="pixel-btn w-full min-h-[44px] bg-[#ffd147] hover:bg-[#ffdc6e] text-[#141522] text-xs font-bold cursor-pointer"
          >
            INSTANT RESTART
          </button>
          <button
            type="button"
            onClick={onTitle}
            className="pixel-btn w-full min-h-[44px] bg-[#25283d] hover:bg-[#313552] text-[#f5f0e1] text-xs font-bold cursor-pointer"
          >
            TITLE SCREEN
          </button>
        </div>
      </div>
    </div>
  );
}
