import { UserIcon } from "@/components/InlineIcons";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

type TranslationPositionInfo = {
  title?: string;
  salary?: string;
  benefit?: string;
};

type Reason = {
  id: number;
  title: string;
  salary: string;
  benefit: string;
};

const getIconForPosition = (title: string): string => {
  if (title.includes("ESL") || title.includes("Teacher")) {
    return "/esl.svg";
  } else if (title.includes("Administrator")) {
    return "/admin.svg";
  } else if (title.includes("Academic Support")) {
    return "/frete.svg";
  } else if (title.includes("Grafik dizayner")) {
    return "/icons/paint-brush.svg";
  } else if (title.includes("Kassir")) {
    return "/icons/wallet.svg";
  } else if (title.includes("Ambassador")) {
    return "/icons/megaphone.svg";
  }
  return "/icons/teacher.svg";
};

export default function JoinTeamWhyFounders() {
  const { t, translations } = useTranslation();

  const rawReasons = Array.isArray(translations?.join_team?.why_founders?.positions_info)
    ? (translations.join_team.why_founders.positions_info as TranslationPositionInfo[])
    : [];

  const reasons: Reason[] = rawReasons
    .map((item, index) => ({
      id: index + 1,
      title: typeof item?.title === "string" ? item.title : "",
      salary: typeof item?.salary === "string" ? item.salary : "",
      benefit: typeof item?.benefit === "string" ? item.benefit : "",
    }))
    .filter((item) => item.title.length > 0);

  const scrollItems = [...reasons, ...reasons];

  return (
    <section className="w-full bg-white px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-10 lg:pb-24">
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold leading-[1.05] text-(--brand-dark) md:text-5xl lg:text-5xl">
             Nega aynan{" "}
             <span className="relative inline-block">
               <span className="relative z-1">Founders School&apos;da</span>
                <Image
                  src="/team-2.svg"
                  alt="Why Founders highlight"
                  width={640}
                  height={12}
                  className="absolute left-0 top-full -mt-4 w-full"
                  style={{ height: 'auto', width: '100%' }}
                />
             </span>
             <br />
             ishlash kerak?
           </h2>

           <p className="mt-4 text-sm text-(--brand-dark) sm:text-lg lg:text-2xl">
             {t("join_team.why_founders.subtitle")}
           </p>
        </div>
      </div>

      <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 sm:mt-10 lg:mt-12">
        <div className="overflow-hidden">
          <div
            className="animate-scroll flex gap-6"
            style={{ animationDuration: "60s" }}
          >
             {scrollItems.map((reason, index) => (
               <article
                 key={`${reason.id}-${index}`}
                 className="w-[calc(100vw-3rem)] shrink-0 rounded-[34px] border border-(--brand-red) bg-white px-5 pb-6 pt-5 sm:w-[calc((100vw-4rem)/2)] sm:min-h-55 sm:rounded-[40px] sm:px-7 sm:pb-7 sm:pt-6 lg:w-[calc((100vw-6rem)/3)]"
               >
                 <div className="grid h-12 w-12 place-items-center rounded-full bg-(--brand-red) sm:h-15 sm:w-15">
                   <Image
                     src={getIconForPosition(reason.title)}
                     alt={reason.title}
                     width={24}
                     height={24}
                     className="h-6 w-6 sm:h-8 sm:w-8"
                   />
                 </div>

                 <h3 className="mt-4 text-[28px] font-bold leading-[1.08] text-(--brand-red) sm:text-[34px]">
                   {reason.title}
                 </h3>

                 <p className="mt-2 text-base leading-tight text-(--brand-dark) sm:text-[19px]">
                   <strong>{reason.salary}</strong> {reason.benefit}
                 </p>
               </article>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
