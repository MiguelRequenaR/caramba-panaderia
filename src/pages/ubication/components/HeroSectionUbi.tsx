export default function HeroSectionUbi() {
  return (
    <div className="relative">
      <img 
        src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Caramba Panadería - Ubicación" 
        className="w-full h-[70vh] object-cover" 
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
      <h1
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 text-6xl font-bold uppercase text-white text-center"
        data-aos="fade-up"
      >
        Nuestras Tiendas
      </h1>
    </div>
  )
}
