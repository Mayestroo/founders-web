import {
  CalendarIcon,
  ChalkboardIcon,
  FileTextIcon,
  LightbulbIcon,
  type SvgIconComponent,
  UserTieIcon,
} from "@/components/InlineIcons";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

type ProcessStep = {
  title: string;
  description: string;
  side: "left" | "right";
  icon: SvgIconComponent;
};

type TranslationHiringStep = {
  title?: string;
  description?: string;
};

export default function JoinTeamHiringProcess() {
  const { t, translations } = useTranslation();

  const stepIcons: SvgIconComponent[] = [
    FileTextIcon,
    UserTieIcon,
    ChalkboardIcon,
    LightbulbIcon,
    CalendarIcon,
  ];

  const rawSteps = Array.isArray(translations?.join_team?.hiring_steps)
    ? (translations.join_team.hiring_steps as TranslationHiringStep[])
    : [];

  const processSteps: ProcessStep[] = rawSteps
    .map((step, index) => {
      const side: ProcessStep["side"] = index % 2 === 0 ? "left" : "right";

      return {
      title: typeof step?.title === "string" ? step.title : "",
      description: typeof step?.description === "string" ? step.description : "",
      side,
      icon: stepIcons[index % stepIcons.length],
    };
    })
    .filter((step) => step.title.length > 0 && step.description.length > 0);
  return (
    <section className="w-full bg-white px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="relative inline-block text-4xl font-bold leading-[1.05] text-(--brand-dark) md:text-5xl lg:text-5xl">
            <span className="relative inline-block">
              <span className="relative z-1">{t("join_team.hiring_process_title")}</span>
              <Image
                src="/process.svg"
                alt=""
                width={760}
                height={24}
                className="absolute left-0 top-full -mt-3 h-auto w-full z-0"
                style={{ height: 'auto' }}
              />
            </span>
          </h2>

          <p className="mt-4 text-sm text-(--brand-dark) sm:text-lg lg:text-2xl">
            {t("join_team.hiring_process_intro")}
          </p>
        </div>

        <div className="relative mt-10 sm:mt-12">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l-2 border-dashed border-[#98a3b1] lg:block" />

          <div className="space-y-4 sm:space-y-5 lg:space-y-2">
            {processSteps.map((step: ProcessStep) => {
              const Icon = step.icon;
              const isLeft = step.side === "left";

              return (
                <div
                  key={step.title}
                  className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_280px_minmax(0,1fr)] lg:items-stretch"
                >
                  <div
                    className={
                      isLeft
                        ? "lg:col-start-1 lg:mr-auto"
                        : "lg:col-start-3 lg:ml-auto"
                    }
                  >
                    <article className="relative mx-auto w-full max-w-107.5 rounded-[30px] border border-(--brand-red) bg-white px-5 pb-5 pt-5 sm:rounded-[34px] sm:px-7 sm:pb-7 sm:pt-6 lg:mx-0">
                      <span
                        className={`absolute top-1/2 hidden h-12 w-1.5 -translate-y-1/2 rounded-full bg-(--brand-red) lg:block ${isLeft ? "-right-0.75" : "-left-0.75"
                          }`}
                      />

                      <div className="grid h-12 w-12 place-items-center rounded-full bg-(--brand-red) text-white sm:h-14 sm:w-14">
                        <Icon
                          className="h-5.5 w-5.5 sm:h-6.5 sm:w-6.5"
                          aria-hidden="true"
                        />
                      </div>

                      <h3 className="mt-4 text-[26px] font-bold leading-[1.12] text-(--brand-red) sm:text-[30px] lg:text-[34px]">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-base leading-[1.24] text-(--brand-dark) sm:text-lg lg:text-xl">
                        {step.description}
                      </p>
                    </article>
                  </div>

                  <div className="relative hidden lg:col-start-2 lg:row-start-1 lg:block">
                    <span
                      className={`absolute top-1/2 h-px -translate-y-1/2 border-t-2 border-dashed border-[#98a3b1] ${isLeft ? "left-0 w-1/2" : "right-0 w-1/2"
                        }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <a
          href="https://t.me/foundersschoolrecruiter"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-10 flex h-11 w-full max-w-105 items-center justify-center rounded-full bg-(--brand-red) px-7 text-xl font-medium text-white transition-all hover:scale-[1.02] active:scale-[0.98] sm:mt-12 sm:h-12 sm:text-2xl lg:text-3xl"
        >
          {t("join_team.join_button")}
        </a>
      </div>
    </section>
  );
}
