/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Story = ({ url, text, creatorId }: { url: string; text: string, creatorId: string }) => {
  const router = useRouter();
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        router.push(`/profile/${creatorId}`);
      }}
      className="flex flex-col relative items-center"
    >
      <img
        className="w-[72px] h-[72px] min-w-[72px] min-h-[72px] object-cover overflow-hidden rounded-2xl"
        src={url}
        alt=""
      />
      <p className="text-xs font-groteskLight text-cultureBeige mt-2">{text}</p>
    </motion.div>
  );
};

export { Story };
