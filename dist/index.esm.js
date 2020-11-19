import React, { useMemo } from 'react';
import { useSpring, animated } from 'react-spring';

const saps = {
    'fade-in-bottom': {
        from: { transform: 'translateY(100%)', opacity: 0 },
        to: { transform: 'translateY(0%)', opacity: 1 },
    },
    'fade-in-top': {
        from: { transform: 'translateY(-100%)', opacity: 0 },
        to: { transform: 'translateY(0%)', opacity: 1 },
    },
    'fade-in-left': {
        from: { transform: 'translateX(-100%)', opacity: 0 },
        to: { transform: 'translateX(0%)', opacity: 1 },
    },
    'fade-in-right': {
        from: { transform: 'translateX(100%)', opacity: 0 },
        to: { transform: 'translateX(0%)', opacity: 1 },
    },
};

const DEFAULT_DELAY = 0;
const DEFAULT_DURATION = 400;

const Animation = ({ children, className, type = 'fade-in-bottom', config, delay = DEFAULT_DELAY, customAnimation, }) => {
    const springProps = useSpring({
        delay,
        config: {
            duration: DEFAULT_DURATION,
            ...config,
        },
        ...(customAnimation || saps[type]),
    });
    return (React.createElement(animated.div, { style: springProps, className: className }, children));
};

const AnimationChain = ({ children, delaysBetween = 0, }) => {
    const delays = useMemo(() => {
        const childrenDelays = React.Children.map(children, (child, i) => {
            var _a;
            return ({
                duration: ((_a = child.props.config) === null || _a === void 0 ? void 0 : _a.duration) || DEFAULT_DURATION,
                delay: (child.props.delay || DEFAULT_DELAY) +
                    (Array.isArray(delaysBetween) ? delaysBetween[i] : delaysBetween),
            });
        });
        return childrenDelays
            .reduce((acc, item, index) => [
            ...acc,
            {
                duration: item.duration,
                delay: index > 0
                    ? acc[index - 1].delay + acc[index - 1].duration + item.delay
                    : item.delay,
            },
        ], [])
            .map((item) => item.delay);
    }, [children, delaysBetween]);
    return (React.createElement(React.Fragment, null, React.Children.map(children, (child, i) => React.cloneElement(child, {
        ...child === null || child === void 0 ? void 0 : child.props,
        delay: delays[i],
    }))));
};

export { Animation, AnimationChain, saps };
//# sourceMappingURL=index.esm.js.map
