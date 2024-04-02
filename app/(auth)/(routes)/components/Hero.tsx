const Hero = () => {
  return (
    <main className="pointer-events-none my-auto flex flex-col items-center gap-2 text-center lg:items-start lg:gap-3 lg:pl-5 lg:text-left">
      <h2 className=" text-4xl font-bold tracking-tighter  lg:text-6xl">
        Ecom.
      </h2>
      <h2 className="text-xl  font-semibold  text-slate-800 lg:text-3xl">
        Welcome to Admin Dashboard 🙏
      </h2>
      <p className="max-w-sm text-base  text-slate-600 lg:max-w-md  lg:text-lg">
        Best place to sell your products and manage all your stores under one
        roof!
      </p>
    </main>
  );
};

export default Hero;
