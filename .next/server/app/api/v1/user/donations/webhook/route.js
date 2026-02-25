"use strict";(()=>{var e={};e.id=6641,e.ids=[6641],e.modules={38013:e=>{e.exports=require("mongodb")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},19379:(e,o,t)=>{t.r(o),t.d(o,{originalPathname:()=>h,patchFetch:()=>y,requestAsyncStorage:()=>f,routeModule:()=>u,serverHooks:()=>x,staticGenerationAsyncStorage:()=>m});var r={};t.r(r),t.d(r,{POST:()=>g});var i=t(49303),n=t(88716),a=t(60670),s=t(87070),p=t(75748),d=t(98800),l=t(55245);async function c(e,o){try{let t=e.headers.get("paypal-transmission-id"),r=e.headers.get("paypal-transmission-time"),i=e.headers.get("paypal-cert-url"),n=e.headers.get("paypal-transmission-sig"),a=process.env.PAYPAL_WEBHOOK_ID;if(!t||!r||!i||!n||!a)return console.error("Missing PayPal webhook headers"),!1;let s=Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64"),p=await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`,{method:"POST",headers:{Authorization:`Basic ${s}`,"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=client_credentials"}),d=(await p.json()).access_token,l=await fetch(`${process.env.PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`,{method:"POST",headers:{Authorization:`Bearer ${d}`,"Content-Type":"application/json"},body:JSON.stringify({transmission_id:t,transmission_time:r,cert_url:i,auth_algo:"SHA256withRSA",transmission_sig:n,webhook_id:a,webhook_event:JSON.parse(o)})}),c=await l.json();return"SUCCESS"===c.verification_status}catch(e){return console.error("PayPal webhook verification error:",e),!1}}async function g(e){let o="";try{if(o=await e.text(),!await c(e,o))return console.error("Invalid PayPal webhook signature"),s.NextResponse.json({success:!1,message:"Invalid signature"},{status:401});let r=JSON.parse(o);if("CHECKOUT.ORDER.COMPLETED"!==r.event_type)return console.log("Ignoring event type:",r.event_type),s.NextResponse.json({message:"Event type ignored"});let i=r.resource;if(!i||!i.id)return s.NextResponse.json({success:!1,message:"Missing order data"},{status:400});let n=(await p.Z).db("connect_africa"),a=n.collection("donations"),g=await a.findOne({paypalOrderId:i.id,status:{$ne:"completed"}});if(!g)return console.log("Donation not found or already processed:",i.id),s.NextResponse.json({message:"Donation not found or already processed"});let u=i.purchase_units?.[0]?.amount?.value||g.amount,f=await a.updateOne({paypalOrderId:i.id},{$set:{status:"completed",completedAt:new Date,amountPaid:Number(u),paypalStatus:i.status}});if(0===f.modifiedCount)return console.error("Failed to update donation:",i.id),s.NextResponse.json({success:!1,message:"Failed to update donation"},{status:500});if(g.campaignId)try{let e=n.collection("campaigns"),{ObjectId:o}=t(38013);await e.updateOne({_id:new o(g.campaignId)},{$inc:{donatedAmount:Number(u),volunteers:1}})}catch(e){console.error("Error updating campaign:",e)}try{let e=l.createTransport({service:"gmail",auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_PASS}}),{subject:o,html:t}=(0,d.aT)({name:g.firstName?`${g.firstName} ${g.lastName}`:g.name||"Friend",reference:i.id,amountPaid:Number(u),donationType:g.donationType||"one-time",designation:g.designation||"where-most-needed"});await e.sendMail({from:process.env.GMAIL_USER,to:g.email,subject:o,html:t}),console.log("Donation receipt email sent to:",g.email)}catch(e){console.error("Error sending donation receipt email:",e)}return s.NextResponse.json({success:!0,message:"Donation processed successfully",reference:i.id})}catch(e){return console.error("Donation webhook error:",e),s.NextResponse.json({success:!1,message:"Webhook processing failed",error:e?.message},{status:500})}}let u=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/v1/user/donations/webhook/route",pathname:"/api/v1/user/donations/webhook",filename:"route",bundlePath:"app/api/v1/user/donations/webhook/route"},resolvedPagePath:"C:\\Users\\HP\\OneDrive\\Desktop\\project2\\connect africa\\src\\app\\api\\v1\\user\\donations\\webhook\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:f,staticGenerationAsyncStorage:m,serverHooks:x}=u,h="/api/v1/user/donations/webhook/route";function y(){return(0,a.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:m})}},75748:(e,o,t)=>{t.d(o,{Z:()=>n});var r=t(38013);let i=process.env.MONGODB_URI;if(!i)throw Error("Please define MONGODB_URI in .env");let n=new r.MongoClient(i).connect()},98800:(e,o,t)=>{function r({name:e,reference:o,amountPaid:t,donationType:r,designation:i}){return{subject:`Thank you for your donation — ${o}`,html:`
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
      <p>We have successfully received your donation of <strong>$${t.toLocaleString()}</strong>.</p>
      <p><strong>Donation reference:</strong> <code style="background:#f1f5f9;padding:4px 8px;border-radius:4px;font-family:monospace;">${o}</code></p>
      <table style="width:100%;margin-top:16px;border-collapse:collapse">
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;width:40%;font-weight:600;">Type</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${r||"One-time"}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #f1f5f9;background:#f8fafc;font-weight:600;">Destination</td>
          <td style="padding:12px;border:1px solid #f1f5f9">${i||"Where most needed"}</td>
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
  `}}function i({unsubscribeToken:e}){let o=`http://localhost:3000/newsletter/unsubscribe?token=${encodeURIComponent(e)}`;return{subject:"Welcome — Connect Africa Newsletter",html:`
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <!-- Header with Logo -->
    <div style="max-width:680px;margin:0 auto;background:linear-gradient(135deg, #059669 0%, #047857 100%);padding:32px 24px;border-radius:8px 8px 0 0;text-align:center;">
      <img src="https://res.cloudinary.com/dsfodoe0d/image/upload/v1/connect-africa-logo" alt="Connect Africa" style="height:50px;margin-bottom:16px;" />
      <h1 style="color:#fff;margin:0;font-size:28px;">Connect Africa</h1>
      <p style="color:#d1fae5;margin:8px 0 0 0;font-size:14px;">Bringing Healthcare to Every Community</p>
    </div>

    <!-- Main Content -->
    <div style="max-width:680px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e6f4ef;border-top:none;">
      <h2 style="color:#059669;margin-top:0;margin-bottom:16px;">Welcome to our Newsletter</h2>
      <p>Thank you for subscribing! We're excited to have you join the Connect Africa community. You'll now receive monthly updates on our programs, impact stories, and ways to help.</p>
      
      <div style="background:#f0fdf4;border-left:4px solid #059669;padding:16px;margin:24px 0;border-radius:4px;">
        <p style="margin:0 0 12px 0;color:#15803d;font-weight:600;">📬 What You'll Receive</p>
        <ul style="margin:0;padding-left:20px;color:#166534;">
          <li style="margin-bottom:8px;">Monthly program updates and impact reports</li>
          <li style="margin-bottom:8px;">Volunteer and partnership opportunities</li>
          <li>Exclusive campaign previews and insider stories</li>
        </ul>
      </div>

      <p style="color:#6b7280;font-size:14px;margin:24px 0;">If you ever wish to unsubscribe from our newsletter, you can do so by clicking the link at the bottom of any email.</p>

      <p style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:24px;color:#059669;font-weight:600;">With warm regards,<br/>The Connect Africa Team</p>

      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0" />
      <p style="font-size:12px;color:#6b7280;margin:0;">
        <strong>Have questions?</strong> Reply to this email or visit <a href="http://localhost:3000" style="color:#059669;text-decoration:none;">our website</a>.<br/>
        <strong>Want to unsubscribe?</strong> Click <a href="${o}" style="color:#059669;text-decoration:none;">here</a>.
      </p>
    </div>
  </div>
  `}}function n({verificationToken:e}){let o=`http://localhost:3000/newsletter/verify?token=${encodeURIComponent(e)}`;return{subject:"Confirm Your Email — Connect Africa Newsletter",html:`
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <!-- Header with Logo -->
    <div style="max-width:680px;margin:0 auto;background:linear-gradient(135deg, #059669 0%, #047857 100%);padding:32px 24px;border-radius:8px 8px 0 0;text-align:center;">
      <img src="https://res.cloudinary.com/dsfodoe0d/image/upload/v1/connect-africa-logo" alt="Connect Africa" style="height:50px;margin-bottom:16px;" />
      <h1 style="color:#fff;margin:0;font-size:28px;">Connect Africa</h1>
      <p style="color:#d1fae5;margin:8px 0 0 0;font-size:14px;">Bringing Healthcare to Every Community</p>
    </div>

    <!-- Main Content -->
    <div style="max-width:680px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e6f4ef;border-top:none;">
      <h2 style="color:#059669;margin-top:0;margin-bottom:16px;">Confirm Your Email Address</h2>
      <p>Thank you for subscribing to Connect Africa Newsletter! To complete your subscription and start receiving updates about our programs, please confirm your email address.</p>
      
      <div style="text-align:center;margin:32px 0;">
        <a href="${o}" style="display:inline-block;background:#059669;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:16px;transition:background 0.3s;">
          Confirm Email Address
        </a>
      </div>

      <p style="color:#6b7280;font-size:14px;text-align:center;margin-top:24px;">Or copy and paste this link in your browser:<br/><a href="${o}" style="color:#059669;word-break:break-all;">${o}</a></p>

      <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:16px;margin:24px 0;border-radius:4px;">
        <p style="margin:0;color:#92400e;font-size:14px;">💡 <strong>Don't recognize this?</strong> If you didn't subscribe to our newsletter, please ignore this email. Your address will not be added to our list.</p>
      </div>

      <p style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:24px;color:#059669;font-weight:600;">Regards,<br/>The Connect Africa Team</p>

      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0" />
      <p style="font-size:12px;color:#6b7280;margin:0;">This link will expire in 24 hours.</p>
    </div>
  </div>
  `}}function a({campaignTitle:e,campaignDescription:o,campaignImage:t,campaignLink:r,unsubscribeToken:i}){let n=`New Campaign: ${e} — Connect Africa`,a=`http://localhost:3000/newsletter/unsubscribe?token=${encodeURIComponent(i)}`;return{subject:n,html:`
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <!-- Header with Logo -->
    <div style="max-width:680px;margin:0 auto;background:linear-gradient(135deg, #059669 0%, #047857 100%);padding:32px 24px;border-radius:8px 8px 0 0;text-align:center;">
      <img src="https://res.cloudinary.com/dsfodoe0d/image/upload/v1/connect-africa-logo" alt="Connect Africa" style="height:50px;margin-bottom:16px;" />
      <h1 style="color:#fff;margin:0;font-size:28px;">Connect Africa</h1>
      <p style="color:#d1fae5;margin:8px 0 0 0;font-size:14px;">Bringing Healthcare to Every Community</p>
    </div>

    <!-- Main Content -->
    <div style="max-width:680px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e6f4ef;border-top:none;">
      <h2 style="color:#059669;margin-top:0;margin-bottom:16px;">🎯 New Campaign: ${e}</h2>
      
      ${t?`<img src="${t}" alt="${e}" style="width:100%;max-height:400px;object-fit:cover;border-radius:8px;margin-bottom:24px;" />`:""}

      <p style="font-size:16px;line-height:1.6;color:#1f2937;margin:0 0 16px 0;">${o}</p>

      <div style="text-align:center;margin:32px 0;">
        <a href="${r}" style="display:inline-block;background:#059669;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:16px;transition:background 0.3s;">
          View Campaign
        </a>
      </div>

      <div style="background:#f0fdf4;border-left:4px solid #059669;padding:16px;margin:24px 0;border-radius:4px;">
        <p style="margin:0;color:#15803d;font-weight:600;margin-bottom:8px;">💚 Your Support Matters</p>
        <p style="margin:0;color:#166534;font-size:14px;">Join thousands of supporters making a real difference in healthcare access across Africa. Every contribution, no matter the size, helps us reach more communities.</p>
      </div>

      <p style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:24px;color:#059669;font-weight:600;">With gratitude,<br/>The Connect Africa Team</p>

      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0" />
      <p style="font-size:12px;color:#6b7280;margin:0;">
        <strong>Have questions?</strong> Reply to this email or visit <a href="http://localhost:3000" style="color:#059669;text-decoration:none;">our website</a>.<br/>
        <strong>Want to unsubscribe?</strong> Click <a href="${a}" style="color:#059669;text-decoration:none;">here</a>.
      </p>
    </div>
  </div>
  `}}t.d(o,{RY:()=>a,X:()=>i,aT:()=>r,pF:()=>n})}};var o=require("../../../../../../webpack-runtime.js");o.C(e);var t=e=>o(o.s=e),r=o.X(0,[9276,5972,5245],()=>t(19379));module.exports=r})();