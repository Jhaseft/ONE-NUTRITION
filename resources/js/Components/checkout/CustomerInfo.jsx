export default function CustomerInfoForm({ customerName, setCustomerName, customerPhone, setCustomerPhone }) {
    // Reglas: máximo 50 caracteres para nombre, solo letras y espacios
    const handleNameChange = (e) => {
    const value = e.target.value;
    // Permite letras, espacios, acentos y ñ
    if (/^[a-zA-ZÀ-ÿñÑ\s]*$/.test(value) && value.length <= 50) {
        setCustomerName(value);
    }
};


    // Reglas: máximo 10 caracteres para teléfono, solo números
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 15) {
            setCustomerPhone(value);
        }
    };

    return (
        <div className="border border-gray-700 p-4 rounded mb-4">
            <h3 className="font-semibold mb-2 text-white">Datos del Cliente</h3>

            <label className="block text-gray-300 mb-1">Nombre completo</label>
            <input
                type="text"
                value={customerName}
                onChange={handleNameChange}
                className="w-full p-2 rounded bg-black text-white mb-2 border border-gray-600"
                placeholder="Ingresa tu nombre"
                required
            />

            <label className="block text-gray-300 mb-1">Número de teléfono</label>
            <input
                type="text"
                value={customerPhone}
                onChange={handlePhoneChange}
                className="w-full p-2 rounded bg-black text-white mb-2 border border-gray-600"
                placeholder="Ingresa tu número"
                required
            />

            <p className="text-gray-400 text-sm">
                Estos datos se usarán para tu pedido. No se requieren inicio de sesión.
            </p>
        </div>
    );
}
