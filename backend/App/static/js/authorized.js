const radio = document.querySelectorAll('input[type="radio"]');


radio.forEach(item => {
    const machines_table = document.querySelector('#machines_table')
    const maintenances_table = document.querySelector('#maintenances_table')
    const compliants_table = document.querySelector('#compliants_table')
    machines_table.style.display = 'table';
    maintenances_table.style.display = 'none';
    compliants_table.style.display = 'none';

    item.addEventListener('click', () => {
        
        if (item.id === 'gen_info') {
            maintenances_table.style.display = 'none';
            compliants_table.style.display = 'none';
            machines_table.style.display = 'table';
        }

        if (item.id === 'TO') {
            maintenances_table.style.display = 'table';
            compliants_table.style.display = 'none';
            machines_table.style.display = 'none';
        }

        if (item.id === 'complaints') {
            maintenances_table.style.display = 'none';
            compliants_table.style.display = 'table';
            machines_table.style.display = 'none';
        }
        
    })

})

