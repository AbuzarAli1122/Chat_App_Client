import React from 'react'
import AdminLayout from '../../Components/layout/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon , Notifications as NotificationsIcon, Person as PersonIcon, Group as GroupIcon, Message as MessageIcon } from '@mui/icons-material'
import moment from 'moment'
import {SearchField} from '../../Components/styles/StyledComponent.jsx'
import {CurveButton} from '../../Components/styles/StyledComponent.jsx'
import { DoughnutChart, LineChart } from '../../Components/specific/Charts.jsx'
import { useGetAdminStatsQuery } from '../../redux/api/api.js'
import {LayoutLoader} from '../../Components/layout/Loaders.jsx'
import  {useErrors} from '../../hooks/hook.jsx'


const DashBoard = () => {

  const {isLoading,data,error} = useGetAdminStatsQuery()
  const {stats} = data || {};
  useErrors([{
    isError:error,
    error: error
  }])

  const AppBar = <Paper elevation={3}
 sx={{
  p:'2rem',
  m: '2rem 0',
  borderRadius:'1rem'
 }} 
  >

<Stack direction={'row'} alignItems={'center'} spacing={'1rem'}> 
  <AdminPanelSettingsIcon sx={{ fontSize:'2rem'}}/>

  <SearchField placeholder={'Search...'} />
  <CurveButton>Search</CurveButton>
<Box flexGrow={1}/>
  <Typography
  sx={{
    display:{
      xs:'none',
      lg:'block'
    }
  }}
  >
    {moment().format(' dddd,D MMMM YYYY')}
  </Typography>

<NotificationsIcon/>

</Stack>
  </Paper>

const Widgets = <Stack direction={{ xs:'column',sm:'row'}} spacing={'2rem'} justifyContent={'space-between'} alignItems={'center'} margin={'2rem 0'}>

  <Widget title={'Users'} value={stats?.usersCount} Icon={<PersonIcon/>}/>
  <Widget title={'Chats'} value={stats?.totalChatsCount} Icon={<GroupIcon/>}/>
  <Widget title={'Messages'} value={stats?.messageCount} Icon={<MessageIcon/>}/>

</Stack>
  return isLoading ? <LayoutLoader/> : (
    <AdminLayout>
       <Container component={'main'}>

      {AppBar}

      <Stack direction={{xs:'column',lg:'row'}} flexWrap={'wrap'} justifyContent={'center'} alignItems={{xs:'center', lg:'stretch'}} sx={{gap:'2rem'}}>
        <Paper elevation={3}
        sx={{
          padding:'2rem 3.5rem',
          borderRadius:'1rem',
          width:'100%',
          maxWidth:'38rem',
        }} >
          <Typography margin = {'2rem 0'} variant={'h4'}>Last Messages</Typography>

          <LineChart value={stats?.messagesChart || [] } />
        </Paper>

        <Paper elevation={3}
        sx={{
          padding:'1rem',
          borderRadius:'1rem',
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width:{xs:'100%',sm:'50%'},
          position:'relative',
          maxWidth:'25rem',
        }}
        >
          <DoughnutChart value={[stats?.totalChatsCount - stats?.groupsCount || 0 ,stats?.groupsCount ||0]} labels={['Single Chats', 'Group Chats']}/>
          <Stack direction={'row'} spacing={'0.5rem'}
          sx={{
            position: 'absolute',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            height:'100%',
          }}>
            <GroupIcon/> <Typography>Vs</Typography>
            <PersonIcon/>
          </Stack>
        </Paper>
      </Stack>
    {Widgets}
      <Stack></Stack>

       </Container>
    </AdminLayout>
  )
}



const Widget = ({title, value, Icon}) => 
  <Paper 
elevation={3}
  sx={{
    padding:'2rem',
    margin: '2rem 0',
    borderRadius:'1.5rem',
    width:'20rem'
  }}>
    <Stack alignItems={'center'} spacing={'1rem'}>
      <Typography
      sx={{
        color: 'rgba(0,0,0,0.7)',
        borderRadius: '50%',
        border: '5px solid rgba(0,0,0,0.9)',
        width:'5rem',
        height:'5rem',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      }}>
        {value}
      </Typography>
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>

export default DashBoard
