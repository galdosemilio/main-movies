import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';
import { TestBed } from '@angular/core/testing';

describe('SafePipe', () => {
  it('create an instance', () => {
    let sanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
  
  it('create an instance', () => {
    let sanitizer = TestBed.inject(DomSanitizer);
    let spy = spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();
    let currentUrl = "https://www.youtube.com/watch?v=qGqiHJTsRkQ";
    const pipe = new SafePipe(sanitizer);
    pipe.transform(currentUrl);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(currentUrl);
  });
});