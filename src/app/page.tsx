'use client';

import { useState } from 'react';
import { Firefighter } from '@/types/firefighter';

export default function SearchFirefighters() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Firefighter[]>([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/search?q=${query}`);
    const data: Firefighter[] = await res.json();
    setResults(data);
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-96 overflow-y-scroll">
        <div className="shadow">
          <form onSubmit={handleSearch} className="flex flex-col p-8 space-y-4">
            <span className="text-lg">Search by name, forest, or unit type</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ex. LPF"
              className="border p-2 rounded"
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Forest</th>
              <th className="px-4 py-2 text-left">Unit Type</th>
              <th className="px-4 py-2 text-left">Unit Number</th>
            </tr>
          </thead>
          <tbody>
            {results.map((firefighter) => (
              <tr key={firefighter.name + firefighter.forest + firefighter.unit_type}>
                <td className="border px-4 py-2">{firefighter.forest}</td>
                <td className="border px-4 py-2">{firefighter.unit_type}</td>
                <td className="border px-4 py-2">{firefighter.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
