import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthGrouping } from '../types/auth-grouping.types';

@Directive({
    selector: '[xdisabled]'
})
export class XDisabledDirective implements OnInit {
    @Input('xdisabled') permission: AuthGrouping;

    constructor(private el: ElementRef, private authService: AuthService) { }

    ngOnInit() {
        if (!this.authService.isInRole(this.permission)) {
            this.el.nativeElement.disabled = true;
        }
    }
}