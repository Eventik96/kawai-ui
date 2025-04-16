import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<'dark' | 'light'>(null);
  public theme$ = this.themeSubject.asObservable();
  constructor() {
    window['getTheme'] = () => {return this.themeSubject.value}
    this.themeSubject.next((localStorage.getItem("theme") as any) || this.getAutoTheme);
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem("theme")) {
          this.themeSubject.next(e.matches ? 'dark' : 'light');
        }
      });
    } catch (e) {
      console.warn("OS level theme detection is not available");
    }

    this.theme$.subscribe(resp => {
      this.setThemeStyles(resp);
    })

  }

  get theme() {
    return this.themeSubject.value;
  }


  private get getAutoTheme() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      console.warn("OS level theme detection is not available");
      return 'light';
    }
  }

  public changeDarkMode() {
    if(this.themeSubject.value === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }


  public setTheme(str: 'light' | 'dark' | 'auto') {
    if (str === 'auto') {
      localStorage.removeItem('theme');
      this.themeSubject.next(this.getAutoTheme);
    } else {
      localStorage.setItem('theme', str);
      this.themeSubject.next(str);
    }
  }

  private setThemeStyles(param: 'dark' | 'light') {
    if (param === 'dark') {
      document.querySelector('html').style.setProperty('--primary-bg', 'var(--darkmode-primary-bg)');
      document.querySelector('html').style.setProperty('--secondary-bg', 'var(--darkmode-secondary-bg)');
      document.querySelector('html').style.setProperty('--popup-bg', 'var(--darkmode-popup-bg)');

      document.querySelector('html').style.setProperty('--primary-text', 'var(--basic-light)');
      document.querySelector('html').style.setProperty('--secondary-text', 'var(--hover-light)');
      document.querySelector('html').style.setProperty('--pale-text', 'var(--pale-text-dark)');
      document.querySelector('html').style.setProperty('--inverse-primary-text', 'var(--basic-dark)');
      document.querySelector('html').style.setProperty('--inverse-secondary-text', 'var(--hover-dark)');

      document.querySelector('html').style.setProperty('--chip-bg', 'var(--darkmode-chip-bg)');
      document.querySelector('html').style.setProperty('--chip-hover-bg', 'var(--darkmode-chip-hover-bg)');
    } else {
      document.querySelector('html').style.setProperty('--primary-bg', 'var(--lightmode-primary-bg)');
      document.querySelector('html').style.setProperty('--secondary-bg', 'var(--lightmode-secondary-bg)');
      document.querySelector('html').style.setProperty('--popup-bg', 'var(--lightmode-popup-bg)');

      document.querySelector('html').style.setProperty('--primary-text', 'var(--basic-dark)');
      document.querySelector('html').style.setProperty('--secondary-text', 'var(--hover-dark)');
      document.querySelector('html').style.setProperty('--pale-text', 'var(--pale-text-light)');
      document.querySelector('html').style.setProperty('--inverse-primary-text', 'var(--basic-light)');
      document.querySelector('html').style.setProperty('--inverse-secondary-text', 'var(--hover-light)');

      document.querySelector('html').style.setProperty('--chip-bg', 'var(--lightmode-chip-bg)');
      document.querySelector('html').style.setProperty('--chip-hover-bg', 'var(--lightmode-chip-hover-bg)');
    }

  }


}