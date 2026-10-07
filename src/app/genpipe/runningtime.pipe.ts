import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runningtime'
})
export class RunningtimePipe implements PipeTransform {

  transform(value: any) {
    let runningTime = value.split(" ");
    if (runningTime[0] > 0) {
      runningTime = `${runningTime[0]} h ${runningTime[2]} mins`;
    } else {
      runningTime = `${runningTime[2]} mins`;
    }
    return runningTime;
  }

}
