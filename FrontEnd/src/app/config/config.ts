export const _IP = "localhost";
export const _URL_SERVICES_BE = 'http://' + _IP + ':3000/api/v1';

// Cliente
export const _URL_POST_CLIENTE = _URL_SERVICES_BE + '/cliente/postCliente';
export const _URL_GET_CLIENTES = _URL_SERVICES_BE + '/cliente/getAllClientes';
export const _URL_GET_CLIENTE_BY_ID = _URL_SERVICES_BE + '/cliente/getClienteById';
export const _URL_PUT_CLIENTE_BY_ID = _URL_SERVICES_BE + '/cliente/updateClienteById';
export const _URL_DELETE_CLIENTE_BY_ID = _URL_SERVICES_BE + '/cliente/deleteClienteById';

export const _URL_GET_PRESTAMOS_CLIENTE = _URL_SERVICES_BE + '/cliente/getAllPrestamosByIdCliente';

// Prestamo
export const _URL_POST_PRESTAMO = _URL_SERVICES_BE + '/prestamo/postPrestamo';
export const _URL_GET_PRESTAMOS = _URL_SERVICES_BE + '/prestamo/getAllPrestamos';
export const _URL_GET_PRESTAMO_BY_ID = _URL_SERVICES_BE + '/prestamo/getPrestamosById';
export const _URL_PUT_PRESTAMO_BY_ID = _URL_SERVICES_BE + '/prestamo/updatePrestamoById';
export const _URL_DELETE_PRESTAMO_BY_ID = _URL_SERVICES_BE + '/prestamo/deletePrestamoById';
