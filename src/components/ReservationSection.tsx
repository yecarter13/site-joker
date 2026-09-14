"use client";

import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";

const CALENDAR_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3PugDxHG0Rh7gmf1Ozgz1fQeapOiRXmUb2ccCWZw6vWHt_WuGd1wKQHQMoQNXLRBbEr5QOPE1W";

export default function ReservationSection() {
  return (
    <section id="reservation" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />

          <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-1.5 text-sm font-medium text-blue-700 mb-6">
            <FaCalendarAlt className="text-sm" />
            Réservation
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Réservez votre <span className="text-blue-600">consultation</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
            Planifiez un appel avec un de nos experts pour discuter de votre projet et trouver la meilleure solution.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><HiCheck className="text-green-500" /> Appel gratuit de 15 min</span>
            <span className="flex items-center gap-1.5"><HiCheck className="text-green-500" /> Sans engagement</span>
            <span className="flex items-center gap-1.5"><HiCheck className="text-green-500" /> Réponse sous 24h</span>
          </div>

          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
          >
            <FaCalendarAlt className="text-lg" />
            Réserver un créneau
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="text-xs text-gray-400 mt-6">
            Choisissez le créneau qui vous convient directement sur Google Calendar.
          </p>
        </div>
      </div>
    </section>
  );
}