import Layout from '@/Layouts/MainLayout';
import Showcontent from './Showcontentadmin';

export default function ShowProduct({ product }) {
 return (
    <Layout title={product.name}>
        <Showcontent product={product}/>
    </Layout>
 );    
}
