import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router';

const Post = () => {
    const sampleItems = [
    {
      id: 1,
      title: "Mountain Sunset",
      description: "A beautiful sunset over the mountains. Perfect for a relaxing evening.",
      tag: "Nature",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=60"
    },
    {
      id: 2,
      title: "City Lights",
      description: "Night skyline with sparkling city lights.",
      tag: "Cities",
      img: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?w=800&q=60"
    },
    {
      id: 3,
      title: "Cozy Workspace",
      description: "A neat desk setup to keep you productive and comfortable.",
      tag: "Work",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60"
    },
    {
      id: 4,
      title: "Forest Path",
      description: "Walk through the calm and quiet of the woods.",
      tag: "Nature",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=60"
    },
    {
      id: 5,
      title: "Beach Vibes",
      description: "Sun, sand and waves — the perfect weekend escape.",
      tag: "Travel",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=60"
    }
  ];

  const items =sampleItems;

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const tags = ["All", ...Array.from(new Set(items.map((i) => i.tag)))];

  const filtered = items.filter((it) => {
    const matchesTag = activeTag === "All" || it.tag === activeTag;
    const matchesQ = [it.title, it.description, it.tag]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesTag && matchesQ;
  });
  return (
   <main className="p-6 max-w-7xl mx-auto">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Cards Gallery</h1>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-3 py-1 rounded-2xl text-sm font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400
                  ${activeTag === t ? "bg-indigo-600 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cards..."
              className="w-56 sm:w-72 px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Search cards"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 text-xs rounded bg-gray-100"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>
          <Link to="/addPost">Add Post</Link>
        </div>
      </header>

      <section className="mb-4 sm:hidden">
        <label className="block text-sm font-medium mb-2">Filter by tag</label>
        <select
          value={activeTag}
          onChange={(e) => setActiveTag(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-200"
        >
          {tags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </section>

      <section>
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-500">No cards found — try a different search or tag.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <article key={item.id} className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow duration-200">
                <div className="relative h-44 sm:h-48 w-full">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold bg-white/80 backdrop-blur">
                    {item.tag}
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm text-gray-500">ID: {item.id}</div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">View</button>
                      <button className="px-3 py-1 text-sm rounded-md border border-gray-200 hover:bg-gray-50">Share</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="mt-8 text-sm text-gray-500">Showing <strong>{filtered.length}</strong> of {items.length} cards</footer>
    </main>
  )
}

export default Post
