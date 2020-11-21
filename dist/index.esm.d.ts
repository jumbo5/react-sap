/// <reference types="react" />
import React from "react";
import { SpringConfig } from "react-spring";
type animationTypes = "fade-in-bottom" | "fade-in-left" | "fade-in-right" | "fade-in-top";
interface AnimationProps {
    className?: string;
    type?: animationTypes;
    config?: SpringConfig;
    delay?: number;
    customAnimation?: object;
}
interface AnimationChainProps {
    delaysBetween?: number | number[];
}
declare const Animation: React.FC<AnimationProps>;
declare const AnimationChain: React.FC<AnimationChainProps>;
declare const saps: {
    [key in animationTypes]: object;
};
export { Animation, AnimationChain, saps };
