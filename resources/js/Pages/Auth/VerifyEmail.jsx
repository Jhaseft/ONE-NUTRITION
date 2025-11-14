import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Head title="Verificar Email" />

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border">

                {/* LOGO */}
                <div className="flex justify-center mb-6">
                    <img
                        src="https://res.cloudinary.com/dnbklbswg/image/upload/v1763039388/automatizando_logo-removebg-preview_eekag0.png"
                        alt="Logo"
                        className="h-24 object-contain"
                    />
                </div>

                <p className="text-gray-600 text-sm mb-4 text-center">
                    Te enviamos un correo con el enlace de verificación.
                </p>

                {status === "verification-link-sent" && (
                    <p className="text-green-600 text-sm text-center mb-4">
                        ¡Se envió un nuevo enlace a tu correo!
                    </p>
                )}

                <form onSubmit={submit}>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Reenviar Email de Verificación
                    </button>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full mt-4 text-center block text-gray-600 underline hover:text-black"
                    >
                        Cerrar Sesión
                    </Link>
                </form>
            </div>
        </div>
    );
}
