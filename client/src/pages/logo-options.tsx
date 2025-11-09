export default function LogoOptions() {
  const logos = [
    { 
      num: 1, 
      name: "Earth Photo 1", 
      file: "/blob-1.jpg", 
      desc: "Real NASA Earth from space photograph"
    },
    { 
      num: 2, 
      name: "Earth Photo 2", 
      file: "/blob-2.jpg", 
      desc: "Actual Blue Marble space photo"
    },
    { 
      num: 3, 
      name: "Earth Photo 3", 
      file: "/blob-3.jpg", 
      desc: "Authentic satellite Earth image"
    },
    { 
      num: 4, 
      name: "Earth Photo 4", 
      file: "/blob-4.jpg", 
      desc: "Real planet Earth photograph"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Choose Your Earth Logo
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Pick your favorite colorful Earth design
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {logos.map((logo) => (
            <div
              key={logo.num}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 border-4 border-transparent hover:border-blue-500 hover:scale-105 cursor-pointer transition-all duration-300"
              data-testid={`earth-logo-${logo.num}`}
            >
              <div className="flex justify-center mb-8 bg-gray-100 dark:bg-gray-700 rounded-xl p-8">
                <img 
                  src={logo.file} 
                  alt={logo.name}
                  className="w-40 h-40"
                />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                  Option {logo.num}
                </h2>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {logo.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-base">
                  {logo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Which one do you like?
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tell me: "Use option 1" or "Use option 2" (etc.)
          </p>
        </div>
      </div>
    </div>
  );
}
