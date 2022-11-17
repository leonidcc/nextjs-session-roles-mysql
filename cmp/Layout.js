import Head from 'next/head'
import Nav from "./nav"
import Footer from "./footer"
import SubNav from "./notify"

export default function LayoutDash({session, data,children, title, description}){
  return (
    <div >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"/>
      </Head>
      <main className="container">
        {children}
      </main>      
      <style jsx>
      {`
        main{
          min-height: 80vh;
        }
        `}
      </style>
    </div>
  )
}



LayoutDash.defaultProps = {
  title: "Nexts.js app title",
  description: "description de mi web default"
}
