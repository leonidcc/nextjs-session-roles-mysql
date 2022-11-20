import { useState, useEffect } from 'react';

const columns = [
 { field: 'id', headerName: 'ID', width: 100 },
 { field: 'name', headerName: 'Nombre', width: 150 },
 {
   field: 'image',
   headerName: 'Image',
   width: 190,
   valueGetter: (item ) => {
     return item.name;
     return JSON.stringify(item)
   }
 }
];

const data = [
  {
    id:1,
    name:"hola master32",
    image:"turetre.com32"
  },
  {
    id:2,
    name:"hola master13",
    image:"turetre.com13"
  }
];

export default function Table({columns, rows, pageSize=5 }){

  return (
    <div>
    <div className="row pt-2 ">
      <div className=" col-md-6">
        <div className="form-floating pb-4">
           <input  type="email" placeholder="EtiquetasNúmeroNombre" className="shadow-sm form-control pb-0"   />
           <label for="floatingInputValue">Filtre los resultados </label>
         </div>
      </div>
      <div className=" col-md-3">
        <div className="form-floating pb-4">
           <input  type="datetime-local" placeholder="EtiquetasNúmeroNombre" className="shadow-sm form-control pb-0"   />
           <label for="floatingInputValue">Filtre los resultados </label>
         </div>
      </div>
      <div className=" col-md-3">
        <div className="form-floating pb-4">
           <input  type="datetime-local" placeholder="EtiquetasNúmeroNombre" className="shadow-sm form-control pb-0"   />
           <label for="floatingInputValue">Filtre los resultados </label>
         </div>
      </div>
      </div>
    <div className="tabla  ">
      <TableBody
        pageSize={pageSize}
        columns={columns}
        rows={rows}
       >
        <TableHeader columns={columns}/>
      </TableBody>
    </div>

    </div>
  )
}


Table.defaultProps = {
  columns: columns,
  rows: data
}

function TableHeader({columns}){
  const [sort, setSort] = useState(0);
  const [attr, setAttr] = useState("");

  function getIconSort(n) {
    if(sort == -1) return "down-alt";
    if(sort == 1) return "up"
    return ""
  }

  return (
    <div className="d-inline-flex px-3 shadow-sm bg-gray">
      { columns.map((c,i)=>{
        if(c.sort == false)
        return <div  style={{width:`${c.width}px`}} className="pb-2">
          <small className="text-muted">
            {c.headerName}
          </small>
        </div>

          return <div key={i} style={{width:`${c.width}px`}} className="pb-2"
          onClick={()=>{
            setAttr(c.field)
            if(sort == 0) setSort(1);
            else if(sort == 1) setSort(-1);
            else {
              setSort(0)
              setAttr("")
            }
          }}>
            <div className={attr==c.field?'text-primary fw-bold':'text-muted'} >
              <small className="">
                {c.headerName}
              </small>
              {attr == c.field
                ?(<strong className=" px-2">
                  <i className={`bi bi-sort-${getIconSort(sort)}`}></i>
                </strong>):''
              }
            </div>

          </div>;

        })
      }

    </div>
  )
}
function TableBody({children, columns, rows, pageSize}){
  const [index, setIndex] = useState(0);

  const previus = ()=>{
    let newI = index-1;
    if(newI>=0)  setIndex(newI);
  }
  const next = ()=>{
    let newI = index+1
    let maxPage = Math.floor(rows.length/pageSize);
    if(newI<=maxPage)setIndex(newI);
  }
  let data = [...rows].slice(pageSize*index,pageSize*index+pageSize);
  return (
    <div>
      <div className="tabla pb-4 px-1 ">
        {children}
        { data.map((d,i)=>{
            return (<div key={i} >
                <Item data={d}  columns={columns} index={i} rows={rows}/>
              </div>)
          })
        }
      </div>
    <div>
    <nav className="d-flex justify-content-between  pb-0 m-0 align-items-center">
        <div>

        </div>
        <ul className="pagination mt-3 mb-0">
          <li className="page-item">
            <div className="page-link" onClick={previus} >&laquo;</div>
          </li>
          <li className="page-item">

          <div className="page-link bg-none" >
          {pageSize*index} - {pageSize*index+data.length} de {rows.length}
          </div>
          </li>
          <li className="page-item">
            <div className="page-link" onClick={next} >&raquo;</div>
          </li>
        </ul>
      </nav>
    </div>
    <style jsx>
    {`
      .tabla{
        width:100%;
        overflow-x:scroll;
      }
      `}
    </style>
    </div>
  )
}

function Item({data, columns, index, rows}) {
  return (
    <div className="d-inline-flex   px-3 py-4 bg-white shadow-sm mb-2">
      { columns.map((c,i)=>{
          return (
            <div  key={i} style={{width:`${c.width}px`}} className="text-truncate" >
              {c.valueGetter
                ?(c.valueGetter(data, rows, index))
                :(data[c.field])
              }
            </div>
        )
        })
      }
    </div>
  )
}
