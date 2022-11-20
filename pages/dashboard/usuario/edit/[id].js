import {useState} from "react"
  import { useRouter } from 'next/router'
  import getsession from "/lib/session"
  import LayoutDash from "cmp/LayoutDash";
  import Table from 'cmp/table';
  import Link from 'next/link'
  import {put} from 'lib/utils'
  import popup from 'lib/popup'
  import {Input} from 'cmp/form'

  export default function UserPage({usuario, session }) {
    const router = useRouter();
    async function handleSubmit(e) {
      e.preventDefault();
      let form = new FormData(e.target);
      let res = await put("/api/usuario/"+usuario.id, Object.fromEntries(form) );
      if(res.status == 200){
        popup.alert(res.data.message)
        router.push('/dashboard/usuario')
      }else {
        popup.alert("Ups! intentelo mas tarde","d")
      }
    }

    return (
      <LayoutDash session={session}>
        <div class="pb-2">
          <div >
          <Link href="/dashboard">
            <span className="text-primary">Dashboard </span>
          </Link> / <Link href="/dashboard/usuario">  <span className="text-primary">Usuarios </span>
          </Link> / {usuario.id}
          </div>
        </div>
        <form onSubmit={handleSubmit}  >
          <div className=" col-md-12">
      <Input
        value={usuario.name}
        label="Name"
        name="name"
        />
    </div><div className=" col-md-12">
      <Input
        value={usuario.email}
        label="Email"
        name="email"
        />
    </div><div className=" col-md-12">
      <Input
        value={usuario.email_verified}
        label="Email_verified"
        name="email_verified"
        />
    </div><div className=" col-md-12">
      <Input
        value={usuario.image}
        label="Image"
        name="image"
        />
    </div><div className=" col-md-12">
      <Input
        value={usuario.roles}
        label="Roles"
        name="roles"
        />
    </div><div className=" col-md-12">
      <Input
        value={usuario.status}
        label="Status"
        name="status"
        />
    </div><div className=" col-md-12">
      <Input
        value={usuario.password}
        label="Password"
        name="password"
        />
    </div><div className=" col-md-12">
      <Input
        value={usuario.phone}
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
    // if(session && session.roles.includes("sudo")){
    if(session){

      const tokenSessionForApi = context.req.cookies.TokenSession;
      let [usuario] = await Promise.all([
        await (await fetch(process.env.NEXT_URL+"/api/usuario/"+context.params.id,{
          headers: {'Cookie': `TokenSession=${tokenSessionForApi}`}
        })).json()
      ])

      return {
        props: {
          usuario,session
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