import Link from 'next/link'
export default function Card({bg, img, title, detail}) {
  return (
    <div className="card-g rounded bg-1 my-1 bg-white">
        <Link href="#">
          <div style={{"background":bg}} className="py-2  py-md-4 text-center">
            <img width="90px" src={img} alt=""/>
          </div>
          <div className="  text-center p-2 p-md-3 ">
            <strong className="text-primary">{title}</strong>
            <p className="m-0 text-muted">{detail}</p>
          </div>
        </Link>
        <style jsx>
        {`
          .card-g{
            box-shadow: 0 0.3125rem 0.875rem #81818133;
            border-radius: 7px !important;
            overflow: hidden;
          }
        `}
        </style>
  </div>
  );
}

Card.defaultProps = {
  bg:"#0273f5",
  img: "https://www.kaiwik.com/icons/businesspersonalization_spot_96x96_3e9cfdaa7fadd7ed314f7da7a96b59d3.png",
  title: "NEXTJS TITLE APP",
  detail: "description de mi web default"
}


export function CardSmall({url, bg, img, title, detail}) {
  return (
    <div className="shadow-sm bg-white rounded bg-1 my-1">
      <Link href={url}>
      <div className="row p-3">
        <div className="col-8 ">
          <strong className="text-primary">{title}</strong>
          <p className="m-0 text-muted "> Información de la cuenta y datos personales </p>
        </div>
        <div className="col-4">
          <img width="80px" src={img} alt=""/>
        </div>
      </div>
      </Link>
    </div>
  );
}

CardSmall.defaultProps = {
  url:"#",
  bg:"#0273f5",
  img: "https://www.kaiwik.com/icons/businesspersonalization_spot_96x96_3e9cfdaa7fadd7ed314f7da7a96b59d3.png",
  title: "NEXTJS TITLE APP",
  detail: "description de mi web default"
}
