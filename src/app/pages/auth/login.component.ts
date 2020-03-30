import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TdDynamicElement, ITdDynamicElementConfig, TdDynamicType } from '@covalent/dynamic-forms';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
    selector: 'login',
    templateUrl: './login.component.html'
   
})
export class LoginComponent {
  public loginUser: FormGroup = new FormGroup({}) ;

  control: FormControl;

  /* map any of the properties you passed in the config */
  label: string;

  /* map the error message template and use it anywhere you need to */
  errorMessageTemplate: TemplateRef<any>;

    @ViewChild('loginDialog') loginDialog: TemplateRef<any>;
    dialogRef: MatDialogRef<any, any>;

    constructor(public dialog: MatDialog, private router: Router, public loginService: LoginService, private fb: FormBuilder) {
       this.loginUser = this.fb.group({
         nombre: this.fb.control('', Validators.required),
         password: this.fb.control('', Validators.required),
       })
    }

    /**
     * Para hacer un login
     * @param event 
     * @param user 
     * @param pass 
     */
    logIn(event: any, user: string, pass: string) {
      //event.preventDefault();
      this.loginService.logIn(user, pass).subscribe(
        (u) => {
          this.router.navigate(['/']);
          this.dialogRef.close();
        },
        (error) => alert('Invalid user or password'),
      );
    }

    logOut() {
      this.loginService.logOut().subscribe(
        (response) => {
          this.router.navigate(['/']);
        },
        (error) => console.log('Error when trying to log out: ' + error),
      );
    }

    openLoginDialog() {
      this.dialogRef = this.dialog.open(this.loginDialog, {
        width: '50%',
        height: '50%',
      });
    }

    register() {
      this.router.navigate(['/register']);
    }
    /* public elements :ITdDynamicElementConfig[] = [{
      name: 'Nombre o email',
      hint: 'hint',
      type: TdDynamicElement.Input,
      required: true,
    },{
      name: 'password',
      type: TdDynamicElement.Password,
     
    },]
    ; */
   /*  elements: ITdDynamicElementConfig[] = [{
      name: 'Nombre o email',
      hint: 'hint',
      type: TdDynamicElement.Input,
      required: true,
    },  {
      name: 'email',
      label: 'Text Length',
      type: TdDynamicElement.Input,
      minLength: 4,
      maxLength: 12,
    } , {
      name: 'password',
      type: TdDynamicElement.Password,
     
    }, {
      name: 'slider',
      label: 'Label',
      type: TdDynamicElement.Slider,
      required: true,
    }, {
      name: 'boolean',
      type: TdDynamicType.Boolean,
      default: false,
      disabled: true,
    }, {
      name: 'select',
      type: TdDynamicElement.Select,
      required: true,
      multiple: false,
      selections: ['A','B','C'],
      default: 'A',
    }, {
      name: 'file-input',
      label: 'Label',
      type: TdDynamicElement.FileInput,
    }, {
      name: 'datepicker',
      label: 'Date',
      type: TdDynamicElement.Datepicker,
    } ]; */
    enviar() {
      console.log('this.elements', this.loginUser.value);
      let nombre = this.loginUser.get('nombre').value;
      let password = this.loginUser.get('password').value;

      this.logIn(null,nombre,password);
      
      
      
    }
}

