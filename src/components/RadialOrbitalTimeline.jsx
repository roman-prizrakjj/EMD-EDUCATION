import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductModal } from "@/components/ui/product-modal";

const getOrbitRadius = () => {
    if (typeof window === 'undefined') return 220;
    const w = window.innerWidth;
    if (w < 768) return 144;
    if (w < 1280) return 220;
    if (w < 1536) return 300;
    return 340;
};

export default function RadialOrbitalTimeline({ timelineData }) {
    const [expandedItems, setExpandedItems] = useState({});
    const [rotationAngle, setRotationAngle] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const [pulseEffect, setPulseEffect] = useState({});
    const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
    const [activeNodeId, setActiveNodeId] = useState(null);
    const [modalProduct, setModalProduct] = useState(null);
    const [orbitRadius, setOrbitRadius] = useState(getOrbitRadius);
    const containerRef = useRef(null);
    const orbitRef = useRef(null);
    const nodeRefs = useRef({});

    useEffect(() => {
        const handleResize = () => setOrbitRadius(getOrbitRadius());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const openProductModal = (product) => {
        if (product) {
            setModalProduct(product);
        }
    };

    const closeProductModal = () => {
        setModalProduct(null);
    };

    const handleContainerClick = (e) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) {
                    newState[parseInt(key)] = false;
                }
            });

            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);

                const relatedItems = getRelatedItems(id);
                const newPulseEffect = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);

                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }

            return newState;
        });
    };

    useEffect(() => {
        let rotationTimer;

        if (autoRotate) {
            rotationTimer = setInterval(() => {
                setRotationAngle((prev) => {
                    const newAngle = (prev + 0.3) % 360;
                    return Number(newAngle.toFixed(3));
                });
            }, 50);
        }

        return () => {
            if (rotationTimer) {
                clearInterval(rotationTimer);
            }
        };
    }, [autoRotate]);

    const centerViewOnNode = (nodeId) => {
        if (!nodeRefs.current[nodeId]) return;

        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;

        setRotationAngle(270 - targetAngle);
    };

    const calculateNodePosition = (index, total) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radian = (angle * Math.PI) / 180;

        const x = orbitRadius * Math.cos(radian) + centerOffset.x;
        const y = orbitRadius * Math.sin(radian) + centerOffset.y;

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(
            0.6,
            Math.min(1, 0.6 + 0.4 * ((1 + Math.sin(radian)) / 2))
        );

        return { x, y, angle, zIndex, opacity };
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "from-white/90 to-white/70";
            case "in-progress":
                return "from-white/70 to-white/50";
            case "pending":
                return "from-white/50 to-white/30";
            default:
                return "from-white/50 to-white/30";
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "completed":
                return "Доступно";
            case "in-progress":
                return "В работе";
            case "pending":
                return "Скоро";
            default:
                return "";
        }
    };

    const getRelatedItems = (itemId) => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem?.relatedIds || [];
    };

    const isRelatedToActive = (itemId) => {
        if (!activeNodeId) return false;
        const relatedItems = getRelatedItems(activeNodeId);
        return relatedItems.includes(itemId);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "completed":
                return "text-white bg-black border-white";
            case "in-progress":
                return "text-black bg-white border-black";
            case "pending":
                return "text-white bg-black/40 border-white/50";
            default:
                return "text-white bg-black/40 border-white/50";
        }
    };

    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={orbitRef}
                    style={{
                        perspective: "1000px",
                        transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
                    }}
                >
                    <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 flex items-center justify-center z-10 shadow-lg shadow-purple-500/30">
                        <div className="absolute w-32 h-32 rounded-full border border-white/20 animate-ping opacity-70"></div>
                        <div
                            className="absolute w-40 h-40 rounded-full border border-white/10 animate-ping opacity-50"
                            style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div className="w-16 h-16 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <span className="text-white font-orbitron font-bold text-sm tracking-wider">EMD</span>
                        </div>
                    </div>

                    <div className="absolute w-72 h-72 md:w-[440px] md:h-[440px] xl:w-[600px] xl:h-[600px] 2xl:w-[680px] 2xl:h-[680px] rounded-full border border-white/15"></div>

                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isExpanded = expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id];
                        const Icon = item.icon;

                        const nodeStyle = {
                            transform: `translate(${position.x}px, ${position.y}px)`,
                            zIndex: isExpanded ? 200 : position.zIndex,
                            opacity: isExpanded ? 1 : position.opacity,
                        };

                        return (
                            <div
                                key={item.id}
                                ref={(el) => (nodeRefs.current[item.id] = el)}
                                className="absolute transition-all duration-700 cursor-pointer"
                                style={nodeStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                <div
                                    className={`absolute rounded-full ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                                    style={{
                                        background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 70%)`,
                                        width: `${item.energy * 0.8 + 60}px`,
                                        height: `${item.energy * 0.8 + 60}px`,
                                        left: `calc(50% - ${(item.energy * 0.8 + 60) / 2}px)`,
                                        top: `calc(50% - ${(item.energy * 0.8 + 60) / 2}px)`,
                                    }}
                                ></div>

                                <div
                                    className={`
                                        w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center
                                        transition-all duration-300 transform hover:scale-110
                                        ${isExpanded
                                            ? "bg-white text-black scale-125"
                                            : isRelated
                                                ? "bg-white/20 text-white"
                                                : "bg-black text-white"
                                        }
                                        border-2 
                                        ${isExpanded
                                            ? "border-white shadow-xl shadow-white/40"
                                            : isRelated
                                                ? "border-white animate-pulse shadow-lg shadow-white/20"
                                                : "border-white/50 shadow-lg shadow-black/50"
                                        }
                                    `}
                                >
                                    <Icon size={24} className="drop-shadow-md" />
                                </div>



                                <div
                                    className={`
                                        absolute top-16 md:top-20 left-1/2 -translate-x-1/2 text-center
                                        transition-all duration-300 max-w-[180px] md:max-w-[220px]
                                        ${isExpanded ? "opacity-0" : "opacity-100"}
                                    `}
                                >
                                    <div 
                                        className={`
                                            text-sm md:text-base font-bold tracking-wide leading-tight
                                            ${isExpanded ? "text-white" : "text-white"}
                                            drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
                                        `}
                                        style={{ textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}
                                    >
                                        {item.title}
                                    </div>
                                </div>

                                {isExpanded && (
                                    <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-[280px] sm:w-[350px] md:w-[450px] max-h-[60vh] overflow-y-auto bg-black/95 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 z-[250]">
                                        <CardHeader className="pb-3 p-4 md:p-6">
                                            <div className="flex justify-between items-center">
                                                <Badge
                                                    className={`px-3 py-1 text-sm md:text-base ${getStatusStyles(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status === "completed"
                                                        ? "COMPLETE"
                                                        : item.status === "in-progress"
                                                            ? "IN PROGRESS"
                                                            : "PENDING"}
                                                </Badge>
                                                <span className="text-sm md:text-base font-mono text-white/50">
                                                    {item.date}
                                                </span>
                                            </div>
                                            <CardTitle className="text-xl md:text-2xl mt-3">
                                                {item.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm md:text-base text-white/80 p-4 md:p-6 pt-0">
                                            <p>{item.content}</p>

                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <div className="flex justify-between items-center text-sm md:text-base mb-2">
                                                    <span className="flex items-center">
                                                        <Zap size={18} className="mr-2" />
                                                        Energy Level
                                                    </span>
                                                    <span className="font-mono text-base md:text-lg">{item.energy}%</span>
                                                </div>
                                                <div className="w-full h-2 md:h-3 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-white/60 to-white/40"
                                                        style={{ width: `${item.energy}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {item.products && item.products.length > 0 && (
                                                <div className="mt-4 pt-4 border-t border-white/10">
                                                    <div className="flex items-center mb-3">
                                                        <Link size={18} className="text-white/70 mr-2" />
                                                        <h4 className="text-sm md:text-base uppercase tracking-wider font-medium text-white/70">
                                                            ПРОДУКТЫ
                                                        </h4>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.products.map((product) => (
                                                            <Button
                                                                key={product.id}
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex items-center h-8 md:h-10 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openProductModal(product);
                                                                }}
                                                            >
                                                                {product.title}
                                                                <ArrowRight
                                                                    size={14}
                                                                    className="ml-1 md:ml-2 text-white/60"
                                                                />
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <ProductModal
                isOpen={modalProduct !== null}
                onClose={closeProductModal}
                product={modalProduct}
            />
        </div>
    );
}
