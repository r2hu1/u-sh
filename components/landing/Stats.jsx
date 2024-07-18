export default function Stats() {
  return (
    <section className="mb-14 mt-3 px-6 md:px-20 lg:px-32 text-center w-fit mx-auto">
      <div className="flex flex-wrap gap-5 items-center px-4 justify-center border border-border py-4 rounded-lg">
        <div className="grid !gap-0">
          <h1 className="text-2xl font-medium md:text-3xl">400+</h1>
          <p className="text-muted-foreground text-sm sm:text-base">registered users</p>
        </div>
        <div className="grid !gap-0">
          <h1 className="text-2xl font-medium md:text-3xl">24300+</h1>
          <p className="text-muted-foreground text-sm sm:text-base">links shorted</p>
        </div>
        <div className="grid !gap-0">
          <h1 className="text-2xl font-medium md:text-3xl">7.98m+</h1>
          <p className="text-muted-foreground text-sm sm:text-base">link clicks</p>
        </div>
      </div>
    </section>
  )
};