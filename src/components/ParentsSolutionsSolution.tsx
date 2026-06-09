import {
  type SvgIconComponent
} from "@/components/InlineIcons";
import { useTranslation } from "@/hooks/useTranslation";
import { useContactForm } from "@/context/ContactFormContext";

const HeadphonesIcon: SvgIconComponent = ({ className, ...props }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M30 8.75H10C9.31667 8.75 8.75 8.18333 8.75 7.5C8.75 6.81667 9.31667 6.25 10 6.25H30C30.6833 6.25 31.25 6.81667 31.25 7.5C31.25 8.18333 30.6833 8.75 30 8.75Z" fill="white" />
    <path d="M25 4.5835H15C14.3167 4.5835 13.75 4.01683 13.75 3.3335C13.75 2.65016 14.3167 2.0835 15 2.0835H25C25.6833 2.0835 26.25 2.65016 26.25 3.3335C26.25 4.01683 25.6833 4.5835 25 4.5835Z" fill="white" />
    <path d="M23.1818 27.0166C22.6151 27.0166 22.1484 27.4833 22.1484 28.0499C22.1484 28.6166 22.6151 29.0833 23.1818 29.0833C23.7484 29.0833 24.2151 28.6166 24.2151 28.0499C24.2151 27.4833 23.7484 27.0166 23.1818 27.0166Z" fill="white" />
    <path d="M15.8518 29.5665C15.8518 28.9998 15.3852 28.5498 14.8185 28.5498C14.2518 28.5498 13.7852 29.0165 13.7852 29.5831C13.7852 30.1498 14.2518 30.6165 14.8185 30.6165C15.3852 30.5998 15.8518 30.1331 15.8518 29.5665Z" fill="white" />
    <path d="M29.9987 11.6665H9.9987C6.33203 11.6665 3.33203 14.6665 3.33203 18.3332V29.9998C3.33203 33.6665 6.33203 36.6665 9.9987 36.6665H29.9987C33.6654 36.6665 36.6654 33.6665 36.6654 29.9998V18.3332C36.6654 14.6665 33.6654 11.6665 29.9987 11.6665ZM26.7154 20.7665V28.0498C26.7154 28.0832 26.6987 28.0998 26.6987 28.1332C26.6487 30.0332 25.0987 31.5832 23.182 31.5832C21.232 31.5832 19.6487 29.9998 19.6487 28.0498C19.6487 26.0998 21.232 24.5165 23.182 24.5165C23.5487 24.5165 23.882 24.5832 24.2154 24.6832V22.3998L18.3487 23.9998V29.5498V29.5665C18.3487 31.5165 16.7654 33.0998 14.8154 33.0998C12.8654 33.0998 11.282 31.5165 11.282 29.5665C11.282 27.6165 12.8654 26.0332 14.8154 26.0332C15.182 26.0332 15.5154 26.0998 15.8487 26.1998V23.0332V20.3665C15.8487 18.8832 16.7654 17.6832 18.182 17.3165L22.732 16.0665C24.1987 15.6832 25.0987 16.0665 25.6154 16.4665C26.1154 16.8498 26.7154 17.6332 26.7154 19.1165V20.7665Z" fill="white" />
  </svg>

);

const VolumeIcon: SvgIconComponent = ({ className, ...props }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M30.0005 27.9163C29.7338 27.9163 29.4838 27.833 29.2505 27.6663C28.7005 27.2496 28.5838 26.4663 29.0005 25.9163C31.6171 22.433 31.6171 17.5663 29.0005 14.083C28.5838 13.533 28.7005 12.7496 29.2505 12.333C29.8005 11.9163 30.5838 12.033 31.0005 12.583C34.2671 16.9496 34.2671 23.0496 31.0005 27.4163C30.7505 27.7496 30.3838 27.9163 30.0005 27.9163Z" fill="white" />
    <path d="M33.0512 32.0831C32.7846 32.0831 32.5346 31.9998 32.3012 31.8331C31.7512 31.4165 31.6346 30.6331 32.0512 30.0831C36.5012 24.1498 36.5012 15.8498 32.0512 9.91647C31.6346 9.36647 31.7512 8.58314 32.3012 8.16647C32.8512 7.7498 33.6346 7.86647 34.0512 8.41647C39.1679 15.2331 39.1679 24.7665 34.0512 31.5831C33.8179 31.9165 33.4346 32.0831 33.0512 32.0831Z" fill="white" />
    <path d="M23.3654 6.30035C21.4987 5.26702 19.1154 5.53369 16.682 7.05035L11.8154 10.1004C11.482 10.3004 11.0987 10.417 10.7154 10.417H9.16536H8.33203C4.2987 10.417 2.08203 12.6337 2.08203 16.667V23.3337C2.08203 27.367 4.2987 29.5837 8.33203 29.5837H9.16536H10.7154C11.0987 29.5837 11.482 29.7004 11.8154 29.9004L16.682 32.9504C18.1487 33.867 19.582 34.317 20.9154 34.317C21.782 34.317 22.6154 34.117 23.3654 33.7004C25.2154 32.667 26.2487 30.517 26.2487 27.6504V12.3504C26.2487 9.48369 25.2154 7.33369 23.3654 6.30035Z" fill="white" />
  </svg>
);

const BookIcon: SvgIconComponent = ({ className, ...props }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M11.6654 3.3335H9.9987C4.9987 3.3335 3.33203 6.31683 3.33203 10.0002V11.6668V35.0002C3.33203 36.3835 4.8987 37.1668 5.9987 36.3335L8.8487 34.2002C9.51536 33.7002 10.4487 33.7668 11.0487 34.3668L13.8154 37.1502C14.4654 37.8002 15.532 37.8002 16.182 37.1502L18.982 34.3502C19.5654 33.7668 20.4987 33.7002 21.1487 34.2002L23.9987 36.3335C25.0987 37.1502 26.6654 36.3668 26.6654 35.0002V6.66683C26.6654 4.8335 28.1654 3.3335 29.9987 3.3335H11.6654ZM9.9487 23.3502C9.03203 23.3502 8.28203 22.6002 8.28203 21.6835C8.28203 20.7668 9.03203 20.0168 9.9487 20.0168C10.8654 20.0168 11.6154 20.7668 11.6154 21.6835C11.6154 22.6002 10.8654 23.3502 9.9487 23.3502ZM9.9487 16.6835C9.03203 16.6835 8.28203 15.9335 8.28203 15.0168C8.28203 14.1002 9.03203 13.3502 9.9487 13.3502C10.8654 13.3502 11.6154 14.1002 11.6154 15.0168C11.6154 15.9335 10.8654 16.6835 9.9487 16.6835ZM19.9987 22.9335H14.9987C14.3154 22.9335 13.7487 22.3668 13.7487 21.6835C13.7487 21.0002 14.3154 20.4335 14.9987 20.4335H19.9987C20.682 20.4335 21.2487 21.0002 21.2487 21.6835C21.2487 22.3668 20.682 22.9335 19.9987 22.9335ZM19.9987 16.2668H14.9987C14.3154 16.2668 13.7487 15.7002 13.7487 15.0168C13.7487 14.3335 14.3154 13.7668 14.9987 13.7668H19.9987C20.682 13.7668 21.2487 14.3335 21.2487 15.0168C21.2487 15.7002 20.682 16.2668 19.9987 16.2668Z" fill="white" />
    <path d="M30.018 3.3335V5.8335C31.118 5.8335 32.168 6.2835 32.9346 7.0335C33.7346 7.85016 34.168 8.90016 34.168 10.0002V14.0335C34.168 15.2668 33.618 15.8335 32.368 15.8335H29.168V6.6835C29.168 6.21683 29.5513 5.8335 30.018 5.8335V3.3335ZM30.018 3.3335C28.168 3.3335 26.668 4.8335 26.668 6.6835V18.3335H32.368C35.0013 18.3335 36.668 16.6668 36.668 14.0335V10.0002C36.668 8.16683 35.918 6.50016 34.718 5.2835C33.5013 4.0835 31.8513 3.35016 30.018 3.3335C30.0346 3.3335 30.018 3.3335 30.018 3.3335Z" fill="white" />
  </svg>

);

const EditIcon: SvgIconComponent = ({ className, ...props }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M26.6654 3.3335H13.332C6.66536 3.3335 3.33203 6.66683 3.33203 13.3335V35.0002C3.33203 35.9168 4.08203 36.6668 4.9987 36.6668H26.6654C33.332 36.6668 36.6654 33.3335 36.6654 26.6668V13.3335C36.6654 6.66683 33.332 3.3335 26.6654 3.3335ZM18.5154 27.7668C18.0987 28.1835 17.332 28.5668 16.7654 28.6502L13.2987 29.1335C13.1654 29.1502 13.032 29.1668 12.9154 29.1668C12.332 29.1668 11.7987 28.9668 11.4154 28.5835C10.9487 28.1168 10.7487 27.4335 10.8654 26.7002L11.3487 23.2335C11.432 22.6668 11.8154 21.8835 12.232 21.4835L18.5154 15.2002C18.6154 15.5002 18.7487 15.8002 18.8987 16.1335C19.0487 16.4335 19.1987 16.7335 19.3654 17.0168C19.4987 17.2502 19.6487 17.4835 19.782 17.6502C19.9487 17.9002 20.1154 18.1168 20.232 18.2335C20.2987 18.3335 20.3654 18.4002 20.382 18.4335C20.7487 18.8502 21.132 19.2502 21.4987 19.5502C21.5987 19.6502 21.6654 19.7002 21.682 19.7168C21.8987 19.8835 22.0987 20.0668 22.2987 20.1835C22.5154 20.3502 22.7487 20.5002 22.982 20.6335C23.2654 20.8002 23.5654 20.9668 23.882 21.1168C24.1987 21.2668 24.4987 21.3835 24.7987 21.4835L18.5154 27.7668ZM27.582 18.7168L26.282 20.0168C26.1987 20.1002 26.082 20.1502 25.9654 20.1502C25.932 20.1502 25.8654 20.1502 25.832 20.1335C22.9654 19.3168 20.682 17.0335 19.8654 14.1668C19.8154 14.0168 19.8654 13.8502 19.982 13.7335L21.2987 12.4168C23.4487 10.2668 25.482 10.3168 27.582 12.4168C28.6487 13.4835 29.182 14.5168 29.1654 15.5835C29.1654 16.6335 28.6487 17.6502 27.582 18.7168Z" fill="white" />
  </svg>

)

type SolutionTrait = {
  title: string;
  description: string;
  icon: SvgIconComponent;
};

const getSolutionTraits = (t: (key: string) => string): SolutionTrait[] => [
  {
    title: t("parents_solutions.solutions[0].title"),
    description: t("parents_solutions.solutions[0].description"),
    icon: VolumeIcon,
  },
  {
    title: t("parents_solutions.solutions[1].title"),
    description: t("parents_solutions.solutions[1].description"),
    icon: HeadphonesIcon,
  },
  {
    title: t("parents_solutions.solutions[2].title"),
    description: t("parents_solutions.solutions[2].description"),
    icon: BookIcon,
  },
  {
    title: t("parents_solutions.solutions[3].title"),
    description: t("parents_solutions.solutions[3].description"),
    icon: EditIcon,
  },
];

export default function ParentsSolutionsSolution() {
  const { t } = useTranslation();
  const { openForm } = useContactForm();
  const solutionTraits = getSolutionTraits(t);
  return (
    <section className="w-full bg-white px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
      <div className="mx-auto w-full max-w-360 rounded-[30px] bg-(--brand-red) px-5 pb-8 pt-8 sm:rounded-[40px] sm:px-8 sm:pb-12 sm:pt-11 lg:px-12 lg:pb-13 lg:pt-10">
         <div className="text-center text-white">
           <h2 className="text-3xl font-extrabold leading-[1.06] md:text-4xl lg:text-5xl">
             {t("parents_solutions.solutions_title")}
           </h2>
           <p className="mt-4 text-sm sm:text-base lg:text-base">
             {t("parents_solutions.solutions_intro")}
           </p>
         </div>

        <div className="mt-8 grid w-full grid-cols-1 gap-5 px-8 sm:mt-10 sm:grid-cols-2 sm:gap-6 sm:px-14 lg:mt-12 lg:gap-8 lg:px-24">
          {solutionTraits.map((trait) => {
            const Icon = trait.icon;

            return (
              <article
                key={trait.title}
                className="w-full min-h-42.5 rounded-[28px] bg-white px-5 pb-6 pt-5 sm:min-h-50 sm:rounded-[36px] sm:px-6 sm:pb-7 sm:pt-6 lg:px-7"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-(--brand-red) text-white sm:h-13.5 sm:w-13.5">
                    <Icon
                      className="h-8 w-8 sm:h-9 sm:w-9"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="text-xl font-bold leading-none text-(--brand-red) sm:text-2xl lg:text-[32px]">
                    {trait.title}
                  </h3>
                </div>

                <p className="mt-4 max-w-[20ch] text-base font-semibold leading-[1.2] text-(--brand-dark) sm:text-lg lg:text-[20px]">
                  {trait.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-360 flex-col gap-5 rounded-[28px] border border-[#00192D] bg-white px-6 py-6 sm:mt-10 sm:flex-row sm:items-center sm:gap-8 sm:px-8 sm:py-7 lg:px-10">
        <div className="sm:basis-1/2">
          <p className="text-xl font-medium leading-[1.15] text-(--brand-dark) sm:text-2xl lg:text-[32px]">
            {t("parents_solutions.question")}
          </p>
        </div>

        <div className="sm:flex sm:basis-1/2 sm:justify-end">
          <button
            type="button"
            onClick={openForm}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-(--brand-red) px-6 text-lg font-semibold text-white transition-all hover:scale-[1.01] active:scale-[0.99] sm:w-auto sm:min-w-[320px] sm:px-10"
          >
            {t("parents_solutions.info_button")}
          </button>
        </div>
      </div>
    </section>
  );
}
