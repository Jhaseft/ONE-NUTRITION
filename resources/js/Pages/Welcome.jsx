import Products from '@/Components/welcome/Products';
import Layout from '@/Layouts/MainLayout';
import Videos from '@/Components/welcome/Videos';
import Hero from '@/Components/welcome/Hero';
import AboutUs from '@/Components/welcome/AboutUs';
import Benefits from '@/Components/welcome/Benefits';
import Testimonials from '@/Components/welcome/Testimonials';
import CallToAction from '@/Components/welcome/CallToAction';

export default function Welcome({ auth, categories, search, page, hasMore }) {
    return (
        <Layout title="ONE|Inicio" auth={auth} fullWidth>
            <Hero />
            <Benefits />
            <div id="productos" className="container mx-auto px-6 py-16">
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise/10 text-turquoise text-sm font-semibold tracking-wider uppercase mb-4">
                        Catalogo
                    </span>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-darkGray"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Nuestros <span className="text-turquoise">productos</span>
                    </h2>
                </div>
                <Products
                    categories={categories}
                    search={search}
                    page={page}
                    hasMore={hasMore}
                />
            </div>
            <Videos />
            <AboutUs />
            <Testimonials />
            <CallToAction />
        </Layout>
    );
}
