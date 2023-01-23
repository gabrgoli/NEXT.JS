import { Typography } from "@mui/material";
//import { useSession } from "next-auth/react";
import { ShopLayout } from "../components/layouts";
import { ProductList } from '../components/products';
import { FullScreenLoading } from "../components/ui";
// import { initialData } from '../database/products';
import { useProducts } from "../hooks";

export default function Home() {


  const session=useSession

  const {products, isLoading}= useProducts('/products')

  return (
<ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo'}>
    <Typography variant="h1" component='h1'>Tienda</Typography>
    <Typography variant='h2' sx={{mb:1}}> Todos los Productos</Typography>
{ isLoading
     ?<FullScreenLoading/>
     :<ProductList 
          //products={ initialData.products as any }
          products={ products }
      />
}

</ShopLayout>
  )
}
