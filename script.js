// Rates (as you provided)
const materialRates = {
  "White Back": 5,
  "Black Back": 10,
  "White backside": 15,
  "Star": 20,
  "star backside": 25,
  "Back Light": 30,
  "vnyle": 35,
  "oneway": 40,
  "radium": 45,
  "sunboard": 50,
  "radium sunboard": 55
};

// Frame rates (per piece)
const frameRates = {
  "1kg": 10,
  "2kg": 20,
  "3kg": 30
};

// Addons
const addonRates = {
  "Illet": 0
};

// Lamination rates per sq.ft
const laminationRates = {
  "gloss": 10,
  "matte": 12
};

const calcBtn = document.getElementById('calcBtn');
const downloadBtn = document.getElementById('downloadPdfBtn');

function sanitizeFilename(name){
  if(!name) return 'quotation';
  return 'quotation-' + name.replace(/\s+/g,'-').replace(/[^a-zA-Z0-9-_]/g,'') ;
}

function formatNumber(n){
  return Number(n).toLocaleString('en-IN', {maximumFractionDigits:2, minimumFractionDigits: (n % 1 === 0 ? 0 : 2)});
}

calcBtn.addEventListener('click', generateQuotation);

function generateQuotation(){
  const customerName = document.getElementById('customerName').value.trim() || 'Customer';
  const date = document.getElementById('date').value || new Date().toISOString().slice(0,10);
  const width = parseFloat(document.getElementById('width').value) || 0;
  const height = parseFloat(document.getElementById('height').value) || 0;
  const qty = parseInt(document.getElementById('quantity').value) || 1;
  const material = document.getElementById('materialType').value;
  const printingType = document.getElementById('printingType').value;
  const frameType = document.getElementById('frameType').value;
  const illetChecked = document.getElementById('illet').checked;
  const designingCharges = parseFloat(document.getElementById('designingCharges').value) || 0;

  let lamSelection = 'none';
  const lamRadios = document.getElementsByName('lam');
  for(const r of lamRadios) if(r.checked){ lamSelection = r.value; break; }

  // Calculations
  const area = +(width * height); // sq.ft per unit
  const materialRate = materialRates[material] || 0;
  const materialCost = area * qty * materialRate;

  const frameCost = frameType ? ( (frameRates[frameType] || 0) * qty ) : 0;

  const illetCost = illetChecked ? (addonRates['Illet'] * qty) : 0; // it's 0 as per your input

  const laminationCost = (lamSelection !== 'none') ? ( (laminationRates[lamSelection] || 0) * area * qty ) : 0;

  const totalVariable = materialCost + frameCost + illetCost + laminationCost;
  const grandTotal = totalVariable + designingCharges;

  // Build HTML result (quotation)
  const resultDiv = document.getElementById('quotationResult');
  const headerHTML = `
    <div class="quota-header">
      <div class="left">
        <h2>Vimal Press</h2>
        <div class="muted">Flex Printing Quotation</div>
        <div style="margin-top:8px;">
          <strong>Customer:</strong> ${escapeHtml(customerName)}<br>
          <strong>Date:</strong> ${escapeHtml(date)}
        </div>
      </div>
      <div class="right muted" style="text-align:right">
        <div>Mathura, Uttar Pradesh</div>
      </div>
    </div>
  `;

  let tableRows = `
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Details</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Material row
  tableRows += `
    <tr>
      <td>Flex Print</td>
      <td>${width}ft × ${height}ft = ${formatNumber(area)} sq.ft<br>${material} (${printingType})</td>
      <td>${qty}</td>
      <td>₹ ${formatNumber(materialRate)}/sq.ft</td>
      <td>₹ ${formatNumber(materialCost)}</td>
    </tr>
  `;

  // Frame row
  if(frameCost > 0){
    tableRows += `
      <tr>
        <td>Frame (${frameType})</td>
        <td>-</td>
        <td>${qty}</td>
        <td>₹ ${formatNumber(frameRates[frameType])}</td>
        <td>₹ ${formatNumber(frameCost)}</td>
      </tr>
    `;
  }

  // Illet row (complementary)
  if(illetChecked){
    tableRows += `
      <tr>
        <td>Illets (complementary)</td>
        <td>-</td>
        <td>${qty}</td>
        <td>₹ ${formatNumber(addonRates['Illet'])}</td>
        <td>₹ ${formatNumber(illetCost)}</td>
      </tr>
    `;
  }

  // Lamination row
  if(laminationCost > 0){
    tableRows += `
      <tr>
        <td>Lamination (${lamSelection})</td>
        <td>${formatNumber(area)} sq.ft</td>
        <td>${qty}</td>
        <td>₹ ${formatNumber(laminationRates[lamSelection])}/sq.ft</td>
        <td>₹ ${formatNumber(laminationCost)}</td>
      </tr>
    `;
  }

  // Designing charges
  tableRows += `
    <tr>
      <td>Designing Charges</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>₹ ${formatNumber(designingCharges)}</td>
    </tr>
  `;

  // Totals row
  tableRows += `
      </tbody>
      <tfoot>
        <tr>
          <th colspan="4">Grand Total</th>
          <th>₹ ${formatNumber(grandTotal)}</th>
        </tr>
      </tfoot>
    </table>
  `;

  resultDiv.classList.remove('placeholder');
  resultDiv.innerHTML = headerHTML + tableRows;

  // Enable download button and attach filename
  downloadBtn.disabled = false;
  downloadBtn.dataset.filename = sanitizeFilename(customerName) + '.pdf';
}

// Simple HTML escape for safety in inserted text
function escapeHtml(unsafe) {
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}

// PDF download handler
downloadBtn.addEventListener('click', async () => {
  const filename = downloadBtn.dataset.filename || 'quotation.pdf';
  const quoteEl = document.getElementById('quotationResult');

  // Style adjustments for PDF (increase scale/resolution)
  const canvas = await html2canvas(quoteEl, { scale: 2, useCORS: true, logging: false });
  const imgData = canvas.toDataURL('image/png');

  // Using jsPDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // compute image properties
  const imgWidth = pageWidth - 40; // margin
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = 20;

  // If content is higher than a single page, split into pages
  if (imgHeight <= pageHeight - 40) {
    pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
  } else {
    // multiple pages
    let remainingHeight = canvas.height;
    const pageCanvasHeight = Math.floor((canvas.width * (pageHeight - 40)) / imgWidth);

    let srcY = 0;
    while (remainingHeight > 0) {
      const portionCanvas = document.createElement('canvas');
      portionCanvas.width = canvas.width;
      portionCanvas.height = Math.min(pageCanvasHeight, remainingHeight);
      const ctx = portionCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, srcY, canvas.width, portionCanvas.height, 0, 0, canvas.width, portionCanvas.height);
      const portionImg = portionCanvas.toDataURL('image/png');
      const portionImgHeight = (portionCanvas.height * imgWidth) / portionCanvas.width;

      if (srcY > 0) pdf.addPage();
      pdf.addImage(portionImg, 'PNG', 20, 20, imgWidth, portionImgHeight);

      remainingHeight -= portionCanvas.height;
      srcY += portionCanvas.height;
    }
  }

  pdf.save(filename);
});

