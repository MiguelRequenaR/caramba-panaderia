interface ButtonProps {
  children: React.ReactNode
}

export default function Button({ children }: ButtonProps) {
  return (
    <button
      className="relative overflow-hidden bg-secondary px-5 py-2 uppercase cursor-pointer border border-secondary group transition-colors duration-500"
    >
      <span
        className="
          absolute inset-0 
          bg-white
          translate-y-full
          group-hover:translate-y-0
          transition-transform duration-500 ease-in-out pointer-events-none
        "
      />
      <span
        className="relative z-10 transition-colors duration-500 text-white group-hover:text-secondary font-bold"
      >
        {children}
      </span>
    </button>
  )
}
