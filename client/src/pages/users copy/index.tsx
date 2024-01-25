import axios from 'axios';
import React, { useState } from 'react';
import { QueryCache, QueryClient, useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import './style.scss';
import GroupForm from './crud/form';
import { URL } from 'config/utils';

const queryCache = new QueryCache();
const queryClient = new QueryClient();

const Groups: React.FC = (): JSX.Element => {
  const [click, setClick] = useState<{ visible: boolean, id: number }>({ visible: false, id: 0 })
  const [filter_like, setFilterLike] = useState<{ [key: string]: string | undefined }>()
  const [groups, setGroups] = useState<any[]>([])

  const { isLoading, isFetching, isError, error, data, refetch } = useQuery({
    queryKey: ['groups', filter_like],
    queryFn: () => {
      return axios.get(`${URL}/groups${filter_like ? "?filter_like=" + JSON.stringify(filter_like) : ""}`)
    },
    onSuccess: (res) => {
      setGroups(res.data?.groups);
    }
  })

  const onDelete = async (id: number) => {
    try {
      if (id) {
        const res = await axios.delete(`${URL}/groups/${id}`);
        if (res.data?.status === 1) {
          refetch();
          console.log("Deleted group");
        }
      }
    } catch (arr) {
      console.log(arr);
    }
  }

  // if (isLoading) return <span>loading</span>
  // if (isError) return <div>{(error as any)?.message}</div>

  console.log(filter_like);

  const filterLike = (name: string, value: string | undefined) => {
    setTimeout(() => {
      setFilterLike(p => {
        if (value) return { ...(p ?? {}), [name]: value }
        else {
          const obj = { ...p }
          delete (obj[name]);
          return obj
        }
      })
    }, 500)
  }

  return (
    <div className='user-wrapper e-card m-3 p-3'>
      <h1 className='text-6xl font-bold leading-[100px]' >Groups</h1>

      {click.visible ? <GroupForm id={click.id} refetch={refetch} setClick={setClick} /> : null}

      {isFetching ? <span>fetching</span> : <span>.</span>}
      {isLoading ? <span>loading</span> : <span>.</span>}
      {isError ? <div>{(error as any)?.message}</div> : <span>.</span>}

      <div className="flex-between">
        <div className="">
          <input className='e-input not-bg h-8' onChange={(e) => filterLike("name", e.target?.value)} placeholder='Search by name ...' />
        </div>
        <button className="e-btn px-3" onClick={() => { setClick({ visible: true, id: 0 }) }} >Add new user</button>
      </div>
      <div className='t-table mt-3'>
        <div className='t-tr t-head'>
          <div className='t-th'>id</div>
          <div className='t-th'>Name</div>
          <div className='t-th'>Description</div>
          <div className='t-th'>Count</div>
          <div className='t-th text-center'>Action</div>
        </div>
        {/* <div className="t-tr hover:bg-[var(--e-card)] not-hover">
          <div className="t-td"></div>
          <div className="t-td"><input className='e-input not-bg h-8 w-full' onChange={(e) => filterLike("name", e.target?.value)} /></div>
          <div className="t-td"></div>
          <div className="t-td"><input className='e-input not-bg h-8 w-full' type='number' onChange={(e) => filterLike("email", e.target?.value)} /></div>
          <div className="t-td"></div>
        </div> */}
        {
          groups?.length ? groups.map((e: any) => (
            <div className='t-tr' key={e?.id} >
              <div className='t-td'>{e?._id}</div>
              <div className='t-td'>{e?.name}</div>
              <div className='t-td'>{e?.description}</div>
              <div className='t-td'>{e?.count}</div>
              <div className='t-td w_6'>
                <div className="actions">
                  <FaEye className='view' />
                  <FaEdit className='edit' onClick={() => { setClick({ visible: true, id: e?._id }) }} />
                  <FaTrashAlt className='delete' onClick={() => { }} />
                </div>
              </div>
            </div>
          )) : null
        }
      </div>

    </div>
  )
}

export default Groups;