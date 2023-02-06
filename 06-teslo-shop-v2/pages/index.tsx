import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
//import { initialData } from '../database/products';
import { ProductList } from '../components/products';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';



const Home: NextPage = () => {

  const {products,isLoading} = useProducts('/products');

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

        {
          isLoading
          ? <h1><FullScreenLoading/></h1>
          :<ProductList 
            //products={ initialData.products as any }
            products={ products }
          />
        }

    </ShopLayout>
  )
}

export default Home