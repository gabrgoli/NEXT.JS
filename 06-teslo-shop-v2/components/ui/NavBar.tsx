import NextLink from 'next/link';

import {AppBar, Link,Toolbar,Typography,Box,Button,IconButton, Badge, Input, InputAdornment} from '@mui/material'
// import { ClearOutlined, SearchOutlined,ShoppingCartOutlined } from '@mui/icons-material';
import ClearOutlined from '@mui/icons-material/ClearOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UiContext } from '../../context';



export const NavBar = () => {

    const {asPath, push} = useRouter(); //me da el path como asPath tambien tiene  pathname o route, /category/women

    const { toggleSideMenu } = useContext( UiContext );
    //const { numberOfItems } = useContext( CartContext );
    const numberOfItems=10;

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);//cuando la persona esta buscando


    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }


 return (
     <AppBar>
        <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center' >
                    <Typography variant='h6'>Teslo|</Typography>
                    <Typography sx ={{ml:0.5}}>Shop</Typography>
                
                </Link>
        
            </NextLink>

            <Box flex={1}/>

            <Box sx={{display: isSearchVisible? 'none' : {xs:'none', sm:'block'}}}
                className='fadeIn'>

                <NextLink href='/category/women' passHref legacyBehavior>
                    <Link>
                        <Button color ={asPath === '/category/women'? 'primary' : 'info'} >mujeresa</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/men' passHref legacyBehavior>
                    <Link>
                        <Button color ={asPath=== '/category/men'? 'primary' : 'info'}>hombres</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/kid' passHref legacyBehavior>
                    <Link>
                        <Button color ={asPath=== '/category/kid'? 'primary' : 'info'}>niños</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/deportes' passHref legacyBehavior>
                    <Link>
                        <Button>Deportes y fitness</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/hogar' passHref legacyBehavior>
                    <Link>
                        <Button>Hogar y decoración</Button>
                    </Link>
                </NextLink>


            </Box>

            

            <Box flex={1}/>

            {
                isSearchVisible
                ?(
                    <Input
                        sx={{display: {xs:'none', sm:'flex'}}}
                        className='fadeIn'
                        autoFocus
                        value ={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        onKeyPress={(e)=> e.key === 'Enter'? onSearchTerm():null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={()=> setIsSearchVisible(false)}
                                >
                                <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                    }
                />

                )
                :
                (
                    <IconButton
                        sx={{display:{xs:'none', sm: 'flex'}}}
                        onClick={()=>setIsSearchVisible(true)}
                        className='fadeIn'
                    >
                        <SearchOutlined/>
                    </IconButton>
                )
            }




            {/* pantallas pequeñas */}
            <IconButton
                sx={{display:{xs:'flex', sm: 'none'}}}
                onClick={toggleSideMenu}
            >
                    <SearchOutlined/>
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ numberOfItems > 9 ? '+9': numberOfItems  } color="secondary">
                                <ShoppingCartOutlined/>
                            </Badge>
                        </IconButton>
                    </Link>
            </NextLink>

            {/* <Button onClick={ toggleSideMenu }> */}
            <Button onClick={ toggleSideMenu }>
                Menu
            </Button>

        </Toolbar>
     </AppBar>
 )
}