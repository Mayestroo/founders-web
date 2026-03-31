import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function JoinTeam() {
  const { t } = useTranslation();
  const mainTitle = t("join_team.main_title");
  const highlightText = "bo'lagiga aylaning!";
  const highlightIndex = mainTitle.toLowerCase().indexOf(highlightText);
  const titlePrefix =
    highlightIndex >= 0 ? mainTitle.slice(0, highlightIndex) : mainTitle;
  const titleHighlight =
    highlightIndex >= 0
      ? mainTitle.slice(highlightIndex, highlightIndex + highlightText.length)
      : "";
  const teamMembers = [
    { image: "/team/member1.webp", alt: "Team member 1" },
    { image: "/team/member2.webp", alt: "Team member 2" },
    { image: "/team/member3.webp", alt: "Team member 3" },
    { image: "/team/member4.webp", alt: "Team member 4" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        <div className="mx-auto flex flex-col items-center justify-between gap-12 lg:flex-row">
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-(--brand-dark) mb-6 leading-tight">
              <span>{titlePrefix}</span>
              {titleHighlight && (
                <span className="relative inline-block">
                  <span className="relative z-1">{titleHighlight}</span>
                  <Image
                    src="/team-1.svg"
                    alt=""
                    width={400}
                    height={12}
                    className="absolute left-0 top-full -mt-3 w-auto h-auto z-0"
                  />
                </span>
              )}
            </h2>

            <p className="text-gray-700 text-lg mb-8">
              {t("join_team.passion_text")}
            </p>

            <Link
              href="/join-team"
              className="bg-(--brand-red) text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-3 shadow-lg hover:shadow-xl w-fit mb-8 sm:mb-0"
            >
              {t("join_team.join_button")}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Right Content - Team Photos */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-72 h-72 sm:w-130 sm:h-130 max-w-full scale-75 sm:scale-100">
              {/* Center red diamond (smaller, crisp) */}
              <div
                className="absolute left-1/2 top-1/2 z-0
             h-48 w-48
             -translate-x-1/2 -translate-y-1/2 rotate-45
             rounded-[1px] bg-(--brand-red)"
                aria-hidden="true"
              />

              {/* Circles (closer to center so they overlap the diamond) */}
              {[
                { i: 0, dx: -135, dy: -135 }, // top-left
                { i: 1, dx: 135, dy: -135 }, // top-right
                { i: 2, dx: -135, dy: 135 }, // bottom-left
                { i: 3, dx: 135, dy: 135 }, // bottom-right
              ].map(({ i, dx, dy }) => (
                <div
                  key={teamMembers[i].image}
                  className="absolute left-1/2 top-1/2 z-10
                   h-67.5 w-67.5
                   rounded-full bg-white p-2.5 "
                  style={{
                    transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`,
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-[#ffc9c9]">
                    <Image
                      src={teamMembers[i].image}
                      alt={`Team member ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 270px, (min-width: 640px) 40vw, 44vw"
                      quality={70}
                      className="object-cover object-center"
                      loading={i === 0 ? "eager" : "lazy"}
                      priority={i === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
