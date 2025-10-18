import Link from "next/link";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/40 mb-6">
          <FiAlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-darkest dark:text-slate-100 mb-4">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Food Not Found
        </h2>

        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The food item you&apos;re looking for doesn&apos;t exist or has been
          removed from our menu.
        </p>

        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 bg-main hover:bg-main/90 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to Menu
        </Link>
      </div>
    </div>
  );
}
