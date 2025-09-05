import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material'
import {Close as CloseIcon, Group as GroupIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon,Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon} from '@mui/icons-material'
import { useState } from 'react'
import { useLocation, Link as LinkComponent, Navigate } from 'react-router-dom';
import { matBlack } from '../../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../../redux/thunks/admin';



const Link =styled(LinkComponent)`
    text-decoration: none;
    border-radius: 2rem;
    padding : 1rem 2rem;
    color: black ;
    &:hover{
    color: rgba(0,0,0,0.54) ;
    }
`

const adminTabs = [
    {
        name:'Dashboard',
        path:'/admin/dashboard',
        icon: <DashboardIcon/>
    },
    {
        name:'Users',
        path:'/admin/users',
        icon: <ManageAccountsIcon/>
    },
    {
        name:'Chats',
        path:'/admin/chats',
        icon: <GroupIcon/>
    },
    {
        name:'Messages',
        path:'/admin/messages',
        icon: <MessageIcon/>
    },
]


const AdminLayout = ({children}) => {

  const {isAdmin} = useSelector(state => state.auth)

    const [isMobile,setIsMobile]=useState();

    const handleMobile = ()=>{
        setIsMobile(!isMobile)
    };
    const handleClose = ()=>{
        setIsMobile(false)
    }

    if(!isAdmin) return <Navigate to='/admin'/>
  return (
    <Grid container minHeight={'100vh'}>

        <Box
        sx={{
            display:{xs:'block',md:'none'},
            position:'fixed',
            right:'1rem',
            top:'1rem',
           
        }}>
            <IconButton onClick={handleMobile} sx={{ color:'white', bgcolor:'black', '&:hover': {
          backgroundColor: 'white',
          color: 'black',
        },}}>
            {
               isMobile?<CloseIcon/> : <MenuIcon/>
            }
            </IconButton>
        </Box>
     
    <Grid item size={{md:4,lg:3}} sx={{display:{xs:'none',md:'block'}}}>
        <SideBar/>
    </Grid>

    <Grid item size={{xs:12,md:8,lg:9}}  sx={{ bgcolor:'#f5f5f5'}}>
    {children}
    </Grid>

    <Drawer open={isMobile} onClose={handleClose}>
            <SideBar w='50vw'/>
    </Drawer>

    </Grid>
  )
}

const SideBar = ({w='100%'}) => {

    const dispatch = useDispatch()
    const location = useLocation();

    const logoutHandler =()=>{
        dispatch(logoutAdmin())
    }

    return (
            <Stack width={w} direction={'column'} p={'3rem'} spacing={'3rem'}>
                <Typography variant='h5' textTransform={'uppercase'}>Chat_Hub</Typography>

            <Stack spacing={'1rem'}>

            {
                adminTabs.map((tab)=>(
                    <Link key={tab.path} to={tab.path}
                    sx={
                        location.pathname === tab.path && {
                            bgcolor : matBlack,
                            color: 'white',
                            ":hover":{color:'white'}
                        }
                    }       
                    >
                        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                            {tab.icon}
                            <Typography>{tab.name}</Typography>
                        </Stack>
                    </Link>
                ))
            }

            <Link onClick={logoutHandler}>
                        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                            <ExitToAppIcon/>
                            <Typography>Logout</Typography>
                        </Stack>
                    </Link>

            </Stack>
            </Stack>
    )
};

export default AdminLayout
