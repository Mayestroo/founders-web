"use client";

import { UserIcon } from "@/components/InlineIcons";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

interface Vacancy {
  title: string;
  description: string;
}

export default function JoinTeamVacancies() {
  const { t, translations } = useTranslation();
  const vacancies = Array.isArray(translations?.join_team?.positions) 
    ? (translations?.join_team?.positions as Vacancy[]) 
    : [];
  return (
    <section className="w-full bg-white px-5 pb-14 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
           <h2 className="relative inline-block text-4xl font-bold text-(--brand-dark) md:text-5xl lg:text-5xl">
             Founders School'dagi
             <br />
             <span className="relative inline-block">
               <span className="relative z-1">bo'sh ish o'rinlari</span>
                <Image
                  src="/team-2.svg"
                  alt="Job openings highlight"
                  width={620}
                  height={12}
                  className="absolute left-0 top-full -mt-4 w-full"
                  style={{ height: 'auto', width: '100%' }}
                />
             </span>
           </h2>

          <p className="mt-4 text-sm text-(--brand-dark) sm:text-lg lg:text-xl">
            {t("join_team.vacancies_intro")}
          </p>
        </div>

        <div className="mt-8 grid w-full justify-items-center gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {vacancies.map((vacancy: Vacancy, index: number) => (
            <article
              key={index}
              className="flex min-h-62 w-full max-w-90 flex-col rounded-[34px] border border-[#00192D] bg-white px-5 pb-5 pt-5 sm:min-h-71.5 sm:max-w-95 sm:rounded-[40px] sm:px-8.5 sm:pb-8 sm:pt-8"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-(--brand-red) text-white sm:h-18 sm:w-18">
                <UserIcon className="h-6 w-6 sm:h-9 sm:w-9" aria-hidden="true" />
              </div>

              <div className="mt-3 flex w-full flex-col gap-1 sm:mt-2 sm:max-w-68">
                <h3 className="text-[26px] font-bold leading-[1.2] text-(--brand-dark) sm:text-[30px]">
                  {vacancy.title}
                </h3>

                <p className="text-base leading-tight text-(--brand-dark) sm:text-[19px]">
                  {vacancy.description}
                </p>
              </div>

              <a
                href="https://t.me/foundersschoolrecruiter"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex h-10 w-full items-center justify-center self-start rounded-full bg-(--brand-red) px-7 text-[17px] leading-none font-medium text-white transition-all hover:scale-[1.02] active:scale-[0.98] sm:mt-2.5 sm:h-11.5 sm:max-w-68 sm:px-11 sm:text-[19px]"
              >
                {t("join_team.submit_application")}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
