import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const MorphingText = ({ texts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <div className="relative h-[1.2em] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {texts[currentIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
