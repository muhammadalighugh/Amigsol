// app/blogs/page.js
``
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";

// Client component for search functionality
function BlogSearch({ posts }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <div className="mb-12 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:border-[#8BE31F] focus:ring-2 focus:ring-[#8BE31F]/20 transition-all duration-300"
        />
      </div>

      {/* Blog Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          No posts found. Try a different search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative block"
            >
              <div className="p-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/30 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg hover:shadow-[#8BE31F]/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8BE31F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#8BE31F] group-hover:w-3/4 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#8BE31F]/10 rounded-xl mb-6 group-hover:bg-[#8BE31F]/20 transition-all duration-300">
                    <BookOpen className="h-6 w-6 text-[#8BE31F] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-3 group-hover:text-[#8BE31F] transition-colors duration-300">
                    {post.title}
                  </h2>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="group/btn relative inline-flex items-center px-6 py-3 bg-[#8BE31F] text-black font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#8BE31F]/25 hover:shadow-[#8BE31F]/40 overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                    <span className="relative z-10 flex items-center group-hover/btn:scale-105 transition-transform duration-300">
                      Read More
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

// Server Component for the blog page
export default async function BlogPage() {
  // Fetch posts at build time or runtime
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || "Untitled",
          date: data.date || "1970-01-01",
          excerpt: data.excerpt || "No excerpt available.",
        };
      })
  );

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="relative min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-20 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-black dark:text-white mb-4">
            Our Blog
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Insights, tutorials, and stories from our team. Stay updated with the latest in web development and innovation.
          </p>
        </div>

        {/* Blog Posts with Search */}
        <BlogSearch posts={posts} />
      </div>
    </section>
  );
}