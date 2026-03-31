"use client";

import {
  ArrowLongRightIcon,
  DownloadIcon,
  PauseIcon,
  PlayIcon,
  StepBackwardIcon,
  StepForwardIcon,
  VolumeUpIcon,
} from "@/components/InlineIcons";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useMemo, useRef, useState } from "react";

type AudioTrack = {
  id: string;
  name: string;
  file: string;
};

type AudioMaterialsData = Record<string, Record<string, AudioTrack[]>>;

const levels = [
  "BEGINNER",
  "ELEMENTARY",
  "PRE-INTERMEDIATE",
  "INTERMEDIATE",
  "UPPER-INTERMEDIATE",
];

const books = ["STUDENT BOOKS", "WORK BOOKS"];

export default function AudioMaterialsLibrary() {
  const { t } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);
  const [selectedBook, setSelectedBook] = useState(books[0]);
  const [audioData, setAudioData] = useState<AudioMaterialsData>({});
  const [loading, setLoading] = useState(true);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadAudioMaterials() {
      try {
        const response = await fetch("/api/audio-materials");
        const payload = (await response.json()) as {
          success?: boolean;
          data?: AudioMaterialsData;
        };

        if (!mounted) {
          return;
        }

        if (payload.success && payload.data) {
          setAudioData(payload.data);
        } else {
          setAudioData({});
        }
      } catch {
        if (mounted) {
          setAudioData({});
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadAudioMaterials();

    return () => {
      mounted = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioData[selectedLevel]) {
      return;
    }

    const availableLevel = levels.find((level) => Boolean(audioData[level]));
    if (availableLevel) {
      setSelectedLevel(availableLevel);
    }
  }, [audioData, selectedLevel]);

  useEffect(() => {
    if (audioData[selectedLevel]?.[selectedBook]) {
      return;
    }

    const availableBook = books.find((book) => Boolean(audioData[selectedLevel]?.[book]));
    if (availableBook) {
      setSelectedBook(availableBook);
    }
  }, [audioData, selectedBook, selectedLevel]);

  const rows = useMemo(
    () => audioData[selectedLevel]?.[selectedBook] ?? [],
    [audioData, selectedBook, selectedLevel],
  );

  useEffect(() => {
    if (!activeTrackId) {
      return;
    }

    const stillVisible = rows.some((track) => track.id === activeTrackId);
    if (!stillVisible) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setActiveTrackId(null);
      setIsPlaying(false);
    }
  }, [activeTrackId, rows]);

  const playTrack = async (track: AudioTrack) => {
    if (activeTrackId === track.id && audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(track.file);
    audio.preload = "metadata";
    audio.volume = isMuted ? 0 : 1;
    audio.onended = () => setIsPlaying(false);
    audio.onpause = () => setIsPlaying(false);
    audio.onplay = () => setIsPlaying(true);

    audioRef.current = audio;
    setActiveTrackId(track.id);

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const pauseTrack = (trackId: string) => {
    if (activeTrackId !== trackId || !audioRef.current) {
      return;
    }

    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayback = (track: AudioTrack) => {
    if (activeTrackId === track.id && isPlaying) {
      pauseTrack(track.id);
    } else {
      void playTrack(track);
    }
  };

  const playPreviousTrack = (index: number) => {
    if (rows.length === 0) {
      return;
    }

    const previousIndex = index > 0 ? index - 1 : rows.length - 1;
    void playTrack(rows[previousIndex]);
  };

  const playNextTrack = (index: number) => {
    if (rows.length === 0) {
      return;
    }

    const nextIndex = index < rows.length - 1 ? index + 1 : 0;
    void playTrack(rows[nextIndex]);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : 1;
    }
  };

  return (
    <section className="w-full bg-white px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:pb-24">
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-(--brand-dark) md:text-5xl lg:text-5xl">
            {t("materials.audio_materials")}
          </h1>
          <p className="mt-3 text-base text-(--brand-dark) md:text-lg">
            {t("materials.tagline")}
          </p>
        </div>

        <div className="mt-8 rounded-[24px] bg-(--brand-red) px-5 py-6 sm:px-7 sm:py-7 lg:px-10">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t("materials.choose_level")}
          </h2>

          <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {levels.map((level) => {
              const isActive = selectedLevel === level;
              const isDisabled = !loading && !audioData[level];

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  disabled={isDisabled}
                  className={`inline-flex h-10 items-center rounded-full px-5 text-xs font-bold transition-colors sm:h-11 sm:px-6 sm:text-sm ${isActive
                    ? "bg-(--brand-dark) text-white"
                    : "bg-white text-(--brand-dark)"
                    } ${isDisabled ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  {level}
                  <ArrowLongRightIcon
                    className={`ml-2 h-4 w-4 transition-transform ${isActive ? "rotate-90" : ""}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-2.5 rounded-[22px] bg-(--brand-red) px-5 py-4 sm:px-7 sm:py-5 lg:px-10">
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {books.map((book) => {
              const isActive = selectedBook === book;
              const isDisabled = !loading && !audioData[selectedLevel]?.[book];

              return (
                <button
                  key={book}
                  type="button"
                  onClick={() => setSelectedBook(book)}
                  disabled={isDisabled}
                  className={`inline-flex h-10 items-center rounded-full px-5 text-xs font-bold transition-colors sm:h-11 sm:px-6 sm:text-sm ${isActive
                    ? "bg-(--brand-dark) text-white"
                    : "bg-white text-(--brand-dark)"
                    } ${isDisabled ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  {book}
                  <ArrowLongRightIcon
                    className={`ml-2 h-4 w-4 transition-transform ${isActive ? "rotate-90" : ""}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 space-y-2.5 sm:mt-8 sm:space-y-3">
          {loading ? (
            <article className="flex items-center justify-center rounded-[12px] bg-[#FFE9E9] px-4 py-4 sm:px-5 sm:py-4.5">
              <p className="text-center text-base font-bold text-(--brand-dark) sm:text-xl">
                {t("materials.audio_loading")}
              </p>
            </article>
          ) : rows.length === 0 ? (
            <article className="flex items-center justify-center rounded-[12px] bg-[#FFE9E9] px-4 py-4 sm:px-5 sm:py-4.5">
              <p className="text-center text-base font-bold text-(--brand-dark) sm:text-xl">
                {t("materials.audio_empty")}
              </p>
            </article>
          ) : (
            rows.map((track, index) => {
              const isActive = activeTrackId === track.id;
              const isTrackPlaying = isActive && isPlaying;

              return (
                <article
                  key={track.id}
                  className={`rounded-[18px] bg-[#FFE9E9] px-3 py-3 sm:px-5 sm:py-4 ${isActive ? "ring-1 ring-[#00192d2b]" : ""
                    }`}
                >
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <div className="flex shrink-0 items-center gap-0.5 text-(--brand-dark) sm:gap-1">
                      <button
                        type="button"
                        onClick={() => playPreviousTrack(index)}
                        aria-label={t("materials.audio_prev")}
                        className="grid h-9 w-9 place-items-center transition-colors hover:bg-[#00192d10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00192d66] sm:h-10 sm:w-10"
                      >
                        <StepBackwardIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePlayback(track)}
                        aria-label={isTrackPlaying ? t("materials.audio_pause") : t("materials.audio_play")}
                        className="grid h-9 w-9 place-items-center transition-colors hover:bg-[#00192d10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00192d66] sm:h-10 sm:w-10"
                      >
                        {isTrackPlaying ? (
                          <PauseIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                        ) : (
                          <PlayIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => playNextTrack(index)}
                        aria-label={t("materials.audio_next")}
                        className="grid h-9 w-9 place-items-center transition-colors hover:bg-[#00192d10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00192d66] sm:h-10 sm:w-10"
                      >
                        <StepForwardIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </button>
                    </div>

                    <p className="min-w-0 flex-1 truncate px-2 text-center text-base font-extrabold text-(--brand-dark) sm:text-xl">
                      {track.name}
                    </p>

                    <div className="flex shrink-0 items-center gap-1 text-(--brand-dark) sm:gap-2">
                      <a
                        href={track.file}
                        download
                        aria-label={t("materials.audio_download")}
                        className="grid h-9 w-9 place-items-center rounded-[10px] text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00192d66] sm:h-10 sm:w-10"
                      >
                        <DownloadIcon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                      </a>
                      <button
                        type="button"
                        onClick={toggleMute}
                        disabled={!isActive}
                        aria-label={t("materials.audio_volume")}
                        aria-pressed={isMuted}
                        className={`grid h-9 w-9 place-items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00192d66] sm:h-10 sm:w-10 ${!isActive ? "cursor-not-allowed opacity-45" : "hover:bg-[#00192d10]"
                          }`}
                      >
                        <VolumeUpIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${isMuted ? "opacity-50" : ""}`} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
