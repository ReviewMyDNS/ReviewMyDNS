export default function LogoPreview() {
  const logos = [
    { num: 1, name: "Blue Globe", file: "/logo-1.svg", color: "Blue with white lines" },
    { num: 2, name: "Green Network", file: "/logo-2.svg", color: "Green with yellow dots" },
    { num: 3, name: "Purple Minimal", file: "/logo-3.svg", color: "Purple outline only" },
    { num: 4, name: "Orange Signal", file: "/logo-4.svg", color: "Orange with signal" },
    { num: 5, name: "Cyan Grid", file: "/logo-5.svg", color: "Cyan with grid" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Choose Your Logo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logos.map((logo) => (
            <div
              key={logo.num}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-4 border-transparent hover:border-blue-500 cursor-pointer transition-all"
              data-testid={`logo-option-${logo.num}`}
            >
              <div className="flex justify-center mb-6">
                <img 
                  src={logo.file} 
                  alt={logo.name}
                  className="w-32 h-32"
                />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                #{logo.num} - {logo.name}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400">
                {logo.color}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Click on your favorite logo, then tell me the number (1-5)
          </p>
        </div>
      </div>
    </div>
  );
}
