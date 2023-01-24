import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link, Chip } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import NextLink from 'next/link'

import { ShopLayout } from '../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { GetServerSideProps, NextPage } from 'next';
//import { getSession } from 'next-auth/react';
//import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces/order';


interface Props {
    order: IOrder;
}


//const OrderPage: NextPage<Props> = ({ order }) => {
const OrderPage: NextPage<Props> = ({  }) => {
    //const { shippingAddress } = order;



    return(
        <ShopLayout title='Resumen de la orden 2165489' pageDescription={'Resumen de la orden'} imageFullUrl={undefined}>
            <Typography variant='h1' component='h1'> Orden: 0516168</Typography>

            {/*<Chip
                sx={{my:2}}
                label="pendiente de pago"
                variant='outlined'
                color="error"
                icon={ <CreditCardOffOutlined/>}
            />*/}

            <Chip
                sx={{my:2}}
                label="La orden ya fue pagada"
                variant='outlined'
                color="success"
                icon={ <CreditScoreOutlined/>}
            />

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable={false}/>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                        {/* <Typography variant='h2'>Resumen ({ order.numberOfItems } { order.numberOfItems > 1 ? 'productos': 'producto'})</Typography> */}
                            <Divider sx={{my:1}}/>

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'> Dirección de entrega</Typography>
                                <NextLink href='/checkout/adress' passHref legacyBehavior>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            
                            <Typography>Gabriel Goliger</Typography>
                            <Typography>Rambla gandhi 359</Typography>
                            <Typography>Montevideo Uruguay</Typography>
                            <Typography>099944268</Typography>

                            <Divider sx={{my:1}}/>

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline='always'>
                                        Editar
                                    </Link>

                                </NextLink>
                            </Box>

                            {/* <OrderSummary 
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                tax: order.tax,
                            }} 
                        /> */}
                            <Box sx={{mt:3}}>
                                <h1>Pagar</h1>
                                <Chip
                                    sx={{my:2}}
                                    label="La orden ya fue pagada"
                                    variant='outlined'
                                    color="success"
                                    icon={ <CreditScoreOutlined/>}
                                />

                            </Box>

                            
                        </CardContent>
                        
                    </Card>
                </Grid>

            </Grid>



        </ShopLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
   // const session:any = await getSession({ req });

    // if ( !session ) { //si no hay sesion
    //     return {
    //         redirect: {
    //             destination: `/auth/login?p=/orders/${ id }`,
    //             permanent: false,
    //         }
    //     }
    // }

    //const order = await dbOrders.getOrderById( id.toString() );

    // if ( !order ) {
    //     return {
    //         redirect: {
    //             destination: '/orders/history',
    //             permanent: false,
    //         }
    //     }
    // }

    // if ( order.user !== session.user._id ) {
    //     return {
    //         redirect: {
    //             destination: '/orders/history',
    //             permanent: false,
    //         }
    //     }
    // }


    return {
        props: {
           // order
        }
    }
}

export default OrderPage;