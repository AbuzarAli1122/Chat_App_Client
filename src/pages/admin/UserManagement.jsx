import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import AdminLayout from '../../Components/layout/AdminLayout'
import { LayoutLoader } from '../../Components/layout/Loaders'
import Table from '../../Components/shared/Table'
import { useErrors } from '../../hooks/hook'
import { transformImage } from '../../lib/features'
import { useGetAdminUsersQuery } from '../../redux/api/api'


const columns = [
  {
    field:'id',
    headerName: 'ID',
    headerClassName:'table-header',
    width: 200
  },
   {
    field:'avatar',
    headerName: 'Avatar',
    headerClassName:'table-header',
    width: 150,
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />
  },
   {
    field:'name',
    headerName: 'Name',
    headerClassName:'table-header',
    width: 200
  },
   {
    field:'username',
    headerName: 'Username',
    headerClassName:'table-header',
    width: 200
  },
  {
    field:'friends',
    headerName: 'Friends',
    headerClassName:'table-header',
    width: 150
  },
  {
    field:'groups',
    headerName: 'Groups',
    headerClassName:'table-header',
    width: 200
  },
] 


const UserManagement = () => {

  const {isLoading,data,error} = useGetAdminUsersQuery()
    useErrors([{
      isError:error,
      error: error
    }])

  const [rows, setRows] = useState([]) 

  useEffect(()=>{
    setRows(data?.users.map( i => ({...i,id:i._id,avatar:transformImage(i.avatar,50)})))
  },[])
  return isLoading? <LayoutLoader/> :(
   <AdminLayout>
   <Table rows={rows} columns={columns} heading={'All Users'}/>
   </AdminLayout>
  )
}

export default UserManagement
