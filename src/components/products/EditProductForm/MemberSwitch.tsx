import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
const cultureOrange = "#FE621D";
const cultureBeige = "#CAC5BF";

export const MemberSwitch = ({
  memberOnly,
  setmemberOnly,
  className,
}: {
  memberOnly: boolean;
  setmemberOnly: (membersonly: boolean) => void;
  className?: string;
}) => {
  const ring = useAnimation();
  const puck = useAnimation();

  useEffect(() => {
    if (memberOnly) {
      ring.start({
        borderColor: cultureOrange,
      });
      puck.start({
        backgroundColor: cultureOrange,
        x: "46px",
      });
    } else {
      ring.start({
        borderColor: cultureBeige,
      });
      puck.start({
        backgroundColor: cultureBeige,
        x: "0",
      });
    }
  }, [memberOnly]);

  return (
    <motion.div
      onClick={() => setmemberOnly(!memberOnly)}
      animate={ring}
      className={twMerge(
        "flex items-center relative p-[2px] w-[79px] h-[32px] border-white border-[1.5px] rounded-full text-white",
        className
      )}
    >
      {/* puck */}
      <motion.span
        animate={puck}
        className="flex min-w-[26px] min-h-[26px] bg-white rounded-full "
      ></motion.span>
      {/* state */}
      {memberOnly ? (
        <motion.p
          key={"tribe-switch"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="text-[10px] mr-auto px-1 absolute left-2 text-cultureOrange"
        >
          Tribe
        </motion.p>
      ) : (
        <motion.p
          key={"member-switch"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="text-[10px] ml-auto px-1 absolute right-1"
        >
          Anyone
        </motion.p>
      )}
    </motion.div>
  );
};
