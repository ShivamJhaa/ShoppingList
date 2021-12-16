import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthCompoenent } from './auth.component';

@NgModule({
    declarations:[
        AuthCompoenent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            {path: '',component: AuthCompoenent},
        ])
    ]

})
export class AuthModule{}
