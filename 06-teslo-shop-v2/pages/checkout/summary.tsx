import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link, Chip } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import NextLink from 'next/link'

import { ShopLayout } from '../../components/layouts';
import { useContext, useEffect, useState } from 'react';
//import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
//import { CartContext } from '../../context';

const SummaryPage=()=>{


    const router = useRouter();
    //const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );

    const [isPosting, setIsPosting] = useState(false); //cuando empiezo a hacer el posteo
    const [errorMessage, setErrorMessage] = useState('');
    
    // useEffect(() => {
    //     if ( !Cookies.get('firstName') ) {
    //         router.push('/checkout/address');
    //     }
    // }, [ router ]);
    

    const onCreateOrder = async() => {
        setIsPosting(true);

        //const { hasError, message } = await createOrder(); 

        // if ( hasError ) {
        //     setIsPosting(false);
        //     setErrorMessage( message );
        //     return;
        // }

        // router.replace(`/orders/${ message }`);

    }



    // if ( !shippingAddress ) {
    //     return <></>;
    // }

    //const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;
    
    return(
        <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'} imageFullUrl={undefined}>
            <Typography variant='h1' component='h1'> Resumen de la orden</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable={false}/>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen</Typography>
                            <Divider sx={{my:1}}/>

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'> Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
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

                            <OrderSummary/>

                            <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                                <Button
                                    color="secondary"
                                    className='circular-btn'
                                    fullWidth
                                    onClick={ onCreateOrder }
                                    disabled={ isPosting }
                                >
                                    Confirmar Orden
                                </Button>


                                <Chip 
                                    color="error"
                                    label={ errorMessage }
                                    sx={{ display: errorMessage ? 'flex':'none', mt: 2 }}
                                />


                            </Box>

                            
                        </CardContent>
                        
                    </Card>
                </Grid>

            </Grid>



        </ShopLayout>
    )
}

export default SummaryPage;