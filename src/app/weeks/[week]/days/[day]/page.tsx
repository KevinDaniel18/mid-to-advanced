"use client";

import { dayComponents } from "@/components/dayComponents";
import { roadmaps } from "@/roadmaps/roadmaps";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DayPage() {
  const { week, day } = useParams();

  const weekIndex = Number(week) - 1;
  const dayIndex = Number(day) - 1;

  const weekData = roadmaps[weekIndex];
  const dayContent = weekData?.days?.[dayIndex];
  const key = `${week}-${day}`;
  const customComponent = dayComponents[key];

  if (!weekData || !dayContent) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Content Not found
        </h1>
        <Link
          href="/"
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          Back to roadmap
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Roadmap
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link
          href={`/weeks/${week}/days/${day}`}
          className="hover:text-amber-600 transition-colors"
        >
          {weekData.week}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-700 font-medium">Day {day}</span>
      </div>

      <div className="mb-8">
        <h1 className="font-bold text-3xl md:text-4xl text-gray-900 mb-2 pb-2 border-b border-gray-200">
          {weekData.week}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <Calendar className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Day {day}: {dayContent.title}
          </h2>
        </div>

        <div className="prose max-w-none text-gray-600 leading-relaxed">
          <p className="text-lg">{dayContent.description}</p>
        </div>
      </div>

      {customComponent && (
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            Today's Exercise
          </h3>
          <div className="mt-4">{customComponent}</div>
        </div>
      )}
    </div>
  );
}
