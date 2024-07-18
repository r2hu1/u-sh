export default function Stats() {
  return (
    <section className="mb-14 mt-3 px-6 md:px-20 lg:px-32 text-center w-fit mx-auto">
      <div className="flex flex-wrap gap-5 items-center px-4 md:px-5 md:py-5 justify-center border border-border py-4 rounded-lg">
        <div className="grid !gap-0">
          <div className='flex items-center justify-center'>
            <h3 className="text-2xl md:text-2.5xl">247</h3>
            <span className='text-2xl md:text-2.5xl'>+</span>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">registered users</p>
        </div>
        <div className="grid !gap-0">
        <div className='flex items-center justify-center'>
            <h3 className="text-2xl md:text-2.5xl">1792</h3>
            <span className='text-2xl md:text-2.5xl'>+</span>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">links shorted</p>
        </div>
        <div className="grid !gap-0">
        <div className='flex items-center justify-center'>
            <h3 className="text-2xl md:text-2.5xl">85679</h3>
            <span className='text-2xl md:text-2.5xl'>+</span>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">link clicks</p>
        </div>
      </div>
    </section>
  )
};
