import {pool} from "/lib/db";

  class UsuarioClass {
    constructor( db) {
      this.db = db;
    }
    async get(id){
      const qry = `SELECT * FROM  usuario WHERE email =? `;
      let [row] = await this.db.query(qry, [id]);
      if(!row[0])return null;
      return row[0];
    }
    async getById(id){
      const qry = `SELECT * FROM  usuario WHERE id =? `;
      let [row] = await this.db.query(qry, [id]);
      if(!row[0])return null;
      return row[0];
    }
    async gets(){
      const qry = `SELECT * FROM  usuario  `;
      let [row] = await this.db.query(qry, []);
      return row;
    }
    async getsByUser(id_user){
      const qry = `SELECT * FROM  usuario WHERE id_user = ?  `;
      let [row] = await this.db.query(qry, [id_user]);
      return row;
    }
    async create( name, email, email_verified, image, roles, status, password, phone){
      const qry =  `INSERT INTO
        usuario ( name, email, email_verified, image, roles, status, password, phone, created_at, updated_at)
        VALUES (?,?,?,?,?,?,?,?, NOW(), NOW()) `;
      let [row] = await this.db.query(qry, [ name, email, email_verified, image, roles, status, password, phone]);
      return row.insertId;
    }
    async update(attributes, id){
      const qry = `UPDATE usuario SET ? , updated_at = NOW() WHERE id = ?`;
      let [row] = await this.db.query(qry, [attributes, id]);
      return row;
    }
    async remove(id){
      const qry = `DELETE  FROM usuario WHERE id = ?`;
      let [row] = await this.db.query(qry, [id]);
      return row;
    }
    async createTable(){
      qry = `CREATE TABLE IF NOT EXISTS usuario (
      id int(11) NOT NULL AUTO_INCREMENT,

      name varchar(30) NOT NULL,
      email varchar(30) NOT NULL,
      email_verified varchar(30) NOT NULL,
      image varchar(30) NOT NULL,
      roles varchar(30) NOT NULL,
      status int(11) NOT NULL,
      password varchar(30) NOT NULL,
      phone varchar(30) NOT NULL,
      created_at datetime NOT NULL,
      updated_at datetime NOT NULL,
      PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET='utf8mb4';
      `;
      let [row] = await this.db.query(qry,[]);
    }
  }
  const usuario = new UsuarioClass(pool);
  export default usuario;
