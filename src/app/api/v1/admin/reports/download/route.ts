import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// allowed origins for CORS
import { ALLOWED_ORIGINS } from "@/config/cors";

export async function GET(req: NextRequest) {
  try {
    /* ================= CORS ================= */
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "CORS policy: Origin not allowed" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year") || "2024";

    // For now, return a sample PDF or create a dynamic one
    // In production, you would fetch from a database or cloud storage
    
    const reportContent = generateAnnualReportPDF(year);
    // Convert Buffer to Uint8Array for NextResponse compatibility
    const pdfArray = new Uint8Array(reportContent);
    return new NextResponse(pdfArray, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Connect_Africa_Annual_Report_${year}.pdf"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err: any) {
    console.error("Report download error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to download report",
      },
      { status: 500 }
    );
  }
}

function generateAnnualReportPDF(year: string): Buffer {
  // Create a simple PDF-like document
  // In production, use a library like pdfkit or jspdf
  const pdfContent = `
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
(Connect Africa Annual Report ${year}) Tj
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
  `;

  return Buffer.from(pdfContent, "utf-8");
}
