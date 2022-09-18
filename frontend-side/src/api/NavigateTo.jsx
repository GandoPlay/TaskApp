import history from "../history";

export function NavigateTo(location){
    history.replace(location)
    history.go(0)
   }