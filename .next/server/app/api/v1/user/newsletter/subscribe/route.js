"use strict";(()=>{var e={};e.id=228,e.ids=[228],e.modules={38013:e=>{e.exports=require("mongodb")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},97333:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>b,patchFetch:()=>h,requestAsyncStorage:()=>g,routeModule:()=>f,serverHooks:()=>x,staticGenerationAsyncStorage:()=>m});var o={};t.r(o),t.d(o,{POST:()=>u});var s=t(49303),i=t(88716),n=t(60670),a=t(87070),p=t(75748),l=t(55245),d=t(98800);let c=["http://localhost:3000","http://localhost:3001","http://localhost:3002","https://connectafrica-fawn.vercel.app"];async function u(e){try{let r=e.headers.get("origin");if(r&&!c.includes(r))return a.NextResponse.json({success:!1,message:"CORS policy: Origin not allowed"},{status:403});let{email:t}=await e.json();if(!t||!t.includes("@"))return a.NextResponse.json({success:!1,message:"Valid email address is required"},{status:400});let o=t.toLowerCase().trim(),s=(await p.Z).db("connect_africa").collection("subscribers");if(await s.findOne({email:o}))return a.NextResponse.json({success:!0,message:"You're already subscribed to our newsletter"},{status:200});await s.insertOne({email:o,subscribedAt:new Date,status:"active",unsubscribeToken:Buffer.from(t).toString("base64")});try{let e=l.createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASSWORD}}),r=Buffer.from(t).toString("base64"),{subject:s,html:i}=(0,d.X)({unsubscribeToken:r});await e.sendMail({from:process.env.EMAIL_USER,to:o,subject:s,html:i})}catch(e){console.error("Error sending confirmation email:",e)}return a.NextResponse.json({success:!0,message:"Thank you for subscribing! Check your email for confirmation."},{status:201})}catch(e){return console.error("Newsletter subscription error:",e),a.NextResponse.json({success:!1,message:"Subscription failed",error:e?.message},{status:500})}}let f=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/v1/user/newsletter/subscribe/route",pathname:"/api/v1/user/newsletter/subscribe",filename:"route",bundlePath:"app/api/v1/user/newsletter/subscribe/route"},resolvedPagePath:"C:\\Users\\HP\\OneDrive\\Desktop\\project2\\connect africa\\src\\app\\api\\v1\\user\\newsletter\\subscribe\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:g,staticGenerationAsyncStorage:m,serverHooks:x}=f,b="/api/v1/user/newsletter/subscribe/route";function h(){return(0,n.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:m})}},75748:(e,r,t)=>{t.d(r,{Z:()=>i});var o=t(38013);let s=process.env.MONGODB_URI;if(!s)throw Error("Please define MONGODB_URI in .env");let i=new o.MongoClient(s).connect()},98800:(e,r,t)=>{function o({name:e,reference:r,amountPaid:t,donationType:o,designation:s}){return{subject:`Thank you for your donation — ${r}`,html:`
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <!-- Header with Logo -->
    <div style="max-width:680px;margin:0 auto;background:linear-gradient(135deg, #059669 0%, #047857 100%);padding:32px 24px;border-radius:8px 8px 0 0;text-align:center;">
      <img src="https://res.cloudinary.com/dsfodoe0d/image/upload/v1/connect-africa-logo" alt="Connect Africa" style="height:50px;margin-bottom:16px;" />
      <h1 style="color:#fff;margin:0;font-size:28px;">Connect Africa</h1>
      <p style="color:#d1fae5;margin:8px 0 0 0;font-size:14px;">Bringing Healthcare to Every Community</p>
    </div>

    <!-- Main Content -->
    <div style="max-width:680px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e6f4ef;border-top:none;">
      <h2 style="color:#059669;margin-top:0;margin-bottom:8px;">Thank you for your generous gift</h2>
      <p>Dear ${e||"Friend"},</p>
      <p>We have successfully received your donation of <strong>₦${t.toLocaleString()}</strong>.</p>
      <p><strong>Donation reference:</strong> <code style="background:#f1f5f9;padding:4px 8px;border-radius:4px;font-family:monospace;">${r}</code></p>
      <table style="width:100%;margin-top:16px;border-collapse:collapse">
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;width:40%;font-weight:600;">Type</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${o||"One-time"}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;font-weight:600;">Destination</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${s||"Where most needed"}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;font-weight:600;">Date</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</td>
        </tr>
      </table>

      <div style="background:#f0fdf4;border-left:4px solid #059669;padding:16px;margin-top:24px;border-radius:4px;">
        <p style="margin:0;color:#15803d;font-weight:600;margin-bottom:8px;">💚 Your Impact</p>
        <p style="margin:0;color:#166534;font-size:14px;">Your support directly provides essential medical supplies, equipment, and logistics to underserved clinics across Africa. Your generosity saves lives.</p>
      </div>

      <p style="margin-top:24px">We will email your official tax receipt to ${e} within 2-3 business days.</p>

      <p style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:24px;color:#059669;font-weight:600;">With heartfelt gratitude,<br/>The Connect Africa Team</p>

      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0" />
      <p style="font-size:12px;color:#6b7280;margin:0;">
        <strong>Questions?</strong> Reply to this email or visit <a href="http://localhost:3000" style="color:#059669;text-decoration:none;">our website</a>.<br/>
        <strong>Need help?</strong> Contact us at support@connectafrica.org
      </p>
    </div>
  </div>
  `}}function s({unsubscribeToken:e}){let r=`http://localhost:3000/unsubscribe?token=${encodeURIComponent(e)}`;return{subject:"Welcome — Connect Africa Newsletter",html:`
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <div style="max-width:680px;margin:0 auto;padding:24px;background:#fff;border-radius:8px;border:1px solid #eef2f7;">
      <h2 style="color:#059669;margin-bottom:8px;">Welcome to Connect Africa</h2>
      <p>Thank you for subscribing to our newsletter. You'll now receive monthly updates on our programs, impact stories, and ways to help.</p>
      <ul>
        <li>Program updates and impact reports</li>
        <li>Volunteer and partnership opportunities</li>
        <li>Exclusive campaign previews</li>
      </ul>
      <p style="margin-top:12px">If you ever wish to unsubscribe, click <a href="${r}">here</a>.</p>

      <p style="margin-top:18px">Warm regards,<br/>The Connect Africa Team</p>
      <hr style="border:none;border-top:1px solid #f1f5f9;margin:18px 0" />
      <p style="font-size:12px;color:#6b7280">Visit <a href="http://localhost:3000">our website</a> for more information.</p>
    </div>
  </div>
  `}}t.d(r,{X:()=>s,a:()=>o})}};var r=require("../../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[9276,5972,5245],()=>t(97333));module.exports=o})();