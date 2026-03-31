import {
  ChartLineIcon,
  HandsHelpingIcon,
  HandshakeIcon,
  MedalIcon,
  type SvgIconComponent,
} from "@/components/InlineIcons";
import { useTranslation } from "@/hooks/useTranslation";

type CandidateTrait = {
  title: string;
  icon: SvgIconComponent;
};

const getCandidateTraits = (t: (key: string) => string): CandidateTrait[] => [
  {
    title: t("join_team.qualities[0]"),
    icon: ChartLineIcon,
  },
  {
    title: t("join_team.qualities[1]"),
    icon: HandshakeIcon,
  },
  {
    title: t("join_team.qualities[2]"),
    icon: HandsHelpingIcon,
  },
  {
    title: t("join_team.qualities[3]"),
    icon: MedalIcon,
  },
];

export default function JoinTeamWhoWeSeek() {
  const { t } = useTranslation();
  const candidateTraits = getCandidateTraits(t);
  return (
    <section className="w-full bg-white px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
      <div className="mx-auto w-full max-w-360 rounded-[30px] bg-(--brand-red) px-6 pb-8 pt-8 sm:rounded-[40px] sm:px-8 sm:pb-12 sm:pt-11 lg:px-10 lg:pb-13 lg:pt-10">
         <div className="text-center text-white">
           <h2 className="text-4xl font-extrabold leading-[1.03] md:text-5xl lg:text-5xl">
             {t("join_team.who_we_seek_title")}
           </h2>
           <p className="mt-4 text-sm sm:text-base lg:text-[20px]">
             {t("join_team.who_we_seek_intro")}
           </p>
         </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-5 px-8 sm:mt-10 sm:grid-cols-2 sm:gap-6 sm:px-14 lg:mt-12 lg:gap-8 lg:px-24">
          {candidateTraits.map((trait) => {
            const Icon = trait.icon;

            return (
              <article
                key={trait.title}
                className="w-full min-h-45 rounded-[34px] bg-white px-6 pb-6 pt-6 sm:min-h-55 sm:rounded-[44px] sm:px-7.5 sm:pb-7.5 sm:pt-7.5"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-(--brand-red) text-white sm:h-15 sm:w-15">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                </div>

                <h3 className="mt-5 max-w-[16ch] text-2xl font-bold leading-[1.1] text-(--brand-dark) sm:text-[32px]">
                  {trait.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
