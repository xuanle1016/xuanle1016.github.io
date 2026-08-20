import React, { useEffect, useState } from 'react';
import { Palette, Sun, Moon } from 'lucide-react';

export const Navbar = ({
  onRibbonFxClick,
}: {
  onRibbonFxClick: () => void;
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    /*
     * THEME CLASS
     *
     * CSS handles the actual background colors.
     * We only add/remove the "dark" class here.
     */

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    /*
     * SCROLL PROGRESS
     */

    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        docHeight > 0
          ? scrollTop / docHeight
          : 0;

      const bar = document.querySelector(
        '.scroll-progress'
      ) as HTMLElement | null;

      if (bar) {
        bar.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener(
      'scroll',
      updateProgress,
      { passive: true }
    );

    updateProgress();

    return () => {
      window.removeEventListener(
        'scroll',
        updateProgress
      );
    };
  }, []);

  /*
   * SMOOTH SCROLL
   */

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {/* =====================================================
          RAINBOW SCROLL PROGRESS BAR
          ===================================================== */}

      <div
        className="
          fixed
          top-0
          left-0
          w-full
          h-1
          z-[1001]
          origin-left
          scale-x-0
          scroll-progress
        "
        style={{
          background:
            'linear-gradient(to right, #22d3ee, #a855f7, #ec4899)',
        }}
      />


      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <nav
        className={`
          fixed
          top-6
          left-1/2
          -translate-x-1/2

          w-[95%]
          max-w-7xl

          z-[1000]

          flex
          items-center
          justify-between

          px-6
          py-2.5

          rounded-full

          transition-all
          duration-500

          border

          ${
            isDark
              ? `
                bg-[#0a1128]/80
                backdrop-blur-xl
                border-white/10
                shadow-2xl
              `
              : `
                bg-white/70
                backdrop-blur-xl
                border-slate-200
                shadow-xl
              `
          }
        `}
      >

        {/* ===================================================
            LEFT — LOGO
            =================================================== */}

        <div className="flex items-center gap-3">

          {/* Logo */}

          <div
            className="
              w-10
              h-10
              rounded-xl
              p-[1.5px]

              bg-gradient-to-br
              from-cyan-400
              via-purple-500
              to-pink-500

              shadow-lg
            "
          >

            <div
              className={`
                w-full
                h-full

                rounded-[10px]

                flex
                items-center
                justify-center

                transition-colors
                duration-500

                ${
                  isDark
                    ? 'bg-[#0a1128]'
                    : 'bg-white'
                }
              `}
            >

              <span
                className="
                  font-black
                  text-xs

                  bg-gradient-to-br
                  from-cyan-400
                  via-purple-500
                  to-pink-500

                  bg-clip-text
                  text-transparent

                  tracking-tighter
                "
              >
                XL
              </span>

            </div>
          </div>


          {/* Name */}

          <div
            className="
              flex
              flex-col
              leading-tight
            "
          >

            <span
              className={`
                font-bold
                text-base
                tracking-tight

                transition-colors
                duration-500

                ${
                  isDark
                    ? 'text-white'
                    : 'text-[#1e3a5f]'
                }
              `}
            >
              Sew Xuan Le
            </span>

            <span
              className="
                text-[11px]
                text-slate-500
                font-medium
                uppercase
                tracking-wider
              "
            >
              AI / Data / Cloud
            </span>

          </div>

        </div>


        {/* ===================================================
            CENTER — NAVIGATION LINKS
            =================================================== */}

        <div
          className={`
            hidden
            lg:flex
            items-center
            gap-8
            px-8
            py-2.5
            rounded-full
            font-semibold
            border
            transition-all
            duration-500

            ${
              isDark
                ? `
                  bg-white/5
                  border-white/10
                  text-slate-300
                `
                : `
                  bg-slate-100/50
                  border-slate-200
                  text-slate-600
                `
            }
          `}
        >

          {[
            'about',
            'projects',
            'experiences',
            'skills',
          ].map((id) => (

            <a
              key={id}
              onClick={() => scrollTo(id)}
              className="
                hover:text-cyan-400

                transition-colors

                cursor-pointer

                capitalize

                text-[15px]
              "
            >
              {id}
            </a>

          ))}


          <a
            onClick={() => scrollTo('contact')}
            className="
              hover:text-cyan-400

              transition-colors

              cursor-pointer

              text-[15px]
            "
          >
            Contact
          </a>

        </div>


        {/* ===================================================
            RIGHT — ACTIONS
            =================================================== */}

        <div
          className="
            flex
            items-center
            gap-5
          "
        >

          {/* Ribbon FX */}

          <button
            onClick={onRibbonFxClick}
            className={`
              hidden
              sm:flex

              items-center
              gap-2

              text-[12px]

              font-black

              uppercase

              tracking-[0.15em]

              transition-colors

              ${
                isDark
                  ? `
                    text-slate-400
                    hover:text-white
                  `
                  : `
                    text-slate-500
                    hover:text-slate-900
                  `
              }
            `}
          >

            <Palette
              size={14}
              className="text-cyan-500"
            />

            Ribbon FX

          </button>


          {/* =================================================
              DARK MODE TOGGLE
              ================================================= */}

          <button
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={
              isDark
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            className={`
              px-6
              py-2.5

              rounded-full

              transition-all

              duration-300

              shadow-xl

              active:scale-90

              flex
              items-center
              justify-center

              ${
                isDark
                  ? `
                    bg-white
                    text-[#0a1128]

                    hover:bg-slate-100

                    shadow-white/5
                  `
                  : `
                    bg-[#0a1128]
                    text-white

                    hover:bg-slate-800

                    shadow-blue-900/20
                  `
              }
            `}
          >

            {isDark ? (

              <Moon
                size={20}
                className="
                  text-blue-600

                  animate-in
                  fade-in
                  zoom-in

                  duration-300
                "
              />

            ) : (

              <Sun
                size={20}
                className="
                  text-cyan-400

                  animate-in
                  fade-in
                  zoom-in

                  duration-300
                "
              />

            )}

          </button>

        </div>

      </nav>
    </>
  );
};