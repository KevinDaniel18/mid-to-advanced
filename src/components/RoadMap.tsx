import { RoadMapTableProps } from "@/types/RoadMapTypes";
import { BookOpen, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RoadMap({ weeks }: RoadMapTableProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="b-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <BookOpen className="mr-3 h-6 w-6" />
            Learning RoadMap
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-700 w-1/4">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    Week
                  </div>
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 w-1/4">
                  Day
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 w-1/2">
                  Content
                </th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((weekObj, weekIndex) =>
                weekObj.days.map((day, dayIndex) => (
                  <tr
                    key={`week-${weekIndex}-day-${dayIndex}`}
                    className={`
                    border-b border-gray-100 hover:bg-amber-50 transition-colors duration-200
                    ${dayIndex === 0 ? "border-t-2 border-t-amber-200" : ""}
                  `}
                  >
                    <td className="p-4 align-top">
                      {dayIndex === 0 && (
                        <div className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg font-medium text-sm inline-block">
                          {weekObj.week}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-medium text-gray-800 mb-1">
                        Day {dayIndex + 1}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {day.title}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <Link
                        href={`/weeks/${weekIndex + 1}/days/${dayIndex + 1}`}
                        className="group block"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-gray-70 leading-relaxed group-hover:text-amber-700 transition-colors duration-200 flex-1 pr-2">
                            {day.description}
                          </p>
                          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-amber-600 transition-colors duration-200 flex-shrink-0 mt-0.5" />
                        </div>
                        <div className="mt-2 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transitio-opacity duration-200">
                          Click to view details
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Total: {weeks.reduce((total, week) => total + week.days.length, 0)}{" "}
            days across {weeks.length} weeks
          </p>
        </div>
      </div>
    </div>
  );
}
