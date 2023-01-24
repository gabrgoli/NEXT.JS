import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';
//import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces/cartInterface';


interface Props {
    editable?: boolean;
}

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
 ]

export const CartList: FC<Props> = ({ editable = false }) => {

  //  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

     const onNewCartQuantityValue = (product: any, newQuantityValue: number) => {
         product.quantity = newQuantityValue;
           // updateCartQuantity( product );
     }

    return (
        <>
            {
                    productsInCart.map( product => (
                    <Grid container spacing={2} key={ product.slug + product.sizes } sx={{ mb:1 }}>
                        <Grid item xs={3}>
                            {/* TODO: llevar a la página del producto */}
                            <NextLink href={`/product/${ product.slug }`} passHref legacyBehavior>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={ `/products/${ product.images[0] }` }
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{ product.title }</Typography>
                                <Typography variant='body1'>Talla: <strong>{ product.sizes }</strong></Typography>

                                {
                                    editable 
                                    ? (
                                         <ItemCounter 
                                             //currentValue={ product.quantity }
                                             currentValue={1 }
                                             maxValue={ 10 } 
                                             updatedQuantity={ ( value ) => onNewCartQuantityValue(product, value )}
                                         />
                                    )
                                    : (
                                        //<Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Typography>
                                        <Typography variant='h5'>{ 'producto' }</Typography>
                                    )
                                }
                                
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>
                            
                            {
                                editable && (
                                    <Button 
                                        variant='text' 
                                        color='secondary' 
                                        //onClick={ () => removeCartProduct( product ) }
                                    >
                                        Remover
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}