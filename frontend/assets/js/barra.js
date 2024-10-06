$(document).ready(function() {
    // Manejo del clic en el encabezado del acordeón
    $('#accordionHeader').click(function() {
        $('#accordionContent').slideToggle(300); // Animación de deslizamiento
    });
});
