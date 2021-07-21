var name = 'k8805';

var letter = 'Dear '+name+' \n \
Lorem ipsum dolor sit amet, consectetur ad\
ipisicing elit, sed do eiusmod tempor incididunt \
ut labore et dolore magna aliqua. '+name+' Ut enim a\
d minim veniam, quis nostrud exercitation ullamco la\
boris nisi ut aliquip ex ea commodo consequat. Duis \
aute irure dolor in reprehenderit in voluptate vel\
it esse cillum dolore eu fugiat nulla pariatur. E\
xcepteur sint occaecat cupidatat non proident, su\
nt in culpa egoing qui officia deserunt mollit an\
im id est laborum. '+name;

//키보드 좌측 상단 ` 기호가 template literal이다.

var letter = `Dear ${name}

Lorem ipsum dolor sit amet, consectetur ad
ipisicing elit, sed do eiusmod tempor incididunt 
ut labore et dolore magna aliqua. ${1+1} Ut enim a
d minim veniam, quis nostrud exercitation ullamco la
boris nisi ut aliquip ex ea commodo consequat. Duis 
aute irure dolor in reprehenderit in voluptate vel
it esse cillum dolore eu fugiat nulla pariatur. E
xcepteur sint occaecat cupidatat non proident, su
nt in culpa egoing qui officia deserunt mollit an
im id est laborum. ${name}`;

console.log(letter);
