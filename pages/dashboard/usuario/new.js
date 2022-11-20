import {useState} from "react"
  import { useRouter } from 'next/router'
  import getsession from "/lib/session"
  import LayoutDash from "cmp/LayoutDash";
  import Table from 'cmp/table';
  import Link from 'next/link'
  import post from 'lib/utils'
  import popup from 'lib/popup'
  import {Input} from 'cmp/form'

  export default function UserPage({session }) {
    const router = useRouter();
    async function handleSubmit(e) {
      e.preventDefault();
      let form = new FormData(e.target);
      let res = await post("/api/usuario", Object.fromEntries(form) );
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
      </Link> / New
          </div>
        </div>
        <form onSubmit={handleSubmit}  >
          <div className=" col-md-12">
                <Input
                    value={""}
                    label="Name"
                    name="name"
                />
            </div><div className=" col-md-12">
                <Input
                    value={""}
                    label="Email"
                    name="email"
                />
            </div><div className=" col-md-12">
                <Input
                    value={""}
                    label="Email_verified"
                    name="email_verified"
                />
            </div><div className=" col-md-12">
                <Input
                    value={""}
                    label="Image"
                    name="image"
                />
            </div><div className=" col-md-12">
                <Input
                    value={""}
                    label="Roles"
                    name="roles"
                />
            </div><div className=" col-md-12">
                <Input
                    value={""}
                    label="Status"
                    name="status"
                />
            </div><div className=" col-md-12">
                <Input
                    value={""}
                    label="Password"
                    name="password"
                />
            </div><div className=" col-md-12">
                <Input
                    value={""}
                    label="Phone"
                    name="phone"
                />
            </div>
          <div className="col-md-12 py-3">
            <button className="btn btn-primary " type="submit">Crear</button>
          </div>
        </form>

      </LayoutDash>
    );
  }

  export const getServerSideProps = async (context) => {
    const session = await getsession(context.req);
    // if(session && session.roles.includes("sudo")){
    if(session){
      return {
        props: { session
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