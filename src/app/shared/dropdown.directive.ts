import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core'

@Directive
({
    selector: '[appDropdown]'
})

export class DropdownDirective 
{
    constructor(private el: ElementRef) {}
    
    @HostBinding('class.open') isOpen: boolean = false;

    @HostListener('click') toggleOpen()
    {
        this.isOpen = !this.isOpen;
    }

    @HostListener('document:click', ['$event']) clickOutside(event: Event)
    {
        if (this.isOpen && !this.el.nativeElement.contains(event.target))
        {
            this.toggleOpen();
        }
    }
}