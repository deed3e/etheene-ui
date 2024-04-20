
import Countdown ,{ zeroPad, calcTimeDelta, formatTimeDelta } from "react-countdown";

const Completionist = () => {
  return (
   <></>
  );
};
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <>
        <div
          className=" mt-3 flex space-x-4 wp-time"
          data-expired="This auction has ended" suppressHydrationWarning={true}
        >
          <span className="countdown-days text-jacarta-700 dark:text-white">
            <span className="number-top js-countdown-days-number text-lg font-medium lg:text-[1.5rem]">
                {days ? days : days}
            </span>
            <span className="block text-xs font-medium tracking-tight">
              Days
            </span>
          </span>
          <span className="  countdown-hours text-jacarta-700 dark:text-white">
            <span className="number-top js-countdown-hours-number text-lg font-medium lg:text-[1.5rem]">
              {hours ? hours : hours}
            </span>
            <span className="block text-xs font-medium tracking-tight">
              Hrs
            </span>
          </span>
          <span className=" countdown-minutes text-jacarta-700 dark:text-white">
            <span className=" number-top  js-countdown-minutes-number text-lg font-medium lg:text-[1.5rem]">
               {minutes ? minutes : minutes}
            </span>
            <span className="block text-xs font-medium tracking-tight">
              Min
            </span>
          </span>
          <div className=" countdown-seconds text-jacarta-700 dark:text-white">
            <span className=" number-top js-countdown-seconds-number text-lg font-medium lg:text-[1.5rem]" >
              {seconds}
            </span>
            <span className="block text-xs font-medium tracking-tight">
              Sec
            </span>
          </div>
        </div>
      </>
    );
  }
};


const coun = 1713275200000  - Date.now();
const CountdownWrapper = () => <Countdown date={Date.now() + coun} />;
const items_Countdown_timer = () => {
return <Countdown  zeroPadTime={2} date={Date.now() + coun} renderer={renderer} ></Countdown>;
};

export default items_Countdown_timer;






 


