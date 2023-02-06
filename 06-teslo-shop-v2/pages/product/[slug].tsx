
import { ISize } from '@/interfaces';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { initialData } from '../../database/products';
import { ItemCounter } from '../../components/ui';
import { useRouter } from 'next/router';
import { useProducts } from '@/hooks';
import { IProduct } from '@/interfaces';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {dbProducts} from '../../database'
import { FC } from 'react';

interface Props{
  product: IProduct
}


const product = initialData.products[0];

const selectedSize = ( size: ISize ) => {
  console.log("En padre:",size);
  //  setTempCartProduct( currentProduct => ({
  //    ...currentProduct,
  //   size
  // }));
}

const onUpdateQuantity = ( quantity: number ) => {
  // setTempCartProduct( currentProduct => ({
  //   ...currentProduct,
  //   quantity
  // }));
}

const ProductPage:NextPage<Props> = ({product}) => {

  const router = useRouter();

  // const { products:product, isLoading} = useProducts <IProduct> (`/products/${router.query.slug}`)


  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
    
      <Grid container spacing={3}>

        <Grid item xs={12} sm={ 7 }>
          <ProductSlideshow 
            images={ product.images }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter 
                currentValue={1}
                maxValue={10}
                updatedQuantity={onUpdateQuantity}
                  
              />
              <SizeSelector 
                selectedSize={ product.sizes[2] } 
                sizes={ product.sizes }
                onSelectedSize={selectedSize}
              />
            </Box>


            {/* Agregar al carrito */}
            <Button color="secondary" className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponibles" color="error" variant='outlined' /> */}

            {/* Descripción */}
            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>

          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  )
}

// getServerSideProps 
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// * No usar esto.... SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug( slug );

//   if ( !product ) { //si no existe el producto saco a la persona de la pantalla
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }


// getStaticPaths....
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProducts.getAllProductSlugs();//un arreglo de product slugs

  
  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage