import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./Styles.css";
import { Footer } from "../components/Footer";

const data = {
  1: {
    title: "Compiler",
    body: "Elevate your coding with CodeBase's Compiler. Swift code compilation, real-time error detection, and support for 46 languages make it your versatile coding companion. Enjoy seamless collaboration, a user-friendly interface, and AI insights for enhanced coding precision. Revolutionize your coding journey with CodeBase",
    link: "/compiler",
  },
  2: {
    title: "Web Editor",
    body: "Experience instant creativity with CodeBase's Real-Time Web Editor. Edit HTML, CSS, and JS seamlessly, and witness changes reflected instantly in the live preview. Effortless, collaborative, and precise coding at your fingertips. Elevate your web development game with CodeBase",
    link: "/web",
  },
  3: {
    title: "SVG Editor",
    body: "Dive into seamless graphic design workflows with CodeBase's SVG Editor. Enjoy real-time editing, witness changes instantly, and elevate your design precision. Effortlessly upload, rename, and download SVG files, ensuring a streamlined creative process. Make your mark in graphic design with CodeBase",
    link: "/svg",
  },
};

function Image({ id }) {
  const { body, title, link } = data[id];

  return (
    <section
      key={id}
      className="h-[100vh] flex justify-center items-center relative"
    >
      <div className="w-full h-full relative max-h-[90vh] m-5 bg-white overflow-hidden">
        <div className="flex justify-center items-center bottom-0 h-[100%] w-[100%] gap-10">
          <div className="w-3/5 h-1/3 flex justify-center items-center ">
          <img
            className="object-fill border-2"
            src={`/homeImages/${id}.png`}
            alt={`Component Screenshot ${id}`}
          />
          </div>
          <div className="flex h-fit flex-col w-1/3">
          <h2 className="m-0 text-purple-700 text-[56px] font-[700] tracking-[-3px] leading-[1.2] ">
            {title}
          </h2>
          <p>{body}</p>
          <a href={link} className="text-lg font-medium italic flex gap-2 mt-5 items-center">Go to {title}
          <img src="/externalLink.svg" alt="icon" className="w-5 h-5"/></a>
          </div>
        </div>
      </div>
    </section>
  );
}

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <div className="h-[80vh] w-full flex lg:flex-row flex-col justify-center items-center px-20">
        <div className="lg:w-1/3">
          <h3 className="text-3xl font-bold">Welcome to</h3>
          <h1 className="lg:text-7xl text-5xl text-purple-700">Code-Base</h1>
        </div>
        <p className="lg:w-1/3 font-medium text-lg">
          Your all-in-one solution for streamlined and efficient programming!
          Our platform is designed to empower developers by providing support
          for a diverse range of programming languages, making it the ideal tool
          for coders working across various projects.
        </p>
      </div>
      {[1, 2, 3].map((image) => (
        <Image key={image} id={image} />
      ))}
      <motion.div
        className="fixed left-0 right-0 h-[5px] bg-purple-700 bottom-[100px]"
        style={{ scaleX }}
      />
      <Footer />
    </>
  );
};

export default Home;
