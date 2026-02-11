import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import LeetCodeStats from "@/components/LeetCodeStats";

const aboutStats = [
  { label: "DSA Problems Solved", value: "400+" },
  { label: "Projects", value: "5+" },
  { label: "Internships", value: "2" },
];

const education = [
  {
    institution: "Indian Institute of Information Technology Sonepat",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "Aug 2023 - May 2027*",
  },
];

const experience = [
  {
    title: "Machine Learning Research Intern",
    company: "National Institute of Technology, Calicut",
    location: "Kozhikode, Kerala",
    period: "June 2025 – Aug 2025",
    points: [
      "Studied and reproduced a Gaussian Deformation Field Network with HexPlane Encoding by thoroughly understanding the paper's theoretical foundations and implementing the full pipeline in Google Colab.",
      "Implemented training and inference workflows using PyTorch, gaining hands-on experience with neural field representations, memory–compute trade-offs, and performance profiling.",
      "Recreated and experimented with a state-of-the-art 3D vision research model, analyzing architectural choices, optimization strategies, and limitations for potential real-world deployment.",
    ],
  },
];

const achievements = [
  "Reliance Foundation Scholarship (2024) – Awarded the Reliance Foundation Scholarship after clearing a highly competitive national-level entrance exam with a low acceptance rate, recognized for academic excellence.",
  "Top 1% in Maharashtra State Board – Ranked among the top 1 percentile of 12th Grade students in Maharashtra.",
  "Pariksha Pe Charcha (2020) – Selected among 1,050 students from 2,60,000 applicants nationwide; interacted with Hon. Prime Minister Shri Narendra Modi at Talkatora Stadium, New Delhi.",
  "Solved 400+ Data Structures & Algorithms problems across platforms including LeetCode, GeeksforGeeks, Codeforces, CodeChef.",
  "Peak Rating of 1762 rated on LeetCode (top 9.47 percent)",
];

const skills = {
  languages: [
    { name: "Java", icon: "/skills/icons8-java.svg" },
    { name: "Python", icon: "/skills/icons8-python.svg" },
    { name: "TypeScript", icon: "/skills/icons8-typescript.svg" },
    { name: "JavaScript", icon: "/skills/icons8-javascript.svg" },
    { name: "SQL", icon: "/skills/icons8-sql.svg" },
  ],
  frontend: [
    { name: "React.js", icon: "/skills/icons8-react.svg" },
    { name: "Next.js", icon: "/skills/icons8-nextjs.svg" },
    { name: "Tailwind CSS", icon: "/skills/icons8-tailwind-css.svg" },
  ],
  backend: [
    { name: "Node.js", icon: "/skills/icons8-nodejs.svg" },
    { name: "Express.js", icon: "/skills/icons8-express-js.svg" },
  ],
  databases: [
    { name: "MongoDB", icon: "/skills/icons8-mongodb.svg" },
    { name: "PostgreSQL", icon: "/skills/icons8-postgresql.svg" },
  ],
  devops: [
    { name: "Docker", icon: "/skills/icons8-docker.svg" },
    { name: "Kubernetes", icon: "/skills/icons8-kubernetes.svg" },
  ],
  tools: [
    { name: "GitHub", icon: "/skills/icons8-github.svg" },
    { name: "Linux", icon: "/skills/icons8-linux.svg" },
  ],
  analytics: [
    { name: "Matplotlib", icon: "/skills/icons8-matplotlib.svg" },
    { name: "Pandas", icon: "/skills/icons8-pandas.svg" },
    { name: "NumPy", icon: "/skills/icons8-numpy.svg" },
    { name: "SeaBorn", icon: "/skills/seaborn-1.svg" },
  ],
};

const projects = [
  
  {
    title: "Nextable - Agentic App Generator",
    description: "AI-powered Next.js 15 application generator with multi-model LLM support using Inngest Agent Kit.",
    image: "/assets/nextable.png", // TODO: Add project image here
    href: "https://github.com/utkarshpawade/Nextable", // TODO: Add GitHub link
    deployUrl: "#", // TODO: Add deployment URL
    technologies: ["Next.js", "tRPC", "Prisma", "Inngest Agent Kit", "E2B"],
    points: [
      "Built an AI-powered Next.js 15 application generator with multi-model LLM support (GPT, Grok, Gemini) using Inngest Agent Kit for autonomous code generation.",
      "Architected a scalable full-stack system using tRPC, Prisma, PostgreSQL, and Clerk, enabling type-safe APIs, authentication, and project-level code tracking.",
      "Developed an agentic AI workflow with custom tools for code generation, file operations, and dependency management.",
    ],
  },
  {
    title: "Scalable Ticket Booking",
    description: "Full-stack MERN Movie Ticket Booking Platform with seat selection, real-time availability, and admin dashboard.",
    image: "/assets/ticket-booking.png", // TODO: Add project image here
    href: "https://github.com/utkarshpawade/Scalable-Ticket-Booking-System", // TODO: Add GitHub link
    deployUrl: "#", // TODO: Add deployment URL
    technologies: ["MERN Stack", "REST APIs", "Clerk Auth", "Inngest"],
    points: [
      "Built and deployed a full-stack MERN Movie Ticket Booking Platform with seat selection, real-time availability, and an admin dashboard for managing movies and bookings.",
      "Implemented Clerk authentication with email, social, and phone sign-in, supporting multi-profile sessions and seamless account switching.",
      "Integrated Inngest for background jobs and scheduling, enabling automated email notifications and temporary seat locking with timeout logic.",
    ],
  }
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  // const [current, setCurrent] = useState<number>(0);
  // const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    // setCount(carouselApi.scrollSnapList().length);
    // setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      // setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro & About */}
        <section
          id="home"
          data-scroll-section
          className="flex min-h-screen w-full flex-col items-center justify-center"
        >
          <div className={styles.intro}>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Utkarsh.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-4 max-w-3xl text-xl font-light leading-normal tracking-tight text-muted-foreground xl:text-2xl"
              >
                I&apos;m a Pre-Final Year CSE student at{" "}
                <Link
                  href="https://iiitsonepat.ac.in/"
                  target="_blank"
                  className="underline"
                >
                  IIIT Sonepat
                </Link>{" "}
                with expertise in{" "}
                <span className="text-gradient">TypeScript, React, Next.js, and the MERN stack</span>.
                I&apos;m passionate about building scalable full-stack applications
                and have strong problem-solving skills with 400+ DSA problems solved.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section className="mt-32">
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-16">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Streamlined digital experiences.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, from small websites to
              large-scale web applications. Here are some of my favorites:
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card id="tilt">
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank" passHref>
                            {project.image.endsWith(".webm") ? (
                              <video
                                src={project.image}
                                autoPlay
                                loop
                                muted
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                quality={100}
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            )}
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                {/* <span className="font-semibold">
                  {current+1} / {count+1}
                </span>{" "}
                projects */}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-8 flex flex-col justify-start space-y-10"
          >
            <div>
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                🎓 Education
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
                Academic Background
              </h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white/5 p-6 backdrop-blur"
                >
                  <h3 className="text-xl font-semibold text-foreground">{edu.institution}</h3>
                  <p className="mt-1 text-lg text-primary">{edu.degree}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{edu.period}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-8 flex flex-col justify-start space-y-10"
          >
            <div>
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                💼 Experience
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
                Professional Journey
              </h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white/5 p-6 backdrop-blur"
                >
                  <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                  <p className="mt-1 text-lg text-primary">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.location} | {exp.period}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-5">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-sm text-muted-foreground">{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-8 flex flex-col justify-start space-y-10"
          >
            <div>
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                🏆 Achievements
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
                Awards & Recognition
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white/5 p-6 backdrop-blur transition duration-300 hover:bg-white/10"
                >
                  <p className="text-sm text-muted-foreground">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-8 flex flex-col justify-start space-y-10"
          >
            <div>
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                🛠️ Skills
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
                Technical Expertise
              </h2>
            </div>
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
              {/* Skills List */}
              <div className="space-y-8 xl:w-1/2">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h3 className="mb-4 text-lg font-semibold capitalize text-foreground">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {skillList.map((skill) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur transition duration-300 hover:bg-white/10"
                        >
                          <Image src={skill.icon} alt={skill.name} width={64} height={64} />
                          <span className="text-sm text-foreground">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Spline Animation */}
              <div
                data-scroll
                data-scroll-speed="-.01"
                id={styles["canvas-container"]}
                className="mt-14 h-[400px] w-full xl:mt-0 xl:h-[600px] xl:w-1/2"
              >
                <Suspense fallback={<span>Loading...</span>}>
                  <Spline scene="/assets/scene.splinecode" />
                </Suspense>
              </div>
            </div>
          </div>
          
        </section>

        {/* LeetCode */}
        
        <section id="leetcode" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-8 flex flex-col justify-start space-y-10"
          >
            <div>
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                💻 DSA
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
                DSA Solving Profile
              </h2>
              <p className="mt-2 text-muted-foreground">
                Check out my problem-solving Statistics.
              </p>
            </div>
            
            {/* Flex container for Codolio card and statistics */}
            <div className="flex flex-col items-start gap-8 xl:flex-row xl:items-stretch">
              {/* Codolio Card */}
              <div className="w-full xl:w-[420px]">
                <iframe
                  src="https://codolio.com/profile/utkarshpawade/card"
                  width="100%"
                  height="700"
                  style={{ border: "none" }}
                  loading="lazy"
                  title="Utkarsh Pawade Codolio Card"
                  className="rounded-lg"
                />
              </div>

              {/* LeetCode Statistics */}
              <LeetCodeStats />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-16">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently looking for internships and open to
              discussing new projects.
            </p>
            
            {/* Social Links */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <Link
                href="https://www.linkedin.com/in/utkarsh-pawade-4398831b0/" // TODO: Replace with your LinkedIn URL
                target="_blank"
                className="rounded-full bg-white/5 p-3 transition duration-300 hover:bg-white/10"
              >
                <svg className="h-6 w-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link
                href="https://github.com/utkarshpawade" // TODO: Replace with your GitHub URL
                target="_blank"
                className="rounded-full bg-white/5 p-3 transition duration-300 hover:bg-white/10"
              >
                <svg className="h-6 w-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link
                href="https://leetcode.com/u/utkarshpawade" // TODO: Replace with your LeetCode URL
                target="_blank"
                className="rounded-full bg-white/5 p-3 transition duration-300 hover:bg-white/10"
              >
                <svg className="h-6 w-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
              </Link>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </section>
      </div>
    </Container>
  );
}

function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "7f92dbbd-1c9e-4ebc-a6a3-eaa4ccd18c08", // Get free key from https://web3forms.com
          subject: `Portfolio Contact from ${email}`,
          email: email,
          message: message,
          from_name: email,
          to_email: "utkarshpawade2@gmail.com",
        }),
      });

      const data = (await response.json()) as { success?: boolean };

      if (data.success) {
        setStatus("success");
        setEmail("");
        setMessage("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-md flex-col gap-4">
      {status === "success" && (
        <div className="rounded-lg bg-green-500/20 px-4 py-3 text-center text-sm text-green-400">
          Message sent successfully! I&apos;ll get back to you soon.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg bg-red-500/20 px-4 py-3 text-center text-sm text-red-400">
          Failed to send message. Please email directly at utkarshpawade2@gmail.com
        </div>
      )}
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
      />
      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={4}
        disabled={status === "loading"}
        className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
      />
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function Gradient() {
  return (
    <>
      
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
