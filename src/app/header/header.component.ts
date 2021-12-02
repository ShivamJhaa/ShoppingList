import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storge.service';

@Component(
{
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{
    constructor(private dataStorageService: DataStorageService) {}
    
    saveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetcRecipes().subscribe();
    }
}