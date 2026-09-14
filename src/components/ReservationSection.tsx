"use client";

import { useState, useMemo } from "react";
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { HiCheck, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const TIME_SLOTS = [
  "8:00", "8:15", "8:30", "8:45",
  "9:00", "9:15", "9:30", "9:45",
  "10:00", "10:15", "10:30", "10:45",
  "11:00", "11:15", "11:30", "11:45",
  "14:00", "14:15", "14:30", "14:45",
  "15:00", "15:15", "15:30", "15:45",
  "16:00", "16:15", "16:30", "16:45",
];

const DAY_NAMES = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

function formatTime(t: string) {
  const [h, m] = t.split(":");
  const hour = parseInt(h);
  return `${hour}h${m}`;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getAvailableSlots(dayOfWeek: number) {
  if (dayOfWeek === 0) return [];
  if (dayOfWeek === 6) return TIME_SLOTS.slice(0, 8);
  return TIME_SLOTS;
}

export default function ReservationSection() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "form" | "success">("calendar");
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", telephone: "", message: "" });

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [firstDayOfWeek, daysInMonth]);

  function isDatePast(day: number) {
    const d = new Date(currentYear, currentMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  }

  function isSunday(day: number) {
    return new Date(currentYear, currentMonth, day).getDay() === 0;
  }

  function handleDateClick(day: number) {
    if (isDatePast(day) || isSunday(day)) return;
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setSelectedTime(null);
  }

  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  }

  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  }

  function handleConfirm() {
    setStep("form");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("success");
  }

  const selectedDayOfWeek = selectedDate ? selectedDate.getDay() : -1;
  const availableSlots = selectedDate ? getAvailableSlots(selectedDayOfWeek) : [];

  return (
    <section id="reservation" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-1.5 text-sm font-medium text-blue-700 mb-4">
            <FaCalendarAlt className="text-sm" />
            Réservation
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Réservez votre <span className="text-blue-600">consultation</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Appel gratuit de 15 min · Sans engagement · Choisissez un créneau
          </p>
        </div>

        {step === "calendar" && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-[480px]">

              <div className="bg-gray-50 p-5 border-r border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                    <HiChevronLeft size={18} />
                  </button>
                  <span className="font-bold text-sm text-gray-900">
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </span>
                  <button onClick={nextMonth} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                    <HiChevronRight size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-0.5 mb-2">
                  {DAY_NAMES.map(d => (
                    <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5">
                  {calendarDays.map((day, i) => {
                    if (day === null) return <div key={`empty-${i}`} />;
                    const past = isDatePast(day);
                    const sunday = isSunday(day);
                    const disabled = past || sunday;
                    const isSelected = selectedDate &&
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === currentMonth &&
                      selectedDate.getFullYear() === currentYear;
                    const isToday = day === today.getDate() &&
                      currentMonth === today.getMonth() &&
                      currentYear === today.getFullYear();

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        disabled={disabled}
                        className={`
                          w-full aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all cursor-pointer
                          ${disabled ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-blue-100"}
                          ${isSelected ? "!bg-blue-600 !text-white shadow-md" : ""}
                          ${isToday && !isSelected ? "ring-2 ring-blue-400 font-bold" : ""}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                      <FaCalendarAlt className="text-blue-500" />
                      {selectedDate.getDate()} {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600 mt-1">
                      <FaClock />
                      {availableSlots.length} créneaux disponibles
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">
                {!selectedDate ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <FaCalendarAlt size={40} className="mb-3 opacity-30" />
                    <p className="text-sm">Sélectionnez une date dans le calendrier</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <FaClock className="text-blue-500" />
                      <h3 className="font-bold text-gray-900">
                        {selectedDate.getDate()} {MONTH_NAMES[selectedDate.getMonth()]}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {DAY_NAMES[selectedDayOfWeek]}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`
                            py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer
                            ${selectedTime === slot
                              ? "border-blue-500 bg-blue-600 text-white shadow-md"
                              : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                            }
                          `}
                        >
                          {formatTime(slot)}
                        </button>
                      ))}
                    </div>

                    {selectedTime && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {selectedDate.getDate()} {MONTH_NAMES[selectedDate.getMonth()]} à {formatTime(selectedTime)}
                          </p>
                          <p className="text-xs text-gray-500">Durée : 15 minutes</p>
                        </div>
                        <button
                          onClick={handleConfirm}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg cursor-pointer"
                        >
                          Confirmer →
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {step === "form" && selectedDate && selectedTime && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-lg mx-auto">
            <button onClick={() => setStep("calendar")} className="text-sm text-blue-600 hover:underline mb-4 cursor-pointer">
              ← Retour au calendrier
            </button>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <FaCalendarAlt className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {selectedDate.getDate()} {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">{formatTime(selectedTime)} · 15 min</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">Vos informations</h3>
            <p className="text-sm text-gray-500 mb-6">Remplissez vos coordonnées pour confirmer le rendez-vous.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Prénom <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      required
                      value={form.prenom}
                      onChange={(e) => setForm(f => ({ ...f, prenom: e.target.value }))}
                      className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Jean"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Nom <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      required
                      value={form.nom}
                      onChange={(e) => setForm(f => ({ ...f, nom: e.target.value }))}
                      className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Dupont"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="jean@exemple.fr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Téléphone <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                  <input
                    type="tel"
                    required
                    value={form.telephone}
                    onChange={(e) => setForm(f => ({ ...f, telephone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Message (optionnel)
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Décrivez brièvement votre projet..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg cursor-pointer"
              >
                Confirmer ma réservation
              </button>
              <p className="text-[10px] text-gray-400 text-center">
                En confirmant, vous acceptez d&apos;être contacté par nos services.
              </p>
            </form>
          </div>
        )}

        {step === "success" && selectedDate && selectedTime && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 max-w-lg mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <HiCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Réservation confirmée !</h3>
            <p className="text-gray-500 mb-6">
              Votre rendez-vous du{" "}
              <strong>{selectedDate.getDate()} {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getFullYear()}</strong>{" "}
              à <strong>{formatTime(selectedTime)}</strong> a bien été enregistré.
            </p>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mb-6">
              <p className="text-sm text-blue-800">
                Nous vous enverrons un rappel par email et téléphone avant le rendez-vous.
              </p>
            </div>
            <button
              onClick={() => { setStep("calendar"); setSelectedDate(null); setSelectedTime(null); setForm({ prenom: "", nom: "", email: "", telephone: "", message: "" }); }}
              className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer"
            >
              Réserver un autre créneau
            </button>
          </div>
        )}
      </div>
    </section>
  );
}