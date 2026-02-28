"use strict";(()=>{var e={};e.id=6641,e.ids=[6641],e.modules={38013:e=>{e.exports=require("mongodb")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},19379:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>b,patchFetch:()=>w,requestAsyncStorage:()=>h,routeModule:()=>m,serverHooks:()=>y,staticGenerationAsyncStorage:()=>x});var r={};o.r(r),o.d(r,{OPTIONS:()=>c,POST:()=>f,dynamic:()=>g});var i=o(49303),n=o(88716),a=o(60670),s=o(87070),p=o(75748),d=o(98800),l=o(48744);async function c(e){return new Response(null,{status:204,headers:{"Access-Control-Allow-Origin":e.headers.get("origin")||"*","Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Authorization"}})}let g="force-dynamic";async function u(e,t){try{let o=e.headers.get("paypal-transmission-id"),r=e.headers.get("paypal-transmission-time"),i=e.headers.get("paypal-cert-url"),n=e.headers.get("paypal-transmission-sig"),a=process.env.PAYPAL_WEBHOOK_ID;if(!o||!r||!i||!n||!a)return console.error("Missing PayPal webhook headers"),!1;let s=Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64"),p=await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`,{method:"POST",headers:{Authorization:`Basic ${s}`,"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=client_credentials"}),d=(await p.json()).access_token,l=await fetch(`${process.env.PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`,{method:"POST",headers:{Authorization:`Bearer ${d}`,"Content-Type":"application/json"},body:JSON.stringify({transmission_id:o,transmission_time:r,cert_url:i,auth_algo:"SHA256withRSA",transmission_sig:n,webhook_id:a,webhook_event:JSON.parse(t)})}),c=await l.json();return"SUCCESS"===c.verification_status}catch(e){return console.error("PayPal webhook verification error:",e),!1}}async function f(e){let t="";try{if(t=await e.text(),!await u(e,t))return console.error("Invalid PayPal webhook signature"),s.NextResponse.json({success:!1,message:"Invalid signature"},{status:401});let r=JSON.parse(t);if("CHECKOUT.ORDER.COMPLETED"!==r.event_type)return console.log("Ignoring event type:",r.event_type),s.NextResponse.json({message:"Event type ignored"});let i=r.resource;if(!i||!i.id)return s.NextResponse.json({success:!1,message:"Missing order data"},{status:400});let n=(await p.Z).db("connect_africa"),a=n.collection("donations"),c=await a.findOne({paypalOrderId:i.id,status:{$ne:"completed"}});if(!c)return console.log("Donation not found or already processed:",i.id),s.NextResponse.json({message:"Donation not found or already processed"});let g=i.purchase_units?.[0]?.amount?.value||c.amount,f=await a.updateOne({paypalOrderId:i.id},{$set:{status:"completed",completedAt:new Date,amountPaid:Number(g),paypalStatus:i.status}});if(0===f.modifiedCount)return console.error("Failed to update donation:",i.id),s.NextResponse.json({success:!1,message:"Failed to update donation"},{status:500});if(c.campaignId)try{let e=n.collection("campaigns"),{ObjectId:t}=o(38013);await e.updateOne({_id:new t(c.campaignId)},{$inc:{donatedAmount:Number(g),volunteers:1}})}catch(e){console.error("Error updating campaign:",e)}try{let e=(0,l.Q)(),{subject:t,html:o}=(0,d.aT)({name:c.firstName?`${c.firstName} ${c.lastName}`:c.name||"Friend",reference:i.id,amountPaid:Number(g),donationType:c.donationType||"one-time",designation:c.designation||"where-most-needed"});await e.sendMail({from:'"Connect Africa" <support@connectwithafrica.org>',to:c.email,subject:t,html:o}),console.log("Donation receipt email sent to:",c.email)}catch(e){console.error("Error sending donation receipt email:",e)}return s.NextResponse.json({success:!0,message:"Donation processed successfully",reference:i.id})}catch(e){return console.error("Donation webhook error:",e),s.NextResponse.json({success:!1,message:"Webhook processing failed",error:e?.message},{status:500})}}let m=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/v1/user/donations/webhook/route",pathname:"/api/v1/user/donations/webhook",filename:"route",bundlePath:"app/api/v1/user/donations/webhook/route"},resolvedPagePath:"C:\\Users\\HP\\OneDrive\\Desktop\\project2\\connect africa\\src\\app\\api\\v1\\user\\donations\\webhook\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:h,staticGenerationAsyncStorage:x,serverHooks:y}=m,b="/api/v1/user/donations/webhook/route";function w(){return(0,a.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:x})}},75748:(e,t,o)=>{o.d(t,{Z:()=>n});var r=o(38013);let i=process.env.MONGODB_URI;if(!i)throw Error("Please define MONGODB_URI in .env");let n=new r.MongoClient(i).connect()},98800:(e,t,o)=>{function r({name:e,reference:t,amountPaid:o,donationType:r,designation:i}){return{subject:`Thank you for your donation — ${t}`,html:`
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <!-- Header with Logo -->
    <div style="max-width:680px;margin:0 auto;background:linear-gradient(135deg, #059669 0%, #047857 100%);padding:32px 24px;border-radius:8px 8px 0 0;text-align:center;">
      <img src="https://connectwithafrica.org/logo2.jpg" alt="Connect with Africa" style="height:50px;margin-bottom:16px;" />
      <h1 style="color:#fff;margin:0;font-size:28px;">Connect with Africa</h1>
      <p style="color:#d1fae5;margin:8px 0 0 0;font-size:14px;">Bringing Healthcare to Every Community</p>
    </div>

    <!-- Main Content -->
    <div style="max-width:680px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e6f4ef;border-top:none;">
      <h2 style="color:#059669;margin-top:0;margin-bottom:8px;">Thank you for your generous gift</h2>
      <p>Dear ${e||"Friend"},</p>
      <p>We have successfully received your donation of <strong>$${o.toLocaleString()}</strong>.</p>
      <p><strong>Donation reference:</strong> <code style="background:#f1f5f9;padding:4px 8px;border-radius:4px;font-family:monospace;">${t}</code></p>
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

      <p style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:24px;color:#059669;font-weight:600;">With heartfelt gratitude,<br/>The Connect with Africa Team</p>

      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0" />
      <p style="font-size:12px;color:#6b7280;margin:0;">
        <strong>Questions?</strong> Reply to this email or visit <a href="http://localhost:3000" style="color:#059669;text-decoration:none;">our website</a>.<br/>
        <strong>Need help?</strong> Contact us at support@connectafrica.org
      </p>
    </div>
  </div>
  `}}function i({unsubscribeToken:e}){let t=`http://localhost:3000/newsletter/unsubscribe?token=${encodeURIComponent(e)}`;return{subject:"Welcome — Connect with Africa Newsletter",html:`
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <!-- Header with Logo -->
    <div style="max-width:680px;margin:0 auto;background:linear-gradient(135deg, #059669 0%, #047857 100%);padding:32px 24px;border-radius:8px 8px 0 0;text-align:center;">
      <img src="https://connectwithafrica.org/logo2.jpg" alt="Connect with Africa" style="height:50px;margin-bottom:16px;" />
      <h1 style="color:#fff;margin:0;font-size:28px;">Connect with Africa</h1>
      <p style="color:#d1fae5;margin:8px 0 0 0;font-size:14px;">Bringing Healthcare to Every Community</p>
    </div>

    <!-- Main Content -->
    <div style="max-width:680px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e6f4ef;border-top:none;">
      <h2 style="color:#059669;margin-top:0;margin-bottom:16px;">Welcome to our Newsletter</h2>
      <p>Thank you for subscribing! We're excited to have you join the Connect with Africa community. You'll now receive monthly updates on our programs, impact stories, and ways to help.</p>
      
      <div style="background:#f0fdf4;border-left:4px solid #059669;padding:16px;margin:24px 0;border-radius:4px;">
        <p style="margin:0 0 12px 0;color:#15803d;font-weight:600;">📬 What You'll Receive</p>
        <ul style="margin:0;padding-left:20px;color:#166534;">
          <li style="margin-bottom:8px;">Monthly program updates and impact reports</li>
          <li style="margin-bottom:8px;">Volunteer and partnership opportunities</li>
          <li>Exclusive campaign previews and insider stories</li>
        </ul>
      </div>

      <p style="color:#6b7280;font-size:14px;margin:24px 0;">If you ever wish to unsubscribe from our newsletter, you can do so by clicking the link at the bottom of any email.</p>

      <p style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:24px;color:#059669;font-weight:600;">With warm regards,<br/>The Connect with Africa Team</p>

      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0" />
      <p style="font-size:12px;color:#6b7280;margin:0;">
        <strong>Have questions?</strong> Reply to this email or visit <a href="http://localhost:3000" style="color:#059669;text-decoration:none;">our website</a>.<br/>
        <strong>Want to unsubscribe?</strong> Click <a href="${t}" style="color:#059669;text-decoration:none;">here</a>.
      </p>
    </div>
  </div>
  `}}function n({verificationToken:e}){let t=`http://localhost:3000/newsletter/verify?token=${encodeURIComponent(e)}`;return{subject:"Confirm Your Email — Connect with Africa Newsletter",html:`
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <!-- Header with Logo -->
    <div style="max-width:680px;margin:0 auto;background:linear-gradient(135deg, #059669 0%, #047857 100%);padding:32px 24px;border-radius:8px 8px 0 0;text-align:center;">
      <img src="https://connectwithafrica.org/logo2.jpg" alt="Connect with Africa" style="height:50px;margin-bottom:16px;" />
      <h1 style="color:#fff;margin:0;font-size:28px;">Connect with Africa</h1>
      <p style="color:#d1fae5;margin:8px 0 0 0;font-size:14px;">Bringing Healthcare to Every Community</p>
    </div>

    <!-- Main Content -->
    <div style="max-width:680px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e6f4ef;border-top:none;">
      <h2 style="color:#059669;margin-top:0;margin-bottom:16px;">Confirm Your Email Address</h2>
      <p>Thank you for subscribing to Connect with Africa Newsletter! To complete your subscription and start receiving updates about our programs, please confirm your email address.</p>
      
      <div style="text-align:center;margin:32px 0;">
        <a href="${t}" style="display:inline-block;background:#059669;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:16px;transition:background 0.3s;">
          Confirm Email Address
        </a>
      </div>

      <p style="color:#6b7280;font-size:14px;text-align:center;margin-top:24px;">Or copy and paste this link in your browser:<br/><a href="${t}" style="color:#059669;word-break:break-all;">${t}</a></p>

      <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:16px;margin:24px 0;border-radius:4px;">
        <p style="margin:0;color:#92400e;font-size:14px;">💡 <strong>Don't recognize this?</strong> If you didn't subscribe to our newsletter, please ignore this email. Your address will not be added to our list.</p>
      </div>

      <p style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:24px;color:#059669;font-weight:600;">Regards,<br/>The Connect with Africa Team</p>

      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0" />
      <p style="font-size:12px;color:#6b7280;margin:0;">This link will expire in 24 hours.</p>
    </div>
  </div>
  `}}function a({campaignTitle:e,campaignDescription:t,campaignImage:o,campaignLink:r,unsubscribeToken:i}){let n=`New Campaign: ${e} — Connect with Africa`,a=`http://localhost:3000/newsletter/unsubscribe?token=${encodeURIComponent(i)}`;return{subject:n,html:`
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; line-height:1.5;">
    <!-- Header with Logo -->
    <div style="max-width:680px;margin:0 auto;background:linear-gradient(135deg, #059669 0%, #047857 100%);padding:32px 24px;border-radius:8px 8px 0 0;text-align:center;">
      <img src="https://connectwithafrica.org/logo2.jpg" alt="Connect with Africa" style="height:50px;margin-bottom:16px;" />
      <h1 style="color:#fff;margin:0;font-size:28px;">Connect with Africa</h1>
      <p style="color:#d1fae5;margin:8px 0 0 0;font-size:14px;">Bringing Healthcare to Every Community</p>
    </div>

    <!-- Main Content -->
    <div style="max-width:680px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e6f4ef;border-top:none;">
      <h2 style="color:#059669;margin-top:0;margin-bottom:16px;">🎯 New Campaign: ${e}</h2>
      
      ${o?`<img src="${o}" alt="${e}" style="width:100%;max-height:400px;object-fit:cover;border-radius:8px;margin-bottom:24px;" />`:""}

      <p style="font-size:16px;line-height:1.6;color:#1f2937;margin:0 0 16px 0;">${t}</p>

      <div style="text-align:center;margin:32px 0;">
        <a href="${r}" style="display:inline-block;background:#059669;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:16px;transition:background 0.3s;">
          View Campaign
        </a>
      </div>

      <div style="background:#f0fdf4;border-left:4px solid #059669;padding:16px;margin:24px 0;border-radius:4px;">
        <p style="margin:0;color:#15803d;font-weight:600;margin-bottom:8px;">💚 Your Support Matters</p>
        <p style="margin:0;color:#166534;font-size:14px;">Join thousands of supporters making a real difference in healthcare access across Africa. Every contribution, no matter the size, helps us reach more communities.</p>
      </div>

      <p style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:24px;color:#059669;font-weight:600;">With gratitude,<br/>The Connect with Africa Team</p>

      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0" />
      <p style="font-size:12px;color:#6b7280;margin:0;">
        <strong>Have questions?</strong> Reply to this email or visit <a href="http://localhost:3000" style="color:#059669;text-decoration:none;">our website</a>.<br/>
        <strong>Want to unsubscribe?</strong> Click <a href="${a}" style="color:#059669;text-decoration:none;">here</a>.
      </p>
    </div>
  </div>
  `}}o.d(t,{RY:()=>a,X:()=>i,aT:()=>r,pF:()=>n})},48744:(e,t,o)=>{let r;o.d(t,{Q:()=>n});var i=o(55245);let n=()=>(r||(r=i.createTransport({host:"smtp.zeptomail.com",port:587,secure:!1,auth:{user:process.env.ZEPTO_SMTP_USER,pass:process.env.ZEPTO_SMTP_PASS}})),r)}};var t=require("../../../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[9276,5972,5245],()=>o(19379));module.exports=r})();