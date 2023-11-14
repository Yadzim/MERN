
export default function GenerateID(): number {

  // const id = new Date();

  // return Number(id.getFullYear().toString()+id.getMonth().toString()+id.getDay().toString()+id.getHours().toString()+id.getMinutes().toString()+id.getSeconds().toString()+id.getMilliseconds().toString())
  return new Date().valueOf()
}