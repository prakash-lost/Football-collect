import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ArrowRight, Shield } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const slides = [
  {
    url: "https://i.pinimg.com/1200x/c7/2b/96/c72b96fa1d9774653551532f831fbe61.jpg",
    name: "Lionel Messi",
    club: "FC Barcelona Legend • Inter Miami",
    role: "8x Ballon d'Or Winner",
    badge: "Greatest of All Time",
  },
  {
    url: "https://i.pinimg.com/736x/2b/d8/6d/2bd86d6fe558d7c2a71f0082725fa896.jpg",
    name: "Cristiano Ronaldo",
    club: "Real Madrid Legend • Al-Nassr",
    role: "5x Ballon d'Or Winner • 5x UCL",
    badge: "All-Time Top Scorer",
  },
  {
    url: "https://i.pinimg.com/1200x/80/e5/22/80e522ff673b5df5b871c86eecaeaafe.jpg",
    name: "Kylian Mbappé",
    club: "Real Madrid • France Captain",
    role: "World Cup Golden Boot",
    badge: "Galáctico Era 2026",
  },
  {
    url: "https://i.pinimg.com/736x/db/51/93/db5193910c59cc7c6dfb1e8477f10b27.jpg",
    name: "Erling Haaland",
    club: "Manchester City • Norway",
    role: "Premier League Record Breaker",
    badge: "Goal Machine",
  },
  {
    url: "https://i.pinimg.com/1200x/aa/8d/62/aa8d62cecf17a151fe53b0bc4aa7f794.jpg",
    name: "Lamine Yamal",
    club: "FC Barcelona • Spain",
    role: "Euro 2024 Champion & Young Player",
    badge: "Generation Next",
  },
  {
    url: "https://i.pinimg.com/1200x/31/6a/d0/316ad06b6eb81427cbb022bf2f38d38b.jpg",
    name: "Jude Bellingham",
    club: "Real Madrid • England",
    role: "Champions League Winner",
    badge: "Midfield Maestro",
  },
  {
    url: "https://i.pinimg.com/736x/89/3b/b7/893bb7b952f4ae10f54070a25fa1fc6d.jpg",
    name: "Vinícius Júnior",
    club: "Real Madrid • Brazil",
    role: "2x Champions League Final Scorer",
    badge: "Samba Flair",
  },
  {
    url: "https://i.pinimg.com/736x/87/0c/33/870c33a3915bc5c9ae1994e098a5840d.jpg",
    name: "Cole Palmer",
    club: "Chelsea • England",
    role: "PFA Young Player of the Year",
    badge: "Cold Precision",
  },
  {
    url: "https://i.pinimg.com/736x/67/f6/cb/67f6cb3d4b68bb3f81ebffc6e7f77977.jpg",
    name: "Florian Wirtz",
    club: "Bayer Leverkusen • Germany",
    role: "Bundesliga Player of the Season",
    badge: "Master Playmaker",
  },
];

const HeadImg = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
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
                  <Badge variant="secondary" size="default" className="mb-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    <span>{slide.badge}</span>
                  </Badge>

                  {/* Player Name */}
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground font-sans">
                    {slide.name}
                  </h2>

                  {/* Club Details */}
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1.5 flex items-center gap-1.5">
                    <Shield className="size-3.5 text-primary shrink-0" />
                    <span>{slide.club}</span>
                    <span className="text-border">•</span>
                    <span className="text-primary font-semibold">
                      {slide.role}
                    </span>
                  </p>

                  {/* Action Link */}
                  <div className="mt-3.5">
                    <Button asChild variant="default" size="sm">
                      <Link to="/players" className="inline-flex items-center gap-2">
                        <span>Explore Archive</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 4. Controls */}
        <div className="absolute bottom-4 right-4 sm:bottom-7 sm:right-7 z-30 flex items-center gap-1.5 bg-card border border-border px-2 py-1 rounded-md">
          {/* Previous Arrow */}
          <button
            onClick={() => api?.scrollPrev()}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Slide Counter */}
          <span className="text-xs font-mono font-medium text-foreground px-1.5">
            {current + 1} / {count || slides.length}
          </span>

          {/* Next Arrow */}
          <button
            onClick={() => api?.scrollNext()}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </Carousel>
    </div>
  );
};

export default HeadImg;
