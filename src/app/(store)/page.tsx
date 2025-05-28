import { HomeSteps } from '@/components/home/home-steps/HomeSteps'

export default async function HomePage() {
  return (
    <section className='flex flex-col gap-4' aria-label='Pantalla de inicio'>
      <HomeSteps />
    </section>
  )
}
