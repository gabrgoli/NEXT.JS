import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';
//import { getSession } from 'next-auth/react';
//import { dbOrders } from '../../database';
import { GetServerSideProps, NextPage } from 'next';
import { IOrder } from '../../interfaces/order';

const columns: GridColDef[]= [
    {field: 'id', headerName: 'ID', width:100},
    {field: 'fullname', headerName: 'Nombre Completo', width:300},

    {
        field:'paid',
        headerName:'Pagada',
        description: 'Muestra si esta pagada la orden o no',
        width: 200,
        renderCell: (params: any)=>{
            return (
                params.row.paid
                ? <Chip color="success" label="Pagado" variant="outlined"/>
                :  <Chip color="error" label="No Pagada" variant="outlined" />
            )
            
        }
    },

    {
        field:'orden',
        headerName:'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: any)=>{
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
                </NextLink>
            )
            
        }
    }


];

const rows=[
    {id: 1, paid:true, fullname: 'Gabriel Goliger'},
    {id: 2, paid:false, fullname: 'Jaime Gomez'},
    {id: 3, paid:true, fullname: 'Pepe Goliger'},
    {id: 4, paid:false, fullname: 'Daniel Gonzales'},
    {id: 5, paid:false, fullname: 'Caro Bercolini'},
    {id: 6, paid:true, fullname: 'Ines Beckamp'},
 
]
interface Props {
    orders: IOrder[]
}


const HistoryPage: NextPage<Props> = ({ orders }) => {


    // const rows = ..  
    // { id: indice + 1, paid: true, fullname: 'Fernando Herrera', orderId: 1283781237123 }
    // const rows:any = orders?.map( (order, idx) => ({
    //     id: idx + 1,
    //     paid: order.isPaid,
    //     fullname: `${ order.shippingAddress.firstName } ${ order.shippingAddress.lastName }`,
    //     orderId: order._id
    // }))



    return (

        <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'} imageFullUrl={'any'}>
            <Typography variant='h1'> Historial de ordenes</Typography>

            <Grid container>
                <Grid item xs={12} sx = {{height:650, width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />

                </Grid>

            </Grid>

        </ShopLayout>

    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
//     const session: any = await getSession({ req });

//     if ( !session ) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/orders/history',
//                 permanent: false,
//             }
//         }
//     }

//     const orders = await dbOrders.getOrdersByUser( session.user._id );


//     return {
//         props: {
//             orders
//         }
//     }
// }


export default HistoryPage;