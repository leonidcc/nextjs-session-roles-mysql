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
    <div className="row pb-2 ">
      <div className=" col-md-8">
        <div className="form-floating pb-4">
           <input id="filtroproducto" type="email" placeholder="EtiquetasNúmeroNombre" className="shadow-sm form-control" id="floatingInputValue" placeholder="name@example.com"/>
           <label for="floatingInputValue">Escribe tu busqueda </label>
         </div>
      </div>
      <div className="col-md-4 ">
        <div className="form-floating  ">
          <select className="form-select shadow-sm"  >
            <option value="1">Todos</option>
            { columns.map((c,i)=>{
              return <option key={i} value="1">{c.field}</option>
              })
            }
          </select>
          <label for="floatingSelect">Seleccione una columna</label>
        </div>
      </div>
      </div>
    <div className="w-100  ">
      <TableHeader columns={columns}/>
      <TableBody
        pageSize={pageSize}
        columns={columns}
        rows={rows}
      />
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
    <div className="d-flex px-3 shadow-sm bg-gray">
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
function TableBody({columns, rows, pageSize}){
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
      <div className=" ">
        { data.map((d,i)=>{
            return (<div key={i} >
                <Item data={d}  columns={columns} index={i}/>
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
    </div>
  )
}

function Item({data, columns, index}) {
  return (
    <div className="d-flex p-3 bg-white shadow-sm mb-2">
      { columns.map((c,i)=>{
          return (
            <div  key={i} style={{width:`${c.width}px`}} className="text-truncate" >
              {c.valueGetter
                ?(c.valueGetter(data, index))
                :(data[c.field])
              }
            </div>
        )
        })
      }
    </div>
  )
}
