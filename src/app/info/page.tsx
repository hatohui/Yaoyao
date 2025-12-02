"use client";
import React from "react";
import { useTranslations } from "next-intl";

const InfoPage = () => {
  const t = useTranslations("info");

  return (
    <div className="min-h-screen pt-14 sm:pt-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800 dark:text-white">
            {t("restaurantName")}
          </h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t("restaurantType")}
          </p>

          <div className="space-y-6">
            {/* Address */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-main"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {t("address")}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 ml-8">
                43, Jln SS 15/4E, Ss 15, 47500 Subang Jaya, Selangor, Malaysia
              </p>
            </div>

            {/* Phone */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-main"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {t("phone")}
              </h2>
              <a
                href="tel:+60356210966"
                className="text-main hover:text-main/80 ml-8 inline-block"
              >
                +60 3-5621 0966
              </a>
            </div>

            {/* Hours */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-main"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t("hours")}
              </h2>
              <div className="ml-8 space-y-1">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {t("open")}
                  </span>{" "}
                  · {t("closes")} 3 PM
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("reopens")} 5:30 PM
                </p>
              </div>
            </div>

            {/* Map Link */}
            <div className="pt-4">
              <a
                href="https://www.google.com/maps/place/gao+ren+guan/data=!4m2!3m1!1s0x31cc4c5ec9704261:0x6a014e46a9806b8c?sa=X&ved=1t:242&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-main hover:bg-main/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                {t("viewOnMap")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
