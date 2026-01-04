document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid-proyectos');
    
    if (!grid) return;

    const renderProyectos = (lista) => {
        grid.innerHTML = lista.map(p => `
            <a href="${p.url}" target="_blank" class="group block glass-card p-4 rounded-3xl transition-all duration-500">
                <div class="overflow-hidden rounded-2xl mb-6 aspect-video">
                    <img src="${p.imagen}" 
                         alt="${p.titulo}" 
                         class="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out">
                </div>
                <div class="px-2">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-2xl font-black italic tracking-tighter text-white">${p.titulo}</h4>
                        <svg class="w-5 h-5 text-brand opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </div>
                    <p class="text-gray-400 font-light text-sm mb-4 leading-relaxed">${p.descripcion}</p>
                    <span class="text-[10px] font-bold tracking-[0.2em] text-brand uppercase border border-brand/30 px-3 py-1 rounded-full">
                        ${p.tech}
                    </span>
                </div>
            </a>
        `).join('');
    };

    renderProyectos(proyectos);
});