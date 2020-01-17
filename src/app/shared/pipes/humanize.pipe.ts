import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "humanize" })
export class HumanizePipe implements PipeTransform {
  transform(content: string): string {
    return content.replace(/_/g, " ").replace(/(\w+)/g, function(match) {
      return match.charAt(0).toUpperCase() + match.slice(1);
    });
  }
}
