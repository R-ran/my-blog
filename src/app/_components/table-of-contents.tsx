"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/lib/extractHeadings";
import { ContactForm } from "./contact-form";

type Props = {
  headings: Heading[];
};

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    );

    const headingElements = headings.map((heading) =>
      document.getElementById(heading.id)
    );

    headingElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      headingElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-20 pr-4 flex flex-col">
      <nav className="text-sm mb-2">
        <div className="font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
          CONTENTS
        </div>
        <ul className="space-y-1">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const indentClass =
              heading.level === 2
                ? "pl-0"
                : heading.level === 3
                ? "pl-4 border-l border-gray-300 dark:border-gray-600"
                : "pl-8";

            return (
              <li key={heading.id} className={indentClass}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`block py-1 transition-colors text-sm leading-relaxed ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <ContactForm />
    </div>
  );
}

