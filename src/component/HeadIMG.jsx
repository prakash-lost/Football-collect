// import React from "react";

// import { useState, useEffect } from "react";

// const images = [
//   "https://i.pinimg.com/736x/b8/1c/27/b81c2733626b8df32f9dcd9bfd93be89.jpg",//messi
//   "https://i.pinimg.com/1200x/49/b8/a8/49b8a80ec2dc2c2d24ecd98b0c5c964c.jpg",//ronaldo
//   "https://i.pinimg.com/1200x/76/67/a3/7667a36e9d679b98ab9347716b0569a6.jpg",//neymar
//   "https://assets.goal.com/images/v3/getty-2241952135/crop/MM5DENBUHA5DCMZXG45G433XMU5DMMJSHIYTAMA=/GettyImages-2241952135.jpg?auto=webp&format=pjpg&width=3840&quality=60",//haaland
//   "https://i.pinimg.com/736x/ee/ac/43/eeac43ed02a73ea08935f8c4faff7a20.jpg",//yamal
//   "https://i.pinimg.com/1200x/7c/31/90/7c3190475b42a989a95df8e6677217e7.jpg",//mbappe
//   "https://i.pinimg.com/736x/f3/23/e9/f323e9976a061731a601c101ec8d05fa.jpg",//olise
//   "https://i.pinimg.com/736x/4f/90/47/4f904785a5a6784576ee97ee7ac74c10.jpg",//jude
//   "https://i.pinimg.com/1200x/05/0a/09/050a091bf3c83065ea01be93a683dd7c.jpg",//pedri
//   "https://i.pinimg.com/736x/88/64/a4/8864a40106890c8ea92496df98bcf23f.jpg",//vini
//   "https://i.pinimg.com/736x/c0/f2/e0/c0f2e03868dda65de1768d2103038a15.jpg",//vitina
//   "https://i.pinimg.com/736x/e9/41/0c/e9410cd29d42f845edda40e5e5b80907.jpg",//kicha
//   "https://i.pinimg.com/736x/d5/cb/85/d5cb85b4349d751d7ebcd90785442578.jpg",//joa neves
//   "https://i.pinimg.com/1200x/75/49/a9/7549a9c5b0822d9b5392d96b10ca3a5a.jpg",//messi
//   "https://i.pinimg.com/736x/db/4a/ca/db4acaa663ae51a2d6f09232cfb84cff.jpg",//ronaldo
//   "https://i.pinimg.com/1200x/3e/08/ab/3e08abb0fb5ecd7747a6f2814822fb22.jpg",//neymar
// ];
// const HeadIMG = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(timer);
//   }, []);
//   return (
//     <div>
//       <div className="  relative w-full aspect-video overflow-hidden  shadow-md">
//         {images.map((src, i) => (
//           <img
//             key={i}
//             src={src}
//             // alt="image"
//             className={`absolute top-0 left-0 h-full w-full object-cover transition-transform duration-700 ease-in-out ${
//               i === index
//                 ? "translate-x-0"
//                 : i < index
//                   ? "-translate-x-full"
//                   : "translate-x-full"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeadIMG;

import * as React from "react";

import {  CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
// import Autoplay from "node_modules/embla-carousel-autoplay";
const images = [
  "https://i.pinimg.com/736x/b8/1c/27/b81c2733626b8df32f9dcd9bfd93be89.jpg",//messi
  "https://i.pinimg.com/1200x/49/b8/a8/49b8a80ec2dc2c2d24ecd98b0c5c964c.jpg",//ronaldo
  "https://i.pinimg.com/1200x/76/67/a3/7667a36e9d679b98ab9347716b0569a6.jpg",//neymar
  "https://assets.goal.com/images/v3/getty-2241952135/crop/MM5DENBUHA5DCMZXG45G433XMU5DMMJSHIYTAMA=/GettyImages-2241952135.jpg?auto=webp&format=pjpg&width=3840&quality=60",//haaland
  "https://i.pinimg.com/736x/ee/ac/43/eeac43ed02a73ea08935f8c4faff7a20.jpg",//yamal
  "https://i.pinimg.com/1200x/7c/31/90/7c3190475b42a989a95df8e6677217e7.jpg",//mbappe
  "https://i.pinimg.com/736x/f3/23/e9/f323e9976a061731a601c101ec8d05fa.jpg",//olise
  "https://i.pinimg.com/736x/4f/90/47/4f904785a5a6784576ee97ee7ac74c10.jpg",//jude
  "https://i.pinimg.com/1200x/05/0a/09/050a091bf3c83065ea01be93a683dd7c.jpg",//pedri
  "https://i.pinimg.com/736x/88/64/a4/8864a40106890c8ea92496df98bcf23f.jpg",//vini
  "https://i.pinimg.com/736x/c0/f2/e0/c0f2e03868dda65de1768d2103038a15.jpg",//vitina
  "https://i.pinimg.com/736x/e9/41/0c/e9410cd29d42f845edda40e5e5b80907.jpg",//kicha
  "https://i.pinimg.com/736x/d5/cb/85/d5cb85b4349d751d7ebcd90785442578.jpg",//joa neves
  "https://i.pinimg.com/1200x/75/49/a9/7549a9c5b0822d9b5392d96b10ca3a5a.jpg",//messi
  "https://i.pinimg.com/736x/db/4a/ca/db4acaa663ae51a2d6f09232cfb84cff.jpg",//ronaldo
  "https://i.pinimg.com/1200x/3e/08/ab/3e08abb0fb5ecd7747a6f2814822fb22.jpg",//neymar
];

export default function HeadIMG() {
  return (
    <div className="flex justify-center ">

    <Carousel className="" 
    opts={{loop:true}}
    plugins={[Autoplay({
      delay:2000,
    })
    ]}
    >
      <CarouselContent>
        {images.map((url, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              
                <CardContent className="flex items-center justify-center ">
                  <img className="w-full h-150" src={url} alt="" />
                </CardContent>
              
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={'left-4'} />
      <CarouselNext className={'right-4'}/>
    </Carousel>
        </div>
  );
}
