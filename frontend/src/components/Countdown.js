import { useEffect, useState } from "react";

function Countdown({ targetDate }) {
    const calculateTimeLeft = () => {
        const difference = new Date(targetDate) - new Date();

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
                (difference / (1000 * 60 * 60)) % 24
            ),
            minutes: Math.floor(
                (difference / (1000 * 60)) % 60
            ),
            seconds: Math.floor(
                (difference / 1000) % 60
            ),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div>
            <p>
                {timeLeft.days} Days{" "}
                {timeLeft.hours} Hours{" "}
                {timeLeft.minutes} Minutes{" "}
                {timeLeft.seconds} Seconds
            </p>
        </div>
    );
}

export default Countdown;