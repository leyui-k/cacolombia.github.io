async function obtenerMiembros() {
    try {
        const response = await fetch('https://dbcacolombia.discloud.app/miembros', { mode: 'no-cors' });
        if (!response.ok) {
            throw new Error('Error al obtener los miembros');
        }
        const data = await response.json();
        document.getElementById('miembros').innerText = `${data.totalMembers} miembros`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('miembros').innerText = 'No se pudo obtener el número de miembros';
    }
}

document.addEventListener('DOMContentLoaded', obtenerMiembros);