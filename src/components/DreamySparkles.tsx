"use client";

const sparkles = [
  ["7%", "14%", "3px", "0s", "5.2s"],
  ["18%", "68%", "2px", "1.1s", "6s"],
  ["26%", "28%", "4px", "0.4s", "5.6s"],
  ["34%", "82%", "3px", "2s", "6.4s"],
  ["42%", "18%", "2px", "1.7s", "5.8s"],
  ["51%", "58%", "4px", "0.8s", "6.2s"],
  ["63%", "11%", "3px", "2.4s", "5.4s"],
  ["71%", "76%", "2px", "1.2s", "6.8s"],
  ["82%", "33%", "4px", "0.2s", "5.7s"],
  ["91%", "64%", "3px", "2.8s", "6.1s"],
  ["12%", "44%", "2px", "3.1s", "5.9s"],
  ["57%", "91%", "3px", "1.5s", "6.5s"],
  ["76%", "49%", "2px", "3.5s", "5.3s"],
  ["96%", "19%", "3px", "2.1s", "6.6s"],
] as const;

export default function DreamySparkles() {
  return (
    <div className="dreamy-sparkles fixed inset-0 pointer-events-none z-[6]" aria-hidden="true">
      {sparkles.map(([left, top, size, delay, duration], index) => (
        <span
          key={`${left}-${top}-${index}`}
          style={{
            left,
            top,
            width: size,
            height: size,
            animationDelay: delay,
            animationDuration: duration,
          }}
        />
      ))}
    </div>
  );
}
