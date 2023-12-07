import { Pipe, PipeTransform } from "@angular/core";
import { Movie } from "./movie";
import { SortFieldType, SortOrderType } from "./types";

@Pipe({
  name: "orderBy",
})
export class OrderByPipe implements PipeTransform {
  transform(value: Movie[], sortField: SortFieldType, order: SortOrderType): Movie[] {
    return value.sort((a: Movie, b: Movie) => {
      let textA = sortField === "title" ? a.title.toUpperCase() : a.releaseDate;
      let textB = sortField === "title" ? b.title.toUpperCase() : b.releaseDate;

      if (order === "asc") {
        return (textA < textB) ? -1 : 1;
      } else {
        return (textA > textB) ? -1 : 1;
      }
    });
  }
}