import { ENVIRONMENT_LIST, STATUS_LIST } from './../shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService as FirebaseService } from '../shared/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../shared/services/toast.service';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  settingForm!: FormGroup;
  dropdownOptionsStatus: any[] = ENVIRONMENT_LIST;
  STATUS_LIST = STATUS_LIST;

  constructor(
    public firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.bindingSetting();
    this.loadSetting();
  }

  updateSetting() {
    console.log(this.settingForm);
    this.firebaseService
      .settingUpdate(this.settingForm.value, this.settingForm.value.settingID)
      .subscribe(() => {
        this.toastService.showToastSuccess('Cập nhật cấu hình thành công!');
        this.loadSetting();
      });
  }

  loadSetting() {
    console.log(this.settingForm);
    this.firebaseService.loadSetting(() => this.bindingSetting());
  }

  private bindingSetting() {
    this.settingForm = this.formBuilder.group({
      settingID: [this.firebaseService.SETTING_ID$.value, Validators.required],
      defaultWeightPrice: [
        this.firebaseService.DEFAULT_WEIGHT_PRICE$.value,
        Validators.required,
      ],
      defaultExchange: [
        this.firebaseService.DEFAULT_EXCHANGE$.value,
        Validators.required,
      ],
      incomePerOrder: [
        this.firebaseService.INCOME_PER_ORDER$.value,
        Validators.required,
      ],
      vat: [this.firebaseService.VAT$.value, Validators.required],
      statusSelected: [
        this.firebaseService.DROPDOWN_STATUS_SELECTED$.value,
        Validators.required,
      ],
      databaseSource: [
        this.firebaseService.DATABASE_FIREBASE$.value,
        Validators.required,
      ],
      showMenu: [this.firebaseService.IS_SHOW_MENU$.value, Validators.required],
      isOpen: [this.firebaseService.IS_OPEN_MENU$.value, Validators.required],
    });
  }
}
