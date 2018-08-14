import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'flightSearch',
    pure: false
})
export class FlightSearchPipe implements PipeTransform {
    transform(items: Array<any>, fromSearch: string, toSearch: string, departureSearch: string, arrivalSearch: string, personSearch) {
        if (items && items.length) {
            return items.filter(item => {
                if (fromSearch && item.name.toLowerCase().indexOf(fromSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (toSearch && item.email.toLowerCase().indexOf(toSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (departureSearch && item.company.toLowerCase().indexOf(departureSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (arrivalSearch && item.email.toLowerCase().indexOf(arrivalSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (personSearch && item.company.toLowerCase().indexOf(personSearch.toLowerCase()) === -1) {
                    return false;
                }
                return true;
           });
        } else {
            return items;
        }
    }
}