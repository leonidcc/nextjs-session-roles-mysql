import LayoutDash from "cmp/LayoutDash";
import Card, {CardSmall} from "cmp/card"
import getsession from "/lib/session"

export default function Dashboard({session}) {
  return (
    <LayoutDash session={session}>

      <h2 className="text-center  ">
        Bienvenido, {session.name} 👋
      </h2>
      <p className="text-center pb-3 text-muted"> Lorem  Ingredientes para la receta de Nombre_Rec Asdf Sa Elaboración de Nomb set up data
      </p>

      <div className="row">
        <div className="col-md-4">
          <Card />
        </div>
        <div className="col-md-4">
          <Card bg="#fec514"/>
        </div>
        <div className="col-md-4">
          <Card bg="#00bfb3"/>
        </div>
      </div>
      <h4 className="  pt-5 ">
         ⚙️ Administrador
      </h4>
      <div className="row">
        <div className="col-md-4">
          <CardSmall />
        </div>
        <div className="col-md-4">
          <CardSmall bg="#fec514"/>
        </div>
        <div className="col-md-4">
          <CardSmall bg="#00bfb3"/>
        </div>
      </div>
      {session.roles.includes("sudo")
        ?<div>
          <h4 className="  pt-5 ">
            🤖 Sudo
          </h4>
          <div className="row">
            <div className="col-md-4">
              <CardSmall url="/dashboard/user" />
            </div>
            <div className="col-md-4">
              <CardSmall bg="#fec514"/>
            </div>
          </div>
        </div>
        :''
      }

    </LayoutDash>
  )
}

export async function getServerSideProps(context){
  let session = await getsession(context.req); 
  if(session)return {
    props:{
      session
    }
  }
  return {
    redirect:{
      destination:"/login",
      permanent:false
    }
  }

}
