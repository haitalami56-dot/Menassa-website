import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-[70dvh] items-center pt-28 pb-20">
      <div className="container-x max-w-xl text-center">
        <p className="text-7xl font-semibold text-gradient" dir="ltr">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Page introuvable · الصفحة غير موجودة · Page not found</h1>
        <Link href="/" className="btn btn-primary mt-8">Menassa</Link>
      </div>
    </section>
  )
}
