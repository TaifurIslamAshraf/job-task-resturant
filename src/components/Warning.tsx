import Image from "next/image";

const Warning = () => {
  return (
    <div className="bg-[#e4f2dc] flex items-center justify-start gap-1 p-1 rounded-2xl">
      <div className="  ">
        <Image src="/gift.png" alt="free delivery" width={60} height={60} />
      </div>
      <h1 className="text-[#72aa52] text-sm">Free delivery – on any order</h1>
    </div>
  );
};

export default Warning;
