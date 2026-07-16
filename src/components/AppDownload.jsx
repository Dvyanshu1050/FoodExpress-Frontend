const AppDownload = () => {
  return (
    <section className="bg-orange-500 py-20 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-5 lg:flex-row">

        <div>

          <h2 className="text-5xl font-bold">
            Download Our App
          </h2>

          <p className="mt-5 max-w-xl text-lg">
            Order your favourite food anytime and anywhere.
            Fast delivery, exclusive offers and secure payments.
          </p>

          <div className="mt-8 flex gap-4">

            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-black">
              Google Play
            </button>

            <button className="rounded-xl bg-black px-6 py-3 font-semibold">
              App Store
            </button>

          </div>

        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
          className="h-72"
        />

      </div>
    </section>
  );
};

export default AppDownload;