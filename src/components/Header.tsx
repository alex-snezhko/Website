import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faStackOverflow, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css';

import "../styles/Header.scss";

type SectionName = "about" | "experience" | "projects" | "skills";
const allSections: SectionName[] = ["about", "experience", "projects", "skills"];

interface ContactIconsProps {
  className: string;
}

const ContactIcons = ({ className }: ContactIconsProps) => (
  <div className={`${className} contact-icons`}>
    <a href="mailto:alexsnezhko89@gmail.com">
      <FontAwesomeIcon icon={faEnvelope} fixedWidth className="fa-icon" />
    </a>
    <a href="https://stackoverflow.com/users/12573825/apollo">
      <FontAwesomeIcon icon={faStackOverflow} fixedWidth className="fa-icon" />
    </a>
    <a href="https://www.linkedin.com/in/alex-snezhko/">
      <FontAwesomeIcon icon={faLinkedin} fixedWidth className="fa-icon" />
    </a>
    <a href="https://github.com/alex-snezhko">
      <FontAwesomeIcon icon={faGithub} fixedWidth className="fa-icon" />
    </a>
  </div>
);

export default function Header() {
  const [atTop, setAtTop] = useState(false);
  const [currentSection, setCurrentSection] = useState("about");
  const titlebarRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  function scrollToSection(id: SectionName | "top") {
    const elem = id === "top"
      ? document.getElementById("header")!
      : document.getElementById(`${id}-scroll-target`)!;

    elem.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const sectionTops: { elementTop: number, sectionName: SectionName }[] = [];
    for (const sectionName of allSections.slice().reverse()) {
      const elementTop = document.getElementById(`${sectionName}-scroll-target`)!.offsetTop;
      sectionTops.push({ elementTop, sectionName });
    }

    function nav() {
      const y = window.scrollY;
      const titlebarHeight = titlebarRef.current?.offsetHeight!;
      const putNavbarToTop = y >= titlebarHeight;
      if (atTop !== putNavbarToTop) {
        setAtTop(putNavbarToTop);
      }
      const scrolledSection = sectionTops.find(({ elementTop }) => y >= elementTop - 5)?.sectionName || "about";
      if (scrolledSection !== currentSection) {
        setCurrentSection(scrolledSection);
      }
    }
    window.addEventListener("scroll", nav);

    return () => window.removeEventListener("scroll", nav);
  })

  return (
    <header id="header">
      {atTop && <div style={{ height: navbarRef.current?.offsetHeight }} />}

      <div ref={titlebarRef} id="titlebar">
        <h1 id="title">Alex Snezhko</h1>
        <ContactIcons className="contact-icons-titlebar" />
      </div>

      <div ref={navbarRef} id="navbar" className={atTop ? "at-top" : ""}>
        {atTop && (
          <div onClick={() => scrollToSection("top")}>
            <span className="navbar-initials">avs</span>
            <span className="navbar-to-top"><FontAwesomeIcon icon={faArrowUp} /></span>
          </div>
        )}

        <div className="navbar-links">
          {allSections.map(sectionName => (
            <button
              key={sectionName}
              className={sectionName === currentSection ? "thispage" : ""}
              onClick={() => scrollToSection(sectionName)}
            >
              {sectionName[0].toUpperCase() + sectionName.slice(1)}
            </button>
          ))}
        </div>

        {atTop && <ContactIcons className="contact-icons-navbar" />}
      </div>

    </header>
  );
}

