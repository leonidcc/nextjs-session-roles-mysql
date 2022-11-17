import {useState} from "react"
import getsession from "/lib/session"
import LayoutDash from "cmp/LayoutDash";
import Table from 'cmp/table';
import Link from 'next/link'
import post from 'lib/utils'
import popup from 'lib/popup'

async function changeStatus(id,newStatus) {
  let res = await post("/api/user/changestatus",{
    id,newStatus
  })
  return res;
}


const columns = [
 { field: 'id', headerName: 'ID', width: 50 },
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
 { field: 'name', headerName: 'Nombre', width: 150 },
 {
   field: 'image',
   headerName: 'Image',
   width: 90,
   valueGetter: (item ) => {
     return <img className="rounded" height="25px" src={item.image} />
     return JSON.stringify(item)
   },
 },
 {
   field: 'email',
   headerName: 'Email',
   width: 190
 },
 {
   field: 'created_at',
   headerName: 'Creacion',
   width: 290,
   valueGetter: (item ) => {
     let f = new Date(item.created_at);
     return f.toString();
   }
 },
];


export default function UserPage({ users, session }) {


  return (
    <LayoutDash session={session}>
      <div class="pb-2">
        <div className="text-primary">
        <Link href="/dashboard">Dashboard </Link> / Usuario
        </div>
      </div>
        <Table rows={users} columns={columns}/>
    </LayoutDash>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getsession(context.req);
  if(session && session.roles.includes("sudo")){
    const res = await fetch(
      process.env.NEXT_URL+"/api/user"
    );
    let users = await res.json();
    return {
      props: {
        users,session
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
