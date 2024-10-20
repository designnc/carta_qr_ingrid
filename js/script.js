document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');

    fetch('data/menu.json')
        .then(response => response.json())
        .then(data => {
            data.menu.forEach((section, index) => {
                const sectionDiv = document.createElement('div');
                sectionDiv.id = `section-${index}`;
                sectionDiv.classList.add('section', 'relative', 'p-8', 'rounded-xl', 'transition', 'duration-300', 'min-h-[600px]', 'flex', 'items-center', 'border-2', 'border-primary-300', 'overflow-hidden');

                sectionDiv.innerHTML = `
    <div class="absolute inset-0 w-full h-full z-0 bg-blue-500" style="background: url('img/section_bg.svg') center; background-size: cover, contain; background-repeat: no-repeat, repeat;"></div>
    <div class="absolute inset-0 bg-white bg-opacity-90 z-10"></div> 
    <div class="relative z-20 w-full mx-auto">
        <h2 class="text-4xl font-bold mb-8 text-primary-700 text-center font-playfair">${section.section}</h2>
        <div class="items-container grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-x-8 gap-y-6">
            ${section.items.map(item => `
                <div class="item flex flex-col space-y-4 bg-gray-100 print:bg-gray-100 transition duration-300 justify-center hover:bg-primary-200 p-8 rounded-xl">
                    ${item.image ? `
                        <div class="w-full">
                            <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-contain object-center rounded-md"> 
                        </div>
                    ` : ''}
                    <div class="text-center w-full">
                        <h3 class="text-3xl print:text-[16pt] font-semibold text-primary-700 font-playfair">${item.name}</h3>
                        ${item.description ? `<p class="text-lg print:text-[12pt] text-gray-700 mt-1 font-sans">${item.description}</p>` : ''}
                        <p class="text-2xl print:text-[14pt] font-semibold text-black mt-2">$${item.price}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
`;

                menuContainer.appendChild(sectionDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching the JSON:', error);
            menuContainer.innerHTML = '<p class="text-red-500 text-center">Error al cargar el menú. Por favor, intente más tarde.</p>';
        });
});