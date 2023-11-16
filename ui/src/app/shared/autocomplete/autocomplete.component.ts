import { AsyncPipe, CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { RouterModule } from '@angular/router'

export interface AutoCompleteItem {
  id: string
  title: string
  image: string
  info: string
}

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutoCompleteComponent,
      multi: true,
    },
  ],
})
export class AutoCompleteComponent implements ControlValueAccessor {
  @Input() items: AutoCompleteItem[] | null = null
  @Output() optionClick = new EventEmitter<AutoCompleteItem>()
  value: string = ''

  optionClicked(item: AutoCompleteItem) {
    this.optionClick.emit(item)
  }

  onChange: (value: string) => void = () => {}
  onTouch: () => void = () => {}
  disabled = false

  onInput() {
    this.onChange(this.value)
  }

  onBlur() {
    this.onTouch()
  }

  displayFn(item: AutoCompleteItem): string {
    return item && item.title ? item.title : ''
  }

  writeValue(value: string): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
