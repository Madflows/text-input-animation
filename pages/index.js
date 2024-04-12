import { cn } from "@/utils/functions";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdBolt } from "react-icons/md";
import { TiWaves } from "react-icons/ti";
import { GiSnail } from "react-icons/gi";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/dist/gsap";

export default function Home() {
  const textAreaRef = useRef();
  const [textValue, setTextValue] = useState("");
  const SPEED_OPTIONS = [
    {
      title: "fast",
      duration: 0.17,
      icon: MdBolt,
    },
    {
      title: "default",
      duration: 0.3,
      icon: TiWaves,
    },
    {
      title: "slow",
      duration: 0.8,
      icon: GiSnail,
    },
  ];
  const [activeSpeed, setActiveSpeed] = useState(1);
  useGSAP(() => {
    gsap.set(".speed-bar", {
      visibility: "visible",
    });
    gsap.fromTo(
      ".speed-bar",
      {
        y: 300,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        delay: 0.5,
      }
    );
  }, []);
  return (
    <main className="container relative min-h-screen">
      <textarea
        onChange={(e) => setTextValue(e.currentTarget.value)}
        ref={textAreaRef}
        className="opacity-0 w-0 h-0"
      />
      <div
        onClick={() => textAreaRef.current.focus()}
        className="min-h-60 absolute top-5 left-0 font-space-grotesk bg-stone-800 rounded-md font-bold min-w-full p-5 overflow-x-hidden text-slate-100 whitespace-pre-wrap text-xl"
      >
        <AnimatePresence>
          {textValue.split("").map((item, index) => {
            const isLastItem = index === textValue.length - 1;
            return (
              <motion.span
                initial={{
                  opacity: 0,
                  y: 100,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 100,
                  transition: {
                    duration: 0.15,
                  },
                }}
                key={index}
                className={cn({
                  "inline-block origin-top": item !== "\n",
                  inline: item === "\n",
                })}
                transition={{
                  duration: SPEED_OPTIONS[activeSpeed].duration,
                  ease: "easeIn",
                }}
              >
                {item}
                {isLastItem && (
                  <motion.span
                    className="bg-white h-[13px] w-4 animate-pulse"
                    layoutId="lastTextShi"
                  />
                )}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-4 invisible p-3 speed-bar rounded-full bg-stone-800 shadow absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="flex">
          {SPEED_OPTIONS.map((item, index) => {
            const isActive = index === activeSpeed;
            return (
              <button
                onClick={() => setActiveSpeed(index)}
                key={index}
                className="relative flex-1 py-2 px-4 "
              >
                {isActive && (
                  <motion.div
                    layoutId="speedButton"
                    className="absolute inset-0 bg-white rounded-full"
                  />
                )}
                <p
                  className={cn(
                    "relative text-sm text-white flex gap-2 items-center font-bold font-space-grotesk",
                    {
                      "text-stone-900": isActive,
                    }
                  )}
                >
                  <item.icon className="text-xl" />
                  <span>{item.title}</span>
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => textAreaRef.current.focus()}
        className={cn(
          "min-h-60 pointer-events-none absolute top-5 left-0 opacity-30 font-space-grotesk font-bold min-w-full p-5 overflow-x-hidden text-slate-100 whitespace-pre-wrap text-xl",
          {
            "opacity-0": textValue.length !== 0,
          }
        )}
      >
        Click to start typing
      </div>
    </main>
  );
}
