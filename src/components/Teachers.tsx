import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";

export default function Teachers() {
  const { t } = useTranslation();
  const teachers = [
    {
      name: "MUHAMEDOV",
      surname: "ABDULLOH",
      ielts: "8.5",
      experience: "3+",
      students: "20+ IELTS",
      image: "/teachers/Photo-2.png",
    },
    {
      name: "RAHIMOVA",
      surname: "MADINA",
      specialty: "Webster MA TESOL",
      experience: "23+",
      students: "500+ IELTS",
      image: "/teachers/Photo-3.png",
    },
    {
      name: "RAHMATULLAEVA",
      surname: "GAVKHARSHODBEGIM",
      ielts: "8.0",
      experience: "4+",
      students: "300+ students/30+ IELTS",
      image: "/teachers/Photo-4.png",
    },
    {
      name: "SHUKUROV",
      surname: "ABDUGAFFOR",
      ielts: "8.5",
      experience: "4+",
      students: "100+ IELTS",
      image: "/teachers/Photo-5.png",
    },
    {
      name: "ERKINOVA",
      surname: "MUBINA",
      ielts: "7.5",
      experience: "2+",
      students: "200+ students",
      image: "/teachers/Photo-8.png",
    },
    {
      name: "ZIKRULLAYEVA",
      surname: "SARVINOZ",
      ielts: "7.5",
      experience: "3+",
      students: "250+ students",
      image: "/teachers/Photo-9.png",
    },
    {
      name: "ABDUMALIKOVA",
      surname: "PARIZODA",
      specialty: "TESOL certified ESL teacher",
      experience: "8+",
      students: "400+ IELTS",
      image: "/teachers/Photo-6.png",
    },
    {
      name: "QUTLIBOYEVA",
      surname: "DILNAVOZ",
      ielts: "8.0",
      experience: "3+",
      students: "20+ IELTS",
      image: "/teachers/Photo-1.png",
    },
    {
      name: "ODILJONOVA",
      surname: "MUHAYYO",
      ielts: "7.5",
      experience: "3+",
      students: "150+ students",
      image: "/teachers/Photo-1.png",
    },
    {
      name: "HAYITBOYEVA",
      surname: "ZEBOXON",
      ielts: "8.5",
      experience: "3+",
      students: "100+ students/15+ IELTS",
      image: "/teachers/Photo-1.png",
    },
    {
      name: "TADJIBAEVA",
      surname: "MUHABBAT",
      ielts: "8.0",
      experience: "24",
      students: "300+ IELTS",
      image: "/teachers/Photo.png",
    },
    {
      name: "JAMOLOV",
      surname: "ASLAMXON",
      ielts: "7.0",
      experience: "2+",
      students: "150+ IELTS",
      image: "/teachers/Photo-7.png",
    },
    {
      name: "YUSUPOVA",
      surname: "LEYLA",
      specialty: "TESOL",
      experience: "8+",
      students: "500+ students",
      image: "/teachers/Photo-10.png",
    },
  ];

  const splitIndex = Math.ceil(teachers.length / 2);
  const topRow = teachers.slice(0, splitIndex);
  const bottomRow = teachers.slice(splitIndex);

  const TeacherCard = ({ teacher }: { teacher: (typeof teachers)[number] }) => (
    <div className="relative shrink-0 w-[280px] sm:w-[320px] md:w-md bg-white rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-(--brand-dark) p-5 sm:p-6 md:p-8 pb-6 sm:pb-7 md:pb-9">
      {/* Arrow Icon - Top Left */}
      <div className="absolute top-5 left-5 sm:top-6 sm:left-6 md:top-8 md:left-8 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-(--brand-dark) rounded-full flex items-center justify-center cursor-pointer active:bg-[#2a2a3e] hover:bg-[#2a2a3e] transition-colors">
        <svg
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M17 7H7M17 7V17"
          />
        </svg>
      </div>

      {/* Profile Image - Top Right */}
      <div className="absolute top-8 sm:top-10 md:top-12 right-4 sm:right-5 md:right-6">
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-[#ffc9c9] overflow-hidden">
          <Image
            src={teacher.image}
            alt={`${teacher.name} ${teacher.surname}`}
            width={144}
            height={144}
            sizes="(min-width: 768px) 144px, 36vw"
            quality={70}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Teacher Info - Bottom Left */}
      <div className="mt-24 sm:mt-26 md:mt-28 space-y-0.5 sm:space-y-1">
        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-(--brand-red) uppercase leading-tight tracking-tight">
          {teacher.name}
        </h3>
        <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold text-(--brand-red) uppercase leading-tight tracking-tight mb-2 sm:mb-3 md:mb-4">
          {teacher.surname}
        </h4>

        {teacher.specialty && (
          <p className="text-xs sm:text-sm leading-relaxed">
            <span className=" text-black">{t("teachers.certificate")}</span>{" "}
            <span className="font-bold text-(--brand-dark)">
              {teacher.specialty}
            </span>
          </p>
        )}

        {teacher.ielts && (
          <p className="text-xs sm:text-sm leading-relaxed">
            <span className="text-black">{t("teachers.ielts_score")}</span>{" "}
            <span className="font-bold text-(--brand-dark)">
              {teacher.ielts}
            </span>
          </p>
        )}

        <p className="text-xs sm:text-sm leading-relaxed">
          <span className="text-black">{t("teachers.experience")}</span>{" "}
          <span className="font-bold text-(--brand-dark)">
            {teacher.experience} {t("teachers.years")}
          </span>
        </p>

        <p className="text-xs sm:text-sm leading-relaxed">
          <span className=" text-black">{t("teachers.results")}</span>{" "}
          <span className="font-bold text-(--brand-dark)">
            {teacher.students}
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <section
      id="teachers"
      className="py-12 sm:py-14 md:py-16 bg-white overflow-hidden"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a2e] text-center">
          {t("teachers.title")}
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* Top Row - Scrolling Left */}
        <div className="relative overflow-hidden py-1">
          <div className="animate-teachers-scroll flex w-max">
            {[0, 1].map((copyIndex) => (
              <div key={`top-copy-${copyIndex}`} className="flex gap-3 sm:gap-4 md:gap-6 pr-3 sm:pr-4 md:pr-6">
                {topRow.map((teacher) => (
                  <TeacherCard
                    key={`top-${copyIndex}-${teacher.name}-${teacher.surname}`}
                    teacher={teacher}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Scrolling Right */}
        <div className="relative overflow-hidden py-1">
          <div className="animate-teachers-scroll-reverse flex w-max">
            {[0, 1].map((copyIndex) => (
              <div key={`bottom-copy-${copyIndex}`} className="flex gap-3 sm:gap-4 md:gap-6 pr-3 sm:pr-4 md:pr-6">
                {bottomRow.map((teacher) => (
                  <TeacherCard
                    key={`bottom-${copyIndex}-${teacher.name}-${teacher.surname}`}
                    teacher={teacher}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
