describe('app', function () {
    'use strict';

    var app = window.app;

    describe('generateMessage', function () {
        it('should return number of vowel and false ', function(){
            expect(app.generateMessage("nazwa")).toEqual({vowel: 2, palindrome: false});
        });
        it('should return number of vowel and true', function(){
            expect(app.generateMessage("inniwinni")).toEqual({vowel: 4, palindrome: true});
        });
        var tekstowe = app.generateMessage("inniwinni");
        it('should return number of vowel and true ', function(){
            expect(tekstowe.vowel).toEqual(4);
            expect(tekstowe.palindrome).toEqual(true);
        });
        it('should throw exception', function () {
            expect(function () {
                app.generateMessage("");
            }).toThrow(new Error('Empty string!'));
        });

    });

    describe('isPalindrome', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome');
                app.isPalindrome('neskajaksen');
            });
            it('should call isPalindrome function', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('neskajaksen');
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
                app.generateMessage('jadumrowwormudaj');
            });
            it('should call isPalindrome function when generateMessage is call', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('jadumrowwormudaj');
            });
        });

        describe('and.returnValue', function () {
            var testowe;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.returnValue(true);
            });
            it('should call isPalindrome and return true', function () {
                testowe = app.isPalindrome('comidalduchcudladimoc');
                expect(testowe).toBe(true);
            });
            it('should call generateMessage and isPalindrome should return true', function () {
                testowe = app.generateMessage('comidalduchcudladimoc');
                expect(testowe).toEqual({vowel: 8, palindrome: true});
            });
        });

        describe('and.callFake', function () {
            var testoweFake;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callFake(function (str) {
                    var strTemp = str.toLowerCase(),
                        strLength = strTemp.length;
                    if (str === '') {
                        return true;
                    }
                    var halfLength = (strLength % 2 === 0) ? (strLength / 2) : ((strLength - 1) / 2);
                    for (var i = 0; i < halfLength; i++) {
                        if (strTemp[i] !== strTemp.slice(-1 - i)[0]) {
                            return true;
                        }
                    }
                    return false;
                });
            });
            it('should call isPalindrome fake function', function () {
                testoweFake = app.isPalindrome('onarysylysyrano');
                expect(testoweFake).toBe(false);
            });
            it('should call generateMessage and isPalindom fake function', function () {
                testoweFake = app.generateMessage('onarysylysyrano');
                expect(testoweFake).toEqual({vowel: 8, palindrome: false});
            });
        });

        describe('calls.count()', function () {
            var testoweCount;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
            });
            it('should notice that isPalindrome is call', function () {
                testoweCount = app.isPalindrome('comamimamoc');
                expect(app.isPalindrome.calls.count()).toBe(1);
            });
            it('should notice that isPalindrome is call when generateMessage is call', function () {
                testoweCount = app.generateMessage('comamimamoc');
                expect(app.isPalindrome.calls.count()).toEqual(2);
            });
        });
    });

    describe('vowelCount', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount');
                app.vowelCount('randomtext');
            });
            it('should call vowelCount function', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('randomtext');
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
                app.generateMessage('randomtext');
            });
            it('should call vowelCount function when generateMessage is call', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('randomtext');
            });
        });

        describe('and.returnValue', function () {
            var tekstoweRerutnValue;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.returnValue(10);
            });
            it('should call vowelCount and return 10', function () {
                tekstoweRerutnValue = app.vowelCount('randomtext');
                expect(tekstoweRerutnValue).toBe(10);
            });
            it('should call generateMessage and vowelCount should return 10', function () {
                tekstoweRerutnValue = app.generateMessage('randomtext');
                expect(tekstoweRerutnValue).toEqual({vowel: 10, palindrome: false});
            });
        });

        describe('and.callFake', function () {
            var testoweCallFake;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callFake(function (str) {
                    var vowelList = 'aeiouyAEIOUY',
                        vovCount = 0;
                    for (var i = 0, strLength = str.length; i < strLength; i++) {
                        if (vowelList.indexOf(str[i]) !== -1) {
                            vovCount=vovCount+2;
                        }
                    }
                    return vovCount;
                });
            });
            it('should call vowelCount fake function', function () {
                testoweCallFake = app.vowelCount('asdf');
                expect(testoweCallFake).toBe(2);
            });
            it('should call generateMessage and vowelCount fake function', function () {
                testoweCallFake = app.generateMessage('asdf');
                expect(testoweCallFake).toEqual({vowel: 2, palindrome: false});
            });
        });

        describe('calls.count()', function () {
            var testoweCount;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
            });
            it('should notice that vowelCounte is call', function () {
                testoweCount = app.vowelCount('asdf');
                expect(app.vowelCount.calls.count()).toBe(1);
            });
            it('should notice that vowelCount is call when generateMessage is call', function () {
                testoweCount = app.generateMessage('asdf');
                expect(app.vowelCount.calls.count()).toEqual(2);
            });
        });
    });
});