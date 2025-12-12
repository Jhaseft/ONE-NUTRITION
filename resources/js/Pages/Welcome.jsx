import Products from '@/Components/welcome/Products';
import Layout from '@/Layouts/MainLayout';

export default function Welcome({ auth }) {
    return (
        <Layout title="Exclusive|Inicio" auth={auth}>
            <Products />
        </Layout>
    );
}
