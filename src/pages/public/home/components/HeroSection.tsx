export default function HeroSection() {
  return (
    <div className="relative">
      <img 
        src="https://images.unsplash.com/photo-1586765501508-cffc1fe200c8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Panadería - Panadería artesanal" 
        className="w-full h-[60vh] object-cover" 
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
    </div>
  )
}

