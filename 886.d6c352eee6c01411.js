"use strict";(self.webpackChunkDatHangAngular=self.webpackChunkDatHangAngular||[]).push([[886],{8886:(D,l,i)=>{i.r(l),i.d(l,{SettingModule:()=>b});var d=i(6895),m=i(5263),c=i(3913),e=i(4006),g=i(7486),t=i(4650),v=i(7455),p=i(8735),h=i(666),S=i(5722),C=i(1740),E=i(7188),f=i(5593),Z=i(1167);const T=[{path:"",component:(()=>{class o{constructor(r,a,n){this.firebaseService=r,this.formBuilder=a,this.toastService=n,this.dropdownOptionsStatus=g.Pq,this.STATUS_LIST=g.dl}ngOnInit(){this.bindingSetting(),this.loadSetting()}updateSetting(){console.log(this.settingForm),this.firebaseService.settingUpdate(this.settingForm.value,this.settingForm.value.settingID).subscribe(()=>{this.toastService.showToastSuccess("C\u1eadp nh\u1eadt c\u1ea5u h\xecnh th\xe0nh c\xf4ng!"),this.loadSetting()})}loadSetting(){console.log(this.settingForm),this.firebaseService.loadSetting(()=>this.bindingSetting())}bindingSetting(){this.settingForm=this.formBuilder.group({settingID:[this.firebaseService.SETTING_ID$.value,e.kI.required],defaultWeightPrice:[this.firebaseService.DEFAULT_WEIGHT_PRICE$.value,e.kI.required],defaultExchange:[this.firebaseService.DEFAULT_EXCHANGE$.value,e.kI.required],incomePerOrder:[this.firebaseService.INCOME_PER_ORDER$.value,e.kI.required],vat:[this.firebaseService.VAT$.value,e.kI.required],statusSelected:[this.firebaseService.DROPDOWN_STATUS_SELECTED$.value,e.kI.required],databaseSource:[this.firebaseService.DATABASE_FIREBASE$.value,e.kI.required],showMenu:[this.firebaseService.IS_SHOW_MENU$.value,e.kI.required],isOpen:[this.firebaseService.IS_OPEN_MENU$.value,e.kI.required]})}static#t=this.\u0275fac=function(a){return new(a||o)(t.Y36(v.O),t.Y36(e.qu),t.Y36(p.k))};static#e=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-setting"]],decls:50,vars:16,consts:[[1,"container",3,"formGroup"],[1,"card"],[1,"item"],[1,"label"],[1,"value","number"],["pInputText","","formControlName","settingID"],["mode","decimal","formControlName","defaultWeightPrice",3,"minFractionDigits","maxFractionDigits"],["mode","decimal","formControlName","defaultExchange",3,"minFractionDigits","maxFractionDigits"],["title","Ti\u1ec1n c\xf4ng cho m\u1ed7i \u0111\u01a1n h\xe0ng",1,"label"],["mode","decimal","formControlName","incomePerOrder",3,"minFractionDigits","maxFractionDigits"],["mode","decimal","formControlName","vat",3,"minFractionDigits","maxFractionDigits"],["title","L\u1ecdc m\u1eb7c \u0111\u1ecbnh c\xe1c \u0111\u01a1n h\xe0ng c\xf3 tr\u1ea1ng th\xe1i \u0111\u01b0\u1ee3c ch\u1ecdn",1,"label"],[1,"value"],["id","value","optionLabel","name","optionValue","value","formControlName","statusSelected",3,"options","showClear","filter"],["title","M\xf4i tr\u01b0\u1eddng dev / production",1,"label"],["id","value","optionLabel","name","optionValue","index","formControlName","databaseSource",3,"options","showClear","readonly"],["title","Menu s\u1ebd \u0111\u01b0\u1ee3c hi\u1ec3n th\u1ecb",1,"label"],["formControlName","showMenu","onLabel","Yes","offLabel","No",3,"onChange"],["title","Menu m\u1edf r\u1ed9ng",1,"label"],["formControlName","isOpen","onLabel","Yes","offLabel","No",3,"onChange"],[1,"item","d-flex","aligin-items-center","mt-4"],["label","Cancel","styleClass","mx-2 p-button-outlined  p-button-secondary","icon","pi pi-undo",3,"onClick"],["label","Update","styleClass","p-button-success","icon","pi pi-check",3,"disabled","onClick"]],template:function(a,n){1&a&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._uU(4,"Setting ID"),t.qZA(),t.TgZ(5,"div",4),t._UZ(6,"input",5),t.qZA()(),t.TgZ(7,"div",2)(8,"div",3),t._uU(9,"Gi\xe1 c\xe2n"),t.qZA(),t.TgZ(10,"div",4),t._UZ(11,"p-inputNumber",6),t.qZA()(),t.TgZ(12,"div",2)(13,"div",3),t._uU(14,"T\u1ec9 gi\xe1"),t.qZA(),t.TgZ(15,"div",4),t._UZ(16,"p-inputNumber",7),t.qZA()(),t.TgZ(17,"div",2)(18,"div",8),t._uU(19,"L\xe3i / \u0111\u01a1n h\xe0ng"),t.qZA(),t.TgZ(20,"div",4),t._UZ(21,"p-inputNumber",9),t.qZA()(),t.TgZ(22,"div",2)(23,"div",3),t._uU(24,"Thu\u1ebf"),t.qZA(),t.TgZ(25,"div",4),t._UZ(26,"p-inputNumber",10),t.qZA()(),t.TgZ(27,"div",2)(28,"div",11),t._uU(29," L\u1ecdc tr\u1ea1ng th\xe1i \u0111\u01a1n h\xe0ng "),t.qZA(),t.TgZ(30,"div",12),t._UZ(31,"p-multiSelect",13),t.qZA()(),t.TgZ(32,"div",2)(33,"div",14),t._uU(34,"CSDL"),t.qZA(),t.TgZ(35,"div",12),t._UZ(36,"p-dropdown",15),t.qZA()(),t.TgZ(37,"div",2)(38,"div",16),t._uU(39,"Hi\u1ec3n th\u1ecb menu"),t.qZA(),t.TgZ(40,"div",4)(41,"p-toggleButton",17),t.NdJ("onChange",function(u){return n.firebaseService.IS_SHOW_MENU$.next(u.checked)}),t.qZA()()(),t.TgZ(42,"div",2)(43,"div",18),t._uU(44,"Menu m\u1edf r\u1ed9ng"),t.qZA(),t.TgZ(45,"div",4)(46,"p-toggleButton",19),t.NdJ("onChange",function(u){return n.firebaseService.IS_OPEN_MENU$.next(u.checked)}),t.qZA()()(),t.TgZ(47,"div",20)(48,"p-button",21),t.NdJ("onClick",function(){return n.loadSetting()}),t.qZA(),t.TgZ(49,"p-button",22),t.NdJ("onClick",function(){return n.updateSetting()}),t.qZA()()()()),2&a&&(t.Q6J("formGroup",n.settingForm),t.xp6(11),t.Q6J("minFractionDigits",0)("maxFractionDigits",5),t.xp6(5),t.Q6J("minFractionDigits",0)("maxFractionDigits",5),t.xp6(5),t.Q6J("minFractionDigits",0)("maxFractionDigits",5),t.xp6(5),t.Q6J("minFractionDigits",0)("maxFractionDigits",5),t.xp6(5),t.Q6J("options",n.STATUS_LIST)("showClear",!0)("filter",!1),t.xp6(5),t.Q6J("options",n.dropdownOptionsStatus)("showClear",!1)("readonly",!1),t.xp6(13),t.Q6J("disabled",n.settingForm.invalid))},dependencies:[h.Lt,S.NU,C.o,E.Rn,f.zx,Z.CO,e.Fj,e.JJ,e.JL,e.sg,e.u],styles:["[_nghost-%COMP%]     .card{margin-top:20px}[_nghost-%COMP%]     .item{display:flex;align-items:center;margin:15px}[_nghost-%COMP%]     .item .label{width:200px}[_nghost-%COMP%]     .item .value.number input{text-align:right}[_nghost-%COMP%]     .item .value{flex:1}"]})}return o})()}];let b=(()=>{class o{static#t=this.\u0275fac=function(a){return new(a||o)};static#e=this.\u0275mod=t.oAB({type:o});static#i=this.\u0275inj=t.cJS({imports:[d.ez,m.Bz.forChild(T),c.m,e.UX,e.u5]})}return o})()}}]);