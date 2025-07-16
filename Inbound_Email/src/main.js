import './style.css'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

document.querySelector('#app').innerHTML = `
<h2 class="report-title">✈️ Flight Service Check Report - Inbound</h2>
<form id="flight-form">
  <h3>Basic Info</h3>
  <h3><button id="compose-email-btn">📧 이메일 작성</button></h3>

  <label>Airline Code:</label><br>
  <select name="airline">
    <option value="OZ">OZ</option>
    <option value="KE">KE</option>
    <option value="QR">QR</option>
  </select><br>

  <label>Flight Number:</label><br>
  <input type="text" name="flight_number" required /><br>

<label>ETD:</label>
<div style="display: flex; gap: 10px; align-items: center;">
  <input type="datetime-local" name="etd" id="etd" required />
  <button type="button" id="btn-etd-now">Now</button>
</div><br>

<label>ETA:</label>
<div style="display: flex; gap: 10px; align-items: center;">
  <input type="datetime-local" name="eta" id="eta" required />
  <button type="button" id="btn-eta-now">Now</button>
</div><br>


<label>Landing Time:</label>
<div style="display: flex; gap: 10px; align-items: center;">
  <input type="datetime-local" id="landing" name="landing" required />
  <button type="button" id="btn-landing-now">Now</button>
</div><br>

<label>Ramp In Time:</label>
<div style="display: flex; gap: 10px; align-items: center;">
  <input type="datetime-local" id="rampin" name="rampin" required />
  <button type="button" id="btn-rampin-now">Now</button>
</div><br>


  <h3>[Documentation] – 2hr prior to flight arrival</h3>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>1. GD / PTP Clearance (Stamped):</span>
    <label><input type="radio" name="doc1" value="Yes" checked> Yes</label>
    <label><input type="radio" name="doc1" value="No"> No</label>
  </div>
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>2. Inbound flight irregularities check, MSG check:</span>
    <label><input type="radio" name="doc2" value="Yes" checked> Yes</label>
    <label><input type="radio" name="doc2" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>3. Build up status and ULD check:</span>
    <label><input type="radio" name="doc3" value="Yes" checked> Yes</label>
    <label><input type="radio" name="doc3" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>4. Weight check with Dim & Weight sheet, MFST WT vs Actual WT:</span>
    <label><input type="radio" name="doc4" value="Yes" checked> Yes</label>
    <label><input type="radio" name="doc4" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>5. W/B LIR compare to Deadload sheet:</span>
    <label><input type="radio" name="doc5" value="Yes" checked> Yes</label>
    <label><input type="radio" name="doc5" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <h3>[Pre-flight preparation] – 1hr prior to flight arrival</h3>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>1. Confirm cargo info, including DG or special CGO:</span>
    <label><input type="radio" name="prep1" value="Yes" checked> Yes</label>
    <label><input type="radio" name="prep1" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>2. Confirm ULD/CGO info to be left in transit A/C:</span>
    <label><input type="radio" name="prep2" value="Yes" checked> Yes</label>
    <label><input type="radio" name="prep2" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>3. Nose Offload Required:</span>
    <label><input type="radio" name="prep3" value="Yes" checked> Yes</label>
    <label><input type="radio" name="prep3" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>4. Contour of ULD and build up status check(Al.A2.B):</span>
    <label><input type="radio" name="prep4" value="Yes" checked> Yes</label>
    <label><input type="radio" name="prep4" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <h3>[Confirm items prior to/upon flight arrival]</h3>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>1. Confirm ramp conditions, especially to avoid FOD:</span>
    <label><input type="radio" name="arrival1" value="Yes" checked> Yes</label>
    <label><input type="radio" name="arrival1" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>2. Confirm all GSE serviceability, if it is full operational:</span>
    <label><input type="radio" name="arrival2" value="Yes" checked> Yes</label>
    <label><input type="radio" name="arrival2" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>3. Safe positioning of GSE and ramp staffs (Wing walker):</span>
    <label><input type="radio" name="arrival3" value="Yes" checked> Yes</label>
    <label><input type="radio" name="arrival3" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>4. Confirm safety for A/C spot in:</span>
    <label><input type="radio" name="arrival4" value="Yes" checked> Yes</label>
    <label><input type="radio" name="arrival4" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>5. Observe setting GSE to A/C:</span>
    <label><input type="radio" name="arrival5" value="Yes" checked> Yes</label>
    <label><input type="radio" name="arrival5" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>6. Check tethering is installed below Taxing light housing conduit:</span>
    <label><input type="radio" name="arrival6" value="Yes" checked> Yes</label>
    <label><input type="radio" name="arrival6" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>7. Check additional safety cone installed at rear side of A/C:</span>
    <label><input type="radio" name="arrival7" value="Yes" checked> Yes</label>
    <label><input type="radio" name="arrival7" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <h3>[Confirm items prior to start unloading]</h3>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>1. Observe tail stanchion or nose tethering being fixed to A/C:</span>
    <label><input type="radio" name="unload1" value="Yes" checked> Yes</label>
    <label><input type="radio" name="unload1" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>2. Check cargo condition (leaning, wet, odor, etc) in A/C:</span>
    <label><input type="radio" name="unload2" value="Yes" checked> Yes</label>
    <label><input type="radio" name="unload2" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>3. Confirm and report damage and malfunction of A/C and equipment <br>(Door Frames, Seal Depressor, Outer skin around the cargo doors and Tail Stanchion Pad, Restraint, PDU, etc):</span>
    <label><input type="radio" name="unload3" value="Yes" checked> Yes</label>
    <label><input type="radio" name="unload3" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>4. Confirm all GSE is properly aligned / positioned at Aircraft <br>(MD Loader, LD Loader,
Belt Loader, Pax Steps):</span>
    <label><input type="radio" name="unload4" value="Yes" checked> Yes</label>
    <label><input type="radio" name="unload4" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <h3>[Supervision for unloading operations]</h3>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>1. Supervise to prevent tail heavy weight condition from concentrating on tail of A/C:</span>
    <label><input type="radio" name="supervised1" value="Yes" checked> Yes</label>
    <label><input type="radio" name="supervised1" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>2. Control handling progress and safety. (Special care should be taken on OSC/SHC/SEN):</span>
    <label><input type="radio" name="supervised2" value="Yes" checked> Yes</label>
    <label><input type="radio" name="supervised2" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>3. Check ULD number and contour:</span>
    <label><input type="radio" name="supervised3" value="Yes" checked> Yes</label>
    <label><input type="radio" name="supervised3" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>4. Supervise and instruct to handle special cargo:</span>
    <label><input type="radio" name="supervised4" value="Yes" checked> Yes</label>
    <label><input type="radio" name="supervised4" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>5. Report irregularity of cargo and handling:</span>
    <label><input type="radio" name="supervised5" value="Yes" checked> Yes</label>
    <label><input type="radio" name="supervised5" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <h3>[Dangerous Goods]</h3>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>1. Check DG for any leakage, odor, or dent to package:</span>
    <label><input type="radio" name="dg1" value="Yes" checked> Yes</label>
    <label><input type="radio" name="dg1" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>2. Check netting condition and leaning of DG pallets:</span>
    <label><input type="radio" name="dg2" value="Yes" checked> Yes</label>
    <label><input type="radio" name="dg2" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>3. Check DG tag attached (Both side):</span>
    <label><input type="radio" name="dg3" value="Yes" checked> Yes</label>
    <label><input type="radio" name="dg3" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <h3>[Confirm items after completion of unloading]]</h3>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>1. Check equipment in A/C(restraint, PDU, etc):</span>
    <label><input type="radio" name="confirm1" value="Yes" checked> Yes</label>
    <label><input type="radio" name="confirm1" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>2. Report and confirm irregularities of equipment in A/C:</span>
    <label><input type="radio" name="confirm2" value="Yes" checked> Yes</label>
    <label><input type="radio" name="confirm2" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>3. Confirm ULD/CGO to be unloaded and ULD/CGO to be left in A/C for transit flight:</span>
    <label><input type="radio" name="confirm3" value="Yes" checked> Yes</label>
    <label><input type="radio" name="confirm3" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>4. Confirm all of end locks engaged between ULD and empty position:</span>
    <label><input type="radio" name="confirm4" value="Yes" checked> Yes</label>
    <label><input type="radio" name="confirm4" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <h3>[Additional operation]</h3>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>1. Notify to OZ rep when flight crews in/out:</span>
    <label><input type="radio" name="add1" value="Yes" checked> Yes</label>
    <label><input type="radio" name="add1" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
  <div class="check-item">
    <span>2. Notify to OZ rep when service provider show up <br>(Catering. Fuler, Flight operation,
Security, De-icing):</span>
    <label><input type="radio" name="add2" value="Yes" checked> Yes</label>
    <label><input type="radio" name="add2" value="No"> No</label>
  </div>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>

  <h3>📄 PDF Preview</h3>
  <button type="button" id="preview-btn">미리보기</button>
  <br><br>
  <iframe id="preview" width="100%" height="500px" style="border:1px solid #ccc;"></iframe>
  <p id="status"></p>


  <br>
</form>
<p id="status"></p>

`

document.getElementById('compose-email-btn').addEventListener('click', (e) => {
  e.preventDefault();  // 기본 submit 방지
  window.location.href = '../email.html';
});


async function generatePreview(data) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;
  const titleFontSize = 20;
  const textFontSize = 12;
  const textGap = 20;
  const fontColor = rgb(0, 0, 0);

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // 제목 출력 (중앙 정렬)
  const title = "Flight Service Check Report - Inbound";
  const titleWidth = font.widthOfTextAtSize(title, titleFontSize);
  const titleX = (pageWidth - titleWidth) / 2;

  page.drawText(title, {
    x: titleX,
    y: y,
    size: titleFontSize,
    font,
    color: fontColor,
  });
  y -= 40;

  // 안전하게 텍스트 출력하는 함수 (페이지 넘김 포함)
  const safeDrawText = (text, dy = textGap) => {
    if (y - dy < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    page.drawText(text, {
      x: margin,
      y,
      size: textFontSize,
      font,
      color: fontColor,
    });
    y -= dy;
  };

  // Basic info
  safeDrawText(`Flight: ${data.airline} ${data.flight_number}`);
  safeDrawText(`Date: ${data.etd}`);
  safeDrawText(`ETA: ${data.eta}`);
  safeDrawText(`Landing Time: ${data.landing}`);
  safeDrawText(`Ramp-in Time: ${data.rampin}`);

  // Checklist
  safeDrawText("[Documentation] – 2hr prior to flight arrival");
  safeDrawText(`1. GD / PTP Clearance(Stamped): ${data.doc1}`);
  safeDrawText(`2. Inbound flight irregularities check, MSG check: ${data.doc2}`);
  safeDrawText(`3. Build up status and ULD check: ${data.doc3}`);
  safeDrawText(`4. Weight check with Dim & Weight sheet, MFST WT vs Actual WT: ${data.doc4}`);
  safeDrawText(`5. W/B LIR compare to Deadload sheet: ${data.doc5}`);

  safeDrawText("[Pre-flight preparation] – 1hr prior to flight arrival");
  safeDrawText(`1. Confirm cargo info, including DG or special CGO: ${data.prep1}`);
  safeDrawText(`2. Confirm ULD/CGO info to be left in transit A/C: ${data.prep2}`);
  safeDrawText(`3. Nose Offload Required: ${data.prep3}`);
  safeDrawText(`4. Contour of ULD and build up status check(Al.A2.B): ${data.prep4}`);

  safeDrawText("[Confirm items prior to/upon flight arrival]");
  safeDrawText(`1. Confirm ramp conditions, especially to avoid FOD: ${data.arrival1}`);
  safeDrawText(`2. Confirm all GSE serviceability, if it is full operational: ${data.arrival2}`);
  safeDrawText(`3. Safe positioning of GSE and ramp staffs (Wing walker): ${data.arrival3}`);
  safeDrawText(`4. Confirm safety for A/C spot in: ${data.arrival4}`);
  safeDrawText(`5. Observe setting GSE to A/C:${data.arrival5}`);
  safeDrawText(`6. Check tethering is installed below Taxing light housing conduit:${data.arrival6}`);
  safeDrawText(`7. Check additional safety cone installed at rear side of A/C:${data.arrival7}`);

  safeDrawText("[Confirm items prior to start unloading]");
  safeDrawText(`1. Observe tail stanchion or nose tethering being fixed to A/C: ${data.unload1}`);
  safeDrawText(`2. Check cargo condition (leaning, wet, odor, etc) in A/C: ${data.unload2}`);
  safeDrawText(`3. Confirm and report damage and malfunction of A/C and equipment (Door Frames, Seal Depressor,`);
  safeDrawText(`   Outer skin around the cargo doors and Tail Stanchion Pad, Restraint, PDU, etc): ${data.unload3}`);
  safeDrawText(`4. Confirm all GSE is properly aligned / positioned at Aircraft`);
  safeDrawText(`    (LD Loader, LD Loader, Belt Loader, Pax Steps): ${data.unload4}`);

  safeDrawText("[Supervision for unloading operations]");
  safeDrawText(`1. Supervise to prevent tail heavy weight condition from concentrating on tail of A/C: ${data.supervised1}`);
  safeDrawText(`2. Control handling progress and safety. (Special care should be taken on OSC/SHC/SEN): ${data.supervised2}`);
  safeDrawText(`3. Check ULD number and contour: ${data.supervised3}`);
  safeDrawText(`4. Supervise and instruct to handle special cargo: ${data.supervised4}`);
  safeDrawText(`5. Report irregularity of cargo and handling: ${data.supervised5}`);

  safeDrawText("[Dangerous Goods]");
  safeDrawText(`1. Check DG for any leakage, odor, or dent to package: ${data.dg1}`);
  safeDrawText(`2. Check netting condition and leaning of DG pallets: ${data.dg2}`);
  safeDrawText(`3. Check DG tag attached (Both side): ${data.dg3}`);

  safeDrawText("[Confirm items after completion of unloading]");
  safeDrawText(`1. Check equipment in A/C(restraint, PDU, etc): ${data.confirm1}`);
  safeDrawText(`2. Report and confirm irregularities of equipment in A/C: ${data.confirm2}`);
  safeDrawText(`3. Confirm ULD/CGO to be unloaded and ULD/CGO to be left in A/C for transit flight: ${data.confirm3}`);
  safeDrawText(`4. Confirm all of end locks engaged between ULD and empty position: ${data.confirm4}`);

  safeDrawText("[Additional operation]");
  safeDrawText(`1. Notify to OZ rep when flight crews in/out: ${data.add1}`);
  safeDrawText(`2. Notify to OZ rep when service provider show up,`);
  safeDrawText(`Catering. Fuler, Flight operation, Security, De-icing): ${data.add2}`);


  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const pdfUrl = URL.createObjectURL(blob);

  const previewFrame = document.querySelector('#preview');
  previewFrame.src = pdfUrl;

  const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)))
  .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  sessionStorage.setItem("latestPdf", base64Pdf);
  return base64Pdf;
}

document.querySelector('#flight-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const response = await fetch('http://localhost:5000/generate', {
    method: 'POST',
    body: formData
  });

  const result = await response.text();
  document.querySelector('#status').textContent = result;
});

window.addEventListener('DOMContentLoaded', () => {
  function pad(n) {
    return n.toString().padStart(2, '0');
  }

  function getDateTimeLocalString() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = pad(now.getMonth() + 1);
    const dd = pad(now.getDate());
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  // Set initial values
  document.getElementById('etd').value = getDateTimeLocalString();
  document.getElementById('eta').value = getDateTimeLocalString();
  document.getElementById('landing').value = getDateTimeLocalString();
  document.getElementById('rampin').value = getDateTimeLocalString();

  // Update buttons
  document.getElementById('btn-etd-now').addEventListener('click', () => {
    document.getElementById('etd').value = getDateTimeLocalString();
  });

  document.getElementById('btn-eta-now').addEventListener('click', () => {
    document.getElementById('eta').value = getDateTimeLocalString();
  });

  document.getElementById('btn-landing-now').addEventListener('click', () => {
    document.getElementById('landing').value = getDateTimeLocalString();
  });

  document.getElementById('btn-rampin-now').addEventListener('click', () => {
    document.getElementById('rampin').value = getDateTimeLocalString();
  });
});

document.querySelector('#preview-btn').addEventListener('click', () => {
  const form = document.querySelector('#flight-form');
  const formData = new FormData(form);

  const data = {
    airline: formData.get('airline'),
    flight_number: formData.get('flight_number'),
    etd: formData.get('etd'),
    eta: formData.get('eta'),
    landing: formData.get('landing'),
    rampin: formData.get('rampin'),

    doc1: formData.get('doc1'),
    doc2: formData.get('doc2'),
    doc3: formData.get('doc3'),
    doc4: formData.get('doc4'),
    doc5: formData.get('doc5'),

    prep1: formData.get('prep1'),
    prep2: formData.get('prep2'),
    prep3: formData.get('prep3'),
    prep4: formData.get('prep4'),

    arrival1: formData.get('arrival1'),
    arrival2: formData.get('arrival2'),
    arrival3: formData.get('arrival3'),
    arrival4: formData.get('arrival4'),
    arrival5: formData.get('arrival5'),
    arrival6: formData.get('arrival6'),
    arrival7: formData.get('arrival7'),

    unload1: formData.get('unload1'),
    unload2: formData.get('unload2'),
    unload3: formData.get('unload3'),
    unload4: formData.get('unload4'),

    supervised1: formData.get('supervised1'),
    supervised2: formData.get('supervised2'),
    supervised3: formData.get('supervised3'),
    supervised4: formData.get('supervised4'),
    supervised5: formData.get('supervised5'),

    dg1: formData.get('dg1'),
    dg2: formData.get('dg2'),
    dg3: formData.get('dg3'),
    
    confirm1: formData.get('confirm1'),
    confirm2: formData.get('confirm2'),
    confirm3: formData.get('confirm3'),
    confirm4: formData.get('confirm4'),

    add1: formData.get('add1'),
    add2: formData.get('add2'),
  };

  generatePreview(data);
});


document.getElementById('compose-email-btn').addEventListener('click', async (e) => {
  e.preventDefault();

  const form = document.querySelector('#flight-form');
  const formData = new FormData(form);

  // 데이터 객체 생성
  const data = {
    airline: formData.get('airline'),
    flight_number: formData.get('flight_number'),
    flight_date: formData.get('flight_date'),
    eta: formData.get('eta'),
    landing: formData.get('landing'),
    rampin: formData.get('rampin'),

    doc1: formData.get('doc1'),
    doc2: formData.get('doc2'),
    doc3: formData.get('doc3'),
    doc4: formData.get('doc4'),
    doc5: formData.get('doc5'),

    prep1: formData.get('prep1'),
    prep2: formData.get('prep2'),
    prep3: formData.get('prep3'),
    prep4: formData.get('prep4'),

    arrival1: formData.get('arrival1'),
    arrival2: formData.get('arrival2'),
    arrival3: formData.get('arrival3'),
    arrival4: formData.get('arrival4'),
    arrival5: formData.get('arrival5'),
    arrival6: formData.get('arrival6'),
    arrival7: formData.get('arrival7'),

    unload1: formData.get('unload1'),
    unload2: formData.get('unload2'),
    unload3: formData.get('unload3'),
    unload4: formData.get('unload4'),

    supervised1: formData.get('supervised1'),
    supervised2: formData.get('supervised2'),
    supervised3: formData.get('supervised3'),
    supervised4: formData.get('supervised4'),
    supervised5: formData.get('supervised5'),

    dg1: formData.get('dg1'),
    dg2: formData.get('dg2'),
    dg3: formData.get('dg3'),
    
    confirm1: formData.get('confirm1'),
    confirm2: formData.get('confirm2'),
    confirm3: formData.get('confirm3'),
    confirm4: formData.get('confirm4'),

    add1: formData.get('add1'),
    add2: formData.get('add2'),
  };

  // PDF 생성 및 저장
  const base64Pdf = await generatePreview(data);
  sessionStorage.setItem("latestPdf", base64Pdf);

  // 페이지 이동
  window.location.href = '../email.html';
});


