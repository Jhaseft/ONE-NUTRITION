import { useState } from "react";

export default function CustomerInfoForm({
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    customerMail,
    setCustomerMail,
    className = ''
}) {
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");

    // Validar nombre completo (solo letras y espacios, 3-30 caracteres)
    const handleNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-ZÀ-ÿñÑ\s]*$/.test(value) && value.length <= 30) {
            setCustomerName(value);
            if (value.length < 3) setNameError("El nombre debe tener al menos 3 letras.");
            else setNameError("");
        }
    };

    // Validar teléfono (solo números, 7-15 caracteres)
    const handlePhoneChange = (e) => {
        const cleaned = e.target.value.replace(/\D+/g, "");
        if (cleaned.length <= 15) {
            setCustomerPhone(cleaned);
            if (cleaned.length < 7) setPhoneError("El número debe tener al menos 7 dígitos.");
            else setPhoneError("");
        }
    };

    const handleMailChange = (e) => {
    let value = e.target.value;
    if (value.length > 60) value = value.slice(0, 40);
    setCustomerMail(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]{1,}@.{1,}\..{2,}$/;
    if (value.length >= 5 && emailRegex.test(value)) {
        setEmailError("");
    } else {
        setEmailError("Ingresa un correo válido (mín. 4 caracteres antes o después de @).");
    }
};


    return (
        <div className={`bg-white border border-gray-300 rounded-2xl p-6 mb-6 shadow-lg ${className}`}>
            <h3 className="text-black font-bold text-2xl mb-5 border-b border-gray-300 pb-3">
                Datos del Cliente
            </h3>

            
            <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Nombre completo</label>
                <input
                    type="text"
                    autoComplete="name"
                    value={customerName}
                    onChange={handleNameChange}
                    placeholder="Ingresa tu nombre completo"
                    className={`w-full p-3 rounded-xl bg-gray-100 text-black border ${
                        nameError ? "border-red-500" : "border-gray-300"
                    } focus:border-black focus:ring-1 focus:ring-black outline-none transition`}
                    required
                />
                {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
            </div>

           
            <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Número de teléfono</label>
                <input
                    type="tel"
                    autoComplete="tel"
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    placeholder="Ingresa tu número"
                    className={`w-full p-3 rounded-xl bg-gray-100 text-black border ${
                        phoneError ? "border-red-500" : "border-gray-300"
                    } focus:border-black focus:ring-1 focus:ring-black outline-none transition`}
                    required
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>

           
            <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Correo electrónico</label>
                <input
                    type="email"
                    autoComplete="email"
                    value={customerMail}
                    onChange={handleMailChange}
                    placeholder="Ingresa tu correo"
                    className={`w-full p-3 rounded-xl bg-gray-100 text-black border ${
                        emailError ? "border-red-500" : "border-gray-300"
                    } focus:border-black focus:ring-1 focus:ring-black outline-none transition`}
                    required
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <p className="text-gray-500 text-sm">
                Estos datos se usarán para tu pedido.
            </p>
        </div>
    );
}
