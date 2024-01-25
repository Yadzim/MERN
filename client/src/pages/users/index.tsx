import axios from 'axios';
import React, { useState } from 'react';
import { QueryCache, QueryClient, useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import './style.scss';
import UserForm from './crud/form';
import { URL } from 'config/utils';

const queryCache = new QueryCache();
const queryClient = new QueryClient();

const Users: React.FC = (): JSX.Element => {
  const [click, setClick] = useState<{ visible: boolean, id: number }>({ visible: false, id: 0 });
  const [filter_like, setFilterLike] = useState<{[key: string]: string | undefined}>();
  const [filter, setFilter] = useState<{[key: string]: string | undefined}>();
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)

  const { isLoading, isFetching, isError, error, data, refetch } = useQuery({
    queryKey: ['users', filter_like, filter, page, limit],
    queryFn: () => {
      return axios.get(`${URL}/users?sort={"name":1}&page=${page}&limit=${limit}${filter_like ? "&filter_like=" + JSON.stringify(filter_like) : ""}${filter ? "&filter=" + JSON.stringify(filter) : ""}`)
    },
    onSuccess: (res) => {
      setUsers(res.data?.users);
    }
  })

  const {  data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => {
      return axios.get(`${URL}/groups`)
    },
  })

  const onDelete = async (id: number) => {
    try{
      if(id){
        const res = await axios.delete(`${URL}/users/${id}`);
        if(res.data?.status === 1){
          refetch();
          console.log("Deleted user");
        }
      }
    } catch(arr){
      console.log(arr);
    }
  }

  // if (isLoading) return <span>loading</span>
  // if (isError) return <div>{(error as any)?.message}</div>

  console.log(filter_like);

  const _filter_like = (name: string, value: string | undefined) => {
    setTimeout(() => {
      setFilterLike(p => {
        if(value) return {...(p ?? {}), [name]: value}
        else {
          const obj = {...p}
          delete(obj[name]);
          return obj
        }
      })
    }, 500)
  }

  const _filter = (name: string, value: string | undefined) => {
      setFilter(p => {
        if(value) return {...(p ?? {}), [name]: value}
        else {
          const obj = {...p}
          delete(obj[name]);
          return obj
        }
      })
  }

  return (
    <div className='user-wrapper e-card m-3 p-3'>
      <h1 className='text-6xl font-bold leading-[100px]' >Users</h1>

      <UserForm open={click.visible} id={click.id} refetch={refetch} setClick={setClick} />


      {isFetching ? <span>fetching</span> : <span>.</span>}
      {isLoading ? <span>loading</span> : <span>.</span>}
      {isError ? <div>{(error as any)?.message}</div> : <span>.</span>}

      <div className="flex-between">
        <div className="">
          <select className='e-input h-8' onChange={(e) => _filter("group_id", e.target?.value)} >
            <option value="">All</option>
            {
              groups?.data?.groups?.map((e: any) => <option value={e?._id} key={e?._id} >{e?._id}</option>)
            }
          </select>
        </div>
        <button className="e-btn px-3" onClick={() => { setClick({ visible: true, id: 0 }) }} >Add new user</button>
      </div>
      <div className='t-table mt-3'>
        <div className='t-tr t-head'>
          <div className='t-th'>№</div>
          <div className='t-th'>Name</div>
          <div className='t-th'>Usename</div>
          <div className='t-th'>Email</div>
          <div className='t-th'>group</div>
          <div className='t-th text-center'>Action</div>
        </div>
        <div className="t-tr hover:bg-[var(--e-card)] not-hover">
          <div className="t-td"></div>
          <div className="t-td"><input className='e-input not-bg h-8 w-full' placeholder='Search by name ...' onChange={(e) => _filter_like("name", e.target?.value)}/></div>
          <div className="t-td"><input className='e-input not-bg h-8 w-full' placeholder='Search by username ...' onChange={(e) => _filter_like("username", e.target?.value)}/></div>
          <div className="t-td"><input className='e-input not-bg h-8 w-full' placeholder='Search by email ...' onChange={(e) => _filter_like("email", e.target?.value)}/></div>
          <div className="t-td"></div>
          <div className="t-td"></div>
        </div>
        {
          users?.length ? users.map((e: any, i: number) => (
            <div className='t-tr' key={e?.id} >
              <div className='t-td'>{limit * page + i - limit + 1}</div>
              <div className='t-td'>{e?.name}</div>
              <div className='t-td'>{e?.username}</div>
              <div className='t-td'>{e?.email}</div>
              <div className='t-td'>{e?.group_id}</div>
              <div className='t-td w_6'>
                <div className="actions">
                  <FaEye className='view' />
                  <FaEdit className='edit' onClick={() => { setClick({ visible: true, id: e?._id }) }} />
                  <FaTrashAlt className='delete' onClick={() => {onDelete(e._id)}} />
                </div>
              </div>
            </div>
          )) : null
        }
      </div>
      { data?.data?.count ?  <div className="mt-3 mb-6 d-f justify-end gap-1">
        <button className="e-btn bg-card px-2" disabled={page < 2} onClick={() => setPage(p => p !== 1 ? p-1 : 1)} >{"<"}</button>
        {
          [...Array(Math.ceil(data?.data?.count/limit))]?.map((e,i) => (
            <button onClick={() => setPage(i+1)} className={`e-btn bg-card px-2 ${i+1 === page ? "bg-element" : ""}`}>{i+1}</button>
          ))
        }
        <button className="e-btn bg-card px-2" disabled={page > data?.data?.count/limit} onClick={() => setPage(p => p < data?.data?.count/limit ? p+1 : p)} >{">"}</button>
        <select className='e-input h-[auto] py-[1px] w-16' value={limit} onChange={(e) => setLimit(Number(e.target?.value))} >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
      </div> : null }
    </div>
  )
}

export default Users;

/**
 * learn react-query
 * https://react-query-v3.tanstack.com/overview
 * https://tanstack.com/query/latest/docs/react/overview
 * https://www.youtube.com/watch?v=gBCbPpuqnRk&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&index=15
 *
 * Building The Real App With React Query:
 * https://www.smashingmagazine.com/2022/01/building-real-app-react-query/
 *
 * Jsonplaceholder params
 * https://github.com/typicode/json-server#filter
 *
 * nasheed:
 * https://www.youtube.com/watch?v=T5wTNTpHpAM
 * https://www.youtube.com/watch?v=-ws2J9VREpg
 */