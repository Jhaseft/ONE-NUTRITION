import ProductsAdmin from './ProductsAdmin';
import Layoutadmin from './Layouts/MainLayoutadmin';

export default function Ventas({ auth }) {
    return (
        <Layoutadmin title="Exclusive|Inicio" auth={auth}>
            <ProductsAdmin />
        </Layoutadmin>
    );
}
