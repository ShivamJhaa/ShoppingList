import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storge.service';

@Component(
{
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{
    private userSub: Subscription;
    isAuth = false;

    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService) {}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(
            user => {
                this.isAuth =!!user;
            }
        );
    }
    
    saveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetcRecipes().subscribe();
    }

    ngOnDestroy() { 
        this.userSub.unsubscribe();
    }

    onLogout(){
        this.authService.logout();
    }
}