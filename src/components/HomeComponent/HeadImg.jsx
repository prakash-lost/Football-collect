import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  ArrowRight,
} from "lucide-react";

const slides = [
  {
    url: "https://i.pinimg.com/736x/b8/1c/27/b81c2733626b8df32f9dcd9bfd93be89.jpg",
    name: "Lionel Messi",
    role: "Playmaker",
    club: "Inter Miami & Argentina",
    badge: "World Champion 🏆",
  },
  {
    url: "https://i.pinimg.com/1200x/49/b8/a8/49b8a80ec2dc2c2d24ecd98b0c5c964c.jpg",
    name: "Cristiano Ronaldo",
    role: "Striker",
    club: "Al Nassr & Portugal",
    badge: "All-Time Top Scorer ⚡",
  },
  {
    url: "https://assets.goal.com/images/v3/getty-2241952135/crop/MM5DENBUHA5DCMZXG45G433XMU5DMMJSHIYTAMA=/GettyImages-2241952135.jpg?auto=webp&format=pjpg&width=3840&quality=60",
    name: "Erling Haaland",
    role: "Goal Machine",
    club: "Manchester City",
    badge: "Golden Boot 🎯",
  },
  {
    url: "https://i.pinimg.com/1200x/76/67/a3/7667a36e9d679b98ab9347716b0569a6.jpg",
    name: "Neymar Jr",
    role: "Winger",
    club: "Santos & Brazil",
    badge: "Samba Flair 🇧🇷",
  },
  {
    url: "https://i.pinimg.com/736x/ee/ac/43/eeac43ed02a73ea08935f8c4faff7a20.jpg",
    name: "Lamine Yamal",
    role: "Wonderkid",
    club: "FC Barcelona & Spain",
    badge: "Euro 2024 Winner 🌟",
  },
  {
    url: "https://i.pinimg.com/1200x/7c/31/90/7c3190475b42a989a95df8e6677217e7.jpg",
    name: "Kylian Mbappé",
    role: "Forward",
    club: "Real Madrid & France",
    badge: "Speed Demon ⚡",
  },
  {
    url: "https://i.pinimg.com/736x/4f/90/47/4f904785a5a6784576ee97ee7ac74c10.jpg",
    name: "Jude Bellingham",
    role: "Midfielder",
    club: "Real Madrid & England",
    badge: "Golden Boy 👑",
  },
  {
    url: "https://i.pinimg.com/736x/88/64/a4/8864a40106890c8ea92496df98bcf23f.jpg",
    name: "Vinícius Jr",
    role: "Winger",
    club: "Real Madrid & Brazil",
    badge: "UCL Champion 🔥",
  },
  {
    url: "https://i.pinimg.com/1200x/05/0a/09/050a091bf3c83065ea01be93a683dd7c.jpg",
    name: "Pedri González",
    role: "Midfielder",
    club: "FC Barcelona & Spain",
    badge: "Visionary 🧠",
  },
  {
    url: "https://i.pinimg.com/736x/f3/23/e9/f323e9976a061731a601c101ec8d05fa.jpg",
    name: "Michael Olise",
    role: "Winger",
    club: "Bayern Munich & France",
    badge: "Rising Star 💫",
  },
];

export default function HeadIMG() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[plugin.current]}
        className="relative w-full rounded-xl overflow-hidden border border-border bg-[#111310]"
      >
        <CarouselContent className="m-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="p-0">
              <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] bg-[#111310]">
                {/* 1. Player Image */}
                <img
                  src={slide.url}
                  alt={slide.name}
                  className="w-full h-full object-cover object-top sm:object-center brightness-90 contrast-105"
                  loading={index < 2 ? "eager" : "lazy"}
                />

                {/* 2. Dark Overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111310] via-[#111310]/50 to-transparent pointer-events-none" />

                {/* 3. Player Card Info */}
                <div className="absolute bottom-5 left-4 sm:bottom-8 sm:left-8 z-20 max-w-lg text-left">
                  {/* Accolade Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-foreground text-xs font-semibold mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Player Name */}
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground font-sans">
                    {slide.name}
                  </h2>

                  {/* Club Details */}
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1.5 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{slide.club}</span>
                    <span className="text-border">•</span>
                    <span className="text-primary font-semibold">
                      {slide.role}
                    </span>
                  </p>

                  {/* Action Link */}
                  <div className="mt-3.5">
                    <Link
                      to="/players"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs sm:text-sm font-bold hover:bg-primary-hover active:scale-[0.98] transition-colors"
                    >
                      <span>Explore Archive</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 4. Controls */}
        <div className="absolute bottom-4 right-4 sm:bottom-7 sm:right-7 z-30 flex items-center gap-1.5 bg-card border border-border px-2.5 py-1 rounded-md">
          {/* Previous Arrow */}
          <button
            onClick={() => api?.scrollPrev()}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slide Counter */}
          <span className="text-xs font-mono font-medium text-foreground px-1.5">
            {current + 1} <span className="text-muted-foreground">/</span>{" "}
            {slides.length}
          </span>

          {/* Next Arrow */}
          <button
            onClick={() => api?.scrollNext()}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </Carousel>
    </div>
  );
}
