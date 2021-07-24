import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>{{ title }}</h2>
      <label>
        {{ select }}
        <select #langSelect (change)="onChange(langSelect.value)">
          <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option>
        </select>
      </label>
    </div>
  `,
})
export class AppComponent implements OnInit {
  title: string;
  select: string;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'ja']);
    translate.setDefaultLang('en');
  }

  async ngOnInit(): Promise<void> {
    const browserLang = this.translate.getBrowserLang();
    await this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en').toPromise();
    this.setString();
  }

  async onChange(value: string): Promise<void> {
    await this.translate.use(value).toPromise();
    this.setString();
  }

  private setString(): void {
    this.title = this.translate.instant('HOME.TITLE');
    this.select = this.translate.instant('HOME.SELECT');
  }
}
