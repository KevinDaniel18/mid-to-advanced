"use client";

import { ExternalLink, Minus, Plus, Search } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Show {
  id: number;
  url: string;
  name: string;
  image?: {
    medium?: string;
  };
  genres?: string[];
}

interface ResultItem {
  show: Show;
}

export function Week1Day1() {
  const [counter, setCounter] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);

  function increment() {
    setCounter((i) => i + 1);
  }
  function decrement() {
    if (counter > 0) {
      setCounter((i) => i - 1);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      async function search() {
        if (!query) return;
        try {
          const api = await fetch(
            `https://api.tvmaze.com/search/shows?q=${query}`
          );
          const json = await api.json();

          setResults(json);
        } catch (error) {
          console.error(error);
        }
      }
      search();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);
  return (
    <div className=" max-w-4xl mx-auto p-6">
      <div className=" grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold">Interactive Counter</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl font-bold text-amber-500">{counter}</div>
              <div className="flex gap-3">
                <button
                  onClick={decrement}
                  disabled={counter === 0}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  onClick={increment}
                  className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center transition-colors hover:bg-amber-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-xl font-semibold">TV Show Search</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for a TV show..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              {query && (
                <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {results.length > 0 ? (
                    results.map(({ show }) => (
                      <div
                        key={show.id}
                        className="flex gap-3 p-3 border rounded-lg hover:bg-amber-50 transitions-colors"
                      >
                        <div className="flex-shrink-0 w-16 h-20">
                          {show.image?.medium ? (
                            <img
                              src={show.image.medium || "/placeholder.svg"}
                              alt={show.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{show.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {show.genres?.slice(0, 2).map((genre, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                          <Link
                            href={show.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-2 text-xs text-amber-600 hover:text-amber-800"
                          >
                            View details{" "}
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No results found for "{query}"</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Week1Day2() {
  return (
    <div>
      <p>coming soon</p>
    </div>
  );
}
