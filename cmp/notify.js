import post from "/lib/utils";
import { useRouter } from 'next/router'

export default function LogOut() {
  const router = useRouter();
  const signOut =async  ()=>{
    let res = await post("/api/authenticate/logout");
    router.push('/login')
  }

  return (
    <div className="py-4">
    <div className="d-flex justify-content-between align-items-center">
      <div className="icon">
        <i className="pe-3 text-warning bi bi-envelope-fill"></i>
        <i className="pe-3 text-primary bi bi-bell-fill"></i>
      </div>
      <button onClick={signOut}>Cerrar sesion</button>
    </div>
      <style jsx>
      {`
        .icon{
          font-size:20px;
        }
        button {
          background-color: #fff;
          border: 1px solid #dadce0;
          -webkit-border-radius: 100px;
          border-radius: 5px;
          color: #3c4043;
          display: inline-block;
          font: 500 14px/16px Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
          letter-spacing: .25px;
          outline: 0;
          padding: 8px 15px;
          text-align: center;
          text-decoration: none;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;
        }
        `}
        </style>
    </div>
  );
}
