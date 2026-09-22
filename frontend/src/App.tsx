import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import {listarProductos, editarProductos, crearProductos} from "./Productos"
import {dataProvider} from "./dataProvider"

export const App = () => (
    <Admin layout={Layout} dataProvider={dataProvider}>
        <Resource
            name="Productos"
            list={listarProductos}
            edit={editarProductos}
            create={crearProductos}
        />
    </Admin>
);
