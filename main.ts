const {readFileSync:r,writeFileSync:w,mkdirSync:m}=require('node:fs')
const ops=['01146abf','999999959995999','999','04400','58','4414']
function run(p,i){
const s=new Int32Array(256),d=new Int32Array(256),c=[],o=Buffer.alloc(65536)
let j=0,h=0,k=0,n=0,e=10
try{
for(let t=0;t<1e6;t++){
if(j<0||j>=p.length)throw 9
const x=p[j++],f=parseInt(ops[x>>4]?.[x&15],16)
if(isNaN(f))throw 5
const z=x===1?1:x===2?4:x>=48&&x<=51?2:0
if(j+z>p.length)throw 9
const a=s[h-2],b=s[h-1],q=f&3
h-=f>>2
if(h<0)throw 2
if(h+q>256)throw 3
const v=z?p.readIntLE(j,z):0
j+=z
let u
switch(x){
case 0:throw 0
case 1:case 2:u=v;break
case 4:s[h++]=b;u=b;break
case 5:s[h++]=b;u=a;break
case 6:s[h++]=a;s[h++]=b;u=a;break
case 7:u=s[h];s[h++]=a;s[h++]=b;break
case 16:u=a+b;break
case 17:u=a-b;break
case 18:u=Math.imul(a,b);break
case 19:case 20:case 21:case 22:{
if(!b)throw 4
const l=x>20?a>>>0:a,r=x>20?b>>>0:b
u=x&1?l/r:l%r;break
}
case 23:u=-b;break
case 24:u=a&b;break
case 25:u=a|b;break
case 26:u=a^b;break
case 27:u=~b;break
case 28:u=a<<b;break
case 29:u=a>>b;break
case 30:u=a>>>b;break
case 32:u=a===b;break
case 33:u=a<b;break
case 34:u=a>>>0<b>>>0;break
case 48:j+=v;break
case 49:if(!b)j+=v;break
case 50:if(b)j+=v;break
case 51:if(c.length===64)throw 7
c.push(j);j=v&65535;break
case 52:if(!c.length)throw 8
j=c.pop();break
case 64:case 65:if(b>>>0>255)throw 6
if(x===64)u=d[b];else d[b]=a
break
case 80:{
const v=String(b)
if(n+v.length>65536)throw 11
n+=o.write(v,n);break
}
case 81:if(n===65536)throw 11
o[n++]=b;break
case 82:u=i[k++]??-1;break
case 83:throw b&255
}
if(q)s[h++]=u
}
}catch(x){if(typeof x!=='number')throw x;e=x}
return [o.subarray(0,n),e]
}
const {MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env
for(let n=1;n<=40;n++){
const id='/i'+('00'+n).slice(-3),p=I+id,o=O+id
const [b,e]=run(r(p+'/program.bin'),r(p+'/input.bin'))
m(o,{recursive:true})
w(o+'/stdout.bin',b)
w(o+'/exit.txt',e+'\n')
}
