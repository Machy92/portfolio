import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        nav: {
            about: "About",
            services: "Services",
            projects: "Projects",
            contact: "Contact"
        },
        hero: {
            title: ["MATĚJ", "MACHOVSKÝ"],
            subtitle: "IT Student & Front-End Creative",
            workingAt: "Developer at",
            cta: "See My Work",
            learnMore: "About Me"
        },
        about: {
            label: "01 — About",
            title: "About Me",
            bio: "I'm a 19-year-old developer and IT student from Ústí nad Labem. I build websites and web applications — beautiful, fast, and functional. Currently crafting the web at CodeCore.cz.",
            yearsLabel: "Years Coding",
            journeyTitle: "My Journey",
            cards: [
                { title: "Who am I?", desc: "Creative developer passionate about building digital experiences that matter." },
                { title: "Location", desc: "Based in Ústí nad Labem, Czech Republic. Open to remote work." },
                { title: "Education", desc: "4th year IT student at SPŠUL, focusing on software development." },
                { title: "Tech Stack", desc: "Specializing in React ecosystem, Three.js, and modern CSS." }
            ],
            timeline: [
                { year: "2020", title: "Started Coding", desc: "Wrote my first line of HTML/CSS. Fell in love with creating things for the web." },
                { year: "2022", title: "Freelancing", desc: "Completed my first paid commercial projects for local clients." },
                { year: "2023", title: "Advanced Web Apps", desc: "Deep dived into React, Next.js, and full-stack development with Supabase." },
                { year: "2026", title: "The Next Step", desc: "Building the future directly from Ústí nad Labem. Ready for big challenges." }
            ]
        },
        skills: {
            title: "Technologies I Use"
        },
        services: {
            label: "03 — Services",
            title: "What I Do",
            cards: [
                { title: "Web Development", desc: "Custom websites built with modern technologies like React and Next.js. Fast, SEO-friendly, and responsive." },
                { title: "UI/UX Design", desc: "Designing intuitive and visually stunning interfaces. Focusing on user experience and brand identity." },
                { title: "Optimization", desc: "Improving website performance and speed. Ensuring your site loads fast and ranks high on search engines." },
                { title: "Web Applications", desc: "Full-featured web apps with user authentication, real-time data, and database integration. Built with React, Next.js, and Supabase." }
            ]
        },
        projects: {
            label: "04 — Projects",
            title: "Featured Work",
            viewLive: "View Live Project",
            inDev: "In Development",
            items: [
                { title: "Hostinec", desc: "A professionally crafted website for a traditional Czech inn. Focused on increasing reservation conversions and showcasing the menu with a modern, appetizing design." },
                { title: "K-Head Spa Therapy", desc: "A serene, spa-focused web application. Features smooth animations and a calming color palette to reflect the brand's identity. Integrated booking information." },
                { title: "Markéta Beauty", desc: "A modern website for a beauty salon in Ústí nad Labem. Clean layout, service overview, and a calming aesthetic tailored to the brand." },
                { title: "Barel Cup 2026", desc: "A web application for a street hockey tournament. Features team registration, a standings table, and live event information." }
            ]
        },
        contact: {
            label: "05 — Contact",
            title: "Let's Work Together",
            desc: "Have a project in mind or just want to say hi? My inbox is always open.",
            footer: "Built with React & Three.js."
        }
    },
    cs: {
        nav: {
            about: "O Mně",
            services: "Služby",
            projects: "Projekty",
            contact: "Kontakt"
        },
        hero: {
            title: ["MATĚJ", "MACHOVSKÝ"],
            subtitle: "Student IT & Front-End Vývojář",
            workingAt: "Vývojář pro",
            cta: "Moje Práce",
            learnMore: "O Mně"
        },
        about: {
            label: "01 — O Mně",
            title: "O Mně",
            bio: "Jsem 19letý vývojář a student IT z Ústí nad Labem. Tvořím weby i webové aplikace — krásné, rychlé a funkční. Momentálně buduji web na CodeCore.cz.",
            yearsLabel: "Let Kóduji",
            journeyTitle: "Můj Příběh",
            cards: [
                { title: "Kdo jsem?", desc: "Kreativní vývojář s vášní pro tvorbu digitálních zážitků, které dávají smysl." },
                { title: "Lokace", desc: "Jsem z Ústí nad Labem. Otevřený práci na dálku." },
                { title: "Vzdělání", desc: "4. ročník IT na SPŠUL, zaměření na vývoj softwaru a webových aplikací." },
                { title: "Stack", desc: "Specializace na React ekosystém, Three.js a moderní CSS." }
            ],
            timeline: [
                { year: "2020", title: "Začátky Kódování", desc: "Napsal jsem svůj první řádek HTML/CSS. Zamiloval jsem se do tvorby webů." },
                { year: "2022", title: "Freelancing", desc: "Dokončil jsem své první placené komerční projekty pro lokální klienty." },
                { year: "2023", title: "Pokročilé Web Apps", desc: "Ponořil jsem se do Reactu, Next.js a full-stack vývoje se Supabase." },
                { year: "2026", title: "Další Krok", desc: "Tvořím budoucnost přímo z Ústí nad Labem. Připraven na velké výzvy." }
            ]
        },
        skills: {
            title: "Technologie"
        },
        services: {
            label: "03 — Služby",
            title: "Co Dělám",
            cards: [
                { title: "Web Vývoj", desc: "Weby na míru postavené na moderních technologiích jako React a Next.js. Rychlé, SEO-friendly a responsivní." },
                { title: "UI/UX Design", desc: "Navrhování intuitivních a vizuálně úchvatných rozhraní. Důraz na uživatelskou přívětivost a identitu značky." },
                { title: "Optimalizace", desc: "Zlepšování výkonu a rychlosti webu. Zajištění rychlého načítání a vysokých pozic ve vyhledávačích." },
                { title: "Webové Aplikace", desc: "Plnohodnotné webové aplikace s přihlašováním, real-time daty a databázovou integrací. Postavené na Reactu, Next.js a Supabase." }
            ]
        },
        projects: {
            label: "04 — Projekty",
            title: "Vybrané Projekty",
            viewLive: "Zobrazit Projekt",
            inDev: "Ve Vývoji",
            items: [
                { title: "Hostinec", desc: "Profesionálně zpracovaný web pro tradiční českou hospodu. Zaměřeno na zvýšení rezervací a prezentaci menu v moderním, chutném designu." },
                { title: "K-Head Spa Therapy", desc: "Klidná webová aplikace pro lázeňské služby. Využívá jemné animace a uklidňující barvy. Integrované rezervační informace." },
                { title: "Markéta Beauty", desc: "Moderní web pro kosmetický salon v Ústí nad Labem. Čistý layout, přehled služeb a uklidňující estetika přizpůsobená značce." },
                { title: "Barel Cup 2026", desc: "Webová aplikace pro streetový hokejbalový turnaj. Registrace týmů, tabulka výsledků a aktuální informace o turnaji." }
            ]
        },
        contact: {
            label: "05 — Kontakt",
            title: "Pojďme Spolupracovat",
            desc: "Máš nápad na projekt nebo chceš jen pozdravit? Moje schránka je vždy otevřená.",
            footer: "Postaveno na React & Three.js."
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('cs');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'cs' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
