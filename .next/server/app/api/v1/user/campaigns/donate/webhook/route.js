"use strict";(()=>{var e={};e.id=9111,e.ids=[9111],e.modules={38013:e=>{e.exports=require("mongodb")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},94885:(e,o,t)=>{t.r(o),t.d(o,{originalPathname:()=>b,patchFetch:()=>v,requestAsyncStorage:()=>x,routeModule:()=>f,serverHooks:()=>y,staticGenerationAsyncStorage:()=>h});var n={};t.r(n),t.d(n,{POST:()=>g});var r=t(49303),s=t(88716),a=t(60670),i=t(87070),d=t(84770),p=t.n(d),l=t(75748),u=t(38013),c=t(55245),m=t(98800);async function g(e){let o="";try{console.log("\n\uD83D\uDD14 WEBHOOK RECEIVED"),console.log("Headers:",Object.fromEntries(e.headers)),o=await e.text(),console.log("Raw Body:",o.substring(0,200),"...");let t=function(e,o){let t=e.headers.get("monnify-signature");if(!t)return console.error("No signature header found"),!1;let n=process.env.MONNIFY_SECRET_KEY;if(!n)return console.error("MONNIFY_SECRET_KEY not configured"),!1;let r=t===p().createHmac("sha512",n).update(o).digest("hex");return r||console.error("Signature verification failed"),r}(e,o);if(console.log("Signature Valid:",t),!t)return console.error("❌ Signature verification failed - rejecting webhook"),i.NextResponse.json({success:!1,message:"Invalid signature"},{status:401});let n=JSON.parse(o);if(console.log("\uD83D\uDCE8 Event Type:",n.eventType),console.log("\uD83D\uDCE8 Event Data:",n.eventData),"SUCCESSFUL_TRANSACTION"!==n.eventType)return console.log("⏭️ Ignoring event type:",n.eventType),i.NextResponse.json({message:"Event type ignored"});let{paymentReference:r,amountPaid:s}=n.eventData;if(!r||!s)return console.error("❌ Missing payment data"),i.NextResponse.json({success:!1,message:"Missing required payment data"},{status:400});console.log("\uD83D\uDCB3 Payment Reference:",r),console.log("\uD83D\uDCB0 Amount Paid:",s);let a=(await l.Z).db("connect_africa"),d=a.collection("donations"),g=a.collection("campaigns"),f=await d.findOne({reference:r,status:{$ne:"completed"}});if(console.log("\uD83D\uDD0D Donation lookup result:",f?"✅ Found":"❌ Not found"),!f)return console.error("❌ Donation not found or already processed. Reference:",r),i.NextResponse.json({success:!0,message:"Donation not found but webhook processed"});if(console.log("\uD83D\uDCCB Donation Details:",{reference:f.reference,status:f.status,amount:f.amount,campaignId:f.campaignId}),Number(s)!==Number(f.amount))return console.error("❌ Amount mismatch:",{expected:f.amount,received:s}),i.NextResponse.json({success:!1,message:"Amount mismatch"},{status:400});if(!f.campaignId)return console.error("❌ Invalid campaign ID in donation"),i.NextResponse.json({success:!1,message:"Invalid campaign ID"},{status:400});let x=await g.findOne({_id:new u.ObjectId(f.campaignId)});if(console.log("\uD83C\uDFAF Campaign lookup:",x?`✅ Found: ${x.title}`:"❌ Not found"),!x)return i.NextResponse.json({success:!1,message:"Campaign not found"},{status:404});console.log("\uD83D\uDD04 Updating donation status to completed...");let h=await d.updateOne({reference:r},{$set:{status:"completed",completedAt:new Date,amountPaid:Number(s)}});if(console.log("✅ Donation updated:",{modifiedCount:h.modifiedCount,matchedCount:h.matchedCount}),0===h.modifiedCount)return console.error("❌ Failed to update campaign donation:",r),i.NextResponse.json({success:!1,message:"Failed to update donation"},{status:500});let y=(x.donatedAmount||0)+Number(s),b=y>=x.amount?"completed":"inprogress";console.log("\uD83D\uDCB5 Campaign Update:",{previousDonatedAmount:x.donatedAmount||0,newDonation:Number(s),totalNow:y,targetAmount:x.amount,newStatus:b});let v=await g.updateOne({_id:x._id},{$set:{donatedAmount:y,status:b,updatedAt:new Date},$inc:{volunteers:1}});console.log("✅ Campaign updated:",{modifiedCount:v.modifiedCount,donatedAmount:y});try{console.log("\uD83D\uDCE7 Sending confirmation email to:",f.email);let e=c.createTransport({service:"gmail",auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_PASS}}),{subject:o,html:t}=(0,m.a)({name:f.firstName?`${f.firstName} ${f.lastName}`:"Friend",reference:r,amountPaid:Number(s),donationType:"one-time",designation:x.title});await e.sendMail({from:process.env.GMAIL_USER,to:f.email,subject:o,html:t}),console.log("✅ Confirmation email sent successfully to:",f.email)}catch(e){console.error("⚠️ Warning: Failed to send email:",e)}return console.log("\n✅ WEBHOOK PROCESSING COMPLETE"),console.log("   Reference:",r),console.log("   Amount: ₦"+s),console.log("   Campaign:",x.title),console.log("   New Total: ₦"+y),console.log("\n"),i.NextResponse.json({success:!0,message:"Campaign donation processed successfully",reference:r})}catch(e){return console.error("\n❌ WEBHOOK ERROR:",e.message),console.error("Stack:",e.stack),i.NextResponse.json({success:!0,message:"Webhook received"},{status:200})}}let f=new r.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/v1/user/campaigns/donate/webhook/route",pathname:"/api/v1/user/campaigns/donate/webhook",filename:"route",bundlePath:"app/api/v1/user/campaigns/donate/webhook/route"},resolvedPagePath:"C:\\Users\\HP\\OneDrive\\Desktop\\project2\\connect africa\\src\\app\\api\\v1\\user\\campaigns\\donate\\webhook\\route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:x,staticGenerationAsyncStorage:h,serverHooks:y}=f,b="/api/v1/user/campaigns/donate/webhook/route";function v(){return(0,a.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:h})}},75748:(e,o,t)=>{t.d(o,{Z:()=>s});var n=t(38013);let r=process.env.MONGODB_URI;if(!r)throw Error("Please define MONGODB_URI in .env");let s=new n.MongoClient(r).connect()},98800:(e,o,t)=>{function n({name:e,reference:o,amountPaid:t,donationType:n,designation:r}){return{subject:`Thank you for your donation — ${o}`,html:`
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
          <td style="padding:12px;border:1px solid #f1f5f9">${n||"One-time"}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;font-weight:600;">Destination</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${r||"Where most needed"}</td>
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
  `}}function r({unsubscribeToken:e}){let o=`http://localhost:3000/unsubscribe?token=${encodeURIComponent(e)}`;return{subject:"Welcome — Connect Africa Newsletter",html:`
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
  `}}t.d(o,{X:()=>r,a:()=>n})}};var o=require("../../../../../../../webpack-runtime.js");o.C(e);var t=e=>o(o.s=e),n=o.X(0,[9276,5972,5245],()=>t(94885));module.exports=n})();