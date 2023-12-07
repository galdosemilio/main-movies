import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  public saveData(key: string, value: string) {
    try {
      let values = this.getData(key);
      let currentList: string[] = values ? values : [];
      currentList.push(value);

      localStorage.setItem(key, JSON.stringify(currentList));
    } catch (error: any) {
      console.error("An error occurred when setting item to local storage");
      console.error(error);
    }
  }

  public getData(key: string): string[] {
    try {
      let item = localStorage.getItem(key);

      return item ? JSON.parse(item) : "";
    } catch (error: any) {
      console.error("An error occurred when getting data from local storage");
      console.error(error);
      return [];
    }
  }

  public removeValue(key: string, value: string) {
    try {
      let values = this.getData(key);
      let currentList: string[] = values ? values.filter(
        (currentValue) => currentValue !== value
      ) : [];

      localStorage.setItem(key, JSON.stringify(currentList));
    } catch (error: any) {
      console.error("An error occurred when removing data from local storage");
      console.error(error);
    }
  }
}