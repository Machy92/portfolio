/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, createContext, useContext, useState } from 'react';
import Lenis from '@studio-freight/lenis';

const ScrollContext = createContext({ lenis: null });

export const useScrollContext = () => useContext(ScrollContext);

const SmoothScroll = ({ children }) => {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        setLenis(lenisInstance);

        let rafId;

        function raf(time) {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <ScrollContext.Provider value={{ lenis }}>
            <div className="smooth-wrapper">{children}</div>
        </ScrollContext.Provider>
    );
};

export default SmoothScroll;
