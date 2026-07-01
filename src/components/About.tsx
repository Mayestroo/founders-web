import { useTranslation } from "@/hooks/useTranslation";

export default function About() {
  const { t } = useTranslation();
  return (
    <section
      className="w-full -mt-12 sm:-mt-16 pt-24 sm:pt-32 pb-12 sm:pb-16"
      style={{
        background:
          "linear-gradient(to bottom, #FFFFFF 0%, #FFE6EB 16%, #FFE6EB 100%)",
      }}
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 md:px-8">
        {/* Header with title and button */}
        <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-[#00192D] sm:text-4xl md:text-5xl">
            {t("about.title")}
          </h2>
        </div>

        {/* Video Placeholder */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-gray-800 to-gray-900 shadow-xl">
          <div className="flex h-full items-center justify-center">
            <iframe
              className="h-full aspect-9/16 border-0"
              src="https://www.youtube.com/embed/pYUODvHxBZQ"
              title="☀️Founders Schoolda Yozgi Qabul Ochiq!  #rek"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
