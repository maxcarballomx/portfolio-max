// ... (arriba de tu componente, antes de PdfBookPage)
const totalSlides = 10; // Cambiado a 10 porque tienes 10 imágenes
const bookImages = [
  "/pdfs/01_Portada.jpg",
  "/pdfs/02_Imagen.jpg",
  "/pdfs/03_Imagen.jpg",
  "/pdfs/04_Imagen.jpg",
  "/pdfs/05_Imagen.jpg",
  "/pdfs/06_Imagen.jpg",
  "/pdfs/07_Imagen.jpg",
  "/pdfs/08_Imagen.jpg",
  "/pdfs/09_Imagen.jpg",
  "/pdfs/10_Contraportada.jpg"
];

// ... (dentro de tu componente PdfBookPage)

{/* Carrusel Side */}
<div className="relative aspect-[4/5] bg-card flex items-center justify-center overflow-hidden border border-white/5">
  {/* AQUÍ EL CAMBIO: Ahora apunta a tu arreglo local */}
  <img 
    src={bookImages[currentSlide - 1]} 
    alt={`Book spread ${currentSlide}`} 
    className="object-cover opacity-80" 
  />
  
  <div className="absolute inset-x-0 bottom-6 flex justify-between items-center px-8 z-10">
    <button onClick={prevSlide} className="p-2 bg-background/80 hover:bg-primary text-white transition-colors">
      <ChevronLeft className="w-5 h-5" />
    </button>
    <span className="text-xs tracking-[0.2em] font-medium bg-background/80 px-4 py-2">
      {currentSlide} / {totalSlides}
    </span>
    <button onClick={nextSlide} className="p-2 bg-background/80 hover:bg-primary text-white transition-colors">
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
</div>