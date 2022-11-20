import {useState} from "react"
  import { useRouter } from 'next/router'
  import getsession from "/lib/session"
  import LayoutDash from "cmp/LayoutDash";
  import Table from 'cmp/table';
  import Link from 'next/link'
  import {remove} from 'lib/utils'
  import popup from 'lib/popup'
  import {Input} from 'cmp/form'

  export default function UserPage({usuario, session }) {
    const router = useRouter();
    return (
      <LayoutDash session={session}>
        <div class="pb-2">
          <div >
          <Link href="/dashboard">
            <span className="text-primary">Dashboard </span>
          </Link> / <Link href="/dashboard/usuario">  <span className="text-primary"> Usuario </span>
      </Link> / Eliminar
          </div>
        </div>

        <div className="row bg-white shadow-sm py-5 text-center">
          <div className="col-md-12 py-3">
            <h2>Seguro que quiere eliminar el item </h2>
          </div>
          <div className="col-md-6 py-3">
            <Link href="/dashboard/usuario">
              <button className="btn btn-primary">
                CANCELAR
              </button>
           </Link>
          </div>
          <div className="col-md-6 py-3">
            <button
              onClick={()=>{
                remove(`/api/usuario/${usuario.id}`);
                router.push('/dashboard/usuario')
              }}
              className="btn btn-danger "  >
              CONFIRMAR
            </button>
          </div>
        </div>






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