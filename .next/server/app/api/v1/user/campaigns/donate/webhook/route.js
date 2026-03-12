"use strict";(()=>{var e={};e.id=9111,e.ids=[9111],e.modules={38013:e=>{e.exports=require("mongodb")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},94885:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>b,patchFetch:()=>w,requestAsyncStorage:()=>x,routeModule:()=>f,serverHooks:()=>y,staticGenerationAsyncStorage:()=>h});var r={};o.r(r),o.d(r,{POST:()=>m,dynamic:()=>u});var n=o(49303),i=o(88716),a=o(60670),s=o(87070),p=o(75748),d=o(38013),l=o(98800),c=o(48744);let u="force-dynamic";async function g(e,t){try{let o=e.headers.get("paypal-transmission-id"),r=e.headers.get("paypal-transmission-time"),n=e.headers.get("paypal-cert-url"),i=e.headers.get("paypal-transmission-sig"),a=process.env.PAYPAL_WEBHOOK_ID;if(!o||!r||!n||!i||!a)return console.error("Missing PayPal webhook headers"),!1;let s=Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64"),p=await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`,{method:"POST",headers:{Authorization:`Basic ${s}`,"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=client_credentials"}),d=(await p.json()).access_token,l=await fetch(`${process.env.PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`,{method:"POST",headers:{Authorization:`Bearer ${d}`,"Content-Type":"application/json"},body:JSON.stringify({transmission_id:o,transmission_time:r,cert_url:n,auth_algo:"SHA256withRSA",transmission_sig:i,webhook_id:a,webhook_event:JSON.parse(t)})}),c=await l.json();return"SUCCESS"===c.verification_status}catch(e){return console.error("PayPal webhook verification error:",e),!1}}async function m(e){let t="";try{console.log("\n\uD83D\uDD14 PAYPAL WEBHOOK RECEIVED"),t=await e.text();let o=await g(e,t);if(console.log("Signature Valid:",o),!o)return console.error("❌ Signature verification failed - rejecting webhook"),s.NextResponse.json({success:!1,message:"Invalid signature"},{status:401});let r=JSON.parse(t);if(console.log("\uD83D\uDCE8 Event Type:",r.event_type),"CHECKOUT.ORDER.COMPLETED"!==r.event_type)return console.log("⏭️ Ignoring event type:",r.event_type),s.NextResponse.json({message:"Event type ignored"});let n=r.resource;if(!n||!n.id)return console.error("❌ Missing order data"),s.NextResponse.json({success:!1,message:"Missing order data"},{status:400});console.log("\uD83D\uDCB3 PayPal Order ID:",n.id);let i=(await p.Z).db("connect_africa"),a=i.collection("donations"),u=i.collection("campaigns"),m=await a.findOne({paypalOrderId:n.id,status:{$ne:"completed"}});if(console.log("\uD83D\uDD0D Donation lookup result:",m?"✅ Found":"❌ Not found"),!m)return console.error("❌ Donation not found or already processed. Order ID:",n.id),s.NextResponse.json({success:!0,message:"Donation not found but webhook processed"});let f=n.purchase_units?.[0]?.amount?.value||m.amount;if(console.log("\uD83D\uDCCB Donation Details:",{paypalOrderId:m.paypalOrderId,status:m.status,amount:m.amount,campaignId:m.campaignId}),Math.abs(Number(f)-Number(m.amount))>.01)return console.error("❌ Amount mismatch:",{expected:m.amount,received:f}),s.NextResponse.json({success:!1,message:"Amount mismatch"},{status:400});if(!m.campaignId)return console.error("❌ Invalid campaign ID in donation"),s.NextResponse.json({success:!1,message:"Invalid campaign ID"},{status:400});let x=await u.findOne({_id:new d.ObjectId(m.campaignId)});if(console.log("\uD83C\uDFAF Campaign lookup:",x?`✅ Found: ${x.title}`:"❌ Not found"),!x)return s.NextResponse.json({success:!1,message:"Campaign not found"},{status:404});console.log("\uD83D\uDD04 Updating donation status to completed...");let h=await a.updateOne({paypalOrderId:n.id},{$set:{status:"completed",completedAt:new Date,amountPaid:Number(f),paypalStatus:n.status}});if(console.log("✅ Donation updated:",{modifiedCount:h.modifiedCount,matchedCount:h.matchedCount}),0===h.modifiedCount)return console.error("❌ Failed to update campaign donation:",n.id),s.NextResponse.json({success:!1,message:"Failed to update donation"},{status:500});let y=(x.donatedAmount||0)+Number(f),b=y>=x.amount?"completed":"inprogress";console.log("\uD83D\uDCB5 Campaign Update:",{previousDonatedAmount:x.donatedAmount||0,newDonation:Number(f),totalNow:y,targetAmount:x.amount,newStatus:b});let w=await u.updateOne({_id:x._id},{$set:{donatedAmount:y,status:b,updatedAt:new Date},$inc:{volunteers:1}});console.log("✅ Campaign updated:",{modifiedCount:w.modifiedCount,donatedAmount:y});try{console.log("\uD83D\uDCE7 Sending confirmation email to:",m.email);let e=(0,c.Q)(),{subject:t,html:o}=(0,l.aT)({name:m.firstName?`${m.firstName} ${m.lastName}`:"Friend",reference:m.paypalOrderId||n.id,amountPaid:Number(f),donationType:"one-time",designation:x.title});await e.sendMail({from:'"Connect Africa" <support@connectwithafrica.org>',to:m.email,subject:t,html:o}),console.log("✅ Confirmation email sent successfully to:",m.email)}catch(e){console.error("⚠️ Warning: Failed to send email:",e)}return console.log("\n✅ WEBHOOK PROCESSING COMPLETE"),console.log("   Order ID:",n.id),console.log("   Amount: $"+f),console.log("   Campaign:",x.title),console.log("   New Total: $"+y),console.log("\n"),s.NextResponse.json({success:!0,message:"Campaign donation processed successfully",reference:n.id})}catch(e){return console.error("\n❌ WEBHOOK ERROR:",e.message),console.error("Stack:",e.stack),s.NextResponse.json({success:!0,message:"Webhook received"},{status:200})}}let f=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/v1/user/campaigns/donate/webhook/route",pathname:"/api/v1/user/campaigns/donate/webhook",filename:"route",bundlePath:"app/api/v1/user/campaigns/donate/webhook/route"},resolvedPagePath:"C:\\Users\\HP\\OneDrive\\Desktop\\project2\\connect africa\\src\\app\\api\\v1\\user\\campaigns\\donate\\webhook\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:x,staticGenerationAsyncStorage:h,serverHooks:y}=f,b="/api/v1/user/campaigns/donate/webhook/route";function w(){return(0,a.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:h})}},75748:(e,t,o)=>{o.d(t,{Z:()=>i});var r=o(38013);let n=process.env.MONGODB_URI;if(!n)throw Error("Please define MONGODB_URI in .env");let i=new r.MongoClient(n).connect()},98800:(e,t,o)=>{function r({name:e,reference:t,amountPaid:o,donationType:r,designation:n}){return{subject:`Thank you for your donation — ${t}`,html:`
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

      <p style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:24px;color:#059669;font-weight:600;">With heartfelt gratitude,<br/>The Connect with Africa Team</p>

      <hr style="border:none;border-top:1px solid #f1f5f9;margin:24px 0" />
      <p style="font-size:12px;color:#6b7280;margin:0;">
        <strong>Questions?</strong> Reply to this email or visit <a href="http://localhost:3000" style="color:#059669;text-decoration:none;">our website</a>.<br/>
        <strong>Need help?</strong> Contact us at support@connectafrica.org
      </p>
    </div>
  </div>
  `}}function n({unsubscribeToken:e}){let t=`http://localhost:3000/newsletter/unsubscribe?token=${encodeURIComponent(e)}`;return{subject:"Welcome — Connect with Africa Newsletter",html:`
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
  `}}function i({verificationToken:e}){let t=`http://localhost:3000/newsletter/verify?token=${encodeURIComponent(e)}`;return{subject:"Confirm Your Email — Connect with Africa Newsletter",html:`
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
  `}}function a({campaignTitle:e,campaignDescription:t,campaignImage:o,campaignLink:r,unsubscribeToken:n}){let i=`New Campaign: ${e} — Connect with Africa`,a=`http://localhost:3000/newsletter/unsubscribe?token=${encodeURIComponent(n)}`;return{subject:i,html:`
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
  `}}o.d(t,{RY:()=>a,X:()=>n,aT:()=>r,pF:()=>i})},48744:(e,t,o)=>{let r;o.d(t,{Q:()=>i});var n=o(55245);let i=()=>(r||(r=n.createTransport({host:"smtp.zeptomail.com",port:587,secure:!1,auth:{user:process.env.ZEPTO_SMTP_USER,pass:process.env.ZEPTO_SMTP_PASS}})),r)}};var t=require("../../../../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[9276,5972,5245],()=>o(94885));module.exports=r})();