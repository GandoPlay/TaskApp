import history from "../../../frontend-side/src/history";

export function NavigateTo(location){
    history.replace(location)
    history.go(0)
   }