export default function Stats() {
  const stats = [
    { value: "10+", label: "Years of Experience" },
    { value: "25+", label: "Qualified Doctors" },
    { value: "5k+", label: "Happy Patients" },
    { value: "24/7", label: "Care Support" },
  ];

  return (
    <section className="bg-green-600 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center
                        divide-y md:divide-y-0 md:divide-x divide-green-400">

          {stats.map((item) => (
            <div key={item.label} className="py-8">
              <h3 className="text-4xl font-bold text-white mb-2">
                {item.value}
              </h3>
              <p className="text-green-100 font-medium">
                {item.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
