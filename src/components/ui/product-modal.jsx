import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Users, CheckCircle, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductModal({ isOpen, onClose, product }) {
    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300]"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-16 z-[301] overflow-hidden"
                    >
                        <div className="relative w-full h-full bg-black/95 border border-white/20 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
                            
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/50 hover:bg-white/10 transition-all group"
                            >
                                <X size={24} className="text-white/70 group-hover:text-white transition-colors" />
                            </button>

                            <div className="relative h-full overflow-y-auto p-8 md:p-12 lg:p-16">
                                <div className="max-w-4xl mx-auto">
                                    <div className="mb-8">
                                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-orbitron tracking-tight mb-4">
                                            {product.title}
                                        </h2>
                                        {product.details?.level && (
                                            <span className="inline-block px-4 py-1 text-sm bg-white/10 border border-white/20 rounded-full text-white/80">
                                                {product.details.level}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-10">
                                        <h3 className="text-xl font-semibold text-white mb-4 font-rajdhani tracking-wide">ОПИСАНИЕ</h3>
                                        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                                            {product.content}
                                        </p>
                                    </div>

                                    {product.details && (
                                        <>
                                            {product.details.features && (
                                                <div className="mb-10">
                                                    <h3 className="text-xl font-semibold text-white mb-4 font-rajdhani tracking-wide">ЧТО ВКЛЮЧЕНО</h3>
                                                    <ul className="space-y-3">
                                                        {product.details.features.map((feature, idx) => (
                                                            <motion.li
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.4 + idx * 0.1 }}
                                                                className="flex items-start gap-3 text-white/80"
                                                            >
                                                                <CheckCircle size={20} className="text-green-400 mt-1 flex-shrink-0" />
                                                                <span className="text-lg">{feature}</span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                                {product.details.duration && (
                                                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                                        <Clock size={24} className="text-blue-400 mb-3" />
                                                        <div className="text-sm text-white/50 mb-1">Длительность</div>
                                                        <div className="text-xl font-semibold text-white">{product.details.duration}</div>
                                                    </div>
                                                )}
                                                {product.details.format && (
                                                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                                        <Users size={24} className="text-purple-400 mb-3" />
                                                        <div className="text-sm text-white/50 mb-1">Формат</div>
                                                        <div className="text-xl font-semibold text-white">{product.details.format}</div>
                                                    </div>
                                                )}
                                                {product.details.level && (
                                                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                                        <Zap size={24} className="text-yellow-400 mb-3" />
                                                        <div className="text-sm text-white/50 mb-1">Уровень</div>
                                                        <div className="text-xl font-semibold text-white">{product.details.level}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                                        <Button
                                            className="flex-1 h-14 text-lg bg-white text-black hover:bg-white/90 rounded-full font-semibold"
                                            onClick={() => window.open('https://t.me/your_channel', '_blank')}
                                        >
                                            Узнать больше
                                            <ArrowRight size={20} className="ml-2" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1 h-14 text-lg border-white/20 bg-transparent hover:bg-white/10 text-white rounded-full font-semibold"
                                            onClick={onClose}
                                        >
                                            Закрыть
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
