"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Tasks() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
      if (data) setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading tasks... ⏳</div>;

  return (
    <div className="min-h-screen bg-[#f0f7ff] p-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Available Tasks 📸 {jobs.length}</h1>
      {jobs.length === 0 && <p className="bg-white p-4 rounded-xl text-center">No jobs yet. Post one!</p>}
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl shadow overflow-hidden border">
            {job.image_url ? (
              <img src={job.image_url} alt={job.title} className="w-full h-56 object-cover" />
            ) : (
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-4xl">📷</div>
            )}
            <div className="p-4">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{job.category || "Other"}</span>
              <h3 className="font-bold text-lg mt-2 text-gray-900">{job.title}</h3>
              <p className="text-gray-600 text-sm">📍 {job.location || "Nairobi"}</p>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl font-bold">Apply Now</button>
            </div>
          </div>
        ))}
      </div>
      <Link href="/" className="block text-center mt-6 text-blue-600 font-bold">← Back Home</Link>
    </div>
  );
}
