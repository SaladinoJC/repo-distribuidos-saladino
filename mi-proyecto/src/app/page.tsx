import Image from "next/image";
export default function Home() {
  const Header = () => (
    
    <header className="bg-blue-900 text-white p-6 shadow-md">
      <Image 
      src="/imagen.png" 
      alt="Mi foto" 
      width={80} 
      height={80} 
      className="rounded-full"
    />
    <div>
      <h1 className="text-3xl font-bold">Los Nintendo, Sega, Playstation Whatever</h1>
      <p className="text-lg">
        socotroco | piringundin
      </p>
      </div>
    </header>
  );

  const About = () => (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-2">Hay 2 epilepsias</h2>
      <p>
        Una es {" "}
        <strong>ENFERMEDAD</strong> y otra que es  <strong>DEMONIO</strong>.  
        Daño Cerebral Permanente. El Mal te posee. Agarralo bien Broder.
      </p>
    </section>
  );

  const Skills = () => {
    const skills = ["Epilepsia", "Ebilepsia", "Embipelsia", "Esipelbia", "Ebipelsia", "Episielba"];
    return (
      <section className="p-6 bg-gray-100 rounded-md my-4">
        <h2 className="text-2xl font-semibold mb-2 text-black">Diselxia</h2>
        <ul className="list-disc pl-6 text-black">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    );
  };

  const Projects = () => (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-2">Chirrinchi</h2>
      <article className="mb-4">
        <h3 className="text-xl font-bold">Si</h3>
        <p>
          42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 42 
        </p>
      </article>
      <article>
        <h3 className="text-xl font-bold">No</h3>
        <p>
          Compotera
        </p>
      </article>
    </section>
  );

  const Footer = () => (
    <footer className="bg-gray-800 text-white text-center p-4 mt-6">
      <p>© 2025 Menem lo hizo | Aguante el tang de uva</p>
    </footer>
  );

  return (
    <main className="font-sans">
      <Header />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </main>
  );
}
