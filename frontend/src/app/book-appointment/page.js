"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const DEPARTMENTS = [
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dentistry",
  "Eye Care",
  "ENT",
  "Physiotherapy",
];

export default function BookAppointmentPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    date: "",
    time: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setReportFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeFile = () => {
    setReportFile(null);
    setPreviewUrl(null);
    const input = document.getElementById("reportUpload");
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let reportUrl = null;

      if (reportFile) {
        const fileExt = reportFile.name.split(".").pop();
        const fileName = `${Date.now()}-${form.phone}.${fileExt}`;

        const { error } = await supabase.storage
          .from("patient-reports")
          .upload(fileName, reportFile);

        if (error) throw new Error("Failed to upload medical report");

        const { data } = supabase.storage
          .from("patient-reports")
          .getPublicUrl(fileName);

        reportUrl = data.publicUrl;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, reportUrl }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to book appointment");

      setMessage({
        type: "success",
        text: "Appointment request submitted successfully!",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        department: "",
        date: "",
        time: "",
        reason: "",
      });

      removeFile();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Book an Appointment
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
            Schedule your visit with our experienced doctors at your convenience.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-20 bg-gradient-to-b from-white via-green-50 to-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Appointment Details
              </h2>
              <p className="text-gray-600">
                Fill in the details below to request an appointment.
              </p>
            </div>

            {message && (
              <div
                className={`mb-6 text-center px-4 py-3 rounded-lg font-medium ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  name={field}
                  required
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "name"
                      ? "Full Name"
                      : field === "email"
                      ? "Email Address"
                      : "Phone Number"
                  }
                  className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-green-600"
                />
              ))}

              <select
                name="department"
                required
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-green-600"
              />

              <select
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select Time</option>
                {[
                  "09:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                  "12:00 PM",
                  "02:00 PM",
                  "03:00 PM",
                  "04:00 PM",
                  "05:00 PM",
                ].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              {/* FILE UPLOAD */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Medical Report (optional)
                </label>

                <div
                  className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:border-green-500 transition"
                  onClick={() =>
                    document.getElementById("reportUpload").click()
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileSelect(e.dataTransfer.files[0]);
                  }}
                >
                  <input
                    id="reportUpload"
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileSelect(e.target.files[0])
                    }
                  />

                  <div className="text-center">
                    <div className="mx-auto mb-3 text-gray-400 text-3xl">+</div>
                    <p className="text-sm text-gray-600">
                      Drag and drop or{" "}
                      <span className="text-green-600 font-medium underline">
                        browse
                      </span>{" "}
                      your files
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF or Image files only
                    </p>
                  </div>
                </div>

                {previewUrl && (
                  <div className="mt-4 relative inline-block">
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition shadow"
                    >
                      ✕
                    </button>

                    {reportFile?.type.startsWith("image/") ? (
                      <img
                        src={previewUrl}
                        alt="Medical Report Preview"
                        className="max-h-48 rounded-lg border"
                      />
                    ) : (
                      <div className="p-4 border rounded-lg bg-gray-50">
                        <a
                          href={previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-700 underline font-medium"
                        >
                          View uploaded PDF
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <textarea
                name="reason"
                rows={4}
                value={form.reason}
                onChange={handleChange}
                placeholder="Reason for visit (optional)"
                className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-green-600"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {loading ? "Submitting..." : "Submit Appointment Request"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
