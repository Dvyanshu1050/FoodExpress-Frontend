const Newsletter = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl rounded-3xl bg-orange-500 p-10 text-center text-white">

        <h2 className="text-4xl font-bold">
          Subscribe Newsletter
        </h2>

        <p className="mt-4">
          Get exclusive offers directly to your inbox.
        </p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row">

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-xl px-5 py-4 text-black outline-none"
          />

          <button className="rounded-xl bg-black px-8 py-4 font-semibold">
            Subscribe
          </button>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;