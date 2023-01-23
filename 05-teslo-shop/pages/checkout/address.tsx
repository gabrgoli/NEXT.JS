import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";

import { ShopLayout } from '../../components/layouts';
import { countries, jwt } from "../../utils";
import { CartContext } from '../../context';
import register from '../auth/register';


type FormData = {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}


const getAddressFromCookies = ():FormData => {
    return {
        firstName : Cookies.get('firstName') || '',
        lastName  : Cookies.get('lastName') || '',
        address   : Cookies.get('address') || '',
        address2  : Cookies.get('address2') || '',
        zip       : Cookies.get('zip') || '',
        city      : Cookies.get('city') || '',
        country   : Cookies.get('country') || '',
        phone     : Cookies.get('phone') || '',
    }
}


const AddressPage = () => {


    const router = useRouter();
    const { updateAddress} = useContext( CartContext );

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
             firstName: '',
             lastName: '',
             address: '',
             address2: '',
             zip: '',
             city: '',
             country: countries[0].code,
             phone: '',
        } 
     });

    useEffect(() => {
        reset(getAddressFromCookies() );

    }, [reset])

    const onSubmitAddress = ( data: FormData ) => {
        updateAddress( data );
        router.push('/checkout/summary');
    }

    return (
        <ShopLayout  title="Direccion" pageDescription="Confirmar dirección del destino" imageFullUrl={undefined}>
            
            <Typography variant="h1" component='h1'> Dirección</Typography>

            <Grid container spacing = {2} sx={{mt:0}}>
                
                <Grid item xs={12} sm={6}>
                    <TextField label='Nombre' variant="filled" fullWidth/>  
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Apellido' variant="filled" fullWidth/>  
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Direccion' variant="filled" fullWidth/>  
                </Grid>

                <Grid item xs={12} sm={ 6 }>
                    <FormControl fullWidth>
                        <TextField
                            select
                            variant="filled"
                            label="País"
                            defaultValue={ Cookies.get('country') || countries[0].code }
                            { ...register('country', {
                                required: 'Este campo es requerido'
                            })}
                            error={ !!errors.country }
                            // helperText={ errors.country?.message }
                        >
                            {
                                countries.map( country => (
                                    <MenuItem 
                                        key={ country.code }
                                        value={ country.code }
                                    >{ country.name }</MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Ciudad' variant="filled" fullWidth/>  
                </Grid>



                <Grid item xs={12} sm={6}>
                            <TextField label='Telefono' variant="filled" fullWidth/>  
                </Grid>
                

            </Grid>

            <Box display='flex' justifyContent={"center"}>
                <Button  sx={{mt:3}} color="secondary" className="circular-btn" size="large">
                    Revisar Pedido
                </Button>
            </Box>

        </ShopLayout>
    )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken( token );
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if ( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default AddressPage