import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import {UIContext} from '../../context/ui'
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from 'next/link'

export const NavBar = () => {

  const {openSideMenu}=useContext(UIContext)
  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton
                size='large'
                edge="start"
                onClick={openSideMenu}
            >
                <MenuIcon/>

            </IconButton>
            <NextLink href="/" passHref legacyBehavior>
              <Link underline='none' color="white">
                <Typography variant='h6'>OpenJira</Typography>
              </Link>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
