import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const CountDown = () => {
  const getTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(2026, 6, 9, 10, 30, 0); // July 9, 2026, 10:30 AM
    const diff = targetDate - now;
    return {
      days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
      finished: diff <= 0,
    };
  };

  const [time, setTime] = useState(getTimeLeft());
  const G1 = `${import.meta.env.BASE_URL}G1.png`;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getTimeLeft();
      setTime(newTime);

      if (newTime.finished) {
        clearInterval(interval);
      }
    }, 1000);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center text-white bg-fixed "
      style={{
        backgroundImage:
          "url('https://img.magnific.com/premium-photo/high-quality-digital-image-wallpaper_783884-115137.jpg?w=1480 ')",
      }}
    >
      {time.finished && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          width={windowSize.width}
          numberOfPieces={400}
          run={true}
        />
      )}

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10  text-center flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 ">
          {time.finished && (
            <img
              src={G1}
              alt="Graduation"
              className="w-40 lg:w-52 h-auto animate-bounce -mb-15 md:mb-0"
            />
          )}
          <h1
            className={` text-center transition-all duration-1000 ${
              time.finished
                ? "opacity-100 scale-110 animate-bounce"
                : "opacity-100 scale-75"
            }`}
          >
            {time.finished ? (
              <>
                <div className=" text-3xl md:text-5xl font-semibold">
                  Already graduated nigger
                </div>
                <div className="  text-2xl md:text-4xl font-bold">
                  {" "}
                  🎉 Happy Graduation Day 🎉
                </div>
              </>
            ) : (
              <div className="text-6xl md:text-8xl  font-semibold">
                Countdown To Graduation
              </div>
            )}
          </h1>
          {time.finished && (
            <img
              src={G1}
              alt="Graduation"
              className="w-40 lg:w-52 h-auto animate-bounce -mt-2 md:mt-0"
            />
          )}
        </div>

        {!time.finished && (
          <div className="flex flex-wrap justify-center gap-6">
            <TimeBox label="Days" value={time.days} />
            <TimeBox label="Hours" value={time.hours} />
            <TimeBox label="Minutes" value={time.minutes} />
            <TimeBox label="Seconds" value={time.seconds} />
          </div>
        )}
      </div>
    </div>
  );
};

function TimeBox({ label, value }) {
  return (
    <div className="z-10 w-24 rounded-xl bg-black/40 backdrop-blur-md p-4 text-center shadow-lg md:w-28">
      <div className="text-5xl font-bold">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-2 text-sm uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

export default CountDown;


