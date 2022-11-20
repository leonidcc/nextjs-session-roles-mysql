// producto title:string tags:string price:float:float resumen:string start:int person:int gramos:int:number img:string img:string detail:text id_categoria:int id_acount:int status:int


let fileSystem = require('fs');

let ENTIDAD = process.argv.slice(2,3)[0]
let att = process.argv.slice(3)

try {
  generate(
    "./../model/",ENTIDAD+".js",
    createModel(att,ENTIDAD)
  )
  generate(
    "./../pages/api/"+ENTIDAD+"/","index.js",
    createController(att,ENTIDAD)
  )
  generate(
    "./../pages/api/"+ENTIDAD+"/","[id].js",
    createControllerID(att,ENTIDAD)
  )
  generate(
    "./../pages/dashboard/"+ENTIDAD+"/","index.js",
    createViewRead(att,ENTIDAD)
  )
  generate(
    "./../pages/dashboard/"+ENTIDAD+"/edit/","[id].js",
    createViewUpdate(att,ENTIDAD)
  )
  generate(
    "./../pages/dashboard/"+ENTIDAD+"/remove/","[id].js",
    createViewDeleted(att,ENTIDAD)
  )
  generate(
    "./../pages/dashboard/"+ENTIDAD+"/","new.js",
    createViewCreate(att,ENTIDAD)
  )
} catch (e) {
  console.log(e);
}

// GENERAL
function mayus(str) {
  return str[0].toUpperCase()+str.slice(1)
}

async function generate(dir,file,string) {
  await fileSystem.mkdirSync(dir,{recursive:true})
  await fileSystem.writeFile(dir+file, string , (err) => {
    if (err) throw err;
    console.log("The file was succesfully saved! "+ dir+file);
  })

}

// CREATED

function createModel(att, entidad) {
  function createDb(att, entidad){
    let type = {
      "string":"varchar(30)",
      "text":"varchar(300)",
      "int":"int(11)",
      "date":"datetime",
      "float":"float(10,3)",
    }
    function parce(a) {
      let at = a.split(":");
      return `
      ${at[0]} ${type[at[1]]} NOT NULL`;
    }
    let qry = `CREATE TABLE IF NOT EXISTS ${entidad} (
      id int(11) NOT NULL AUTO_INCREMENT,
      ${att.map((a,i)=>{
        return parce(a,i)
      })},
      created_at datetime NOT NULL,
      updated_at datetime NOT NULL,
      PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET='utf8mb4';
      `;
    return qry
  }

  let attributes = att.map((a,i)=> " "+a.split(":")[0] );

  return `import {pool} from "/lib/db";

  class ${mayus(entidad)}Class {
    constructor( db) {
      this.db = db;
    }
    async get(id){
      const qry = \`SELECT * FROM  ${entidad} WHERE id =? \`;
      let [row] = await this.db.query(qry, [id]);
      if(!row[0])return null;
      return row[0];
    }
    async gets(){
      const qry = \`SELECT * FROM  ${entidad}  \`;
      let [row] = await this.db.query(qry, []);
      return row;
    }
    async getsByUser(id_user){
      const qry = \`SELECT * FROM  ${entidad} WHERE id_user = ?  \`;
      let [row] = await this.db.query(qry, [id_user]);
      return row;
    }
    async create(${attributes}){
      const qry =  \`INSERT INTO
        ${entidad} (${attributes}, created_at, updated_at)
        VALUES (${att.map((a,i)=> '?' )}, NOW(), NOW()) \`;
      let [row] = await this.db.query(qry, [${attributes}]);
      return row.insertId;
    }
    async update(attributes, id){
      const qry = \`UPDATE ${entidad} SET ? , updated_at = NOW() WHERE id = ?\`;
      let [row] = await this.db.query(qry, [attributes, id]);
      return row;
    }
    async remove(id){
      const qry = \`DELETE  FROM ${entidad} WHERE id = ?\`;
      let [row] = await this.db.query(qry, [id]);
      return row;
    }
    async createTable(){
      qry = \`${createDb(att, entidad)}\`;
      let [row] = await this.db.query(qry,[]);
    }
  }
  const ${entidad} = new ${mayus(entidad)}Class(pool);
  export default ${entidad};`}
function createController(att, entidad) {
  let attributes = att.map((a,i)=> " "+a.split(":")[0] );
  return `import ${mayus(entidad)} from "/model/${entidad}";
  import getsession from "/lib/session"

  export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return await gets(req, res);
      case "POST":
        return await save(req, res);
      default:
        return res.status(400).send("Method not allowed");
    }
  }

  const gets = async (req, res) => {
    try {
      const session = await getsession(req);
      // if(session && session.roles.includes("sudo")){
      if(session){
        const results = await ${mayus(entidad)}.gets();
        return res.status(200).json(results);
      }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  const save = async (req, res) => {
     try {
       const session = await getsession(req);
       // if(session && session.roles.includes("sudo")){
       if(session){
          const {${attributes}} = req.body;
          const results = await ${mayus(entidad)}.create(
            ${attributes}
           );
          return res.status(200).json({ ...req.body, id: results });
      }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };`}
function createControllerID(att, entidad) {
  let attributes = att.map((a,i)=> " "+a.split(":")[0] );
  return `import ${mayus(entidad)} from "model/${entidad}";
  import getsession from "/lib/session"

  export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return await get(req, res);
      case "DELETE":
        return await remove(req, res);
      case "PUT":
        return await update(req, res);
      default:
        return res.status(400).json({ message: "bad request" });
    }
  }

  const get  = async (req, res) => {
     try {
       const session = await getsession(req);
       // if(session && session.roles.includes("sudo")){
       if(session){
          const result = await ${mayus(entidad)}.get(req.query.id);
          return res.status(200).json(result);
       }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const remove = async (req, res) => {
    try {
      const session = await getsession(req);
      // if(session && session.roles.includes("sudo")){
      if(session){
        const result = await ${mayus(entidad)}.remove(req.query.id);
        return res.status(200).json(
          { message: "Removido" }
        );
      }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const update = async (req, res) => {
    let {${attributes}} = req.body
    try {
      const session = await getsession(req);
      // if(session && session.roles.includes("sudo")){
      if(session){
        const result = await ${mayus(entidad)}.update({${attributes}}, req.query.id);
        return res.status(200).json({
          message:"Cambios aplicados",
          data:req.body
        });
      }else return res.status(403).send("Forbiden");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  `}
function createViewRead(att, entidad) {
  let attributes = att.map((a,i)=> " "+a.split(":")[0] );
  return `import {useState} from "react"
  import getsession from "/lib/session"
  import LayoutDash from "cmp/LayoutDash";
  import Table from 'cmp/table';
  import Link from 'next/link'
  import post, {remove, get} from 'lib/utils'
  import popup from 'lib/popup'

  async function changeStatus(id,newStatus) {
    let res = await post("/api/user/changestatus",{
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
           <Link  href={\`${entidad}/edit/\${item.id}\`}>
             <div className="text-primary card px-1 me-1"><i class="bi bi-pen-fill"></i></div>
           </Link>
           <Link  href={\`${entidad}/remove/\${item.id}\`}>
             <div className="text-danger card px-1 me-1"><i class="bi bi-trash3-fill"></i></div>
           </Link>
       </div>
       )
     }
   },
   ${att.map((a,i)=>{
     let t = a.split(":");
     return `
     { field:'${t[0]}', headerName: '${mayus(t[0])}', width: 100 }`
   })},

  ];



  export default function UserPage({${entidad}, session }) {

    return (
      <LayoutDash session={session}>
        <div class="pb-2 d-flex justify-content-between align-items-center">
          <div >
          <Link href="/dashboard"> <span className="text-primary">Dashboard </span></Link> / ${mayus(entidad)} 
          </div>
          <Link href="/dashboard/${entidad}/new">
            <strong className="text-primary">Nuevo ${entidad}</strong>
          </Link>
        </div>
          <Table rows={${entidad}} columns={columns}/>
      </LayoutDash>
    );
  }

  export const getServerSideProps = async (context) => {
    const session = await getsession(context.req);
    // if(session && session.roles.includes("sudo")){
    if(session){

      const tokenSessionForApi = context.req.cookies.TokenSession;
      let [${entidad}] = await Promise.all([
        await (await fetch(process.env.NEXT_URL+"/api/${entidad}",{
          headers: {'Cookie': \`TokenSession=\${tokenSessionForApi}\`}
        })).json()
      ])

      return {
        props: {
          ${entidad}, session
        },
      };
    }
    return {
      redirect:{
        destination:"/dashboard",
        permanent:false
      }
    }
  };`}
function createViewUpdate(att, entidad) {
  function generateInputs(att) {
    let res = ""
    att.forEach((item, i) => {
      let t = item.split(":")
      if(t.includes("id_")){
        res +=`<div className=" col-md-12">
        <Select
          value={${entidad}.${t[0]}}
          label="${mayus(t[0])}"
          name="${t[0]}"
          />
      </div>`
    }else {
      res +=`<div className=" col-md-12">
      <Input
        value={${entidad}.${t[0]}}
        label="${mayus(t[0])}"
        name="${t[0]}"
        />
    </div>`
    }
    });

    return res
  }

  return `import {useState} from "react"
  import { useRouter } from 'next/router'
  import getsession from "/lib/session"
  import LayoutDash from "cmp/LayoutDash";
  import Table from 'cmp/table';
  import Link from 'next/link'
  import {put} from 'lib/utils'
  import popup from 'lib/popup'
  import {Input} from 'cmp/form'

  export default function UserPage({${entidad}, session }) {
    const router = useRouter();
    async function handleSubmit(e) {
      e.preventDefault();
      let form = new FormData(e.target);
      let res = await put("/api/${entidad}/"+${entidad}.id, Object.fromEntries(form) );
      if(res.status == 200){
        popup.alert(res.data.message)
        router.push('/dashboard/${entidad}')
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
          </Link> / <Link href="/dashboard/${entidad}">  <span className="text-primary">${mayus(entidad)}s </span>
          </Link> / {${entidad}.id}
          </div>
        </div>
        <form onSubmit={handleSubmit}  >
          ${generateInputs(att)}
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
      let [${entidad}] = await Promise.all([
        await (await fetch(process.env.NEXT_URL+"/api/${entidad}/"+context.params.id,{
          headers: {'Cookie': \`TokenSession=\${tokenSessionForApi}\`}
        })).json()
      ])

      return {
        props: {
          ${entidad},session
        },
      };
    }
    return {
      redirect:{
        destination:"/dashboard",
        permanent:false
      }
    }
  };`
}
function createViewDeleted(att, entidad) {
  function generateInputs(att) {
    let res = ""
    att.forEach((item, i) => {
      let t = item.split(":")
      res +=`<div className=" col-md-12">
                <Input
                    value={${entidad}.${t[0]}}
                    label="${mayus(t[0])}"
                    name="${t[0]}"
                />
            </div>`
    });

    return res
  }

  return `import {useState} from "react"
  import { useRouter } from 'next/router'
  import getsession from "/lib/session"
  import LayoutDash from "cmp/LayoutDash";
  import Table from 'cmp/table';
  import Link from 'next/link'
  import {remove} from 'lib/utils'
  import popup from 'lib/popup'
  import {Input} from 'cmp/form'

  export default function UserPage({${entidad}, session }) {
    const router = useRouter();
    return (
      <LayoutDash session={session}>
        <div class="pb-2">
          <div >
          <Link href="/dashboard">
            <span className="text-primary">Dashboard </span>
          </Link> / <Link href="/dashboard/${entidad}">  <span className="text-primary"> ${mayus(entidad)} </span>
      </Link> / Eliminar
          </div>
        </div>

        <div className="row bg-white shadow-sm py-5 text-center">
          <div className="col-md-12 py-3">
            <h2>Seguro que quiere eliminar el item </h2>
          </div>
          <div className="col-md-6 py-3">
            <Link href="/dashboard/${entidad}">
              <button className="btn btn-primary">
                CANCELAR
              </button>
           </Link>
          </div>
          <div className="col-md-6 py-3">
            <button
              onClick={()=>{
                remove(\`/api/${entidad}/\${${entidad}.id}\`);
                router.push('/dashboard/${entidad}')
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
      let [${entidad}] = await Promise.all([
        await (await fetch(process.env.NEXT_URL+"/api/${entidad}/"+context.params.id,{
          headers: {'Cookie': \`TokenSession=\${tokenSessionForApi}\`}
        })).json()
      ])

      return {
        props: {
          ${entidad},session
        },
      };
    }
    return {
      redirect:{
        destination:"/dashboard",
        permanent:false
      }
    }
  };`
}
function createViewCreate(att, entidad) {
  function generateInputs(att) {
    let res = ""
    att.forEach((item, i) => {
      let t = item.split(":")
      res +=`<div className=" col-md-12">
                <Input
                    value={""}
                    label="${mayus(t[0])}"
                    name="${t[0]}"
                />
            </div>`
    });

    return res
  }

  return `import {useState} from "react"
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
      let res = await post("/api/${entidad}", Object.fromEntries(form) );
      if(res.status == 200){
        popup.alert(res.data.message)
        router.push('/dashboard/${entidad}')
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
          </Link> / <Link href="/dashboard/${entidad}">  <span className="text-primary">${mayus(entidad)}s </span>
      </Link> / New
          </div>
        </div>
        <form onSubmit={handleSubmit}  >
          ${generateInputs(att)}
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
  };`
}
