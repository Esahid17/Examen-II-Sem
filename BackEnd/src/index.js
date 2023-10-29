const express = require('express');
const cors = require('cors');
const v1ClienteRoutes = require('./v1/routes/clienteRoutes');
const v1PrestamoRoutes = require('./v1/routes/prestamoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api/v1/cliente', v1ClienteRoutes);
app.use('/api/v1/prestamo', v1PrestamoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
