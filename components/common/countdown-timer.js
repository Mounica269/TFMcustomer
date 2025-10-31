import moment from "moment";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const CountDownTimer = (props) => {
    const timeNow = Date.now();
    const [remindTime, setRemindTime] = useState(null);

    const Completionist = () => <span>Today Matches is end now</span>;
    const reminderCom = ({ hours, minutes, seconds, completed }) => {
        return completed ? (
            <Completionist />
        ) : (
            <span>
                 {hours + "H"} : {minutes + "M"} : {seconds + "S"}
            </span>
        );
    };

    useEffect(() => {
        const intervel = setInterval(() => {
            const currenTime = moment();
            const endOfTheDay = moment().endOf("day");
            const remind = currenTime.diff(endOfTheDay);
            setRemindTime(remind);
        }, remindTime);
        return () => clearInterval(intervel);
    }, [setRemindTime]);

    return <Countdown date={timeNow - remindTime} daysInHours={true} renderer={reminderCom} />;
};

export default CountDownTimer;
