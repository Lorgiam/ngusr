import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OnlynumberDirective } from './directives/onlynumber.directive';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [FloatingButtonComponent, OnlynumberDirective],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    [FloatingButtonComponent],
    [OnlynumberDirective],
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule,TooltipModule],
})

export class SharedModule {}
