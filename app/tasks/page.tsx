"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Tasks() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase.from("jobs").select("*").order("created_at", {ascending: false});
      if (data) setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const applyWhatsApp = (job: any) => {
    const myNumber = "254116982197";
    const price = job.budget || job.price || job.amount || "Negotiable";
    const loc = job.location || "Kenya";
    const message = `Habari Taskmate! 👋%0A%0ANataka ku-apply:%0A*${job.title}*%0A📍 ${loc}%0A💰 KES ${price}%0A%0AJina langu ni: `;
    window.open(`https://wa.me/${myNumber}?text=${message}`, "_blank");
  };

  if (loading) return <div className="p-6 text-center">Loading tasks...</div>;

  return (
    <div className="min-h-screen bg-[#f0f7ff] p-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Available Tasks</h1>
      {jobs.length === 0 && <p className="bg-white p-4 rounded-xl">No tasks yet. Post one!</p>}
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-4 rounded-2xl shadow border border-blue-50">
            <h3 className="font-bold text-lg">{job.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{job.description}</p>
            <p className="mt-2 font-medium">📍 {job.location || "Kenya"} | 💰 KES {job.budget || job.price || job.amount || "Negotiable"}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => applyWhatsApp(job)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-bold">
                Apply via WhatsApp
              </button>
              <Link href={`/tasks/${job.id}`} className="px-4 py-2 bg-gray-100 rounded-xl text-center">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
