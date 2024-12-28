import { Info, Star, Truck } from "lucide-react";

const Banner = () => {
  return (
    <div
      className="relative min-h-[300px] w-full bg-cover bg-center bg-no-repeat lg:rounded-[36px] rounded-none"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      <div
        className="absolute inset-0 lg:rounded-[36px] rounded-none"
        style={{
          background:
            "linear-gradient(231.36deg, rgba(26, 0, 0, 0) 35.77%, #1A0000 100%)",
        }}
      >
        <div className=" px-8 h-full flex items-end pb-8">
          <div className="text-white w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">KFC Gogol</h1>

            <div className="text-black flex items-center gap-2">
              <button className="bg-white/75 hover:bg-white/85 py-3 max-w-[130px] w-full rounded-2xl flex items-center fontsemibold justify-center gap-3">
                <Truck className="h-7 w-7" size={40} />
                <div className=" text-start">
                  <p className="font-semibold text-lg leading-3 tracking-wide">
                    40-50
                  </p>
                  <p className="text-sm font-light text-mprimry">min</p>
                </div>
              </button>

              <button className="bg-white/75 hover:bg-white/85 py-3 max-w-[110px] w-full rounded-2xl flex items-center fontsemibold justify-center gap-3">
                <Star className="h-7 w-7" size={40} />
                <div className=" text-start">
                  <p className="font-semibold text-lg leading-3 tracking-wide">
                    4.4
                  </p>
                  <p className="text-sm font-light text-mprimry">200+</p>
                </div>
              </button>
              <button className="bg-white/75 hover:bg-white/85 p-3 rounded-2xl flex items-center fontsemibold justify-center gap-3">
                <Info className="h-7 w-7" size={40} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
