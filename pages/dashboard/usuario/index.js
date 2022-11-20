import {useState} from "react"
  import getsession from "/lib/session"
  import LayoutDash from "cmp/LayoutDash";
  import Table from 'cmp/table';
  import Link from 'next/link'
  import post, {remove, get} from 'lib/utils'
  import popup from 'lib/popup'

  async function changeStatus(id,newStatus) {
    let res = await post("/api/usuario/changestatus",{
      id,newStatus
    })
    return res;
  }



 const columns = [
   { field:'id', headerName: 'ID', width: 40 },
   {
     headerName: 'Acciones',
     width: 80,
     valueGetter: (item ) => {
       return (
         <div className="d-flex">
           <Link  href={`usuario/edit/${item.id}`}>
             <div className="text-primary card px-1 me-1"><i class="bi bi-pen-fill"></i></div>
           </Link>
           <Link  href={`usuario/remove/${item.id}`}>
             <div className="text-danger card px-1 me-1"><i class="bi bi-trash3-fill"></i></div>
           </Link>
       </div>
       )
     }
   },
   {
     field: 'status',
     headerName: 'Status',
     width:  80,
     sort:false,
     valueGetter: (item ) => {
       const [checked,setchecked] = useState(item.status);
       return (
         <div class="form-check form-switch ms-2">
           <input onChange={async (e)=>{
             let res = await changeStatus(item.id,e.target.checked);
             if(res.status == 200){
               popup.alert(res.data.message)
               setchecked(res.data.value);
             }else {
               popup.alert(res.data.message,"d")
             }
           }} checked={checked}   class="form-check-input" type="checkbox" role="switch"  />

         </div>
       )
     },
   },

     { field:'name', headerName: 'Name', width: 100 },
     { field:'email', headerName: 'Email', width: 100 },
     { field:'email_verified', headerName: 'Email_verified', width: 100 },
     {
       field: 'image',
       headerName: 'Image',
       width: 90,
       valueGetter: (item ) => {
         return <img className="rounded" height="25px" src={item.image} />
         return JSON.stringify(item)
       },
     },
     { field:'roles', headerName: 'Roles', width: 100 },

     { field:'password', headerName: 'Password', width: 100 },
     { field:'phone', headerName: 'Phone', width: 100 },

  ];



  export default function UserPage({usuario, session }) {

    return (
      <LayoutDash session={session}>
        <div class="pb-2 d-flex justify-content-between align-items-center">
          <div >
          <Link href="/dashboard"> <span className="text-primary">Dashboard </span></Link> / Usuario
          </div>
          <Link href="/dashboard/usuario/new">
            <strong className="text-primary">Nuevo usuario</strong>
          </Link>
        </div>
          <Table rows={usuario} columns={columns}/>
      </LayoutDash>
    );
  }

  export const getServerSideProps = async (context) => {
    const session = await getsession(context.req);
    // if(session && session.roles.includes("sudo")){
    if(session){

      const tokenSessionForApi = context.req.cookies.TokenSession;
      let [usuario] = await Promise.all([
        await (await fetch(process.env.NEXT_URL+"/api/usuario",{
          headers: {'Cookie': `TokenSession=${tokenSessionForApi}`}
        })).json()
      ])

      return {
        props: {
          usuario, session
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
