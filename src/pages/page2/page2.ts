import { Component, ViewChild, OnInit } from '@angular/core';

import { NavController,AlertController } from 'ionic-angular';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard';

@Component({
    selector: 'page-page2',
    templateUrl: 'page2.html'
})
export class Page2 implements OnInit {

     testRadioOpen = false;
    testRadioResult: any;




    @ViewChild(IonDigitKeyboardCmp) keyboard;

    betNum: string = '';
    BetAmount: string = '';
    focus: string = '';

    public keyboardSettings: IonDigitKeyboardOptions = {
        align: 'center',
        //width: '85%',
        visible: true,
        leftActionOptions: {
            iconName: 'ios-backspace-outline',
            fontSize: '1.4em'
        },
        rightActionOptions: {
            iconName: 'ios-checkmark-circle-outline',
            text: '.',
            fontSize: '1.3em'
        },
        roundButtons: false,
        showLetters: false,
        swipeToHide: false,
        // Available themes: IonDigitKeyboard.themes
        theme: 'alihossein'
    };

    constructor(public navCtrl: NavController, public alertCtrl: AlertController) {}
    

  doRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose ramble type');

    alert.addInput({
      type: 'radio',
      label: 'RAMBLE 1 (3-6)',
      value: 'blue',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'RAMBLE 2 (6-12)',
      value: 'green'
    });

    alert.addInput({
      type: 'radio',
      label: 'RAMBLE 3 (9-18)',
      value: 'red'
    });

    alert.addInput({
      type: 'radio',
      label: 'RAMBLE 4 (12-24)',
      value: 'yellow'
    });

    alert.addInput({
      type: 'radio',
      label: 'RAMBLE 5 (15-30)',
      value: 'purple'
    });

    alert.addInput({
      type: 'radio',
      label: 'RAMBLE 6 (18-36)',
      value: 'white'
    });

    alert.addInput({
      type: 'radio',
      label: 'RAMBLE 7 (21-42)',
      value: 'black'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present();
  }






    ngOnInit(): void {
        /**
         * Since we want to prevent native keyboard to show up, we put the disabled
         * attribute on the input, and manage focus programmaticaly.
         */
        this.keyboard.onClick.subscribe((key: any) => {
            let field = this.focus;
            if (typeof key == 'number') {
                this[field] += key;
            } else {
                if (key == 'left') this[field] = this[field].substring(0, this[field].length - 1);
                if (key == 'right') this.performBet();
            }
        });

        // (BLur) Clear focus field name on keyboard hide
        this.keyboard.onHide.subscribe(() => {
            this.focus = '';
        });
    }

    setFocus(field: string) {
        this.focus = field;
        this.keyboard.show();
    }

    private performBet() {
        this.keyboard.show(() => {
            // Alert after keyboard get hidden
            alert('ID: "' + this.betNum + '"\nNumber: "' + this.BetAmount + '"')
        });
    }


}
