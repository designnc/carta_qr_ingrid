document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');

    fetch('data/menu.json')
        .then(response => response.json())
        .then(data => {
            data.menu.forEach((section, index) => {
                const sectionDiv = document.createElement('div');
                sectionDiv.id = `section-${index}`;
                sectionDiv.classList.add('section', 'relative', 'p-8', 'rounded-xl', 'transition', 'duration-300', 'min-h-[600px]', 'flex', 'items-center', 'border-2', 'border-primary-300', 'overflow-hidden', 'print:p-4', 'print:border-none', 'print:min-h-0', 'print:h-full');

                sectionDiv.innerHTML = `
    <div class="absolute inset-0 w-full h-full z-0 bg-blue-500" style="background: url('img/section_bg.svg') center; background-size: cover, contain; background-repeat: no-repeat, repeat;" class="print:hidden"></div>
    <div class="absolute inset-0 bg-white bg-opacity-90 z-10"></div>
    <div class="relative z-20 w-full max-w-5xl mx-auto">
        <h2 class="text-4xl font-bold mb-8 text-primary-700 text-center font-playfair print:text-xl">${section.section}</h2>
        <div class="items-container grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 print:grid-cols-3 print:gap-x-2 print:gap-y-2">
            ${section.items.map(item => `
                <div class="item flex flex-col items-center space-y-4 bg-gray-100 transition duration-300 justify-center hover:bg-primary-200 p-8 rounded-xl print:p-2 print:rounded-none">
                    ${item.image ? `
                        <div class="w-full aspect-w-4 aspect-h-2 print:aspect-w-auto print:h-auto">
                            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain object-center rounded-md print:max-h-40 print:rounded-none">
                        </div>
                    ` : ''}
                    <div class="text-center w-full">
                        <h3 class="text-3xl font-semibold text-primary-700 font-playfair print:text-lg">${item.name}</h3>
                        ${item.description ? `<p class="text-lg text-gray-700 mt-1 font-sans print:text-sm">${item.description}</p>` : ''}
                        <p class="text-2xl font-semibold text-black mt-2 print:text-base">$${item.price}</p>
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