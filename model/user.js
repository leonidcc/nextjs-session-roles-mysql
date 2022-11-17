import {pool} from "/lib/db";

class UsersClass {
  constructor( db) {
    this.db = db;
  }
  async get(email){
    const qry = `SELECT * FROM users WHERE email=?`;
    let [row] = await this.db.query(qry, [email]);
    if(!row[0])return null;
    row[0].roles = JSON.parse(row[0].roles );
    return row[0];
  }
  async gets(){
    const qry = `SELECT * FROM users`;
    let [row] = await this.db.query(qry, []);
    return row;
  }
  async create(name,email,password,phone){
    const qry = `INSERT INTO users
      (name, email, email_verified, image, created_at, updated_at, roles, active, password, phone)
      VALUES (?,?, null,"/newusericon.png",NOW(),NOW(),"[]",0,?,?)`;
    let [row] = await this.db.query(qry, [name,email,password,phone]);
    return row;
  }
  async update(data, id){
    const qry = `UPDATE users SET ? WHERE id = ?`;
    let [row] = await this.db.query(qry, [data,id]);
    return row;
  }
}

const user = new UsersClass(pool);
export default user;
