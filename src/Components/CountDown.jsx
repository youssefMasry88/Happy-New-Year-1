import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
const CountDown = () => {
  const getTimeLeft = () => {
  const now = new Date();
  const endOfYear = new Date(now.getFullYear(), 11,31,23,59,59);
  const diff = endOfYear - now; 
  return {
    days: Math.max(0, Math.floor(diff / (1000 * 60 *60 *24))),
    hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
    minutes: Math.max(0, Math.floor((diff / (1000 * 60))% 60)),
    seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    finished: diff <=0,
  };
};


const [time, setTime] = useState(getTimeLeft());

useEffect(() => {
  const interval = setInterval(() => {
    const times = getTimeLeft();
    setTime(times);}
    ,1000);

    return () => clearInterval(interval);
},[]);



  return (
    <div className='min-h-screen flex flex-col items-center justify-center relative text-white bg-cover bg-center' style={{backgroundImage:"url(https://images.pexels.com/photos/306864/pexels-photo-306864.jpeg?_gl=1*1oerpju*_ga*MTc2Mzk3MjY4LjE3NjcxNDUwMTQ.*_ga_8JE65Q40S6*czE3NjcxNDUwMTMkbzEkZzEkdDE3NjcxNDUwMzMkajQwJGwwJGgw)"}} >
        {time.finished && <Confetti /> }

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-10">
          {time.finished ? "🎉 Happy New Year 🎉" : "Countdown To End Of The Year"}
        </h1>
      </div>
      {!time.finished && (
        <div className="flex gap-6 z-10">
          <TimeBox label="Days" value={time.days} />
          <TimeBox label="Hours" value={time.hours} />
          <TimeBox label="Minutes" value={time.minutes} />
          <TimeBox label="Seconds" value={time.seconds} />
        </div>
      )}
    </div>
  )
  
  
}
function TimeBox({label, value}) {
  return (
    <div className="rounded-lg p-4 text-center w-17 md:w-22 z-10 bg-black/50">
      <div className="text-4xl font-bold">{value}</div>
      <span className="text-sm text-center ">{label}</span>
    </div>
  )
}

export default CountDown
