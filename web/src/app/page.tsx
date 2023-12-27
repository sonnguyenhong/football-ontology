/* eslint-disable @next/next/no-img-element */
"use client";

import { SearchResultItem } from "@/actions/data-types";
import { querier } from "@/actions/querier";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[] | null>(null);

  const handleSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    try {
      setLoading(true);
      setSearchResults(null);
      const res = await querier.search(search);
      console.log(res);
      setSearchResults(res);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-medium text-center mb-5">Football search</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={search}
            onChange={(ev) => {
              setSearch(ev.target.value);
            }}
            className="px-4 border border-solid border-indigo-500	py-2 rounded w-full"
            placeholder="Enter player's name, league, country, continent..."
          />
          <div className="text-center mt-4">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded w-[120px] disabled:opacity-75 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Search
            </button>
          </div>
        </div>
      </form>
      {loading && (
        <div className="py-5">
          <p>Searching...</p>
        </div>
      )}
      {searchResults && (
        <div className="mt-5 border-t border-solid border-gray-300">
          {searchResults.length === 0 && (
            <p className="mt-5 text-gray-500 text-lg font-medium">Oops! Search not found.</p>
          )}
          {searchResults.length > 0 && (
            <>
              <p className="mb-5 mt-4">{searchResults.length} result(s) found</p>
              <ul>
                {searchResults.map((item) => (
                  <li key={item.resource} className="py-3 flex flex-row justify-between gap-4">
                    <div>
                      <Link href={item.resource} className="text-xl hover:underline text-sky-600">
                        <p dangerouslySetInnerHTML={{ __html: item.hl }} />
                      </Link>
                      {item.description && (
                        <p className="text-sm text-gray-500">
                          {item.description.substring(0, 200)}
                          {item.description.length > 100 ? "..." : ""}
                        </p>
                      )}
                    </div>
                    {item.img && (
                      <div className="min-w-[100px] w-[100px]">
                        <img src={item.img} alt="image" width={"100%"} height={"auto"} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
}
