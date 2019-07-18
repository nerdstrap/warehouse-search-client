import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthGrouping } from '../types/auth-grouping.types';

@Directive({
    selector: '[xhidden]'
})
export class XHiddenDirective implements OnInit {
    @Input('xhidden') permission: AuthGrouping;

    constructor(private el: ElementRef, private authService: AuthService) { }

    ngOnInit() {
        if (!this.authService.isInRole(this.permission)) {
            this.el.nativeElement.style.display = 'none';
        }
    }
}