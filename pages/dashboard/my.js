import {useState} from "react"
import { useRouter } from 'next/router'
import getsession from "/lib/session"
import LayoutDash from "cmp/LayoutDash";
import Table from 'cmp/table';
import Link from 'next/link'
import {put} from 'lib/utils'
import popup from 'lib/popup'
import {Input} from 'cmp/form'


export default function UserPage({  session }) {
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    let res = await put("/api/usuario/my", Object.fromEntries(form) );
    if(res.status == 200){
      popup.alert(res.data.message)
      router.push('/dashboard')
    }else {
      popup.alert(res.data.message,"d")
    }
  }

  return (
    <LayoutDash session={session}>
      <div class="pb-2">
        <div >
        <Link href="/dashboard">
          <span className="text-primary">Dashboard </span>
        </Link>/ my
        </div>
      </div>
      <form onSubmit={handleSubmit}  >
        <div className=" col-md-12">
    <Input
      value={session.name}
      label="Name"
      name="name"
      />
  </div><div className=" col-md-12">
    <Input
      value={session.email}
      label="Email"
      name="email"
      />
  </div> <div className=" col-md-12">
    <Input
      value={session.image}
      label="Image"
      name="image"
      />
  </div>
  <div className=" col-md-12">
    <Input
      value={session.phone}
      label="Phone"
      name="phone"
      />
  </div>
        <div className="col-md-12 py-3">
          <button className="btn btn-primary " type="submit">Guardar</button>
        </div>
      </form>

    </LayoutDash>
  );
}


export const getServerSideProps = async (context) => {
  const session = await getsession(context.req);
  if(session  ){
    return {
      props: {
       session
      },
    };
  }
  return {
    redirect:{
      destination:"/dashboard",
      permanent:false
    }
  }
};
