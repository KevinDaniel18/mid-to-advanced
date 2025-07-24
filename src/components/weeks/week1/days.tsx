"use client";

import {
  ExternalLink,
  Minus,
  Plus,
  Search,
  CheckSquare,
  Square,
  Trash,
  ListTodo,
} from "lucide-react";
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

export interface TaskProps {
  id?: string;
  text: string;
  check: boolean;
}

export function Week1Day2() {
  const [data, setData] = useState<TaskProps>({
    text: "",
    check: false,
  });
  const { text, check } = data;

  const [task, setTask] = useState<TaskProps[]>([]);
  const newId = () => {
    return (
      "id_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
    );
  };

  function addTaks() {
    if (text.trim() === "") return;
    console.log("text:", text);
    setTask([...task, { id: newId(), text, check }]);
    setData({ ...data, text: "" });
  }

  function deleteTask(id: string) {
    setTask((prev) => prev.filter((t) => t.id !== id));
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTaks();
    }
  }

  const completed = task.filter((t) => t.check).length;
  const total = task.length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Week1Day3
      data={data}
      setData={setData}
      handleKeyPress={handleKeyPress}
      addTaks={addTaks}
      task={task}
      setTask={setTask}
      completed={completed}
      total={total}
      progress={progress}
      deleteTask={deleteTask}
    />
  );
}

type Week1Day3Props = {
  data: TaskProps;
  setData: (data: TaskProps) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addTaks: () => void;
  task: TaskProps[];
  setTask: React.Dispatch<React.SetStateAction<TaskProps[]>>;
  completed: number;
  total: number;
  progress: number;
  deleteTask: (id: string) => void;
};

export function Week1Day3(props: Week1Day3Props | undefined) {
  if (!props || !props.data) {
    return (
      <div className="p-4">
        <p className="text-red-500 mb-2">
          This component receives props from{" "}
          <Link href={"/weeks/1/days/2"}>Week1Day2</Link> component
        </p>
        <pre className="bg-gray-900 text-green-100 p-4 rounded-lg overflow-x-auto text-sm font-mono shadow-md">
          <code>
            {`type Week1Day3Props = {
  data: TaskProps;
  setData: (data: TaskProps) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addTaks: () => void;
  task: TaskProps[];
  setTask: React.Dispatch<React.SetStateAction<TaskProps[]>>;
  completed: number;
  total: number;
  progress: number;
  deleteTask: (id: string) => void;
};

export function Week1Day3(props: Week1Day3Props | undefined) {
  // Logic here...
}`}
          </code>
        </pre>
      </div>
    );
  }

  const {
    data,
    setData,
    handleKeyPress,
    addTaks,
    task,
    setTask,
    completed,
    total,
    progress,
    deleteTask,
  } = props;

  const { text } = data;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <ListTodo className="mr-3 h-6 w-6" />
            Task Manager
          </h2>
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={text}
                onChange={(e) => setData({ ...data, text: e.target.value })}
                onKeyUp={handleKeyPress}
                placeholder="Add a new task..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button
              type="button"
              onClick={addTaks}
              disabled={text.trim() === ""}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {task.length > 0 && (
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm text-gray-600">
                {completed} of {total} tasks completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center mt-2">
              <span className="text-lg font-bold text-green-600">
                {progress}%
              </span>
            </div>
          </div>
        )}

        <div className="max-h-96 overflow-y-auto">
          {task.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <ListTodo className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium mb-1">No tasks yet</p>
              <p className="text-sm">
                Add your first task above to get started!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {task.map(({ id, text, check }, index) => (
                <div
                  key={id}
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 ${
                    check ? "bg-green-50" : ""
                  }`}
                >
                  <div className="flex items-center flex-1">
                    <span className="text-xs text-gray-400 mr-3 w-6">
                      {index + 1}.
                    </span>
                    <p
                      className={`text-sm flex-1 transition-all duration-200 ${
                        check ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {text}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() =>
                        setTask((prev: TaskProps[]) =>
                          prev.map((t) =>
                            t.id === id ? { ...t, check: !t.check } : t
                          )
                        )
                      }
                      className={`p-1 rounded transition-colors duration-200 ${
                        check
                          ? "text-green-600 hover:text-green-700"
                          : "text-gray-400 hover:text-green-600"
                      }`}
                    >
                      {check ? (
                        <CheckSquare className="w-5 h-5" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteTask(id!)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {task.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Total tasks: {total}</span>
              <span>Remaining: {total - completed}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Week1Day4() {
  return (
    <div>
      <p>Coming soon</p>
    </div>
  );
}
