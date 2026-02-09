"use strict";(()=>{var e={};e.id=418,e.ids=[418],e.modules={38013:e=>{e.exports=require("mongodb")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},8484:(e,o,t)=>{t.r(o),t.d(o,{originalPathname:()=>y,patchFetch:()=>b,requestAsyncStorage:()=>g,routeModule:()=>f,serverHooks:()=>h,staticGenerationAsyncStorage:()=>x});var r={};t.r(r),t.d(r,{POST:()=>m});var n=t(49303),s=t(88716),i=t(60670),a=t(87070),l=t(75748),p=t(38013),d=t(55245),c=t(98800);let u=["http://localhost:3000","http://localhost:3001","http://localhost:3002","https://connectafrica-fawn.vercel.app"];async function m(e){try{let o=e.headers.get("origin");if(o&&!u.includes(o))return a.NextResponse.json({success:!1,message:"CORS policy: Origin not allowed"},{status:403});let{reference:t}=await e.json();if(!t)return a.NextResponse.json({success:!1,message:"Reference is required"},{status:400});let r=(await l.Z).db("connect_africa"),n=r.collection("donations"),s=r.collection("campaigns"),i=await n.findOne({reference:t});if(!i)return a.NextResponse.json({success:!1,message:"Donation not found"},{status:404});if("completed"===i.status)return console.log("✅ Donation already completed:",t),a.NextResponse.json({success:!0,donation:i,alreadyProcessed:!0});console.log("✅ Payment successful! Updating donation to completed...");let m=await n.updateOne({reference:t},{$set:{status:"completed",completedAt:new Date,amountPaid:i.amount}});console.log("✅ Donation marked as completed:",{reference:t,amount:i.amount,modified:m.modifiedCount});let f=await s.findOne({_id:new p.ObjectId(i.campaignId)});if(f){let e=i.amount,o=(f.donatedAmount||0)+Number(e),t=o>=f.amount?"completed":"inprogress";console.log("\uD83D\uDCB5 Updating Campaign:",{title:f.title,previousAmount:f.donatedAmount||0,newAmount:o,newStatus:t});let r=await s.updateOne({_id:f._id},{$set:{donatedAmount:o,status:t,updatedAt:new Date},$inc:{volunteers:1}});console.log("✅ Campaign updated successfully, modified:",r.modifiedCount);try{if(console.log("\uD83D\uDCE7 Attempting to send confirmation email..."),console.log("   To:",i.email),console.log("   Gmail User:",process.env.GMAIL_USER),console.log("   Has Gmail Pass:",!!process.env.GMAIL_PASS),!process.env.GMAIL_USER||!process.env.GMAIL_PASS)throw console.error("❌ Gmail credentials not configured"),Error("Email service not configured");let e=d.createTransport({service:"gmail",auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_PASS}});await e.verify(),console.log("✅ Gmail connection verified");let{subject:o,html:t}=(0,c.a)({name:`${i.firstName} ${i.lastName}`,reference:i.reference,amountPaid:i.amount,donationType:"one-time",designation:f.title}),r=await e.sendMail({from:process.env.GMAIL_USER,to:i.email,subject:o,html:t});console.log("✅ Email sent successfully!"),console.log("   Message ID:",r.messageId),console.log("   Response:",r.response)}catch(e){console.error("❌ Email sending failed:"),console.error("   Error:",e.message),console.error("   Code:",e.code),console.error("   Full error:",e)}}let g=await n.findOne({reference:t});return console.log("✅ PAYMENT CONFIRMATION COMPLETE"),console.log("   Reference:",t),console.log("   Amount: ₦"+i.amount),console.log("   Campaign: "+f?.title),console.log("\n"),a.NextResponse.json({success:!0,donation:g,paymentStatus:"SUCCESSFUL",message:"Payment confirmed and records updated"})}catch(e){return console.error("❌ Confirm payment error:",e),a.NextResponse.json({success:!1,message:"Error confirming payment: "+e.message},{status:500})}}let f=new n.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/v1/user/donations/confirm-payment/route",pathname:"/api/v1/user/donations/confirm-payment",filename:"route",bundlePath:"app/api/v1/user/donations/confirm-payment/route"},resolvedPagePath:"C:\\Users\\HP\\OneDrive\\Desktop\\project2\\connect africa\\src\\app\\api\\v1\\user\\donations\\confirm-payment\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:g,staticGenerationAsyncStorage:x,serverHooks:h}=f,y="/api/v1/user/donations/confirm-payment/route";function b(){return(0,i.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:x})}},75748:(e,o,t)=>{t.d(o,{Z:()=>s});var r=t(38013);let n=process.env.MONGODB_URI;if(!n)throw Error("Please define MONGODB_URI in .env");let s=new r.MongoClient(n).connect()},98800:(e,o,t)=>{function r({name:e,reference:o,amountPaid:t,donationType:r,designation:n}){return{subject:`Thank you for your donation — ${o}`,html:`
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
      <p><strong>Donation reference:</strong> <code style="background:#f1f5f9;padding:4px 8px;border-radius:4px;font-family:monospace;">${o}</code></p>
      <table style="width:100%;margin-top:16px;border-collapse:collapse">
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;width:40%;font-weight:600;">Type</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${r||"One-time"}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;font-weight:600;">Destination</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${n||"Where most needed"}</td>
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
  `}}function n({unsubscribeToken:e}){let o=`http://localhost:3000/unsubscribe?token=${encodeURIComponent(e)}`;return{subject:"Welcome — Connect Africa Newsletter",html:`
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <div style="max-width:680px;margin:0 auto;padding:24px;background:#fff;border-radius:8px;border:1px solid #eef2f7;">
      <h2 style="color:#059669;margin-bottom:8px;">Welcome to Connect Africa</h2>
      <p>Thank you for subscribing to our newsletter. You'll now receive monthly updates on our programs, impact stories, and ways to help.</p>
      <ul>
        <li>Program updates and impact reports</li>
        <li>Volunteer and partnership opportunities</li>
        <li>Exclusive campaign previews</li>
      </ul>
      <p style="margin-top:12px">If you ever wish to unsubscribe, click <a href="${o}">here</a>.</p>

      <p style="margin-top:18px">Warm regards,<br/>The Connect Africa Team</p>
      <hr style="border:none;border-top:1px solid #f1f5f9;margin:18px 0" />
      <p style="font-size:12px;color:#6b7280">Visit <a href="http://localhost:3000">our website</a> for more information.</p>
    </div>
  </div>
  `}}t.d(o,{X:()=>n,a:()=>r})}};var o=require("../../../../../../webpack-runtime.js");o.C(e);var t=e=>o(o.s=e),r=o.X(0,[9276,5972,5245],()=>t(8484));module.exports=r})();