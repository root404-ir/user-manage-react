import React from 'react';
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
    const particlesInit = async (main) => {
        // بارگذاری کامل پارتیکل‌ها
        await loadFull(main);
    };

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const particleOptions = {
        particles: {
            number: {
                value: 10,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: "#00b3ff",
            },
            shape: {
                type: "polygon",
                stroke: {
                    width: 0,
                    color: "#000",
                },
                polygon: {
                    nb_sides: 6,
                },
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                },
            },
            size: {
                value: 160,
                random: false,
                anim: {
                    enable: true,
                    speed: 10,
                    size_min: 40,
                    sync: false,
                },
            },
            line_linked: {
                enable: false,
            },
            move: {
                enable: true,
                speed: 8,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: false,
                    mode: "grab",
                },
                onclick: {
                    enable: false,
                    mode: "remove",
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: true,
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particleOptions} // انتقال تنظیمات به عنوان options
        />
    );
};

export default ParticleBackground;
