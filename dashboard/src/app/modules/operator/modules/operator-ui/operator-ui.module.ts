import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '~/shared/modules/material/material.module';
import { FormModule } from '~/shared/modules/form/form.module';
// tslint:disable-next-line:max-line-length
import { OperatorImportComponent } from '~/modules/operator/modules/operator-ui/components/operator-import/operator-import.component';
import { SharedModule } from '~/shared/shared.module';

import { OperatorsAutocompleteComponent } from './components/operators-autocomplete/operators-autocomplete.component';
import { OperatorFormComponent } from './components/operator-form/operator-form.component';
import { OperatorAutocompleteComponent } from './components/operator-autocomplete/operator-autocomplete.component';
import { OperatorListViewComponent } from './components/operator-list-view/operator-list-view.component';
import { OperatorListComponent } from './components/operator-list/operator-list.component';
import { OperatorViewComponent } from './components/operator-view/operator-view.component';
import { OperatorFilterComponent } from './components/operator-filter/operator-filter.component';

@NgModule({
  declarations: [
    OperatorsAutocompleteComponent,
    OperatorFormComponent,
    OperatorImportComponent,
    OperatorAutocompleteComponent,
    OperatorListViewComponent,
    OperatorListComponent,
    OperatorViewComponent,
    OperatorFilterComponent,
  ],
  exports: [
    OperatorsAutocompleteComponent,
    OperatorFormComponent,
    OperatorAutocompleteComponent,
    OperatorListViewComponent,
    OperatorViewComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormModule, SharedModule],
})
export class OperatorUiModule {}
