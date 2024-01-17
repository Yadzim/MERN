import React, { useState, useEffect, Dispatch } from 'react';
import useForm from 'hook/useForm';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { URL } from 'config/utils';
import EModal from 'ui_components/Modal';

const UserForm: React.FC<{ open: boolean, id: number, refetch: any, setClick: Dispatch<{ visible: boolean, id: number }> }> = ({ open, id, refetch, setClick }): JSX.Element => {
  const form = useForm();

  const { isFetching } = useQuery({
    queryKey: ['users', id],
    queryFn: () => {
      return axios.get(`${URL}/users/${id}`)
    },
    onSuccess: (res) => {
      if (res?.data?.data) {
        form.setFieldsValue({
          name: res.data?.data?.name,
          username: res.data?.data?.username,
          email: res.data?.data?.email,
          group_id: res.data?.data?.group_id,
        })
      }
    },
    onError: (err: any) => {
      console.log(err?.response?.data?.message ?? "");
    },
    enabled: !!id
  });

  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => {
      return axios.get(`${URL}/groups`)
    },
  })

  useEffect(() => {
    form.resetFields();
  }, [id]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    console.log(form.ref);


    if (form.getFieldsValue()) {
      try {
        if (id) {
          const res = await axios.put(`${URL}/users/${id}`, form.getFieldsValue());
          if (res.data?.status === 1) {
            refetch();
            form.resetFields();
            setClick({ visible: false, id: 0 });
            console.log("Updated user");
          }
        } else {
          const res = await axios.post(`${URL}/users`, form.getFieldsValue());
          if (res.data?.status === 1) {
            refetch();
            form.resetFields();
            setClick({ visible: false, id: 0 });
            console.log("Created user");
          }
        }

      } catch (arr) {
        console.log(arr);
      }
    } else {
      console.log("Please fill inpul");

    }

  }

  return (
    <EModal
      open={open}
      closeIcon={null}
      header={<div className="d-f justify-between">
        <h4 className='text-4xl font-bold' >{id ? "Update" : "Create"} user</h4>
        <div className='d-f' >
          <button className="e-btn px-3 text-lg text-red-600 hover:text-red-600 hover:border-red-500 bg-[$element]" onClick={() => { setClick({ visible: false, id: 0 }); form.resetFields() }} >Cancel</button>
        </div>
      </div>}
      footer={null}
    >
      <form ref={form.ref} onSubmit={onSubmit} className='w-full mx-auto p-3'>
        <div className="form-item text-start">
          <span className="block">F.I.O</span>
          <input name="name" type="text" className="e-input w-full" placeholder="Input F.I.O ..." />
        </div>
        <div className="form-item text-start mt-3">
          <span className="block">Username</span>
          <input name="username" className="e-input w-full" placeholder="Input username ..." />
        </div>
        <div className="form-item text-start mt-3">
          <span className="block">Email</span>
          <input name="email" type='email' className="e-input w-full" placeholder="Input email ..." />
        </div>
        <div className="form-item text-start mt-3">
          <span className="block">Group</span>
          <select name="group_id" className="e-input w-full" placeholder="Select group ..." >
            <option>Select group</option>
            {
              groups?.data?.groups?.map((e: any) => <option value={e?._id} key={e?._id} >{e?.name}</option>)
            }
          </select>
        </div>
        {/* <div className="d-f justify-content-end"> */}
        {/* </div> */}
        <button className="e-btn bg-element block w-full mt-5 px-3 h_2-5" type='submit' >Add</button>
      </form>
    </EModal>
  );
};

export default UserForm;