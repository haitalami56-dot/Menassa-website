export default function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <section className="pt-32 pb-24 sm:pt-40">
      <div className="container-x max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-xl font-semibold text-white">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-ink-300">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
