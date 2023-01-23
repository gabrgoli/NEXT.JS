import { ShopLayout } from '../components/layouts';
import {Box,Typography} from '@mui/material'


const Custom404= ( ) => {
    return(


        <ShopLayout title='page not found' pageDescription='No hay nada' imageFullUrl='any'>
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                height='calc(100vh-200px)'
                sx={{flexDirection: {xs:'column',sm:'row'}}}
            
            >
                <Typography variant ='h1' component='h1' fontSize={80} fontWeight = {200}>404 |</Typography>
                <Typography marginLeft={2}>Estamos trabajando en este contenido</Typography>
            </Box>
        </ShopLayout>
    )
}

export default Custom404;