"use strict";(()=>{var e={};e.id=9909,e.ids=[9909],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},94716:(e,t,n)=>{n.r(t),n.d(t,{originalPathname:()=>f,patchFetch:()=>j,requestAsyncStorage:()=>u,routeModule:()=>l,serverHooks:()=>m,staticGenerationAsyncStorage:()=>T});var r={};n.r(r),n.d(r,{GET:()=>c,dynamic:()=>p});var o=n(49303),a=n(88716),s=n(60670),i=n(87070),d=n(61986);let p="force-dynamic";async function c(e){try{let t=e.headers.get("origin");if(t&&!d.T.includes(t))return i.NextResponse.json({success:!1,message:"CORS policy: Origin not allowed"},{status:403});let{searchParams:n}=new URL(e.url),r=n.get("year")||"2024",o=function(e){let t=`
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources 5 0 R >>
endobj
4 0 obj
<< /Length 1000 >>
stream
BT
/F1 24 Tf
50 750 Td
(Connect Africa Annual Report ${e}) Tj
0 -40 Td
/F1 12 Tf
(Financial Summary) Tj
0 -30 Td
/F1 10 Tf
(Total Funds Raised: $50,000,000) Tj
0 -20 Td
(Programs Implemented: 15) Tj
0 -20 Td
(Communities Served: 25+) Tj
0 -20 Td
(Healthcare Facilities Equipped: 12) Tj
0 -40 Td
/F1 12 Tf
(Impact Highlights) Tj
0 -30 Td
/F1 10 Tf
(- Delivered 500+ medical equipment sets) Tj
0 -20 Td
(- Trained 100+ healthcare workers) Tj
0 -20 Td
(- Distributed emergency medical supplies) Tj
0 -20 Td
(- Established 3 new health centers) Tj
0 -40 Td
/F1 12 Tf
(Fund Allocation) Tj
0 -30 Td
/F1 10 Tf
(Program Delivery: 86%) Tj
0 -20 Td
(Operations: 10%) Tj
0 -20 Td
(Fundraising: 4%) Tj
0 -40 Td
/F1 10 Tf
(Generated on: ${new Date().toLocaleDateString()}) Tj
ET
endstream
endobj
5 0 obj
<< /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >>
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000214 00000 n
0000001267 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1363
%%EOF
  `;return Buffer.from(t,"utf-8")}(r),a=new Uint8Array(o);return new i.NextResponse(a,{status:200,headers:{"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="Connect_Africa_Annual_Report_${r}.pdf"`,"Cache-Control":"no-cache, no-store, must-revalidate"}})}catch(e){return console.error("Report download error:",e),i.NextResponse.json({success:!1,message:e.message||"Failed to download report"},{status:500})}}let l=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/v1/admin/reports/download/route",pathname:"/api/v1/admin/reports/download",filename:"route",bundlePath:"app/api/v1/admin/reports/download/route"},resolvedPagePath:"C:\\Users\\HP\\OneDrive\\Desktop\\project2\\connect africa\\src\\app\\api\\v1\\admin\\reports\\download\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:u,staticGenerationAsyncStorage:T,serverHooks:m}=l,f="/api/v1/admin/reports/download/route";function j(){return(0,s.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:T})}},61986:(e,t,n)=>{n.d(t,{T:()=>r});let r=["http://localhost:3000","https://connectafrica-fawn.vercel.app","https://www.connectwithafrica.org","https://connectwithafrica.org"]}};var t=require("../../../../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[9276,5972],()=>n(94716));module.exports=r})();