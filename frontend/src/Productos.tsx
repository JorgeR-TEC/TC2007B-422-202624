import {Datagrid, List, TextField} from "react-admin";

export const listarProductos = () =>(
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="nombre" />
            <TextField source="marca" />
        </Datagrid>
    </List>
);