import { minutes } from "@/lib/minutes";
import { useEffect, useState } from "react";

type TimerProps = {
  duration: number;
  state: string;
  counter: (n: number) => void;
};
export default function Timer({ duration, counter, state }: TimerProps) {
  const [time, setTime] = useState(duration)
  const show = duration > 4000 && state == 'running'

  const x = () => minutes(duration)

  useEffect(() => {
    let flag = setInterval(() => {
      if (duration > 4000) {
        counter(duration - 1000);
      }
      if (duration == 4) {
        clearInterval(flag)
      }
    }, 1000)
    return () => {
      clearInterval(flag);
    }
  }, [duration])

  return (
    <div>
      <pre>{show && duration ? x() : ' '}</pre>
    </div>
  )
}