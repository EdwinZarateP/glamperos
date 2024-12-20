// Funcion para saber si algo es verdadero o falso
export  const calcularTarifaServicio = (precio: number): number => {
    if (precio > 0 && precio <= 299999) return 1.15;
    if (precio >= 300000 && precio <= 400000) return 1.12;
    if (precio >= 401000 && precio <= 500000) return 1.11;
    if (precio >= 501000 && precio <= 600000) return 1.1;
    if (precio >= 601000 && precio <= 800000) return 1.09;
    if (precio >= 801000 && precio <= 2000000) return 1.08;
    return 1;
};
