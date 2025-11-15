export default function AboutPage() {
  const founders = [
    {
      name: "Dara Adedeji",
      role: "Co-Founder",
      img: "https://api.dicebear.com/7.x/shapes/svg?seed=Daniel",
      link: "https://www.linkedin.com/in/dara-adedeji-ba4047241/"
    },
    {
      name: "Aidan Barbosa",
      role: "Co-Founder",
      img: "https://api.dicebear.com/7.x/shapes/svg?seed=Alex",
      link: "https://www.linkedin.com/in/aidanbarbosa/"
    },
    {
      name: "Noah Morra",
      role: "Co-Founder",
      img: "https://api.dicebear.com/7.x/shapes/svg?seed=Maya",
      link: "https://www.linkedin.com/in/noah-morra-920a88272/"
    },
    {
      name: "Daniel Gao",
      role: "Co-Founder",
      img: "https://api.dicebear.com/7.x/shapes/svg?seed=Chris",
      link: "https://www.linkedin.com/in/danielhgao/"
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      {/* Mission Statement */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text mb-6">
          Our Mission
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          HelpDeskHero is built to revolutionize how IT professionals learn,
          practice, and grow.  
          We believe hands-on experience is the best way to master real-world
          support challenges — from troubleshooting networks to resolving
          software issues.  
          Our goal is to create the <span className="font-bold text-teal-300">#1 platform for Help Desk training</span> by
          offering realistic scenarios, deep skill development, and a fun,
          competitive learning system.
        </p>
      </section>

      {/* Founders Section */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          Meet the Founders
        </h2>

        <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-4 gap-10">
          {founders.map((f) => (
            <a
              key={f.name}
              href={f.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-teal-400/40 hover:shadow-[0_0_12px_#14b8a6] transition-all text-center block"
            >
              <img
                src={f.img}
                alt={f.name}
                className="w-24 h-24 mx-auto mb-4 rounded-full border border-teal-300/30 shadow-[0_0_12px_#14b8a6]"
              />

              <h3 className="text-xl font-semibold text-white">{f.name}</h3>
              <p className="text-teal-300 mt-1 text-sm">{f.role}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
