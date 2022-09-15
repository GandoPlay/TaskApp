import React from 'react'
import { DayPicker } from "react-day-picker";

import { format } from "date-fns";

function TaskDayPicer(range,setRange,setAddTask) {
 
    
  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }
        if(setAddTask ==="אבטש"){
            return(
          <DayPicker
          mode="range"
          min={7}
          max={8}
          selected={range}
          onSelect={setRange}
          footer={footer}
        />
        )
        }else{
            return(
          <DayPicker
          mode="range"
          min={0}
          max={1}
          selected={range}
          onSelect={setRange}
          footer={footer}
        />
        )
        }

    
  
}

export default TaskDayPicer