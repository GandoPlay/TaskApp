 const Role = {
	AVTASH: 'אבטש',
	CLEAN: 'ניקיון',
	NIGHT: 'לילה',
	HANFZA: 'הנפצה'
}

const RoleColors = {
	AVTASH: 'green',
	CLEAN: 'black',
	NIGHT: 'blue',
	HANFZA: 'red'
}
 const Routes = {
	"/": "התנתק",
	"Rating": "ניקוד",
	"dateTable": "טבלת תורניות"
  };
 const prod = process.env.PRODUCTION === "true"
const baseURL:string = prod? '/api':'http://localhost:3001/api'


  export { RoleColors,Routes, Role,baseURL}