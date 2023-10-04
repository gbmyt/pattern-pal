const Main = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="flex-none max-w-5xl items-cente text-sm pb-4 md:pb-0">
        <p className="mb-14">
          A fiber artist and pattern designer&apos;s best friend! The goal of
          this project is to make creating custom pixel-based patterns fun and
          easy for fiber artists with a love of crochet and/or knitting 🧶.
        </p>

        <p className="mb-14">
          Use our pattern-maker to create a custom grid-based design by hand, or
          import an existing grid to be converted to a pattern as-is- or
          customize it to your liking by making changes via the pattern-maker.
          Once you&apos;re happy with the way your design looks, save it to your
          account or share it with other crafters on Ravelry, Instagram, or
          Facebook!
        </p>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/grid"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Pattern Maker{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Create your first pattern!
          </p>
        </a>

        <a
          href="/faq"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            FAQ{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about fiber arts and how to make patterns of your own!
          </p>
        </a>

        <a
          href="/templates"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Create a new pattern from a template.
          </p>
        </a>

        <a
          href="/share"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Share{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Share your patterns with the community! (Coming soon)
          </p>
        </a>
      </div>
    </main>
  );
};

export default Main;
