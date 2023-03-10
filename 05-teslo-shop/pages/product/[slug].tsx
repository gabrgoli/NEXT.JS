import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Grid, Box , Typography, Button, Chip} from '@mui/material';
//import { initialData } from '../../database/products';
import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { SizeSelector } from '../../components/products/SizeSelector';
import { useRouter } from 'next/router';
import { useProducts } from '../../hooks/useProducts';
import { IProduct, ISize } from '../../interfaces';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { dbProducts } from '../../database';
import { FC, useContext, useState } from 'react';
import { ICartProduct } from '../../context/cart/cartInterface';
import { CartContext } from '../../context/cart/CartContext';


interface Props{
    product: IProduct;
    sizes:ISize[];

    onSelectedSize: (size:ISize)=>void;
}

//const product = initialData.products[0];

const ProductPage:NextPage<Props> =({ product}) => {

    const router = useRouter();
  //  const { products: product, isLoading } = useProducts <IProduct>(`/products/${ router.query.slug }`);
   
  const { addProductToCart } = useContext( CartContext )

   const [tempCartProduct, setTempCartProduct] = useState <ICartProduct>({
    _id: product._id,
    description:product.description,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    inStock:product.inStock,
    quantity: 1,
  })

  const selectedSize = ( size: ISize ) => {
    console.log("En padre:",size);
     setTempCartProduct( currentProduct => ({
       ...currentProduct,
      size
     }));
  }

  const onUpdateQuantity = ( quantity: number ) => {
    // setTempCartProduct( currentProduct => ({
    //   ...currentProduct,
    //   quantity
    // }));
  }


  const onAddProduct = () => {

    // if ( !tempCartProduct.size ) { return; }

  //   addProductToCart(tempCartProduct);
  //   router.push('/cart');
  // }

  }

    return (
      <ShopLayout title = {product?.title} pageDescription={product?.description} imageFullUrl="any">

            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideshow
                        images={product?.images}
                    />

                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>

                        <Typography variant='h1' component='h1'> {product?.title}</Typography>
                        <Typography variant='subtitle1' component='h2'> {`$${product?.price}`}</Typography>

                        

                        <Box sx={{my:2}}>
                            <Typography variant='subtitle2'>Cantidad </Typography>
                            <ItemCounter 
                              currentValue={ tempCartProduct.quantity }
                              updatedQuantity={ (value)=>onUpdateQuantity(value)  }
                              maxValue={ product?.inStock > 10 ? 10: product?.inStock }
                            />
                            <SizeSelector 
                              // selectedSize={ product.sizes[2] } 
                              sizes={ product.sizes }
                              selectedSize={ tempCartProduct.size }
                              // selectedSize={ 'M'}
                              onSelectedSize={ (size)=>selectedSize(size) }
                            />

                        </Box>

                        

                       {/* Agregar al carrito */}
                       {
                          (product?.inStock > 0)
                          ? (
                              <Button 
                                color="secondary" 
                                className='circular-btn'
                                onClick={ onAddProduct }
                              >
                                {
                                  tempCartProduct.size
                                    ? 'Agregar al carrito'
                                    : 'Seleccione una talla'
                                }
                              </Button>
                          )
                          : (
                            <Chip label="No hay disponibles" color="error" variant='outlined' />
                          )
                        }

                        {/* Descripci??n */}
                        <Box sx={{mt:3}}>
                            <Typography variant='subtitle2'>Descripcio??n</Typography>
                            <Typography variant='body2'>{product?.description}</Typography>
                        </Box>

                    </Box>


                </Grid>

            </Grid>

        

      </ShopLayout>
       
    )
  }

export const gtServerSidePRops: GetServerSideProps = async({params})=>{
    const {slug = ''} = params as { slug: string};
    const product= await dbProducts.getProductBySlug(slug);

    if(!product){
        return{
            redirect:{
                destination: '/',
                permanent: false
            }
        }
    }
    return{
        props:{
            product
        }
    }

}




//getStaticPaths....
//You should use getStaticPaths if you???re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
    const productSlugs = await dbProducts.getAllProductSlugs();
  
    
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
  //- The data required to render the page is available at build time ahead of a user???s request.
  //- The data comes from a headless CMS.
  //- The data can be publicly cached (not user-specific).
  //- The page must be pre-rendered (for SEO) and be very fast ??? getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
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