"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PostTaskPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Cleaning");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handlePost = async () => {
    if (!title) { setMsg("Add title!"); return; }
    setLoading(true);
    try {
      let imageUrl = null;
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage.from("job-images").upload(fileName, image);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("job-images").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }
      const { error } = await supabase.from("jobs").insert([{ title, location, category, image_url: imageUrl }]);
      if (error) throw error;
      setMsg("✅ Job posted with photo! Check Tasks page!");
      setTitle(""); setLocation(""); setImage(null);
    } catch (e: any) {
      setMsg("Error: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] p-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Post a Task + Photo 📸</h1>

      <div className="bg-white p-4 rounded-2xl shadow">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Job Title - e.g. Clean my house" className="w-full border p-3 rounded-xl mb-3" />
        <input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location - e.g. Westlands" className="w-full border p-3 rounded-xl mb-3" />
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full border p-3 rounded-xl mb-3">
          <option>Cleaning</option><option>Delivery</option><option>Repairs</option><option>Plumbing</option><option>Construction</option><option>Electrical</option><option>Tutoring</option><option>Other</option>
        </select>

        <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 mb-3 text-center">
          <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files?.[0] || null)} className="w-full" />
          <p className="text-sm text-gray-500 mt-2">Tap to add photo of job (from camera)</p>
          {image && <p className="text-green-600 text-sm mt-1">Selected: {image.name}</p>}
        </div>

        <button onClick={handlePost} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
          {loading? "Posting..." : "Post Job with Photo"}
        </button>
        {msg && <p className="mt-3 text-center font-bold">{msg}</p>}
      </div>
    </div>
  );
}
