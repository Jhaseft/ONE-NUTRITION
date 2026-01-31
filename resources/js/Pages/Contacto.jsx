import Layout from "@/Layouts/LayoutCheckout";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

export default function Contacto() {
    return (
        <Layout>
            <div
                className="bg-white text-center py-10 mt-10 border-t border-grayCustom shadow-inner rounded-2xl"
                style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '1px' }}
            >
                
                <h2 className="text-darkGray text-3xl font-bold mb-6">Contacto</h2>

              
                <div className="text-darkGray text-lg mb-6 space-y-2">
                    <p> WhatsApp: <span className="text-turquoise font-semibold">+34 631 07 88 30</span></p>
                </div>


                <div className="flex justify-center space-x-10 mb-6">
                    <a
                        href="https://www.instagram.com/one_nutrition_labs?igsh=ODN2aGNpamF3ZTlu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-turquoise hover:text-darkTurquoise transition-colors"
                    >
                        <FaInstagram size={50} />
                    </a>
                    <a
                        href="https://www.facebook.com/share/1CCoJ3pwgN/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-turquoise hover:text-darkTurquoise transition-colors"
                    >
                        <FaFacebook size={50} />
                    </a>
                    <a
                        href="https://wa.me/34631078830"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-turquoise hover:text-darkTurquoise transition-colors"
                    >
                        <FaWhatsapp size={50} />
                    </a>
                </div>
            </div>
        </Layout>
    ); 
}
